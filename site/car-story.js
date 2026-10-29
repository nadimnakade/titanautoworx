import * as THREE from 'three';
import { GLTFLoader } from './vendor/GLTFLoader.js';

const section=document.querySelector('[data-car-story]');
const canvas=document.querySelector('#car-canvas');
const loaderEl=document.querySelector('[data-car-loader]');
if(section&&canvas){
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.2;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(32,1,.1,100);
  camera.position.set(7.7,2.8,8.8);camera.lookAt(0,.1,0);
  scene.add(new THREE.HemisphereLight(0xcfd7df,0x080808,2));
  const key=new THREE.DirectionalLight(0xffffff,5);key.position.set(5,7,5);scene.add(key);
  const red=new THREE.SpotLight(0xe10606,90,30,.48,.9);red.position.set(-5,4,3);scene.add(red);
  const rim=new THREE.SpotLight(0xffffff,65,25,.55,.8);rim.position.set(5,3,-5);scene.add(rim);
  const floor=new THREE.Mesh(new THREE.CircleGeometry(7,96),new THREE.MeshStandardMaterial({color:0x0c0d0c,roughness:.28,metalness:.35,transparent:true,opacity:.82}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.12;scene.add(floor);
  const carRoot=new THREE.Group();scene.add(carRoot);
  let ready=false,progress=0,target=0,pointerX=0,pointerY=0;
  new GLTFLoader().load('./assets/spectral-gt-rs.glb',g=>{
    const model=g.scene;const box=new THREE.Box3().setFromObject(model);const size=box.getSize(new THREE.Vector3());const center=box.getCenter(new THREE.Vector3());model.position.sub(center);model.scale.setScalar(5.6/Math.max(size.x,size.y,size.z));
    model.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;const ms=Array.isArray(n.material)?n.material:[n.material];ms.forEach(m=>{if(m&&'envMapIntensity'in m){m.envMapIntensity=1.65;m.roughness=Math.min(m.roughness??.4,.28);if(m.color&&m.color.b>m.color.r*1.18&&m.color.b>m.color.g*1.08)m.color.set(0x9f0505)}})}});
    carRoot.add(model);carRoot.position.y=-.5;ready=true;loaderEl?.classList.add('loaded');
  },undefined,()=>{loaderEl?.querySelector('span')?.replaceChildren('Vehicle preview unavailable')});
  const panels=[...document.querySelectorAll('[data-story-panel]')];
  const resize=()=>{const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<800?42:32;camera.updateProjectionMatrix()};addEventListener('resize',resize);resize();
  addEventListener('pointermove',e=>{pointerX=e.clientX/innerWidth-.5;pointerY=e.clientY/innerHeight-.5},{passive:true});
  const update=()=>{const r=section.getBoundingClientRect();const distance=section.offsetHeight-innerHeight;target=Math.max(0,Math.min(1,-r.top/Math.max(1,distance)));section.style.setProperty('--story-progress',`${target*100}%`);const active=Math.min(panels.length-1,Math.floor(target*panels.length));panels.forEach((p,i)=>p.classList.toggle('is-active',i===active))};addEventListener('scroll',update,{passive:true});update();
  const tick=()=>{progress+=(target-progress)*.075;if(ready){const mobile=innerWidth<800;carRoot.rotation.y=-.6+progress*Math.PI*4+pointerX*.12;carRoot.rotation.x=Math.sin(progress*Math.PI*3)*.035+pointerY*.025;carRoot.position.x=(mobile?0:Math.sin(progress*Math.PI*2)*.5);carRoot.position.y=mobile?.28:-.48;const s=(mobile?.78:1)*(1+Math.sin(progress*Math.PI)*.04);carRoot.scale.setScalar(s)}camera.position.x=7.7+pointerX*.25;camera.position.y=2.8-pointerY*.15;camera.lookAt(0,0,0);renderer.render(scene,camera);requestAnimationFrame(tick)};tick();
}

(()=>{
  const section=document.querySelector('[data-car-story]');
  const video=document.querySelector('#showcase-video');
  const loader=document.querySelector('[data-car-loader]');
  if(!section||!video)return;

  const phone=matchMedia('(max-width:800px)');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const panels=[...document.querySelectorAll('[data-story-panel]')];
  let duration=10,target=0,presented=0,seeking=false,loadedUrl='';

  async function loadFilm(){
    const file=phone.matches?'assets/showcase-m.mp4':'assets/showcase.mp4';
    if(reduced.matches){
      video.poster=phone.matches?'assets/showcase-m-poster.webp':'assets/showcase-poster.webp';
      video.removeAttribute('src');
      loadedUrl='';
      loader?.classList.add('loaded');
      return;
    }
    if(file===loadedUrl)return;
    loadedUrl=file;
    loader?.classList.remove('loaded');
    video.poster=phone.matches?'assets/showcase-m-poster.webp':'assets/showcase-poster.webp';
    try{
      const response=await fetch(file);
      if(!response.ok)throw new Error('Film unavailable');
      const blob=await response.blob();
      if(video.src.startsWith('blob:'))URL.revokeObjectURL(video.src);
      video.src=URL.createObjectURL(blob);
      video.load();
    }catch{
      loader?.querySelector('span')?.replaceChildren('Film unavailable');
    }
  }

  video.addEventListener('loadedmetadata',()=>{
    duration=video.duration||10;
    presented=reduced.matches?duration-.04:target*duration;
    video.currentTime=presented;
    loader?.classList.add('loaded');
  });
  video.addEventListener('seeked',()=>{seeking=false;presented=video.currentTime});

  function update(){
    const rect=section.getBoundingClientRect();
    const distance=Math.max(1,section.offsetHeight-innerHeight);
    target=Math.max(0,Math.min(1,-rect.top/distance));
    section.style.setProperty('--story-progress',`${target*100}%`);
    const active=Math.min(panels.length-1,Math.floor(target*panels.length));
    panels.forEach((panel,index)=>panel.classList.toggle('is-active',index===active));
  }

  function draw(){
    if(video.readyState>=2&&!reduced.matches&&!seeking){
      const wanted=Math.min(duration-.04,target*duration);
      if(Math.abs(wanted-presented)>.025){
        seeking=true;
        video.currentTime=wanted;
      }
    }
    requestAnimationFrame(draw);
  }

  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update,{passive:true});
  phone.addEventListener('change',loadFilm);
  reduced.addEventListener('change',loadFilm);
  update();
  loadFilm();
  draw();
})();

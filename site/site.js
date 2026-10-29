const header=document.querySelector('[data-header]');
const onScroll=()=>header?.classList.toggle('scrolled',scrollY>30);
addEventListener('scroll',onScroll,{passive:true});onScroll();

document.querySelectorAll('[data-compare]').forEach(compare=>{
  let active=false;
  const move=e=>{
    if(!active&&e.type!=='click')return;
    const r=compare.getBoundingClientRect();
    const x=(e.touches?.[0]?.clientX??e.clientX)-r.left;
    compare.style.setProperty('--split',`${Math.max(3,Math.min(97,x/r.width*100))}%`);
  };
  compare.addEventListener('pointerdown',e=>{active=true;compare.setPointerCapture(e.pointerId);move(e)});
  compare.addEventListener('pointermove',move);
  compare.addEventListener('pointerup',()=>active=false);
  compare.addEventListener('click',move);
});

const menu=document.querySelector('.menu-button');
menu?.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')==='true';
  menu.setAttribute('aria-expanded',String(!open));
  document.querySelector('.desktop-nav')?.classList.toggle('mobile-open',!open);
});

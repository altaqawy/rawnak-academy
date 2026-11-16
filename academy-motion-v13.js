/* Rawnak Academy V13 / restrained interaction system.
   Reduced-motion aware; never stores data or changes access/permissions. */
(function(){
 'use strict';
 const root=document.documentElement;
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
 let observer=null,raf=0,progress=null;
 const selectors=[
   '.v12-public .v12-hero-copy',
   '.v12-public .v12-mosaic',
   '.v12-public .v12-section-head',
   '.v12-public .v12-outcome',
   '.v12-public .v12-plan',
   '.v12-public .v11-path-card',
   '.v12-public .v11-feature',
   '.v12-public .v11-role-panel',
   '.v12-portal .v12-workspace-cover',
   '.v12-portal .v12-launchpad-link',
   '.v12-portal .v7-statbox',
   '.v12-portal .v7-panel',
   '.v12-portal .v7-toolcard',
   '.v12-portal .v13-connection-card',
   '.v12-portal .v13-data-empty',
   '.v12-portal .v13-empty-page',
   '.v7-public:not(.v11-public) .v7-auth-card'
 ].join(',');
 function createProgress(){
   progress=document.getElementById('rawnak-scroll-progress');
   if(progress)return;
   progress=document.createElement('div');
   progress.id='rawnak-scroll-progress';
   progress.setAttribute('aria-hidden','true');
   document.body.appendChild(progress);
 }
 function scrollUpdate(){
   raf=0;
   if(!progress)return;
   const doc=document.documentElement;
   const span=Math.max(0,doc.scrollHeight-window.innerHeight);
   const n=span>0?Math.max(0,Math.min(1,window.scrollY/span)):0;
   progress.style.transform='scaleX('+n.toFixed(4)+')';
 }
 function onScroll(){
   if(raf||media.matches)return;
   raf=requestAnimationFrame(scrollUpdate);
 }
 function enhance(){
   if(observer){observer.disconnect();observer=null}
   createProgress();
   const off=media.matches || root.dataset.motion==='off' || root.dataset.motion==='none';
   root.dataset.rawnakMotion=off?'off':'on';
   if(off){
     document.querySelectorAll('.v13-appear').forEach(el=>el.classList.add('v13-visible'));
     progress.style.opacity='0';
     return;
   }
   progress.style.opacity='1';
   if(!('IntersectionObserver' in window)){
     scrollUpdate();
     return;
   }
   observer=new IntersectionObserver(entries=>{
     entries.forEach(entry=>{
       if(entry.isIntersecting){
         entry.target.classList.add('v13-visible');
         observer.unobserve(entry.target);
       }
     });
   },{threshold:.07,rootMargin:'0px 0px 80px 0px'});
   const els=Array.from(document.querySelectorAll(selectors)).filter(el=>!el.classList.contains('v11-reveal')&&!el.classList.contains('v10-enter'));
   els.slice(0,90).forEach((el,i)=>{
     el.classList.add('v13-appear');
     el.style.setProperty('--v13-stagger',Math.min((i%4)*75,225)+'ms');
     observer.observe(el);
   });
   scrollUpdate();
 }
 // Delegate pointer lighting without rendering per-frame JS loops or affecting touch.
 document.addEventListener('pointermove',e=>{
   if(!fine.matches||media.matches||e.pointerType!=='mouse')return;
   const card=e.target.closest('.v12-portal .v7-statbox,.v12-portal .v7-panel,.v12-public .v12-outcome,.v12-public .v12-plan');
   if(!card)return;
   const rect=card.getBoundingClientRect();
   if(rect.width===0||rect.height===0)return;
   card.style.setProperty('--v13-glow-x',Math.round((e.clientX-rect.left)*100/rect.width)+'%');
   card.style.setProperty('--v13-glow-y',Math.round((e.clientY-rect.top)*100/rect.height)+'%');
 },{passive:true});
 if(typeof render==='function'){
   const before=render;
   render=function(){before();enhance()};
 }
 window.addEventListener('scroll',onScroll,{passive:true});
 window.addEventListener('resize',onScroll,{passive:true});
 media.addEventListener?.('change',enhance);
 enhance();
})();


/* RAWNAK Academy Discovery Studio V9.1
   A self-contained, original static-site experience: no external runtime libraries.
   Visual inspiration: Eductix / Eloraa / user-curated gallery, buttons and cards.
   Existing role guards, course data, payments, and navigation remain untouched. */
(function(){
  'use strict';
  const galleryItems=[
    {
      id:'study',
      cat:'learn',
      photo:'https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=1500',
      en:{eyebrow:'01 / LEARN',title:'Your space to grow.',desc:'Explore a calmer approach to digital learning with tools designed around your pace.',alt:'Learner studying with a laptop, notebook and reference materials'},
      ar:{eyebrow:'01 / اتعلم',title:'مساحتك للتطور.',desc:'اكتشف طريقة أهدى للتعلّم الرقمي بأدوات بتناسب سرعتك واحتياجاتك.',alt:'طالب يذاكر باستخدام لابتوب وملاحظات'}
    },
    {
      id:'creative',
      cat:'practice',
      photo:'https://images.pexels.com/photos/7793668/pexels-photo-7793668.jpeg?auto=compress&cs=tinysrgb&w=1500',
      en:{eyebrow:'02 / CREATE',title:'Make ideas tangible.',desc:'Practice concepts, build projects and develop a portfolio with a purpose.',alt:'Creative professional drawing concepts with a notebook beside a laptop'},
      ar:{eyebrow:'02 / طبّق',title:'حوّل أفكارك لحقيقة.',desc:'طبق اللي اتعلمته ونفّذ مشاريع وابني ملف أعمال له معنى.',alt:'شخص يعمل على أفكار إبداعية في دفتر بجانب لابتوب'}
    },
    {
      id:'together',
      cat:'learn',
      photo:'https://images.pexels.com/photos/4943623/pexels-photo-4943623.jpeg?auto=compress&cs=tinysrgb&w=1500',
      en:{eyebrow:'03 / CONNECT',title:'Learn better together.',desc:'Bring discussions, study sessions and shared ambitions into your learning journey.',alt:'Two learners studying together with a book and computer'},
      ar:{eyebrow:'03 / اتواصل',title:'اتعلموا أحسن سوا.',desc:'شارك المذاكرة والنقاشات والأهداف مع ناس عندها نفس الشغف.',alt:'طالبان يذاكران معًا باستخدام كتاب وكمبيوتر'}
    },
    {
      id:'workshop',
      cat:'practice',
      photo:'https://images.pexels.com/photos/6267052/pexels-photo-6267052.jpeg?auto=compress&cs=tinysrgb&w=1500',
      en:{eyebrow:'04 / DISCOVER',title:'Real learning moments.',desc:'Find experiences designed to help you understand, practice and move forward.',alt:'Educational activity in a learning space'},
      ar:{eyebrow:'04 / اكتشف',title:'لحظات تعليم حقيقية.',desc:'استكشف تجارب تساعدك تفهم وتتدرّب وتكمل خطوتك الجاية.',alt:'نشاط تعليمي في مساحة للتعلّم'}
    },
    {
      id:'educator',
      cat:'teach',
      photo:'https://images.pexels.com/photos/9040544/pexels-photo-9040544.jpeg?auto=compress&cs=tinysrgb&w=1500',
      en:{eyebrow:'05 / TEACH',title:'A platform for expertise.',desc:'A professional home for educators, doctors, lecturers and university professors to share knowledge.',alt:'Educator recording teaching material in a studio'},
      ar:{eyebrow:'05 / درّس',title:'مساحة لخبرتك.',desc:'منصة احترافية للمدرسين والدكاترة والمحاضرين والأساتذة الجامعيين لمشاركة المعرفة.',alt:'عضو هيئة تدريس يسجل محتوى تعليميًا داخل استوديو'}
    }
  ];
  const copy={
    en:{
      eyebrow:'RAWNAK / DISCOVERY STUDIO',
      headingA:'Beyond the lessons.',
      headingB:'Into the experience.',
      intro:'Learning should feel alive. Explore the people, tools and real-life moments behind a more personal educational journey.',
      tabs:[['all','All stories'],['learn','Learning'],['practice','Practice'],['teach','Teaching']],
      open:'Explore this moment',
      count:'Selected visual stories from the Academy experience',
      notice:'Concept gallery · Illustrative photographs, not actual courses or enrolled students',
      footer:'Learn something meaningful. Make something that matters.',
      cta:'Create your free account',
      close:'Close gallery',
      prev:'Previous image',
      next:'Next image',
      counter:'Gallery image',
      alt:'Larger view of a learning moment',
      zero:'No items in this category'
    },
    ar:{
      eyebrow:'رونق / مساحة الاكتشاف',
      headingA:'مش مجرد دروس.',
      headingB:'دي تجربة كاملة.',
      intro:'التعلّم لازم يكون تجربة ممتعة وحية. استكشف الأدوات واللحظات والأفكار اللي هتخلي رحلتك التعليمية مختلفة.',
      tabs:[['all','الكل'],['learn','التعلّم'],['practice','التطبيق'],['teach','التدريس']],
      open:'استكشف اللحظة',
      count:'لحظات بصرية مختارة من تجربة الأكاديمية',
      notice:'معرض توضيحي · الصور تعبيرية وليست لكورسات أو طلاب حقيقيين',
      footer:'اتعلم حاجة مفيدة واصنع حاجة ليها قيمة.',
      cta:'أنشئ حسابك المجاني',
      close:'إغلاق المعرض',
      prev:'الصورة السابقة',
      next:'الصورة التالية',
      counter:'صورة المعرض',
      alt:'عرض مكبّر للحظة تعليمية',
      zero:'مفيش عناصر في التصنيف ده'
    }
  };
  const lang=()=>document.documentElement.lang==='ar'?'ar':'en';
  function escapeHTML(value){
    return String(value==null?'':value).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function card(item,idx,language){
    const text=item[language];
    const cls=idx===0?' is-large':idx===4?' is-wide':'';
    return '<button class="v10-bento-card'+cls+' v10-enter" type="button" data-v10-card="'+escapeHTML(item.id)+'" data-v10-category="'+escapeHTML(item.cat)+'" aria-label="'+escapeHTML(text.title+' — '+copy[language].open)+'">'+
      '<img class="v10-bento-img" src="'+escapeHTML(item.photo)+'" alt="'+escapeHTML(text.alt)+'" loading="lazy" decoding="async">'+
      '<span class="v10-bento-info"><span class="v10-bento-kicker">'+escapeHTML(text.eyebrow)+'</span>'+
      '<strong class="v10-bento-title">'+escapeHTML(text.title)+'</strong>'+
      '<span class="v10-bento-foot"><span>'+escapeHTML(copy[language].open)+'</span><span class="v10-bento-arrow" aria-hidden="true">↗</span></span></span>'+
      '</button>';
  }
  function sectionMarkup(language){
    const l=copy[language];
    const buttons=l.tabs.map(([id,label],index)=>
      '<button type="button" class="v10-filter" data-v10-filter="'+id+'" aria-pressed="'+(index===0)+'">'+escapeHTML(label)+'</button>'
    ).join('');
    return '<section class="v10-discovery" id="rawnak-discovery" aria-labelledby="v10-discovery-heading">'+
      '<div class="v10-shell">'+
        '<div class="v10-top v10-enter"><div><div class="v10-eyebrow">'+escapeHTML(l.eyebrow)+'</div>'+
          '<h2 id="v10-discovery-heading">'+escapeHTML(l.headingA)+'<br><em>'+escapeHTML(l.headingB)+'</em></h2></div>'+
          '<div class="v10-side"><p>'+escapeHTML(l.intro)+'</p></div></div>'+
        '<div class="v10-filterbar v10-enter" role="group" aria-label="'+escapeHTML(l.count)+'">'+buttons+'</div>'+
        '<div class="v10-grid">'+galleryItems.map((item,idx)=>card(item,idx,language)).join('')+'</div>'+
        '<div class="v10-gallery-note"><strong>'+escapeHTML(l.count)+'</strong><span>'+escapeHTML(l.notice)+'</span></div>'+
        '<div class="v10-editorial-ribbon v10-enter"><p>'+escapeHTML(l.footer)+'</p>'+
          '<button type="button" class="v10-ribbon-link" data-nav="signup">'+escapeHTML(l.cta)+'<span aria-hidden="true">↗</span></button></div>'+
      '</div>'+
      '<dialog class="v10-lightbox" aria-label="'+escapeHTML(l.counter)+'"><div class="v10-lightbox-inner">'+
        '<div class="v10-lightbox-visual"><img src="" alt=""></div>'+
        '<div class="v10-lightbox-content"><small data-v10-dialog-kicker></small><h3 data-v10-dialog-title></h3><p data-v10-dialog-copy></p>'+
          '<div class="v10-dialog-controls"><button data-v10-prev type="button" aria-label="'+escapeHTML(l.prev)+'">←</button>'+
          '<span data-v10-dialog-counter aria-live="polite"></span>'+
          '<button data-v10-next type="button" aria-label="'+escapeHTML(l.next)+'">→</button></div></div>'+
        '<button type="button" class="v10-dialog-close" data-v10-close aria-label="'+escapeHTML(l.close)+'">×</button>'+
      '</div></dialog>'+
    '</section>';
  }
  let observer=null;
  function reveal(section){
    const targets=Array.from(section.querySelectorAll('.v10-enter'));
    if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window)){
      targets.forEach(el=>el.classList.add('is-visible'));return;
    }
    if(observer)observer.disconnect();
    observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
      });
    },{threshold:.075,rootMargin:'0px 0px 35px 0px'});
    targets.forEach(el=>observer.observe(el));
  }
  function mount(){
    const root=document.querySelector('#app .v76-public');
    if(!root)return;
    if(root.querySelector('.v10-discovery'))return;
    const courses=root.querySelector('.v76-courses');
    if(!courses)return;
    courses.insertAdjacentHTML('afterend',sectionMarkup(lang()));
    const section=root.querySelector('.v10-discovery');
    if(section)reveal(section);
  }
  function visibleItems(section){
    const visible=new Set(Array.from(section.querySelectorAll('[data-v10-card]:not([hidden])')).map(el=>el.dataset.v10Card));
    return galleryItems.filter(item=>visible.has(item.id));
  }
  function showItem(section,item){
    const dialog=section.querySelector('.v10-lightbox');
    if(!dialog||!item)return;
    const language=lang(),text=item[language],list=visibleItems(section);
    dialog.dataset.v10Active=item.id;
    const image=dialog.querySelector('.v10-lightbox-visual img');
    image.src=item.photo;
    image.alt=text.alt;
    dialog.querySelector('[data-v10-dialog-kicker]').textContent=text.eyebrow;
    dialog.querySelector('[data-v10-dialog-title]').textContent=text.title;
    dialog.querySelector('[data-v10-dialog-copy]').textContent=text.desc;
    dialog.querySelector('[data-v10-dialog-counter]').textContent=(list.findIndex(v=>v.id===item.id)+1)+' / '+list.length;
  }
  function openItem(section,id,trigger){
    const dialog=section.querySelector('.v10-lightbox');
    const item=visibleItems(section).find(item=>item.id===id);
    if(!dialog||!item)return;
    section.__v10LastTrigger=trigger;
    showItem(section,item);
    if(!dialog.open){
      if(typeof dialog.showModal==='function')dialog.showModal();
      else dialog.setAttribute('open','');
    }
    dialog.querySelector('[data-v10-close]')?.focus();
  }
  function nextItem(section,step){
    const dialog=section.querySelector('.v10-lightbox');
    const list=visibleItems(section);
    if(!dialog||!list.length)return;
    const current=list.findIndex(item=>item.id===dialog.dataset.v10Active);
    const next=list[(current+step+list.length)%list.length];
    showItem(section,next);
  }
  function closeItem(section){
    const dialog=section.querySelector('.v10-lightbox');
    if(!dialog)return;
    if(dialog.open && typeof dialog.close==='function')dialog.close();
    else dialog.removeAttribute('open');
    const trigger=section.__v10LastTrigger;
    if(trigger?.isConnected && !trigger.hidden)trigger.focus();
  }
  document.addEventListener('click',event=>{
    const filter=event.target.closest('[data-v10-filter]');
    if(filter){
      const section=filter.closest('.v10-discovery'),value=filter.dataset.v10Filter;
      section.querySelectorAll('[data-v10-filter]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===filter)));
      section.querySelectorAll('[data-v10-card]').forEach(card=>{card.hidden=value!=='all' && card.dataset.v10Category!==value});
      return;
    }
    const tile=event.target.closest('[data-v10-card]');
    if(tile){openItem(tile.closest('.v10-discovery'),tile.dataset.v10Card,tile);return}
    const button=event.target.closest('[data-v10-prev],[data-v10-next],[data-v10-close]');
    if(button){
      const section=button.closest('.v10-discovery');
      if(button.hasAttribute('data-v10-close'))closeItem(section);
      else nextItem(section,button.hasAttribute('data-v10-prev')?-1:1);
      return;
    }
    if(event.target.matches('.v10-lightbox'))closeItem(event.target.closest('.v10-discovery'));
  });
  document.addEventListener('keydown',event=>{
    const section=document.querySelector('#app .v10-discovery');
    const dialog=section?.querySelector('.v10-lightbox');
    if(!dialog?.open)return;
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
      event.preventDefault();
      const step=event.key==='ArrowRight'?1:-1;
      nextItem(section,lang()==='ar'?-step:step);
    }
    if(event.key==='Escape' && typeof dialog.close!=='function')closeItem(section);
  });
  document.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const el=event.target.closest('.v10-bento-card,.v7-panel,.v7-statbox,.v7-toolcard,.v76-bento article,.v76-course-card');
    if(!el)return;
    const box=el.getBoundingClientRect();
    if(!box.width||!box.height)return;
    el.style.setProperty('--v10-x',Math.round((event.clientX-box.left)/box.width*100)+'%');
    el.style.setProperty('--v10-y',Math.round((event.clientY-box.top)/box.height*100)+'%');
  },{passive:true});
  if(typeof render==='function'){
    const earlierRender=render;
    render=function(){earlierRender();mount()};
  }
  mount();
})();


/* Rawnak Academy / Education layout inspired by the Eductix visual hierarchy.
   Original source and content, not a copy of any third-party template assets.
   Existing accounts, demo access, role permissions and routes stay untouched. */
(function(){
'use strict';
const prev=typeof v7Landing==='function'?v7Landing:null;
if(!prev)return;
const locale=()=>document.documentElement.lang==='ar'?'ar':'en';
const words={
  en:{
    overline:'WHAT YOU WILL LEARN',title1:'Build skills that',title2:'shape your future.',
    intro:'Discover practical skills, focused tools and meaningful learning experiences — all in one thoughtful academy.',
    cta:'Explore the Academy',noteTop:'Built for real growth.',noteBottom:'Move from curiosity to confident practice.',
    photo1:'Woman studying in a library',photo2:'Young learner in a classroom',classAlt:'Learners working together',
    studio:'Interactive classrooms',promiseTitle:'Learning you can apply.',promiseDesc:'Lessons, hands-on practice and smart study tools.',
    metric:'Planned fields',metricDesc:'Creative · Technology · Business · Health',foot:'A more personal way to learn',
    tag1:'CREATIVE SKILLS',tag2:'TECHNOLOGY',tag3:'BUSINESS',tag4:'HEALTH',
    outcomesOver:'HOW WE HELP YOU GROW',outcomesHeading:'Practical skills.',outcomesHeading2:'Purposeful learning.',
    outcomesLead:'The learning experience is built around the things that actually help knowledge stick.',
    outcome1:'Clear learning paths',outcomeDesc1:'Know what to study next and why it matters.',
    outcome2:'Hands-on practice',outcomeDesc2:'Apply concepts in exercises and meaningful projects.',
    outcome3:'Tools for educators',outcomeDesc3:'Give teachers, specialists and professors a proper teaching workspace.',
    outcome4:'Smart revision',outcomeDesc4:'Notes, question banks and books connected to learning.',
    pathsOver:'WAYS TO START',pathsHeading:'Your academy.',pathsHeading2:'Your learning style.',
    pathsLead:'Choose the experience that fits your needs. Programs and payments will launch after the Academy is connected.',
    plan1:'Explore free',planDesc1:'Create your student preview and discover the learning experience.',
    plan1A:'Student workspace',plan1B:'Sample course discovery',plan1C:'Personal study tools',plan1D:'No payment required',
    plan2:'Guided learning',planDesc2:'A future home for structured programs and educator-led teaching.',
    plan2A:'Recorded learning paths',plan2B:'Educator support',plan2C:'Assignments and reviews',plan2D:'Available after launch',
    plan3:'Academic partners',planDesc3:'A planned workspace for educators and institutions to build programs.',
    plan3A:'Educator onboarding',plan3B:'Course production',plan3C:'Smart book companion',plan3D:'Approval required',
    start:'Start free',learn:'Explore the preview',teach:'Apply to teach',
    noReal:'Concept preview only · This is not a published course catalog or active pricing plan',
    trial:'Prototype interface · No live enrollment, payment or learner statistics',
    noPartners:'Built around learning, not imaginary achievements'
  },
  ar:{
    overline:'المهارات اللي هتتعلمها',title1:'اتعلّم مهارات',title2:'تصنع مستقبلك.',
    intro:'اكتشف مهارات عملية وأدوات للمذاكرة وتجربة تعليمية متكاملة في مكان واحد داخل رونق أكاديمي.',
    cta:'استكشف الأكاديمية',noteTop:'تعلّم علشان تتطوّر.',noteBottom:'من الفضول للتطبيق العملي والثقة.',
    photo1:'طالبة تذاكر في المكتبة',photo2:'طالب في فصل تعليمي',classAlt:'طلاب يذاكرون معًا',
    studio:'فصول تعليمية تفاعلية',promiseTitle:'تعلّم وطبّق.',promiseDesc:'دروس وتدريبات وأدوات ذكية تساعدك تتقدم.',
    metric:'مجالات بنجهزها',metricDesc:'إبداع · تقنية · أعمال · علوم صحية',foot:'تجربة تعليمية أقرب ليك',
    tag1:'مهارات إبداعية',tag2:'تقنية وبرمجة',tag3:'أعمال',tag4:'علوم طبية',
    outcomesOver:'إزاي بنساعدك تتطور',outcomesHeading:'مهارات عملية.',outcomesHeading2:'تعليم له هدف.',
    outcomesLead:'بنجهز تجربة تساعدك تفهم وتثبت المعلومات وتستخدمها في حياتك وشغلك.',
    outcome1:'مسارات تعليمية واضحة',outcomeDesc1:'اعرف هتدرس إيه بعد كده وليه ده مهم.',
    outcome2:'تدريب عملي',outcomeDesc2:'طبّق اللي اتعلمته في تمارين ومشاريع مفيدة.',
    outcome3:'أدوات لأعضاء هيئة التدريس',outcomeDesc3:'مساحة للمدرسين والدكاترة والمحاضرين والأساتذة الجامعيين.',
    outcome4:'مراجعة ذكية',outcomeDesc4:'ملاحظات وبنوك أسئلة وكتب مرتبطة بالدروس.',
    pathsOver:'طرق تبدأ بيها',pathsHeading:'أكاديميتك.',pathsHeading2:'بطريقتك.',
    pathsLead:'اختار تجربة التعلّم اللي تناسبك، الكورسات والمدفوعات الفعلية هتكون بعد تفعيل النظام.',
    plan1:'ابدأ مجانًا',planDesc1:'أنشئ حساب طالب تجريبي واستكشف تجربة الأكاديمية.',
    plan1A:'مساحة الطالب',plan1B:'استكشاف الكورسات التجريبية',plan1C:'أدوات مذاكرة شخصية',plan1D:'من غير أي دفع',
    plan2:'التعلّم بإشراف',planDesc2:'مساحة مستقبلية لبرامج تعليمية منظمة بإشراف مدرسين ومتخصصين.',
    plan2A:'مسارات مسجلة',plan2B:'متابعة عضو هيئة التدريس',plan2C:'تكليفات ومراجعات',plan2D:'بعد الإطلاق',
    plan3:'الشراكة التعليمية',planDesc3:'مساحة مخططة لأعضاء هيئة التدريس والمؤسسات لبناء برامجهم.',
    plan3A:'انضمام أعضاء هيئة التدريس',plan3B:'إنشاء الكورسات',plan3C:'الكتب الذكية',plan3D:'بعد الموافقة',
    start:'ابدأ مجانًا',learn:'شوف التجربة',teach:'قدّم للتدريس',
    noReal:'معاينة توضيحية فقط · ليست قائمة كورسات منشورة أو باقات أسعار فعلية',
    trial:'نسخة تجريبية · لا توجد اشتراكات أو مدفوعات أو إحصاءات طلاب حقيقية',
    noPartners:'مبنية على قيمة التعليم مش على أرقام إنجازات وهمية'
  }
};
const photo={
  first:'https://images.pexels.com/photos/7870603/pexels-photo-7870603.jpeg?auto=compress&cs=tinysrgb&w=1000',
  second:'https://images.pexels.com/photos/16329567/pexels-photo-16329567.jpeg?auto=compress&cs=tinysrgb&w=1200',
  class:'https://images.pexels.com/photos/4943623/pexels-photo-4943623.jpeg?auto=compress&cs=tinysrgb&w=1200'
};
function hero(t){
 return '<section class="v11-hero v12-hero" id="mission" aria-labelledby="v12-hero-title">'+
  '<div class="v11-shell v12-hero-shell"><div class="v12-hero-topline"><span>'+t.overline+'</span><span>✳ &nbsp; RAWNAK ACADEMY</span></div>'+
  '<div class="v12-hero-grid"><div class="v12-hero-copy">'+
    '<div class="v12-kicker">RAWNAK <span>ACADEMY</span> / 2026</div>'+
    '<h1 id="v12-hero-title">'+t.title1+'<br><span>'+t.title2+'</span></h1>'+
    '<p>'+t.intro+'</p>'+
    '<div class="v12-hero-actions"><button type="button" class="v12-button" data-nav="signup">'+t.cta+' <span aria-hidden="true">↗</span></button>'+
    '<button type="button" class="v12-secondary" data-v7-scroll="courses">'+t.metric+' <span aria-hidden="true">↓</span></button></div>'+
    '<div class="v12-growth-note"><span class="v12-growth-icon" aria-hidden="true">✳</span><span><strong>'+t.noteTop+'</strong><small>'+t.noteBottom+'</small></span><b aria-hidden="true">↗</b></div>'+
  '</div>'+
  '<div class="v12-mosaic" aria-label="'+t.foot+'">'+
    '<div class="v12-mosaic-column v12-mosaic-left">'+
      '<figure class="v12-mosaic-image v12-person-one"><img src="'+photo.first+'" alt="'+t.photo1+'" loading="eager" decoding="async"></figure>'+
      '<div class="v12-promise"><span class="v12-promise-spark" aria-hidden="true">✳</span><strong>'+t.promiseTitle+'</strong><small>'+t.promiseDesc+'</small></div>'+
      '<div class="v12-metric"><strong>✳<span>↗</span></strong><span>'+t.metric+'</span><small>'+t.metricDesc+'</small></div>'+
    '</div>'+
    '<div class="v12-mosaic-column v12-mosaic-right">'+
      '<figure class="v12-mosaic-image v12-classroom"><img src="'+photo.class+'" alt="'+t.classAlt+'" loading="eager" decoding="async"><figcaption>'+t.studio+' <span aria-hidden="true">↗</span></figcaption></figure>'+
      '<figure class="v12-mosaic-image v12-person-two"><img src="'+photo.second+'" alt="'+t.photo2+'" loading="eager" decoding="async"></figure>'+
    '</div>'+
  '</div></div>'+
  '<div class="v12-hero-bottom"><span>'+t.foot+'</span><div class="v12-trust-pills"><span>'+t.tag1+'</span><span>'+t.tag2+'</span><span>'+t.tag3+'</span><span>'+t.tag4+'</span></div></div>'+
  '</div></section>';
}
function outcomes(t){
 const list=[
  ['01','✦',t.outcome1,t.outcomeDesc1],
  ['02','↗',t.outcome2,t.outcomeDesc2],
  ['03','◎',t.outcome3,t.outcomeDesc3],
  ['04','✳',t.outcome4,t.outcomeDesc4]
 ];
 return '<section class="v12-outcomes v11-section" id="outcomes"><div class="v11-shell">'+
   '<div class="v12-section-head"><div><span class="v12-eyebrow">05 / '+t.outcomesOver+'</span><h2>'+t.outcomesHeading+'<br><em>'+t.outcomesHeading2+'</em></h2></div><p>'+t.outcomesLead+'</p></div>'+
   '<div class="v12-outcomes-grid">'+list.map(it=>'<article class="v12-outcome"><span class="v12-outcome-number">'+it[0]+'</span><span class="v12-outcome-icon" aria-hidden="true">'+it[1]+'</span><h3>'+it[2]+'</h3><p>'+it[3]+'</p></article>').join('')+'</div>'+
  '</div></section>';
}
function paths(t){
 const plans=[
  ['01',t.plan1,t.planDesc1,[t.plan1A,t.plan1B,t.plan1C,t.plan1D],t.start,'signup',''],
  ['02',t.plan2,t.planDesc2,[t.plan2A,t.plan2B,t.plan2C,t.plan2D],t.learn,'login',' is-featured'],
  ['03',t.plan3,t.planDesc3,[t.plan3A,t.plan3B,t.plan3C,t.plan3D],t.teach,'','']
 ];
 return '<section class="v12-learning-options v11-section" id="learning-options"><div class="v11-shell">'+
 '<div class="v12-section-head"><div><span class="v12-eyebrow">09 / '+t.pathsOver+'</span><h2>'+t.pathsHeading+'<br><em>'+t.pathsHeading2+'</em></h2></div><p>'+t.pathsLead+'</p></div>'+
 '<div class="v12-plan-grid">'+plans.map(p=>'<article class="v12-plan'+p[6]+'"><span class="v12-plan-id">'+p[0]+' / RAWNAK</span><h3>'+p[1]+'</h3><p>'+p[2]+'</p><ul>'+p[3].map(feature=>'<li><b aria-hidden="true">✓</b>'+feature+'</li>').join('')+'</ul><button type="button" class="v12-button" '+(p[5]?'data-nav="'+p[5]+'"':'data-action="v7WhatsApp"')+'>'+p[4]+' <span aria-hidden="true">↗</span></button></article>').join('')+'</div>'+
 '<p class="v12-plan-note">'+t.noReal+'</p></div></section>';
}
function replacePage(){
 const t=words[locale()];
 let html=prev();
 if(!html.includes('class="v7-public v11-public"'))return html;
 html=html.replace('class="v7-public v11-public"','class="v7-public v11-public v12-public"');

 // Match the reference's simple four-link navigation, while retaining local Academy destinations.
 const navLinks=locale()==='ar'?
   [['الرئيسية','mission'],['الكورسات','courses'],['البرامج','learning-options'],['عن رونق','about']]:
   [['Home','mission'],['Courses','courses'],['Programs','learning-options'],['About Us','about']];
 const nav='<nav class="v11-top-links" aria-label="'+(locale()==='ar'?'القائمة الرئيسية':'Main navigation')+'">'+
   navLinks.map(x=>'<a href="#/welcome" data-v7-scroll="'+x[1]+'">'+x[0]+'</a>').join('')+'</nav>';
 html=html.replace(/<nav class="v11-top-links"[^>]*>[\s\S]*?<\/nav>/,nav);
 html=html.replace(/<button class="v11-button v11-head-cta" data-nav="signup">[\s\S]*?<span>↗<\/span><\/button>/,
   '<button class="v11-button v11-head-cta" data-v7-scroll="courses">'+
   (locale()==='ar'?'استكشف البرامج':'Explore Programs')+' <span>↗</span></button>');

 const begin='<section class="v11-hero" id="mission">';
 const stop='<div class="v11-ticker"';
 const from=html.indexOf(begin),to=html.indexOf(stop,from);
 if(from<0||to<0)return html;
 html=html.slice(0,from)+hero(t)+html.slice(to);
 html=html.replace('<section class="v11-books',outcomes(t)+'<section class="v11-books');
 html=html.replace('<section class="v11-faq',paths(t)+'<section class="v11-faq');
 html=html.replace('<div class="v11-announcement">','<div class="v11-announcement" data-edu-reference="Eductix-inspired original implementation">');
 return html;
}
v7Landing=replacePage;
if(typeof render==='function'&&document.querySelector('#app .v11-public'))render();
})();

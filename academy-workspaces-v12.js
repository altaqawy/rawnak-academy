/* RAWNAK Academy — coherent Eductix-style role workspaces.
   Presentation only: do not alter sessions, role checks, account or payment data. */
(function(){
'use strict';
var home={student:'my-learning',instructor:'instructor',owner:'owner'};
var text={
en:{
student:{label:'STUDENT WORKSPACE',title:'Your learning deserves a better space.',desc:'Courses, progress, practice and rewards — thoughtfully organized for you.',links:[['courses','Explore courses','✳'],['classroom','Continue learning','▷'],['tools','Study tools','⌘'],['wallet','My rewards','✦']]},
instructor:{label:'EDUCATOR STUDIO',title:'Teaching feels better when everything is in place.',desc:'Courses, students and lesson tools in a workspace for teachers, doctors, lecturers and professors.',links:[['instructor-courses','Manage courses','✳'],['instructor-students','Learner insights','↗'],['instructor-question-bank','Question bank','⌘'],['instructor-earnings','Earnings','✦']]},
owner:{label:'ACADEMY CONTROL CENTER',title:'A clearer way to lead your academy.',desc:'Educators, course plans, insights and operations in one organized workspace.',links:[['owner-instructors','Educator team','✳'],['owner-courses','Course catalog','▤'],['owner-analytics','Academy insights','↗'],['owner-finance','Finance','✦']]}
},
ar:{
student:{label:'مساحة الطالب',title:'مساحة تعليم تليق بطموحك.',desc:'كورساتك ومذاكرتك وتدريباتك ومكافآتك كلها في مكان واحد علشان تركز على اللي يهمك.',links:[['courses','استكشف الكورسات','✳'],['classroom','كمّل مذاكرتك','▷'],['tools','أدوات المذاكرة','⌘'],['wallet','مكافآتي','✦']]},
instructor:{label:'استوديو عضو هيئة التدريس',title:'التدريس أسهل لما كل أدواتك متجمعة.',desc:'مساحة منظمة للكورسات والطلاب والمحتوى للمدرسين والدكاترة والمحاضرين والأساتذة الجامعيين.',links:[['instructor-courses','إدارة الكورسات','✳'],['instructor-students','متابعة الطلاب','↗'],['instructor-question-bank','بنك الأسئلة','⌘'],['instructor-earnings','الأرباح','✦']]},
owner:{label:'مركز إدارة الأكاديمية',title:'كل الأكاديمية في لوحة واحدة.',desc:'إدارة أعضاء هيئة التدريس والكورسات والتحليلات والعمليات بشكل أوضح، من غير أرقام مالية وهمية.',links:[['owner-instructors','فريق التدريس','✳'],['owner-courses','الكتالوج','▤'],['owner-analytics','التحليلات','↗'],['owner-finance','المالية','✦']]}
}};
var pages={en:{
'my-learning':'My learning','courses':'Explore courses','tools':'Study tools','wallet':'Rewards','leaderboard':'Challenges','classroom':'Learning studio','book-library':'Smart books','split-study':'Split study','student-settings':'Settings',
'instructor':'Overview','instructor-courses':'My courses','instructor-students':'Students','instructor-earnings':'Earnings','instructor-books':'Smart books','instructor-qr-studio':'QR Studio','instructor-question-bank':'Question bank','instructor-settings':'Settings',
'owner':'Overview','owner-instructors':'Educators','owner-courses':'Courses','owner-analytics':'Analytics','owner-finance':'Finance','owner-books':'Smart books','owner-settings':'Settings'
},ar:{
'my-learning':'تعليمي','courses':'استكشف الكورسات','tools':'أدوات المذاكرة','wallet':'المكافآت','leaderboard':'التحديات','classroom':'استوديو التعلّم','book-library':'الكتب الذكية','split-study':'المذاكرة المقسّمة','student-settings':'الإعدادات',
'instructor':'نظرة عامة','instructor-courses':'كورساتي','instructor-students':'الطلاب','instructor-earnings':'الأرباح','instructor-books':'الكتب الذكية','instructor-qr-studio':'استوديو QR','instructor-question-bank':'بنك الأسئلة','instructor-settings':'الإعدادات',
'owner':'نظرة عامة','owner-instructors':'أعضاء هيئة التدريس','owner-courses':'الكورسات','owner-analytics':'التحليلات','owner-finance':'المالية','owner-books':'الكتب الذكية','owner-settings':'الإعدادات'
}};
var photos={
student:'https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=900',
instructor:'https://images.pexels.com/photos/9040544/pexels-photo-9040544.jpeg?auto=compress&cs=tinysrgb&w=900',
owner:'https://images.pexels.com/photos/4943623/pexels-photo-4943623.jpeg?auto=compress&cs=tinysrgb&w=900'
};
var lang=function(){return document.documentElement.lang==='ar'?'ar':'en'};
var tr=function(en,ar){return lang()==='ar'?ar:en};
var safe=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var getRole=function(portal){return portal.classList.contains('v7-owner')?'owner':portal.classList.contains('v7-instructor')?'instructor':'student'};
var getRoute=function(){try{return typeof activeRoute==='function'?activeRoute():(location.hash.split('#/')[1]||'my-learning')}catch(e){return 'my-learning'}};
var canUse=function(role,route){return typeof v7Valid==='function'?v7Valid(route,role):role==='student'?!/^(owner|instructor)/.test(route):route.indexOf(role)===0};
function linkButton(route,label,cls){
return '<button type="button" data-nav="'+safe(route)+'" class="'+cls+'">'+safe(label)+'<span aria-hidden="true">↗</span></button>';
}
function hero(role){
 var c=text[lang()][role],available=c.links.filter(function(l){return canUse(role,l[0])}),main=available.slice(0,2),label=c.label;
 return '<section class="v12-workspace-cover" aria-label="'+safe(label)+'">'+
 '<div class="v12-cover-copy"><div class="v12-cover-eyebrow"><i></i>'+safe(label)+' <span>/ RAWNAK ACADEMY</span></div>'+
 '<h1>'+safe(c.title)+'</h1><p>'+safe(c.desc)+'</p>'+
 '<div class="v12-cover-actions">'+main.map(function(l,i){return linkButton(l[0],l[1],i?'v12-cover-secondary':'v12-cover-primary')}).join('')+'</div>'+
 '<div class="v12-cover-note"><span>✳</span>'+safe(tr('Interactive prototype · No real payments','نسخة تفاعلية للتجربة · بدون مدفوعات حقيقية'))+'</div></div>'+
 '<div class="v12-cover-art" aria-hidden="true"><div class="v12-cover-grid"></div>'+
 '<div class="v12-cover-photo"><img src="'+photos[role]+'" alt="" loading="lazy" decoding="async"></div>'+
 '<div class="v12-cover-green"><small>RAWNAK / '+safe(role.toUpperCase())+'</small><strong>'+safe(tr('Learning, beautifully organized.','تعليم منظم بشكل أجمل.'))+'</strong><i>✳</i></div>'+
 '<div class="v12-cover-mini"><b>✦</b><span>'+safe(tr('Your next step starts here','خطوتك الجاية تبدأ هنا'))+'</span></div></div></section>';
}
function links(role){
 var c=text[lang()][role],available=c.links.filter(function(l){return canUse(role,l[0])});
 return '<section class="v12-launchpad" aria-label="'+safe(tr('Workspace shortcuts','اختصارات مساحة العمل'))+'">'+
 '<div class="v12-launchpad-header"><h2>'+safe(tr('Start here','ابدأ من هنا'))+'</h2><span>'+safe(tr('Quick access for your role','اختصارات مناسبة لدورك'))+'</span></div>'+
 '<div class="v12-launchpad-grid">'+available.map(function(l){
 return '<button type="button" data-nav="'+safe(l[0])+'" class="v12-launchpad-link"><span class="v12-launchpad-icon" aria-hidden="true">'+safe(l[2])+'</span><strong>'+safe(l[1])+'</strong><span class="v12-launchpad-arrow" aria-hidden="true">↗</span></button>';
 }).join('')+'</div></section>';
}
function breadcrumb(role,route){
 var title=pages[lang()][route]||pages[lang()][(route||'').split('/')[0]]||tr('Workspace','مساحة العمل');
 return '<div class="v12-route-toolbar" aria-label="'+safe(tr('Current location','المسار الحالي'))+'">'+
 '<div class="v12-breadcrumb"><button type="button" data-nav="'+home[role]+'">'+safe(tr('Dashboard','الرئيسية'))+'</button><span aria-hidden="true">/</span><strong>'+safe(title)+'</strong></div>'+
 '<span class="v12-role-indicator"><i></i>'+safe(text[lang()][role].label)+'</span></div>';
}
function tables(portal){
 portal.querySelectorAll('.v7-table').forEach(function(table){
   if(table.parentElement&&table.parentElement.classList.contains('v12-table-scroll'))return;
   var box=document.createElement('div');
   box.className='v12-table-scroll';box.setAttribute('role','region');box.setAttribute('tabindex','0');
   box.setAttribute('aria-label',tr('Scrollable table','جدول قابل للتمرير'));
   table.parentNode.insertBefore(box,table);box.appendChild(table);
 });
}
function mount(){
 var portal=document.querySelector('#app .v7-portal');if(!portal)return;
 var role=getRole(portal),route=getRoute(),isHome=route===home[role];
 portal.classList.add('v12-portal');portal.dataset.v12Role=role;portal.dataset.v12Page=route;
 portal.classList.toggle('v12-is-home',isHome);
 var work=portal.querySelector('.v7-workarea'),top=work&&work.querySelector('.v7-app-top');if(!top)return;
 work.querySelectorAll('.v11-dashboard-hub,.v12-workspace-cover,.v12-route-toolbar,.v12-launchpad').forEach(function(el){el.remove()});
 var node=document.createElement('div');
 node.innerHTML=isHome?hero(role):breadcrumb(role,route);
 top.insertAdjacentElement('afterend',node.firstElementChild);
 if(isHome){
  var landing=work.querySelector('.v7-app-main,.v7-student-wrap');
  if(landing){node.innerHTML=links(role);landing.insertAdjacentElement('beforebegin',node.firstElementChild)}
 }
 var label=top.querySelector('.v7-label');if(label)label.title=text[lang()][role].label;
 tables(portal);
}
if(typeof render==='function'){
 var previous=render;
 render=function(){previous();mount()};
}
mount();
})();
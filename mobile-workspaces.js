
/* RAWNAK Academy mobile workspaces.
   Presentation only; never changes session, permissions, or account type. */
(function(){
  'use strict';
  var navigation={
    student:[['my-learning','Home','book'],['courses','Courses','search'],['classroom','Study','play'],['wallet','Rewards','gift']],
    instructor:[['instructor','Home','book'],['instructor-courses','Courses','play'],['instructor-students','Learners','trophy'],['instructor-earnings','Earnings','coin']],
    owner:[['owner','Home','book'],['owner-instructors','Educators','trophy'],['owner-courses','Courses','play'],['owner-analytics','Insights','zap']]
  };
  var shortcutMap={
    student:[['classroom','Continue learning','play'],['courses','Explore courses','search'],['book-library','Smart books','book'],['wallet','My rewards','gift']],
    instructor:[['instructor-courses','Manage courses','play'],['instructor-books','Smart books','book'],['instructor-question-bank','Question bank','note'],['instructor-qr-studio','QR Studio','spark']],
    owner:[['owner-instructors','Educator team','trophy'],['owner-courses','Course catalog','play'],['owner-analytics','Analytics','zap'],['owner-finance','Finance','coin']]
  };
  var extraRoutes={
    student:[['tools','Tools & notes','note'],['leaderboard','Challenges','trophy'],['student-settings','Settings','spark'],['book-library','Smart books','book']],
    instructor:[['instructor-books','Smart books','book'],['instructor-qr-studio','QR Studio','spark'],['instructor-question-bank','Question bank','note'],['instructor-settings','Settings','spark']],
    owner:[['owner-finance','Finance','coin'],['owner-books','Smart books','book'],['owner-settings','Settings','spark']]
  };
  var heroCopy={
    student:['STUDENT / YOUR LEARNING SPACE','Make progress, your way.','Pick up where you left off and build a learning habit that lasts.','Continue lesson','classroom','Explore courses','courses'],
    instructor:['EDUCATOR / TEACHING STUDIO','Teach with clarity.','A dedicated space for teachers, doctors, lecturers and professors.','Manage courses','instructor-courses','Question bank','instructor-question-bank'],
    owner:['OWNER / COMMAND CENTER','Everything in view.','Quick access to people, courses and academy operations.','View analytics','owner-analytics','Manage educators','owner-instructors']
  };
  function htmlEscape(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function glyph(name){try{return typeof icon==='function'?icon(name):'<span aria-hidden="true">•</span>'}catch(e){return '<span aria-hidden="true">•</span>'}}
  function canUse(route,role){try{return !!v7Valid(route,role)}catch(e){return false}}
  function renderShortcuts(role){
    return (shortcutMap[role]||[]).filter(function(item){return canUse(item[0],role)}).map(function(item){
      return '<button type="button" class="v9-shortcut" data-v9-route="'+htmlEscape(item[0])+'"><span class="v9-icon">'+glyph(item[2])+'</span><span>'+htmlEscape(item[1])+'</span></button>';
    }).join('');
  }
  function intro(role){
    var data=heroCopy[role],name='';
    try{name=String(v7GetProfile().name||'').trim().split(/\s+/)[0]}catch(e){}
    var hello=name?' · '+htmlEscape(name):'';
    return '<div class="v9-mobile-intro"><section class="v9-hero" aria-label="'+htmlEscape(role)+' mobile overview">'+
      '<div class="v9-eyebrow">'+data[0]+hello+'</div><h1>'+data[1]+'</h1><p>'+data[2]+'</p>'+
      '<div class="v9-hero-actions"><button data-v9-route="'+data[4]+'">'+data[3]+'</button><button class="v9-secondary" data-v9-route="'+data[6]+'">'+data[5]+'</button></div></section>'+
      '<div class="v9-quick-title"><strong>Quick access</strong><small>Made for your day</small></div>'+
      '<div class="v9-shortcuts">'+renderShortcuts(role)+'</div>'+
      '<p class="v9-preview-note">Interactive prototype · Sample data only. Real accounts, payments and reports require secure backend integration.</p></div>';
  }
  function mobileTab(entry,route){
    var active=entry[0]===route;
    return '<button type="button" class="v9-tab" data-v9-route="'+htmlEscape(entry[0])+'"'+(active?' aria-current="page"':'')+'>'+
       glyph(entry[2])+'<span>'+htmlEscape(entry[1])+'</span></button>';
  }
  function menuSheet(role,route){
    var list=(navigation[role]||[]).concat(extraRoutes[role]||[]).filter(function(item){return canUse(item[0],role)});
    var menu=list.map(function(item){
      return '<button type="button" data-v9-route="'+htmlEscape(item[0])+'"'+(route===item[0]?' aria-current="page"':'')+'>'+glyph(item[2])+'<span>'+htmlEscape(item[1])+'</span></button>';
    }).join('');
    return '<div class="v9-menu-overlay" data-v9-overlay hidden><section class="v9-menu-sheet" role="dialog" aria-modal="true" aria-label="Workspace navigation">'+
      '<div class="v9-sheet-head"><strong>Your workspace</strong><button type="button" data-v9-close aria-label="Close menu">×</button></div>'+
      '<nav class="v9-sheet-grid" aria-label="All workspace sections">'+menu+'</nav>'+
      '<div class="v9-sheet-footer"><span>RAWNAK ACADEMY · DEMO</span><button type="button" data-action="v7Logout">Sign out</button></div>'+
      '</section></div>';
  }
  function mount(){
    var portal=document.querySelector('#app .v7-portal');
    if(!portal||typeof v7role!=='function')return;
    var role=v7role();
    if(!navigation[role])return;
    var route=activeRoute();
    var top=portal.querySelector('.v7-app-top');
    if(!top)return;
    var roleLabel=top.querySelector('.v7-label');
    if(role==='instructor'&&roleLabel)roleLabel.textContent='RAWNAK ACADEMY / EDUCATOR';
    var existingBadge=portal.querySelector('.v7-role-badge small');
    if(role==='instructor'&&existingBadge)existingBadge.textContent='EDUCATOR / STUDIO';
    if(role==='owner'){
      var ownerHeading=top.querySelector('strong');
      if(ownerHeading&&route==='owner-instructors')ownerHeading.textContent='EDUCATORS';
      portal.querySelectorAll('.v7-sideitem').forEach(function(item){
        if(item.dataset.nav==='owner-instructors')item.innerHTML=glyph('trophy')+' Educators';
      });
    }
    if(route===({student:'my-learning',instructor:'instructor',owner:'owner'})[role])top.insertAdjacentHTML('afterend',intro(role));
    var items=navigation[role].filter(function(item){return canUse(item[0],role)});
    var nav='<nav class="v9-bottom-nav" aria-label="'+role+' mobile navigation">'+items.map(function(item){return mobileTab(item,route)}).join('')+
      '<button type="button" class="v9-tab" data-v9-more aria-label="More workspace options" aria-expanded="false">'+glyph('menu')+'<span>More</span></button></nav>';
    portal.insertAdjacentHTML('beforeend',nav+menuSheet(role,route));
  }
  function closeMenu(){
    var panel=document.querySelector('.v9-menu-overlay');
    if(panel){panel.hidden=true;var trigger=document.querySelector('[data-v9-more]');if(trigger)trigger.setAttribute('aria-expanded','false')}
  }
  var baseRender=typeof render==='function'?render:null;
  if(baseRender){
    render=function(){baseRender();mount()};
    mount();
  }
  document.addEventListener('click',function(event){
    var routeButton=event.target.closest('[data-v9-route]');
    if(routeButton){
      var role=typeof v7role==='function'?v7role():null;
      var route=routeButton.getAttribute('data-v9-route');
      if(!role||!canUse(route,role))return;
      closeMenu();
      navigate(route);
      return;
    }
    var more=event.target.closest('[data-v9-more]');
    if(more){
      var overlay=document.querySelector('.v9-menu-overlay');
      if(overlay){overlay.hidden=false;more.setAttribute('aria-expanded','true');overlay.querySelector('[data-v9-close]')?.focus()}
      return;
    }
    if(event.target.closest('[data-v9-close]')||event.target.matches('[data-v9-overlay]')){closeMenu();document.querySelector('[data-v9-more]')?.focus()}
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'){var overlay=document.querySelector('.v9-menu-overlay');if(overlay&&!overlay.hidden){closeMenu();document.querySelector('[data-v9-more]')?.focus()}}
  });
  window.addEventListener('resize',function(){if(window.innerWidth>820)closeMenu()},{passive:true});
})();

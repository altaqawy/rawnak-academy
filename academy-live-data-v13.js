/* RAWNAK Academy V13 — real-data-only dashboards.
   No fabricated learner, revenue, course, conversion or payout statistics.
   Existing draft editors and account/session permissions remain unchanged. */
(function(){
'use strict';
const ar=()=>document.documentElement.lang==='ar';
const t=(en,arabic)=>ar()?arabic:en;
function empty(icon,title,description,go,label){
  return '<section class="v13-data-empty" aria-label="'+title+'">'+
    '<span class="v13-data-icon" aria-hidden="true">'+icon+'</span>'+
    '<div><h2>'+title+'</h2><p>'+description+'</p>'+
    (go?'<button type="button" class="btn outline" data-nav="'+go+'">'+label+' ↗</button>':'')+
    '</div></section>';
}
const noStats=()=>'<div class="v13-system-status"><span class="v13-status-dot"></span>'+t('Awaiting verified data connection','بانتظار ربط بيانات موثّقة')+'</div>';
const warn=()=>'<div class="v7-demo-ribbon v13-data-notice">'+t('Data is not connected to a secure backend. No simulated figures are displayed.','البيانات مش متصلة بقاعدة بيانات آمنة، ومفيش أرقام تجريبية معروضة.')+'</div>';
function shell(role,label,title,description,inner){
 return '<main class="v7-app-main v13-data-page" data-v13-role="'+role+'">'+
   '<div class="v7-app-intro"><div><span class="v7-eyebrow">'+label+'</span><h1>'+title+'</h1><p>'+description+'</p></div>'+noStats()+'</div>'+warn()+inner+'</main>';
}
function metrics(items){
 return '<section class="v13-connection-grid">'+items.map(entry=>
   '<article class="v13-connection-card"><span class="v13-connection-mark" aria-hidden="true">'+entry[0]+'</span>'+
   '<h3>'+entry[1]+'</h3><strong>—</strong><small>'+entry[2]+'</small></article>').join('')+'</section>';
}
function instructorHome(){
 return shell('instructor',t('EDUCATOR STUDIO','استوديو عضو هيئة التدريس'),t('Your teaching studio.','استوديو التدريس بتاعك.'),t('Manage your teaching tools and prepare for real student enrollments.','جهز محتواك وأدوات التدريس لحد تفعيل اشتراكات الطلاب الحقيقية.'),
  metrics([
   ['✳',t('Published courses','الكورسات المنشورة'),t('No published data connected','لم يتم ربط بيانات النشر')],
   ['↗',t('Enrolled students','الطلاب المشتركين'),t('Enrollment database not connected','لم يتم ربط قاعدة الاشتراكات')],
   ['▥',t('Course progress','تقدّم الطلاب'),t('Learning activity not connected','نشاط التعلّم غير متصل')],
   ['✦',t('Earnings','الأرباح'),t('Payment reporting not connected','التقارير المالية غير متصلة')]
  ])+
  empty('✳',t('Ready to build your courses','ابدأ تجهيز كورساتك'),t('Manage your drafts and question bank here. Course publishing will need a real content backend.','جهز مسوداتك وبنك الأسئلة، والنشر الفعلي هيحتاج ربط نظام محتوى آمن.'),
  'instructor-courses',t('Open course studio','افتح استوديو الكورسات')));
}
function ownerHome(){
 return shell('owner',t('ACADEMY CONTROL CENTER','مركز إدارة الأكاديمية'),t('Your academy overview.','نظرة شاملة على الأكاديمية.'),t('An honest view of integrations and content operations, not placeholder business figures.','متابعة حقيقية لحالة التشغيل والمحتوى من غير أرقام مالية أو إحصاءات وهمية.'),
  metrics([
   ['✳',t('Verified students','الطلاب المؤكدون'),t('Identity system not connected','نظام الحسابات غير متصل')],
   ['↗',t('Published courses','الكورسات المنشورة'),t('Catalog backend not connected','قاعدة بيانات الكورسات غير متصلة')],
   ['▥',t('Live analytics','التحليلات الفعلية'),t('Event tracking not connected','تتبّع الأحداث غير متصل')],
   ['✦',t('Financial reporting','التقارير المالية'),t('Payment ledger not connected','سجل المدفوعات غير متصل')]
  ])+
  '<div class="v13-next-steps"><h2>'+t('Build the foundations','جهّز الأساسيات')+'</h2><div class="v13-action-links">'+
    '<button type="button" class="btn outline" data-nav="owner-instructors">'+t('Educator drafts','مسودات أعضاء هيئة التدريس')+' ↗</button>'+
    '<button type="button" class="btn outline" data-nav="owner-courses">'+t('Course drafts','مسودات الكورسات')+' ↗</button>'+
    '<button type="button" class="btn outline" data-nav="owner-books">'+t('Smart books','الكتب الذكية')+' ↗</button></div>'+
    '<p>'+t('Your manually saved local drafts are preserved, but they are not verified published records.','المسودات اللي سجلتها بنفسك محفوظة محليًا لكنها مش سجلات منشورة أو موثّقة.')+'</p></div>');
}
function instructorStudents(){
 return shell('instructor',t('EDUCATOR / LEARNERS','عضو هيئة التدريس / الطلاب'),t('Student insights.','متابعة الطلاب.'),t('Your enrolled students will appear once verified accounts and enrollments are connected.','الطلاب المشتركين هيظهروا بعد ربط الحسابات والاشتراكات الحقيقية.'),
 empty('◎',t('No student records connected','مفيش سجلات طلاب متصلة'),t('Live attendance, feedback, grades and progress are not available yet.','الحضور والتقييمات والدرجات والتقدم الحقيقي مش متاحين حاليًا.')));
}
function instructorEarnings(){
 return shell('instructor',t('EDUCATOR / FINANCE','عضو هيئة التدريس / المالية'),t('Course earnings.','أرباح الكورسات.'),t('Verified sales and payouts will appear once the Academy connects a payment provider and ledger.','المبيعات والمستحقات المؤكدة هتظهر بعد ربط بوابة الدفع وسجل مالي موثوق.'),
 empty('✦',t('No financial ledger connected','السجل المالي غير متصل'),t('No revenue, commission, payment or payout figures are being estimated.','مش بنعرض أي تقديرات وهمية للإيراد أو العمولة أو المدفوعات.')));
}
function ownerAnalytics(){
 return shell('owner',t('OWNER / ANALYTICS','المالك / التحليلات'),t('Real insights start with real events.','التحليلات الحقيقية محتاجة بيانات حقيقية.'),t('Website traffic, conversions and retention need verified measurement and consent-aware tracking.','الزيارات والتحويل والاحتفاظ محتاجين ربط قياس فعلي يحترم الخصوصية.'),
 empty('↗',t('Analytics is not yet connected','التحليلات لسه غير متصلة'),t('No simulated visits, conversion rates, retention or paid enrollments are shown.','مش بنعرض زيارات أو نسب تحويل أو احتفاظ أو اشتراكات مدفوعة وهمية.')));
}
function ownerFinance(){
 return shell('owner',t('OWNER / FINANCE','المالك / المالية'),t('Verified financial reporting.','تقارير مالية موثّقة.'),t('Only payment-provider records and approved settlements belong in this section.','القسم ده هيعرض سجلات بوابة الدفع والتسويات المعتمدة فقط.'),
 empty('✦',t('No payments or payouts connected','مفيش مدفوعات أو مستحقات متصلة'),t('Gross revenue, refunds and net earnings stay unavailable until a verified ledger exists.','الإيرادات والاسترداد وصافي الأرباح هتفضل غير متاحة لحد وجود سجل مالي موثوق.')));
}
function apply(){
 if(typeof v7Pages==='undefined')return;
 v7Pages.instructor=instructorHome;
 v7Pages['instructor-students']=instructorStudents;
 v7Pages['instructor-earnings']=instructorEarnings;
 v7Pages.owner=ownerHome;
 v7Pages['owner-analytics']=ownerAnalytics;
 v7Pages['owner-finance']=ownerFinance;
}
// Guard data-derived features not backed by a real course or entitlement system.
apply();
if(typeof render==='function'){
 const previous=render;
 render=function(){apply();previous()};
}
// Existing local drafts remain user-editable. No background fake records are generated.
})();

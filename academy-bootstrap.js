try{var _rawnakLang=localStorage.getItem("rawnak-academy-language");document.documentElement.lang=_rawnakLang==="en"?"en":"ar";document.documentElement.dir=_rawnakLang==="en"?"ltr":"rtl";}catch(e){document.documentElement.lang="ar";document.documentElement.dir="rtl"}
if(!location.hash)location.hash="#/welcome"

try{var _rawnakMotion=JSON.parse(localStorage.getItem("rawnak_academy_v3_v4Motion")||'"expressive"');if(_rawnakMotion==="off")document.documentElement.dataset.motion="off"}catch(e){}

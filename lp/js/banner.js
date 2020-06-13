let path = window.cdn_path;

var names = {}
var xhr = new XMLHttpRequest();
xhr.open('GET', '//179523.selcdn.ru/public/delivery-banner/lang.json', false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText ); 
} else {
  names = xhr.responseText;
}
let json = JSON.parse(names);

let mainDocLang = 'de'; // язык

$('.main-banner p').css('display', 'none');
$('body').addClass('body-banner');
if(window.language) {
    addBanner(window.language);
} else {
    addBanner(mainDocLang);
}

function addBanner(wLang) {
    var ban = document.createElement('div'),
        body = document.querySelector('body');
    ban.classList.add('main-banner');
    let bannerList = '', langLength = json.languages.length, count = 0;

    for (let i=0;i<langLength;i++) {
            if(wLang == json.languages[i].lang) {
            bannerList+="<p class='"+json.languages[i].lang+"'><b>"+json.languages[i].lang_text_b+" <span class='delete_mob'>"+json.languages[i].lang_text_del+"</span></b><span class='ban-small'>"+json.languages[i].lang_text+"</span></p>";
            count++;
        }
    }

    if (count == 0) {
        bannerList+="<p class='"+json.languages[4].lang+"'><b>"+json.languages[4].lang_text_b+" <span class='delete_mob'>"+json.languages[4].lang_text_del+"</span></b><span class='ban-small'>"+json.languages[4].lang_text+"</span></p>";
    }

    ban.innerHTML = '<div class="fixed-el" style="width: 1px; height: 1px; opacity: 0; position: fixed; top: 0; left: 0;"></div><img src="//179523.selcdn.ru/public/delivery-banner/banner-icon-1.png" alt="icon">'+bannerList+'';
    body.appendChild(ban);
}


function addBannerStyle() {
    var cont = document.createElement('style'),
        head = document.querySelector('head');
    cont.innerHTML = '.main-banner img{max-width:61px;max-height:49px;margin:0!important}.main-banner{box-sizing:border-box;position:fixed;top:0;left:0;width:100vw;display:flex;justify-content:center;align-items:center;padding:0;background-color:#e30c0c;background-image:url(//179523.selcdn.ru/public/delivery-banner/banner-bg.png);background-repeat:no-repeat;background-size:cover;background-position:center;z-index:97;padding:10px}.main-banner.banner-bottom{top:auto;bottom:0}.main-banner p{margin-top:0!important;margin-bottom:0!important;font-family:Roboto,sans-serif;color:#fff!important;margin-left:20px;text-align:center}.main-banner p b{color:#fff;display:block;font-size:19px;font-weight:700;margin-bottom:5px}.main-banner p .ban-small{color:#fff;display:block;font-size:17px;line-height:1.2;font-weight:400}@media screen and (max-width:1219px){.main-banner img{max-width:50px;max-height:40px}.main-banner p{max-width:920px}}@media screen and (max-width:1023px){.main-banner .delete_mob{display:none}.main-banner p{max-width:500px}.main-banner p b{font-size:16px}.main-banner p .ban-small{font-size:15px}}@media screen and (max-width:767px){.main-banner p{max-width:420px}.main-banner p b{font-size:15px}.main-banner p .ban-small{font-size:14px}}@media screen and (max-width:639px){.main-banner img{max-width:35px;max-height:30px}.main-banner p{margin-left:10px}}@media screen and (max-width:479px){.main-banner img{max-width:50px;max-height:100%}.main-banner p{max-width:250px;line-height:1.1}.main-banner p b{line-height:18px;font-size:13px;margin-bottom:2px}.main-banner p .ban-small{line-height:17px;font-size:12px}}@media screen and (max-width:370px){.main-banner img{max-width:35px}}.main-banner p span{color:#fff!important}.main-banner *{box-sizing:border-box}';
    head.appendChild(cont);
}
$(document).ready(addBannerStyle);

let counter = 0;

$(document).on('scroll', function () {

    if (($('.fixed-el').offset().top > 100) && counter===0) {
        $('.main-banner').addClass('banner-bottom');
        counter = 1;
    } else if ($('.fixed-el').offset().top <= 100){
        $('.main-banner').removeClass('banner-bottom');
        counter = 0; 
    }  
    
});

function resizeHeight() {
    let mainHeight = $('.main-banner').css('height'),
    mTop = mainHeight + '!important',
    mBottom = mainHeight + '!important';

    $('body.body-banner').attr('style', 'margin-top: ' + mTop + '; margin-bottom: ' + mBottom);
}

$(document).ready(resizeHeight);
window.addEventListener('resize', resizeHeight);

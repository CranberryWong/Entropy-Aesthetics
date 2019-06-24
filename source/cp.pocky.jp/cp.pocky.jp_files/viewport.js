// JavaScript Document
// iPhoneまたは、Androidの場合は振り分けを判断
if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
		//スマホ表示
		footerNaviSmp();
		}else{
		//PC表示
		footerNaviPC();
}

//PCの場合
function footerNaviPC(){
	document.write('<meta name="viewport" content="width=1080" />');
}

//スマートフォンの場合
function footerNaviSmp(){
	document.write('<meta name="viewport" content="width=640" />');

}
// iPhone/Androidスマホの場合は振り分けを判断

if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
	smpModeSet();
}


/*スマートフォン表示用ソース部分*/
function smpModeSet(){
	document.write(' <link rel="stylesheet" href="sp_index.css" type="text/css" /> ');
	document.write('<link href="../common/css16/common_sp.css" rel="stylesheet" type="text/css"/>');
}

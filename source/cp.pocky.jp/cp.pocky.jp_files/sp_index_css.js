// iPhone/Android�X�}�z�̏ꍇ�͐U�蕪���𔻒f

if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
	smpModeSet();
}


/*�X�}�[�g�t�H���\���p�\�[�X����*/
function smpModeSet(){
	document.write(' <link rel="stylesheet" href="sp_index.css" type="text/css" /> ');
	document.write('<link href="../common/css16/common_sp.css" rel="stylesheet" type="text/css"/>');
}

// JavaScript Document
// iPhone�܂��́AAndroid�̏ꍇ�͐U�蕪���𔻒f
if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
		//�X�}�z�\��
		footerNaviSmp();
		}else{
		//PC�\��
		footerNaviPC();
}

//PC�̏ꍇ
function footerNaviPC(){
	document.write('<meta name="viewport" content="width=1080" />');
}

//�X�}�[�g�t�H���̏ꍇ
function footerNaviSmp(){
	document.write('<meta name="viewport" content="width=640" />');

}
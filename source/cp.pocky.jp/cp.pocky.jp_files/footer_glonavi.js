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
document.write('\
<div id="footer_glonavi" class="gloval__footer" role="contentinfo">\
	<div id="footer__socials">\
	<dt class="footer__socials-title">�O���R����̍ŐV�����󂯎��</dt>\
	<dd class="footer__socials-body">\
		<ul class="footer__socials-list">\
			<li class="footer__socials-item"><a class="footer__socials-trigger" href="https://www.facebook.com/GlicoGlobal" target="_blank"><img src="/common/template/images/btn_social_01.png" class="footer__socials-image" alt="Facebook"></a></li>\
			<li class="footer__socials-item"><a class="footer__socials-trigger" href="https://twitter.com/GlicoPRJP" target="_blank"><img src="/common/template/images/btn_social_02.png" class="footer__socials-image" alt="Twitter"></a></li>\
			<li class="footer__socials-item"><a class="footer__socials-trigger" href="https://www.youtube.com/user/glicowebnet" target="_blank"><img src="/common/template/images/btn_social_03.png" class="footer__socials-image" alt="Youtube"></a></li>\
		</ul>\
	</dd>\
	</div>\
	<div class="footer__main">\
		<ul class="footer__nav">\
			<li class="footer__item"><a href="https://www.glico.com/" class="footer__link">�O���R�z�[��</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/customer/" class="footer__link">���₢���킹</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/termsofuse" class="footer__link">�����p�K��</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/privacypolicy" class="footer__link">�v���C�o�V�[�|���V�[</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/socialmediapolicy" class="footer__link">�\�[�V�������f�B�A�|���V�[</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/sitemap" class="footer__link">�T�C�g�}�b�v</a></li>\
		</ul>\
		<p class="footer__copyright"><small><span class="footer__section">�]��O���R������� Copyright&copy;2018</span> <span class="footer__section">EZAKI GLICO CO.,LTD. All rights reserved.</span></small></p>\
	</div>\
</div>\
');
}

//�X�}�[�g�t�H���̏ꍇ
function footerNaviSmp(){
		document.write('\
<div id="smp_footer_glonavi" class="smp_gloval__footer" role="contentinfo">\
	<div id="footer__socials">\
	<dt class="footer__socials-title">�O���R����̍ŐV�����󂯎��</dt>\
	<dd class="footer__socials-body">\
		<ul class="footer__socials-list">\
			<li class="footer__socials-item"><a class="footer__socials-trigger" href="https://www.facebook.com/GlicoGlobal" target="_blank"><img src="/common/template/images/btn_social_01.png" class="footer__socials-image" alt="Facebook"></a></li>\
			<li class="footer__socials-item"><a class="footer__socials-trigger" href="https://twitter.com/GlicoPRJP" target="_blank"><img src="/common/template/images/btn_social_02.png" class="footer__socials-image" alt="Twitter"></a></li>\
			<li class="footer__socials-item"><a class="footer__socials-trigger" href="https://www.youtube.com/user/glicowebnet" target="_blank"><img src="/common/template/images/btn_social_03.png" class="footer__socials-image" alt="Youtube"></a></li>\
		</ul>\
	</dd>\
	</div>\
	<div class="footer__main">\
		<ul class="footer__nav">\
			<li class="footer__item"><a href="https://www.glico.com/" class="footer__link">�O���R�z�[��</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/customer/" class="footer__link">���₢���킹</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/termsofuse" class="footer__link">�����p�K��</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/privacypolicy" class="footer__link">�v���C�o�V�[�|���V�[</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/socialmediapolicy" class="footer__link">�\�[�V�������f�B�A�|���V�[</a></li>\
			<li class="footer__item"><a href="https://www.glico.com/jp/sitemap" class="footer__link">�T�C�g�}�b�v</a></li>\
		</ul>\
		<p class="footer__copyright"><small><span class="footer__section">�]��O���R������� Copyright&copy;2018</span> <span class="footer__section">EZAKI GLICO CO.,LTD. All rights reserved.</span></small></p>\
	</div>\
</div>\
');
}

// Google Tag Manager //
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MZHC7C');
// Google Tag Manager //


// JavaScript Document
if(typeof jQuery == "undefined"){
	var xhr = null;
	if (window.XMLHttpRequest)xhr = new XMLHttpRequest();
	xhr.open("GET","/common/template/js/jquery.js",false);
	xhr.send();
	eval(xhr.responseText);
}
var brandcatLIST = '';
var brandsiteHTML;
var brandsiteLIST = '\
		<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/bslist_pocky.png" alt="�|�b�L�["></a></li>\
		<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/bslist_peak.png" alt="�A�[�����h�s�[�N"></a></li>\
		<li><a href="http://www.glico.co.jp/vanhoutenchoco/index.html"><img src="/common/brandsite_navi/images/bslist_vanhouten.png" alt="�o���z�[�e���`���R���[�g"></a></li>\
		<li><a href="http://www.glico.co.jp/bitte/index.html"><img src="/common/brandsite_navi/images/bslist_bitte.png" alt="Bitte �m�r�b�e�n"></a></li>\
		<li><a href="http://www.glico.co.jp/hobal/index.html"><img src="/common/brandsite_navi/images/bslist_hobal.png" alt="HOBAL �m�z�[�o���n"></a></li>\
		<li><a href="http://www.glico.co.jp/caplico/index.html"><img src="/common/brandsite_navi/images/bslist_caplico.png" alt="�W���C�A���g�J�v���R"></a></li>\
		<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/bslist_pretz.png" alt="PRETZ �m�v���b�c�n"></a></li>\
		<li><a href="http://www.glico.co.jp/cheeza/index.html"><img src="/common/brandsite_navi/images/bslist_cheeza.png" alt="Cheeza�m�`�[�U�n"></a></li>\
		<li><a href="http://www.glico.co.jp/bisco/index.html"><img src="/common/brandsite_navi/images/bslist_bisco.png" alt="�r�X�R"></a></li>\
		<li><a href="http://www.glico.co.jp/posca/index.html"><img src="/common/brandsite_navi/images/bslist_posca.png" alt="POs-Ca�m�|�X�J�n"></a></li>\
		<li><a href="http://www.glico.co.jp/posca_f/index.html"><img src="/common/brandsite_navi/images/bslist_posca_f.png" alt="�|�X�JF"></a></li>\
		<li><a href="http://cp.glico.jp/asobiglico/index.html"><img src="/common/brandsite_navi/images/bslist_asobiglico.png" alt="�A�\�r�O���R"></a></li>\
		<li><a href="http://www.glico.co.jp/ice/giant/index.html"><img src="/common/brandsite_navi/images/bslist_giant.png" alt="�W���C�A���g�R�[��"></a></li>\
		<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/bslist_papico.png" alt="PAPICO �m�p�s�R�n"></a></li>\
		<li><a href="http://www.glico.co.jp/ice/icenomi/index.html"><img src="/common/brandsite_navi/images/bslist_icenomi.png" alt="�A�C�X�̎�"></a></li>\
		<li><a href="http://www.glico.co.jp/ice/panapp/index.html"><img src="/common/brandsite_navi/images/bslist_panapp.png" alt="Panapp�m�p�i�b�v�n"></a></li>\
		<li><a href="http://cp.glico.jp/bokujoshibori/index.html"><img src="/common/brandsite_navi/images/bslist_bokujo.png" alt="�q�ꂵ�ڂ�"></a></li>\
		<li><a href="http://cp.glico.jp/sunao/index.html"><img src="/common/brandsite_navi/images/bslist_sunao.png" alt="SUNAO"></a></li>\
		<li><a href="http://cp.glico.jp/17ice/"><img src="/common/brandsite_navi/images/bslist_17ice.png" alt="seventeen ice"></a></li>\
		<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/bslist_pucchin.png" alt="�v�b�`���v����"></a></li>\
		<li><a href="http://web.bifix.jp/index.html"><img src="/common/brandsite_navi/images/bslist_bifix.png" alt="���H�r�t�B�b�N�X�V���[�Y"></a></li>\
		<li><a href="http://net.glico.jp/ringo-y/index.html"><img src="/common/brandsite_navi/images/bslist_ringo-y.png" alt="���H��񂲃��[�O���g"></a></li>\
		<li><a href="http://net.glico.jp/y-kenko/index.html"><img src="/common/brandsite_navi/images/bslist_y-kenko.png" alt="���[�O���g���N"></a></li>\
		<li><a href="http://cp.glico.jp/caspikai/index.html"><img src="/common/brandsite_navi/images/bslist_caspi.png" alt="���������J�X�s�C ���I����100%"></a></li>\
		<li><a href="http://www.cafeore.jp/info/index.html"><img src="/common/brandsite_navi/images/bslist_cafeole.png" alt="�J�t�F�I�[��"></a></li>\
		<li><a href="http://www.glico-youji.jp/top.html"><img src="/common/brandsite_navi/images/bslist_youji.png" alt="�c���݂̂���"></a></li>\
		<li><a href="http://cp.glico.jp/almond-k/index.html"><img src="/common/brandsite_navi/images/bslist_almondkouka.png" alt="�A�[�����h����"></a></li>\
		<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/bslist_jukucurry.png" alt="�v���~�A���n�J���["></a></li>\
		<li><a href="http://www.glico.co.jp/zeppin/index.html"><img src="/common/brandsite_navi/images/bslist_zeppin.png" alt="�J���[ZEPPIN"></a></li>\
		<li><a href="http://cp.glico.jp/crea/index.html"><img src="/common/brandsite_navi/images/bslist_crea.png" alt="�N���A���΂���̃V�`���["></a></li>\
		<li><a href="http://cp.glico.jp/gochiuma-cp/index.html"><img src="/common/brandsite_navi/images/bslist_gochi.png" alt="��������"></a></li>\
		<li><a href="http://cp.glico.jp/dekitate/index.html"><img src="/common/brandsite_navi/images/bslist_dekitatekakumei.png" alt="�ł����Ċv��"></a></li>\
		<li><a href="http://www.powerproduction.jp/"><img src="/common/brandsite_navi/images/bslist_pwr_pro.png" alt="�p���[�v���_�N�V����"></a></li>\
		<li><a href="http://www.glico.co.jp/batondor/index.html"><img src="/common/brandsite_navi/images/bslist_batondor.png" alt="�o�g���h�[��"></a></li>\
	';

// iPhone�܂��́AAndroid�̏ꍇ�͐U�蕪���𔻒f

function brandNavSet(cat) {
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)) {
			//�X�}�z�\��
			brandNaviSmp();
		}else{
			//PC�\��
			brandNaviPC(cat);
	}
	document.write(brandsiteHTML);
}

//PC�̏ꍇ
function brandNaviPC(cat){
	switch(cat) {
		case 'choco':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/clist_pocky.png" alt="�|�b�L�["></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="�A�[�����h�s�[�N"></a></li>\
					<li><a href="http://www.glico.co.jp/vanhoutenchoco/index.html"><img src="/common/brandsite_navi/images/clist_vanhouten.png" alt="�o���z�[�e���`���R���[�g"></a></li>\
					<li><a href="http://www.glico.co.jp/bitte/index.html"><img src="/common/brandsite_navi/images/clist_bitte.png" alt="Bitte �m�r�b�e�n"></a></li>\
					<li><a href="http://www.glico.co.jp/hobal/index.html"><img src="/common/brandsite_navi/images/clist_hobal.png" alt="HOBAL �m�z�[�o���n"></a></li>\
					<li><a href="http://www.glico.co.jp/caplico/index.html"><img src="/common/brandsite_navi/images/clist_caplico.png" alt="�J�v���R"></a></li>\
				</ul>\
			';
			break;
		case 'ice':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.glico.co.jp/ice/giant/index.html"><img src="/common/brandsite_navi/images/clist_giant.png" alt="�W���C�A���g�R�[��"></a></li>\
					<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/clist_papico.png" alt="�p�s�R"></a></li>\
					<li><a href="http://www.glico.co.jp/ice/icenomi/index.html"><img src="/common/brandsite_navi/images/clist_icenomi.png" alt="�A�C�X�̎�"></a></li>\
					<li><a href="http://www.glico.co.jp/ice/panapp/index.html"><img src="/common/brandsite_navi/images/clist_panapp.png" alt="�p�i�b�v"></a></li>\
					<li><a href="http://cp.glico.jp/bokujoshibori/index.html"><img src="/common/brandsite_navi/images/clist_bokujo.png" alt="�q�ꂵ�ڂ�"></a></li>\
					<li><a href="http://cp.glico.jp/sunao/index.html"><img src="/common/brandsite_navi/images/clist_sunao.png" alt="SUNAO"></a></li>\
				</ul>\
			';
			break;
		case 'snack':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/clist_pretz.png" alt="�v���b�c"></a></li>\
					<li><a href="http://www.glico.co.jp/cheeza/index.html"><img src="/common/brandsite_navi/images/clist_cheeza.png" alt="�`�[�U"></a></li>\
					<li><a href="http://www.glico.co.jp/bisco/index.html"><img src="/common/brandsite_navi/images/clist_bisco.png" alt="�r�X�R"></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="�A�[�����h�s�[�N"></a></li>\
					<li><a href="http://cp.glico.jp/asobiglico/index.html"><img src="/common/brandsite_navi/images/clist_asobiglico.png" alt="�A�\�r�O���R"></a></li>\
					<li><a href="http://www.glico.co.jp/posca/index.html"><img src="/common/brandsite_navi/images/clist_posca.png" alt="�|�X�J"></a></li>\
				</ul>\
			';
			break;
		case 'food':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/clist_jukucurry.png" alt="�v���~�A���n�J���["></a></li>\
					<li><a href="http://www.glico.co.jp/zeppin/index.html"><img src="/common/brandsite_navi/images/clist_zeppin.png" alt="�J���[ZEPPIN"></a></li>\
					<li><a href="http://cp.glico.jp/crea/index.html"><img src="/common/brandsite_navi/images/clist_crea.png" alt="�N���A���΂���̃V�`���["></a></li>\
					<li><a href="http://cp.glico.jp/gochiuma-cp/index.html"><img src="/common/brandsite_navi/images/clist_gochiuma.png" alt="��������"></a></li>\
					<li><a href="http://cp.glico.jp/dekitate/index.html"><img src="/common/brandsite_navi/images/clist_dekitatekakumei.png" alt="�ł����Ċv��"></a></li>\
					<li><a href="http://cp.glico.jp/almond-k/index.html"><img src="/common/brandsite_navi/images/clist_almond-kouka.png" alt="�A�[�����h����"></a></li>\
				</ul>\
			';
			break;
		case 'dairy':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_pucchin.png" alt="�v�b�`���v����"></a></li>\
					<li><a href="http://web.bifix.jp/index.html"><img src="/common/brandsite_navi/images/clist_bifix.png" alt="���H�r�t�B�b�N�X�V���[�Y"></a></li>\
					<li><a href="http://net.glico.jp/ringo-y/index.html"><img src="/common/brandsite_navi/images/clist_ringo-y.png" alt="���H��񂲃��[�O���g"></a></li>\
					<li><a href="http://net.glico.jp/y-kenko/index.html"><img src="/common/brandsite_navi/images/clist_y-kenko.png" alt="���[�O���g���N"></a></li>\
					<li><a href="http://www.cafeore.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_cafeole.png" alt="�J�t�F�I�[��"></a></li>\
					<li><a href="http://www.glico-youji.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_youji.png" alt="�c���݂̂���"></a></li>\
				</ul>\
			';
			break;
		case 'hughug':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/clist_pocky.png" alt="�|�b�L�["></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="�A�[�����h�s�[�N"></a></li>\
					<li><a href="http://www.glico.co.jp/caplico/index.html"><img src="/common/brandsite_navi/images/clist_caplico.png" alt="�J�v���R"></a></li>\
					<li><a href="http://www.glico.co.jp/cheeza/index.html"><img src="/common/brandsite_navi/images/clist_cheeza.png" alt="�`�[�U"></a></li>\
					<li><a href="http://www.glico.co.jp/bisco/index.html"><img src="/common/brandsite_navi/images/clist_bisco.png" alt="�r�X�R"></a></li>\
					<li><a href="http://cp.glico.jp/asobiglico/index.html"><img src="/common/brandsite_navi/images/clist_asobiglico.png" alt="�A�\�r�O���R"></a></li>\
				</ul>\
				<ul class="second">\
					<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/clist_pretz.png" alt="�v���b�c"></a></li>\
					<li><a href="http://www.glico.co.jp/ice/giant/index.html"><img src="/common/brandsite_navi/images/clist_giant.png" alt="�W���C�A���g�R�[��"></a></li>\
					<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/clist_papico.png" alt="�p�s�R"></a></li>\
					<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_pucchin.png" alt="�v�b�`���v����"></a></li>\
					<li><a href="http://www.cafeore.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_cafeole.png" alt="�J�t�F�I�[��"></a></li>\
					<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/clist_jukucurry.png" alt="�v���~�A���n�J���["></a></li>\
				</ul>\
			';
			break;
		case 'health':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://cp.glico.jp/almond-k/index.html"><img src="/common/brandsite_navi/images/clist_almond-kouka.png" alt="�A�[�����h����"></a></li>\
					<li><a href="http://cp.glico.jp/sunao/index.html"><img src="/common/brandsite_navi/images/clist_sunao.png" alt="SUNAO"></a></li>\
					<li><a href="http://web.bifix.jp/index.html"><img src="/common/brandsite_navi/images/clist_bifix.png" alt="���H�r�t�B�b�N�X�V���[�Y"></a></li>\
					<li><a href="http://www.powerproduction.jp/"><img src="/common/brandsite_navi/images/clist_pwr_pro.png" alt="�p���[�v���_�N�V����"></a></li>\
					<li><a href="http://www.glico.co.jp/posca/index.html"><img src="/common/brandsite_navi/images/clist_posca.png" alt="�|�X�J"></a></li>\
					<li><a href="http://www.glico.co.jp/posca_f/index.html"><img src="/common/brandsite_navi/images/clist_poscaf.png" alt="�|�X�JF"></a></li>\
				</ul>\
			';
			break;
		case 'main':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/clist_pocky.png" alt="�|�b�L�["></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="�A�[�����h�s�[�N"></a></li>\
					<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/clist_pretz.png" alt="�v���b�c"></a></li>\
					<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/clist_papico.png" alt="�p�s�R"></a></li>\
					<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/clist_jukucurry.png" alt="�v���~�A���n�J���["></a></li>\
					<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_pucchin.png" alt="�v�b�`���v����"></a></li>\
				</ul>\
			';
			break;
	  default:
		    break;		
	}

	brandsiteHTML = '\
	<div id="brandsite_nav">\
		<div id="brandcat_list" class="brandcat_list-'+ cat +'">\
			<div class="branside_nav_header"><img src="/common/brandsite_navi/images/bsnav_logo_close.png" alt="�O���R �X�y�V�����u�����h�T�C�g" width="278" height="34"></div>\
			'+ brandcatLIST +'\
			<div id="brandsite_open">�u�����h�T�C�g�������ƌ���</div>\
		</div>\
		<div id="brandsite_list">\
			<div class="branside_nav_header"><img src="/common/brandsite_navi/images/bsnav_logo_open.png" alt="�O���R �X�y�V�����u�����h�T�C�g" width="278" height="34"></div>\
			<ul>\
			'+ brandsiteLIST +'\
			</ul>\
			<div id="brandsite_close">����</div>\
		</div>\
	</div>';

	$(function(){
		$('#brandsite_open').click(function(){
			$('#brandcat_list').hide();
			$('#brandsite_list').show();
		});
		
		$('#brandsite_close').click(function(){
			$('#brandsite_list').hide();
			$('#brandcat_list').show();
		});

		$('#brandcat_list li a img').hover(function(){
			$(this).attr('src', $(this).attr('src').replace(/(\.gif|\.jpg|\.png)/g,'_over$1'));
		}, function(){
			$(this).attr('src', $(this).attr('src').replace(/_over(\.gif|\.jpg|\.png)/g,'$1'));
		});

		var blists = $('#brandsite_list ul li');
		var deficit = blists.length % 6;
		if(!deficit == 0){
			deficit = 6 - deficit;
			for(i=0;i<deficit;i++) {
				$('#brandsite_list ul').append('<li><span><img src="/common/brandsite_navi/images/bslist_none.png" alt=""></span></li>');
			}
		}
	});
}

//�X�}�[�g�t�H���̏ꍇ
function brandNaviSmp(){
	brandsiteHTML = '\
	<div id="brandsite_nav-sp">\
		<div id="brandsite_open">�u�����h�T�C�g������</div>\
		<div id="brandsite_list">\
			<div class="branside_nav_header"><img src="/common/brandsite_navi/images/bsnav_logo_sp.png" alt="�O���R �X�y�V�����u�����h�T�C�g"></div>\
			<ul>\
			'+ brandsiteLIST +'\
			</ul>\
			<div id="brandsite_close">����</div>\
		</div>\
	</div>';

	$(function(){
		$('#brandsite_open').click(function(){
			$('#brandsite_open').hide();
			$('#brandsite_list').show();
		});
		
		$('#brandsite_close').click(function(){
			$('#brandsite_list').hide();
			$('#brandsite_open').show();
		});
		
		var blists = $('#brandsite_list ul li');
		var deficit = blists.length % 3;
		if(!deficit == 0){
			deficit = 3 - deficit;
			for(i=0;i<deficit;i++) {
				$('#brandsite_list ul').append('<li class="blist_blank"><img src="/common/brandsite_navi/images/bslist_none.png" alt=""></li>');
			}
		}
	});
}

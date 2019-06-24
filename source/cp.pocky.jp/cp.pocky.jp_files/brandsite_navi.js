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
		<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/bslist_pocky.png" alt="ポッキー"></a></li>\
		<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/bslist_peak.png" alt="アーモンドピーク"></a></li>\
		<li><a href="http://www.glico.co.jp/vanhoutenchoco/index.html"><img src="/common/brandsite_navi/images/bslist_vanhouten.png" alt="バンホーテンチョコレート"></a></li>\
		<li><a href="http://www.glico.co.jp/bitte/index.html"><img src="/common/brandsite_navi/images/bslist_bitte.png" alt="Bitte ［ビッテ］"></a></li>\
		<li><a href="http://www.glico.co.jp/hobal/index.html"><img src="/common/brandsite_navi/images/bslist_hobal.png" alt="HOBAL ［ホーバル］"></a></li>\
		<li><a href="http://www.glico.co.jp/caplico/index.html"><img src="/common/brandsite_navi/images/bslist_caplico.png" alt="ジャイアントカプリコ"></a></li>\
		<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/bslist_pretz.png" alt="PRETZ ［プリッツ］"></a></li>\
		<li><a href="http://www.glico.co.jp/cheeza/index.html"><img src="/common/brandsite_navi/images/bslist_cheeza.png" alt="Cheeza［チーザ］"></a></li>\
		<li><a href="http://www.glico.co.jp/bisco/index.html"><img src="/common/brandsite_navi/images/bslist_bisco.png" alt="ビスコ"></a></li>\
		<li><a href="http://www.glico.co.jp/posca/index.html"><img src="/common/brandsite_navi/images/bslist_posca.png" alt="POs-Ca［ポスカ］"></a></li>\
		<li><a href="http://www.glico.co.jp/posca_f/index.html"><img src="/common/brandsite_navi/images/bslist_posca_f.png" alt="ポスカF"></a></li>\
		<li><a href="http://cp.glico.jp/asobiglico/index.html"><img src="/common/brandsite_navi/images/bslist_asobiglico.png" alt="アソビグリコ"></a></li>\
		<li><a href="http://www.glico.co.jp/ice/giant/index.html"><img src="/common/brandsite_navi/images/bslist_giant.png" alt="ジャイアントコーン"></a></li>\
		<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/bslist_papico.png" alt="PAPICO ［パピコ］"></a></li>\
		<li><a href="http://www.glico.co.jp/ice/icenomi/index.html"><img src="/common/brandsite_navi/images/bslist_icenomi.png" alt="アイスの実"></a></li>\
		<li><a href="http://www.glico.co.jp/ice/panapp/index.html"><img src="/common/brandsite_navi/images/bslist_panapp.png" alt="Panapp［パナップ］"></a></li>\
		<li><a href="http://cp.glico.jp/bokujoshibori/index.html"><img src="/common/brandsite_navi/images/bslist_bokujo.png" alt="牧場しぼり"></a></li>\
		<li><a href="http://cp.glico.jp/sunao/index.html"><img src="/common/brandsite_navi/images/bslist_sunao.png" alt="SUNAO"></a></li>\
		<li><a href="http://cp.glico.jp/17ice/"><img src="/common/brandsite_navi/images/bslist_17ice.png" alt="seventeen ice"></a></li>\
		<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/bslist_pucchin.png" alt="プッチンプリン"></a></li>\
		<li><a href="http://web.bifix.jp/index.html"><img src="/common/brandsite_navi/images/bslist_bifix.png" alt="朝食ビフィックスシリーズ"></a></li>\
		<li><a href="http://net.glico.jp/ringo-y/index.html"><img src="/common/brandsite_navi/images/bslist_ringo-y.png" alt="朝食りんごヨーグルト"></a></li>\
		<li><a href="http://net.glico.jp/y-kenko/index.html"><img src="/common/brandsite_navi/images/bslist_y-kenko.png" alt="ヨーグルト健康"></a></li>\
		<li><a href="http://cp.glico.jp/caspikai/index.html"><img src="/common/brandsite_navi/images/bslist_caspi.png" alt="おいしいカスピ海 特選生乳100%"></a></li>\
		<li><a href="http://www.cafeore.jp/info/index.html"><img src="/common/brandsite_navi/images/bslist_cafeole.png" alt="カフェオーレ"></a></li>\
		<li><a href="http://www.glico-youji.jp/top.html"><img src="/common/brandsite_navi/images/bslist_youji.png" alt="幼児のみもの"></a></li>\
		<li><a href="http://cp.glico.jp/almond-k/index.html"><img src="/common/brandsite_navi/images/bslist_almondkouka.png" alt="アーモンド効果"></a></li>\
		<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/bslist_jukucurry.png" alt="プレミアム熟カレー"></a></li>\
		<li><a href="http://www.glico.co.jp/zeppin/index.html"><img src="/common/brandsite_navi/images/bslist_zeppin.png" alt="カレーZEPPIN"></a></li>\
		<li><a href="http://cp.glico.jp/crea/index.html"><img src="/common/brandsite_navi/images/bslist_crea.png" alt="クレアおばさんのシチュー"></a></li>\
		<li><a href="http://cp.glico.jp/gochiuma-cp/index.html"><img src="/common/brandsite_navi/images/bslist_gochi.png" alt="ごちうま"></a></li>\
		<li><a href="http://cp.glico.jp/dekitate/index.html"><img src="/common/brandsite_navi/images/bslist_dekitatekakumei.png" alt="できたて革命"></a></li>\
		<li><a href="http://www.powerproduction.jp/"><img src="/common/brandsite_navi/images/bslist_pwr_pro.png" alt="パワープロダクション"></a></li>\
		<li><a href="http://www.glico.co.jp/batondor/index.html"><img src="/common/brandsite_navi/images/bslist_batondor.png" alt="バトンドール"></a></li>\
	';

// iPhoneまたは、Androidの場合は振り分けを判断

function brandNavSet(cat) {
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)) {
			//スマホ表示
			brandNaviSmp();
		}else{
			//PC表示
			brandNaviPC(cat);
	}
	document.write(brandsiteHTML);
}

//PCの場合
function brandNaviPC(cat){
	switch(cat) {
		case 'choco':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/clist_pocky.png" alt="ポッキー"></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="アーモンドピーク"></a></li>\
					<li><a href="http://www.glico.co.jp/vanhoutenchoco/index.html"><img src="/common/brandsite_navi/images/clist_vanhouten.png" alt="バンホーテンチョコレート"></a></li>\
					<li><a href="http://www.glico.co.jp/bitte/index.html"><img src="/common/brandsite_navi/images/clist_bitte.png" alt="Bitte ［ビッテ］"></a></li>\
					<li><a href="http://www.glico.co.jp/hobal/index.html"><img src="/common/brandsite_navi/images/clist_hobal.png" alt="HOBAL ［ホーバル］"></a></li>\
					<li><a href="http://www.glico.co.jp/caplico/index.html"><img src="/common/brandsite_navi/images/clist_caplico.png" alt="カプリコ"></a></li>\
				</ul>\
			';
			break;
		case 'ice':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.glico.co.jp/ice/giant/index.html"><img src="/common/brandsite_navi/images/clist_giant.png" alt="ジャイアントコーン"></a></li>\
					<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/clist_papico.png" alt="パピコ"></a></li>\
					<li><a href="http://www.glico.co.jp/ice/icenomi/index.html"><img src="/common/brandsite_navi/images/clist_icenomi.png" alt="アイスの実"></a></li>\
					<li><a href="http://www.glico.co.jp/ice/panapp/index.html"><img src="/common/brandsite_navi/images/clist_panapp.png" alt="パナップ"></a></li>\
					<li><a href="http://cp.glico.jp/bokujoshibori/index.html"><img src="/common/brandsite_navi/images/clist_bokujo.png" alt="牧場しぼり"></a></li>\
					<li><a href="http://cp.glico.jp/sunao/index.html"><img src="/common/brandsite_navi/images/clist_sunao.png" alt="SUNAO"></a></li>\
				</ul>\
			';
			break;
		case 'snack':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/clist_pretz.png" alt="プリッツ"></a></li>\
					<li><a href="http://www.glico.co.jp/cheeza/index.html"><img src="/common/brandsite_navi/images/clist_cheeza.png" alt="チーザ"></a></li>\
					<li><a href="http://www.glico.co.jp/bisco/index.html"><img src="/common/brandsite_navi/images/clist_bisco.png" alt="ビスコ"></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="アーモンドピーク"></a></li>\
					<li><a href="http://cp.glico.jp/asobiglico/index.html"><img src="/common/brandsite_navi/images/clist_asobiglico.png" alt="アソビグリコ"></a></li>\
					<li><a href="http://www.glico.co.jp/posca/index.html"><img src="/common/brandsite_navi/images/clist_posca.png" alt="ポスカ"></a></li>\
				</ul>\
			';
			break;
		case 'food':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/clist_jukucurry.png" alt="プレミアム熟カレー"></a></li>\
					<li><a href="http://www.glico.co.jp/zeppin/index.html"><img src="/common/brandsite_navi/images/clist_zeppin.png" alt="カレーZEPPIN"></a></li>\
					<li><a href="http://cp.glico.jp/crea/index.html"><img src="/common/brandsite_navi/images/clist_crea.png" alt="クレアおばさんのシチュー"></a></li>\
					<li><a href="http://cp.glico.jp/gochiuma-cp/index.html"><img src="/common/brandsite_navi/images/clist_gochiuma.png" alt="ごちうま"></a></li>\
					<li><a href="http://cp.glico.jp/dekitate/index.html"><img src="/common/brandsite_navi/images/clist_dekitatekakumei.png" alt="できたて革命"></a></li>\
					<li><a href="http://cp.glico.jp/almond-k/index.html"><img src="/common/brandsite_navi/images/clist_almond-kouka.png" alt="アーモンド効果"></a></li>\
				</ul>\
			';
			break;
		case 'dairy':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_pucchin.png" alt="プッチンプリン"></a></li>\
					<li><a href="http://web.bifix.jp/index.html"><img src="/common/brandsite_navi/images/clist_bifix.png" alt="朝食ビフィックスシリーズ"></a></li>\
					<li><a href="http://net.glico.jp/ringo-y/index.html"><img src="/common/brandsite_navi/images/clist_ringo-y.png" alt="朝食りんごヨーグルト"></a></li>\
					<li><a href="http://net.glico.jp/y-kenko/index.html"><img src="/common/brandsite_navi/images/clist_y-kenko.png" alt="ヨーグルト健康"></a></li>\
					<li><a href="http://www.cafeore.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_cafeole.png" alt="カフェオーレ"></a></li>\
					<li><a href="http://www.glico-youji.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_youji.png" alt="幼児のみもの"></a></li>\
				</ul>\
			';
			break;
		case 'hughug':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/clist_pocky.png" alt="ポッキー"></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="アーモンドピーク"></a></li>\
					<li><a href="http://www.glico.co.jp/caplico/index.html"><img src="/common/brandsite_navi/images/clist_caplico.png" alt="カプリコ"></a></li>\
					<li><a href="http://www.glico.co.jp/cheeza/index.html"><img src="/common/brandsite_navi/images/clist_cheeza.png" alt="チーザ"></a></li>\
					<li><a href="http://www.glico.co.jp/bisco/index.html"><img src="/common/brandsite_navi/images/clist_bisco.png" alt="ビスコ"></a></li>\
					<li><a href="http://cp.glico.jp/asobiglico/index.html"><img src="/common/brandsite_navi/images/clist_asobiglico.png" alt="アソビグリコ"></a></li>\
				</ul>\
				<ul class="second">\
					<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/clist_pretz.png" alt="プリッツ"></a></li>\
					<li><a href="http://www.glico.co.jp/ice/giant/index.html"><img src="/common/brandsite_navi/images/clist_giant.png" alt="ジャイアントコーン"></a></li>\
					<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/clist_papico.png" alt="パピコ"></a></li>\
					<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_pucchin.png" alt="プッチンプリン"></a></li>\
					<li><a href="http://www.cafeore.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_cafeole.png" alt="カフェオーレ"></a></li>\
					<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/clist_jukucurry.png" alt="プレミアム熟カレー"></a></li>\
				</ul>\
			';
			break;
		case 'health':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://cp.glico.jp/almond-k/index.html"><img src="/common/brandsite_navi/images/clist_almond-kouka.png" alt="アーモンド効果"></a></li>\
					<li><a href="http://cp.glico.jp/sunao/index.html"><img src="/common/brandsite_navi/images/clist_sunao.png" alt="SUNAO"></a></li>\
					<li><a href="http://web.bifix.jp/index.html"><img src="/common/brandsite_navi/images/clist_bifix.png" alt="朝食ビフィックスシリーズ"></a></li>\
					<li><a href="http://www.powerproduction.jp/"><img src="/common/brandsite_navi/images/clist_pwr_pro.png" alt="パワープロダクション"></a></li>\
					<li><a href="http://www.glico.co.jp/posca/index.html"><img src="/common/brandsite_navi/images/clist_posca.png" alt="ポスカ"></a></li>\
					<li><a href="http://www.glico.co.jp/posca_f/index.html"><img src="/common/brandsite_navi/images/clist_poscaf.png" alt="ポスカF"></a></li>\
				</ul>\
			';
			break;
		case 'main':
			brandcatLIST = '\
				<ul>\
					<li><a href="http://www.pocky.jp/"><img src="/common/brandsite_navi/images/clist_pocky.png" alt="ポッキー"></a></li>\
					<li><a href="http://www.glico.co.jp/almondpeak/index.html"><img src="/common/brandsite_navi/images/clist_almondpeak.png" alt="アーモンドピーク"></a></li>\
					<li><a href="http://www.glico.co.jp/pretz/index.html"><img src="/common/brandsite_navi/images/clist_pretz.png" alt="プリッツ"></a></li>\
					<li><a href="http://papico.glico.com/top/index.html"><img src="/common/brandsite_navi/images/clist_papico.png" alt="パピコ"></a></li>\
					<li><a href="http://www.glico.co.jp/premium_juku/index.html"><img src="/common/brandsite_navi/images/clist_jukucurry.png" alt="プレミアム熟カレー"></a></li>\
					<li><a href="http://web.pucchin.jp/info/index.html"><img src="/common/brandsite_navi/images/clist_pucchin.png" alt="プッチンプリン"></a></li>\
				</ul>\
			';
			break;
	  default:
		    break;		
	}

	brandsiteHTML = '\
	<div id="brandsite_nav">\
		<div id="brandcat_list" class="brandcat_list-'+ cat +'">\
			<div class="branside_nav_header"><img src="/common/brandsite_navi/images/bsnav_logo_close.png" alt="グリコ スペシャルブランドサイト" width="278" height="34"></div>\
			'+ brandcatLIST +'\
			<div id="brandsite_open">ブランドサイトをもっと見る</div>\
		</div>\
		<div id="brandsite_list">\
			<div class="branside_nav_header"><img src="/common/brandsite_navi/images/bsnav_logo_open.png" alt="グリコ スペシャルブランドサイト" width="278" height="34"></div>\
			<ul>\
			'+ brandsiteLIST +'\
			</ul>\
			<div id="brandsite_close">閉じる</div>\
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

//スマートフォンの場合
function brandNaviSmp(){
	brandsiteHTML = '\
	<div id="brandsite_nav-sp">\
		<div id="brandsite_open">ブランドサイトを見る</div>\
		<div id="brandsite_list">\
			<div class="branside_nav_header"><img src="/common/brandsite_navi/images/bsnav_logo_sp.png" alt="グリコ スペシャルブランドサイト"></div>\
			<ul>\
			'+ brandsiteLIST +'\
			</ul>\
			<div id="brandsite_close">閉じる</div>\
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

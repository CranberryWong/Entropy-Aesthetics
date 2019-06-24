//<![CDATA[
var gmo_header_aw_flg = false;
(function(){
	var l = location.hostname;
	
	var gmoAwArray = [
		"www.gmo.jp",
		"gmo.jp", "www.gmo.jp",
		"www.onamae.com",
		"www.onamae-server.com",
		"gmobb.jp"
	];
	for(key in gmoAwArray){
		if(gmoAwArray[key] == l) {
			gmo_header_aw_flg = true;
			break;
		}
	}
})();

function gmo_header_common_click_handler(ui) {
	var category = ui.getAttribute("data-gmo-category");
	var name = ui.getAttribute("data-gmo-name");
	
	if(typeof(window._gaq) !== 'undefined') {
		_gaq.push(['_trackEvent', category, 'click', name, null, true]);
	}

	if(gmo_header_aw_flg) {
		var display = ui.getAttribute("data-gmo-display");
		if(display == 'header') {
			var scroll_top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			
			var label = null;
			if(39 < scroll_top) {
				label = name+'_scroll_1';
			} else {
				label = name+'_scroll_0';
			}
			
			if(typeof(window._gaq) !== 'undefined') {
				_gaq.push(['_trackEvent', category, 'click', label, null, true]);
			}
			
			if(typeof(window.dataLayer) !== 'undefined') {
				dataLayer.push({
					'event': 'event99',
					'category': category,
					'label': label
				});
			}
			
			if(typeof(ga) == 'function') {
				ga('send', 'event', category, 'click', label);
			}
		}
	}
}
function gmo_header_link_click_handler(link) {
	gmo_header_common_click_handler(link);

	if (window.sc_clicklog) {
		sc_clicklog("gmo_header_out");
	}
}
function gmo_header_ui_click_handler(ui) {
	gmo_header_common_click_handler(ui);

	if (window.sc_clicklog) {
		sc_clicklog("gmo_header_in");
	}
}

(function(){
	var gmoOnload = function(func){
		try { window.addEventListener("load", func, false); } catch(e) { window.attachEvent("onload", func); }
	};
	
	var clickArray = [
		"click-sec.com", "www.click-sec.com",
		"fxprime.com", "www.fxprime.com",
		"gmo-click.com", "www.gmo-click.com"
	];
	var minneArray = [
		"minne.com", "www.minne.com"
	];
	var registryArray = [
		"gmoregistry.com", "www.gmoregistry.com",
		"hello.nagoya",
		"hello.tokyo",
		"hello.yokohama",
		"brightsconsulting.com"
	];
	var darkArray = [
		"shintaro.com", "www.shintaro.com",
		"athletes.gmo.jp"
	];
	
	/**
	 * Z.comのサービスリスト 共通ヘッダーと共通フッターで使用
	 */
	var zcomList = function() { /*
	<div id="##LIST_ID##" class="zcom-common-header-services">
		<a href="https://www.gmo.jp/21th/" target="_blank" class="zcom-common-header-services-message">##MESSAGE##</a>
		<div class="zcom-common-header-services-list">
			<div class="zcom-common-header-services-unit">
				<div class="zcom-common-header-services-region is-flag-vn">
					<span>Vietnam</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://z.com/vn/" target="_blank">Tiếng Việt</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://domain.z.com/vn/" target="_blank">Domain</a></li>
					<li><a href="https://hosting.z.com/vn/" target="_blank">Web Hosting</a></li>
					<li><a href="https://hosting.z.com/vn/email-hosting/" target="_blank">Email Server</a></li>
					<li><a href="https://wp.z.com/vn/" target="_blank">WordPress</a></li>
					<li><a href="https://cloud.z.com/vn/" target="_blank">Cloud</a></li>
					<li><a href="https://ssl.z.com/vn/" target="_blank">SSL</a></li>
				</ul>
				<div class="zcom-common-header-services-region is-flag-mm">
					<span>Myanmar</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://z.com/mm/" target="_blank">Burmese</a> /
						<a href="https://z.com/mm/en/" target="_blank">English</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://domain.z.com/mm/" target="_blank">Domain</a></li>
					<li><a href="https://hosting.z.com/mm/" target="_blank">Web Hosting</a></li>
					<li><a href="https://wp.z.com/mm/" target="_blank">WordPress</a></li>
					<li><a href="https://cloud.z.com/mm/" target="_blank">Cloud</a></li>
					<li><a href="https://ssl.z.com/mm/" target="_blank">SSL</a></li>
					<li><a href="https://storeapp.z.com/mm/" target="_blank">StoreApp</a></li>
				</ul>
			</div>
			
			<div class="zcom-common-header-services-unit">
				<div class="zcom-common-header-services-region is-flag-th">
					<span>Thai</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://z.com/th/" target="_blank">ไทย</a> /
						<a href="https://z.com/th/en/" target="_blank">English</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://domain.z.com/th/" target="_blank">Domain</a></li>
					<li><a href="https://hosting.z.com/th/" target="_blank">Web Hosting</a></li>
					<li><a href="https://hosting.z.com/th/private-hosting/" target="_blank">Private Hosting</a></li>
					<li><a href="https://hosting.z.com/th/email-hosting/" target="_blank">Email Hosting</a></li>
					<li><a href="https://wp.z.com/th/" target="_blank">WordPress</a></li>
					<li><a href="https://cloud.z.com/th/" target="_blank">Cloud</a></li>
					<li><a href="https://ssl.z.com/th/" target="_blank">SSL</a></li>
					<li><a href="https://website.z.com/th/" target="_blank">Website</a></li>
					<li><a href="https://storeapp.z.com/th/" target="_blank">StoreApp</a></li>
					<li><a href="https://research.z.com/th/" target="_blank">Research</a></li>
					<li><a href="https://seo.z.com/th/" target="_blank">SEO</a></li>
					<li><a href="https://school.z.com/th/" target="_blank">School</a></li>
					<li><a href="http://th.trade.z.com/" target="_blank">Securities</a></li>
				</ul>
			</div>
			
			<div class="zcom-common-header-services-unit">
				<div class="zcom-common-header-services-region is-flag-ph">
					<span>Philippines</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://z.com/ph/" target="_blank">English</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://domain.z.com/ph/" target="_blank">Domain</a></li>
					<li><a href="https://hosting.z.com/ph/" target="_blank">Web Hosting</a></li>
					<li><a href="https://wp.z.com/ph/" target="_blank">WordPress</a></li>
					<li><a href="https://cloud.z.com/ph/" target="_blank">Cloud</a></li>
					<li><a href="https://ssl.z.com/ph/" target="_blank">SSL</a></li>
					<li><a href="https://storeapp.z.com/ph/" target="_blank">StoreApp</a></li>
				</ul>
				<div class="zcom-common-header-services-region is-flag-sg">
					<span>Singapore</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://z.com/sg/" target="_blank">English</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://domain.z.com/sg/" target="_blank">Domain</a></li>
					<li><a href="https://hosting.z.com/sg/" target="_blank">Web Hosting</a></li>
					<li><a href="https://wp.z.com/sg/" target="_blank">WordPress</a></li>
					<li><a href="https://cloud.z.com/sg/" target="_blank">Cloud</a></li>
					<li><a href="https://ssl.z.com/sg/" target="_blank">SSL</a></li>
					<li><a href="https://storeapp.z.com/sg/" target="_blank">StoreApp</a></li>
				</ul>
			</div>
			
			<div class="zcom-common-header-services-unit">
				<div class="zcom-common-header-services-region is-flag-jp">
					<span>Japan</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://z.com/jp/" target="_blank">日本語</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://hosting.z.com/jp/" target="_blank">Web Hosting</a></li>
					<li><a href="https://cloud.z.com/jp/" target="_blank">Cloud</a></li>
				</ul>
				<div class="zcom-common-header-services-region is-flag-uk">
					<span>United Kingdom</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://trade.z.com/uk/en/" target="_blank">English</a> /
						<a href="https://trade.z.com/uk/sc/" target="_blank">简体中文</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://trade.z.com/uk/" target="_blank">Trade</a></li>
				</ul>
				<div class="zcom-common-header-services-region is-flag-hk">
					<span>Hong Kong</span>
					<div class="zcom-common-header-services-lang">
						<a href="https://trade.z.com/hk/tc/" target="_blank">繁體字</a> /
						<a href="https://trade.z.com/hk/sc/" target="_blank">简体字</a> /
						<a href="https://trade.z.com/hk/en/" target="_blank">English</a>
					</div>
				</div>
				<ul class="zcom-common-header-services-link">
					<li><a href="https://trade.z.com/hk/" target="_blank">Trade</a></li>
				</ul>
			</div>
		</div>
	</div>	
	*/ };
	
	var l = (location.hostname.indexOf('.test') > -1 && typeof(gmohostname) === 'string') ? gmohostname : location.hostname;
	var common_events = function(id){
		for(key in clickArray){
			if(clickArray[key] == l){
				var clickObj = document.getElementById(id).querySelectorAll('[data-group="common_gmo_cm_click"]');
				for (var i = 0; i < clickObj.length; i++) {
					clickObj[i].className = "gmo_invisible";
				}
				break;
			}
		}
		
		for(key in minneArray){
			if(minneArray[key] == l){
				var clickObj = document.getElementById(id).querySelectorAll('[data-group="common_gmo_cm_minne"]');
				for (var i = 0; i < clickObj.length; i++) {
					clickObj[i].className = "gmo_invisible";
				}
				break;
			}
		}
		
		for(key in registryArray){
			if(registryArray[key] == l){
				var clickObj = document.getElementById(id).querySelectorAll('[data-group="common_gmo_list_domain"]');
				for (var i = 0; i < clickObj.length; i++) {
					clickObj[i].className = "gmo_invisible";
				}
				break;
			}
		}
		
		for(key in darkArray){
			if(darkArray[key] == l){
				var bodyClassName = document.body.className, hasDark = false, classList = bodyClassName.split(' ');
				for(var i in classList){
					if(classList[i] == 'gmocommonheader-dark'){	
						hasDark = true; break;
					}
				}
				if(!hasDark){
					bodyClassName += ' gmocommonheader-dark';
					document.body.className = bodyClassName.replace(/^\s+|\s+$/, '');
				}
				break;
			}
		}
	};

	var addHtmlSet = function(){
		//add css
		var newStyle = document.createElement("link");
		newStyle.href = '//cache.img.gmo.jp/common_header/gmocommonheader_files/css/gmo_common.css';
		newStyle.type = 'text/css';
		newStyle.rel = 'stylesheet';
		document.getElementsByTagName('head')[0].insertBefore(newStyle, null);
		
		gmoOnload(function(){
			var body = document.getElementsByTagName('body')[0];
			if(body != undefined){
				//HTML
				var addHtml = function(id, source, events){
					var gmo_message = 'すべての人にインターネット';
					var gmo_list_id = !!(id == 'gmocommonheader')? 'zcomCommonServices': 'zcomFooterServices';
					
					source = source.toString().match(/\/\*([\s\S]*)\*\//)[1];
					var z_source = zcomList.toString().match(/\/\*([\s\S]*)\*\//)[1];
					
					z_source = z_source.replace(/##MESSAGE##/g, gmo_message);
					z_source = z_source.replace(/##LIST_ID##/g, gmo_list_id);
					
					source = source.replace(/##MESSAGE##/g, gmo_message);
					source = source.replace(/##ZCOM_LIST##/g, z_source);
					var newBox = document.createElement("div");
					newBox.id = id;
					newBox.innerHTML = source;
					body.insertBefore(newBox, null);
					common_events(id);
					events();
				};
				
				addHtml('gmocommonheader', function () {/*
		<div id="gmo_header_wrapper">
			<div class="gmo-common-header-select">
				<span id="gmoCommonToggleJp" class="gmo-common-header-jp" data-gmo-display="header" data-gmo-category="gh_header" data-gmo-name="JPメニューを開く" onclick="gmo_header_ui_click_handler(this);"><i></i>国内サービス</span>
				<span id="gmoCommonToggleGlobal" class="gmo-common-header-global"><i></i>海外サービス</span>
				<a href="https://www.gmo.jp/" target="_blank" rel="nofollow" data-gmo-display="header" data-gmo-category="gh_header" data-gmo-name="GMOインターネットグループ" onclick="gmo_header_link_click_handler(this);">
					<img src="//cache.img.gmo.jp/common_header/gmocommonheader_files/logo201701.png" class="gmo-common-header-select-logo" alt="GMOインターネットグループ" />
				</a>
			</div>
			<div class="gmo_header_left">
				<ul class="gmo_list">
					<li data-group="common_gmo_cm_aozora"><a href="https://gmo-aozora.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_header" data-gmo-name="GMOあおぞらネット銀行 誕生" onclick="gmo_header_link_click_handler(this);"><span class="gmo_blue">お知らせ</span><span>GMOあおぞらネット銀行 誕生！</span></a></li>
					<li data-group="common_gmo_cm_click"><a href="https://www.click-sec.com/corp/ad/fx/?aid=xx1q240&amp;cid=fxlp" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_header" data-gmo-name="FX取引高 世界第１位 GMOクリック証券" onclick="gmo_header_link_click_handler(this);"><span class="gmo_blue">CM放送中</span><span>FX取引高 世界第１位 GMOクリック証券</span></a></li>
				</ul>
			</div>
		</div>
		
		##ZCOM_LIST##
		
		<div id="gmo_services_nav_wrap" class="gmo-common-header-services">
			<a href="https://www.gmo.jp/21th/" target="_blank" rel="nofollow" class="gmo_btn_blue" style="margin: 12px 19px -8px 20px;" data-gmo-display="header" data-gmo-category="gh_content" data-gmo-name="すべての人にインターネット" onclick="gmo_header_link_click_handler(this);">##MESSAGE##</a>
			<div class="gmo_services_nav_content clearfix">
				<div class="gmo_services_nav_list">
					<p class="gmo_list_title gmo_cat_media"><span class="gmo_icon"></span>ネットで情報発信</p>
					<ul class="gmo_list" data-group="common_gmo_list_domain">
						<li class="gmo_list_subtitle">ドメイン取得</li>
						<li><a href="http://www.onamae.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ドメイン取得" data-gmo-name="お名前.com" onclick="gmo_header_link_click_handler(this);">お名前.com</a></li>
						<li><a href="http://muumuu-domain.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ドメイン取得" data-gmo-name="ムームードメイン" onclick="gmo_header_link_click_handler(this);">ムームードメイン</a></li>
						<li><a href="http://www.value-domain.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ドメイン取得" data-gmo-name="VALUE DOMAIN" onclick="gmo_header_link_click_handler(this);">VALUE DOMAIN</a></li>
						<li><a href="http://www.domainking.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ドメイン取得" data-gmo-name="ドメインキング" onclick="gmo_header_link_click_handler(this);">ドメインキング</a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">サーバー・クラウド</li>
						<li><a href="http://www.onamae-server.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_サーバークラウド" data-gmo-name="お名前.com レンタルサーバー" onclick="gmo_header_link_click_handler(this);">お名前.comレンタルサーバー</a></li>
						<li><a href="https://www.conoha.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_サーバークラウド" data-gmo-name="ConoHa" onclick="gmo_header_link_click_handler(this);">ConoHa</a></li>
						<li><a href="http://cloud.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_サーバークラウド" data-gmo-name="GMOアプリクラウド" onclick="gmo_header_link_click_handler(this);">GMOアプリクラウド</a></li>
						<li><a href="http://lolipop.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_サーバークラウド" data-gmo-name="ロリポップ! レンタルサーバー" onclick="gmo_header_link_click_handler(this);">ロリポップ!レンタルサーバー</a></li>
						<li><a href="http://www.gmocloud.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_サーバークラウド" data-gmo-name="GMOクラウドALTUS" onclick="gmo_header_link_click_handler(this);">GMOクラウドALTUS</a></li>
						<li style="white-space:nowrap"><a href="https://shared.gmocloud.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_サーバークラウド" data-gmo-name="GMOクラウドレンタルサーバー" onclick="gmo_header_link_click_handler(this);">GMOクラウドレンタルサーバー</a></li>
						<li><a href="https://www.wadax.ne.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_サーバークラウド" data-gmo-name="WADAX" onclick="gmo_header_link_click_handler(this);">WADAX</a></li>
					</ul>
					<ul class="gmo_list gmo_end">
						<li class="gmo_list_subtitle">Webサイト制作</li>
						<li><a href="http://goope.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_Webサイト制作" data-gmo-name="グーペ" onclick="gmo_header_link_click_handler(this);">グーペ</a></li>
						<li><a href="http://www.petit.cc/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_Webサイト制作" data-gmo-name="プチホームページサービス" onclick="gmo_header_link_click_handler(this);">プチホームページサービス</a></li>
						<li><a href="http://www.makeshop.jp/main/plan/kodawari/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_Webサイト制作" data-gmo-name="こだわりデザイン" onclick="gmo_header_link_click_handler(this);">こだわりデザイン</a></li>
						<li><a href="http://www.cameramen.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_Webサイト制作" data-gmo-name="あつまれ!!キャメラメーン" onclick="gmo_header_link_click_handler(this);">あつまれ!!キャメラメーン </a></li>
						<li><a href="http://ec.omakaseweb.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_Webサイト制作" data-gmo-name="商品撮影サービス" onclick="gmo_header_link_click_handler(this);">商品撮影サービス</a></li>
					</ul>
				</div>
				<div class="gmo_services_nav_list">
					<p class="gmo_list_title gmo_cat_ec"><span class="gmo_icon"></span>ショップを開設</p>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">ショッピングカート</li>
						<li><a href="http://shop-pro.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピングカート" data-gmo-name="カラーミーショップ" onclick="gmo_header_link_click_handler(this);">カラーミーショップ</a></li>
						<li><a href="http://www.makeshop.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピングカート" data-gmo-name="MakeShop" onclick="gmo_header_link_click_handler(this);">MakeShop</a></li>
						<li><a href="http://custom.makeshop.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピングカート" data-gmo-name="カスタムMakeShop" onclick="gmo_header_link_click_handler(this);">カスタムMakeShop</a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">決済システム</li>
						<li><a href="https://www.gmo-pg.com/service/mulpay/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_決済システム" data-gmo-name="PGマルチペイメントサービス" onclick="gmo_header_link_click_handler(this);">PGマルチペイメントサービス </a></li>
						<li><a href="http://www.epsilon.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_決済システム" data-gmo-name="イプシロン" onclick="gmo_header_link_click_handler(this);">イプシロン</a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">販売管理システム</li>
						<li><a href="https://cloud.z.com/jp/products/kaking/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_販売管理システム" data-gmo-name="クラウド販売管理KaKing" onclick="gmo_header_link_click_handler(this);">クラウド販売管理KaKing</a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">セキュリティ強化</li>
						<li><a href="https://jp.globalsign.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_セキュリティ強化" data-gmo-name="GlobalSign" onclick="gmo_header_link_click_handler(this);">GlobalSign</a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">定期販売</li>
						<li><a href="https://colorme-repeat.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_定期販売" data-gmo-name="カラーミーリピート" onclick="gmo_header_link_click_handler(this);">カラーミーリピート</a></li>
					</ul>
					<p class="gmo_list_title gmo_cat_shopping"><span class="gmo_icon"></span>ネットで買物</p>
					<ul class="gmo_list gmo_end">
						<li class="gmo_list_subtitle">ショッピング</li>
						<li><a href="http://calamel.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピング" data-gmo-name="カラメル" onclick="gmo_header_link_click_handler(this);">カラメル</a></li>
						<li><a href="http://minne.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピング" data-gmo-name="minne" onclick="gmo_header_link_click_handler(this);">minne</a></li>
						<li><a href="http://www.itempost.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピング" data-gmo-name="アイテムポスト" onclick="gmo_header_link_click_handler(this);">アイテムポスト</a></li>
						<li><a href="http://kuchikomi-web.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピング" data-gmo-name="クチコミ.jp" onclick="gmo_header_link_click_handler(this);">クチコミ.jp</a></li>
						<li><a href="https://culumo.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ショッピング" data-gmo-name="クルモ" onclick="gmo_header_link_click_handler(this);">クルモ</a></li>
					</ul>
				</div>
				<div class="gmo_services_nav_list">
					<p class="gmo_list_title gmo_cat_business"><span class="gmo_icon"></span>ビジネスを支援</p>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">広告・SEO</li>
						<li><a href="http://taxel.media/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="TAXEL" onclick="gmo_header_link_click_handler(this);">TAXEL</a></li>
						<li><a href="https://akane-ad.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="AkaNe" onclick="gmo_header_link_click_handler(this);">AkaNe</a></li>
						<li><a href="http://gmodsp.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="GMODSP" onclick="gmo_header_link_click_handler(this);">GMODSP</a></li>
						<li><a href="http://www.koukoku.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="プロモーション全般" onclick="gmo_header_link_click_handler(this);">プロモーション全般</a></li>
						<li><a href="http://www.jword.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="JWord" onclick="gmo_header_link_click_handler(this);">JWord</a></li>
						<li><a href="http://news.merumo.ne.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="Yomerumo" onclick="gmo_header_link_click_handler(this);">Yomerumo</a></li>
						<li><a href="https://smaad.net/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="GMO SmaAD" onclick="gmo_header_link_click_handler(this);">GMO SmaAD</a></li>
						<li><a href="http://seo-airlines.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="SEO Airlines" onclick="gmo_header_link_click_handler(this);">SEO Airlines</a></li>
						<li><a href="http://seo.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="GMOSEO+" onclick="gmo_header_link_click_handler(this);">GMOSEO+</a></li>
						<li><a href="http://gmosocial.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_広告・SEO" data-gmo-name="ソーシャルメディアサポート" onclick="gmo_header_link_click_handler(this);">ソーシャルメディアサポート</a></li>
					</ul>
					<ul class="gmo_list gmo_end">
						<li class="gmo_list_subtitle">ビジネス支援</li>
						<li><a href="http://www.gmo-research.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="GMOリサーチ" onclick="gmo_header_link_click_handler(this);">GMOリサーチ</a></li>
						<li><a href="https://infoq.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="infoQ" onclick="gmo_header_link_click_handler(this);">infoQ</a></li>
						<li><a href="http://www.studio-woofoo.net/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="studio woofoo" onclick="gmo_header_link_click_handler(this);">studio woofoo</a></li>
						<li><a href="http://www.gmo-c.jp/service/marut_o2o.html?utm_source=gmogroup&amp;utm_medium=header" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-category="gh_ビジネス支援" data-gmo-name="まるっとサポート! O2O" onclick="gmo_header_link_click_handler(this);">まるっとサポート! O2O</a></li>
						<li><a href="https://アップカプセル.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="GMO集客アップカプセル" onclick="gmo_header_link_click_handler(this);">GMO集客アップカプセル</a></li>
						<li><a href="https://www.iotnomadoguchi.com" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="IoTの窓口" onclick="gmo_header_link_click_handler(this);">IoTの窓口</a></li>
						<li><a href="https://sku.id" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="SKUID" onclick="gmo_header_link_click_handler(this);">SKUID</a></li>
						<li><a href="https://gmo-app.jp" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="GMOおみせアプリ" onclick="gmo_header_link_click_handler(this);">GMOおみせアプリ</a></li>
						<li><a href="https://www.gmo-agree.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ビジネス支援" data-gmo-name="電子契約サービスAgree" onclick="gmo_header_link_click_handler(this);">電子契約サービスAgree</a></li>
					</ul>
				</div>
				<div class="gmo_services_nav_list">
					<p class="gmo_list_title gmo_cat_hobby"><span class="gmo_icon"></span>ネットを楽しむ</p>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">メール・ブログ</li>
						<li><a href="http://jugem.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_メールブログ" data-gmo-name="JUGEM" onclick="gmo_header_link_click_handler(this);">JUGEM</a></li>
						<li><a href="http://www.freeml.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_メールブログ" data-gmo-name="freeml" onclick="gmo_header_link_click_handler(this);">freeml</a></li>
						<li><a href="http://www.teacup.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_メールブログ" data-gmo-name="teacup." onclick="gmo_header_link_click_handler(this);">teacup. </a></li>
						<li><a href="http://www.yaplog.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_メールブログ" data-gmo-name="ヤプログ！" onclick="gmo_header_link_click_handler(this);">ヤプログ！ </a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">写真・画像</li>
						<li><a href="http://30d.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_写真・画像" data-gmo-name="30daysAlbum" onclick="gmo_header_link_click_handler(this);">30daysAlbum</a></li>
						<li><a href="http://www.kabegami.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_写真・画像" data-gmo-name="壁紙.com" onclick="gmo_header_link_click_handler(this);">壁紙.com</a></li>
						<li><a href="https://prican.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_写真・画像" data-gmo-name="prican" onclick="gmo_header_link_click_handler(this);">prican</a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">プロバイダー</li>
						<li><a href="http://gmobb.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_プロバイダー" data-gmo-name="GMOとくとくBB" onclick="gmo_header_link_click_handler(this);">GMOとくとくBB</a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">その他</li>
						<li><a href="http://www.freeml.com/kimetaro/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_その他" data-gmo-name="とっとと決め太郎" onclick="gmo_header_link_click_handler(this);">とっとと決め太郎</a></li>
						<li><a href="http://coordisnap.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_その他" data-gmo-name="コーデスナップ" onclick="gmo_header_link_click_handler(this);">コーデスナップ</a></li>
					</ul>
				</div>
				<div class="gmo_services_nav_list_end">
					<p class="gmo_list_title gmo_cat_point"><span class="gmo_icon"></span>ネットで得する</p>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">クーポン・ポイント</li>
						<li><a href="http://kumapon.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_クーポンポイント" data-gmo-name="くまポンbyGMO" onclick="gmo_header_link_click_handler(this);">くまポンbyGMO</a></li>
						<li><a href="http://point.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_クーポンポイント" data-gmo-name="GMOポイント" onclick="gmo_header_link_click_handler(this);">GMOポイント</a></li>
						<li><a href="http://www.pointtown.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_クーポンポイント" data-gmo-name="ポイントタウン" onclick="gmo_header_link_click_handler(this);">ポイントタウン</a></li>
					</ul>
					<p class="gmo_list_title gmo_cat_fx"><span class="gmo_icon"></span>ネットで金融</p>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">ネット銀行</li>
						<li><a href="https://gmo-aozora.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ネット銀行" data-gmo-name="GMOあおぞらネット銀行" onclick="gmo_header_link_click_handler(this);">GMOあおぞらネット銀行 <span class="gmo_red">NEW</span></a></li>
					</ul>
					<ul class="gmo_list">
						<li class="gmo_list_subtitle">証券・FX・CFD</li>
						<li><a href="https://www.click-sec.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_証券・FX・CFD" data-gmo-name="GMOクリック証券" onclick="gmo_header_link_click_handler(this);">GMOクリック証券 <span class="gmo_red">CM</span></a></li>
						<li><a href="http://www.fxprime.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_証券・FX・CFD" data-gmo-name="FXプライム byGMO" onclick="gmo_header_link_click_handler(this);">FXプライム byGMO</a></li>
						<li><a href="https://coin.z.com/jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_証券・FX・CFD" data-gmo-name="GMOコイン" onclick="gmo_header_link_click_handler(this);">GMOコイン</a></li>
					</ul>
					<p class="gmo_list_title gmo_cat_gmogroup"><span class="gmo_icon"></span>グループの活動</p>
					<ul class="gmo_list gmo_end">
						<li class="gmo_list_subtitle">カルチャー・スポーツ支援</li>
						<li><a href="http://www.shintaro.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_カルチャー支援" data-gmo-name="DJ SHINTARO" onclick="gmo_header_link_click_handler(this);">DJ SHINTARO</a></li>
						<li><a href="https://athletes.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_カルチャー支援" data-gmo-name="GMO ATHLETES" onclick="gmo_header_link_click_handler(this);">GMO ATHLETES</a></li>
						<li><a href="https://www.click-sec.com/corp/company/sponsor/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_カルチャー支援" data-gmo-name="競泳日本代表" onclick="gmo_header_link_click_handler(this);">競泳日本代表</a></li>
					</ul>
				</div>
			</div>
			<a href="https://www.gmo.jp/service/search/" target="_blank" rel="nofollow" class="gmo_btn_blue" data-gmo-display="header" data-gmo-category="gh_content" data-gmo-name="GMOインターネットグループ サービス一覧" onclick="gmo_header_link_click_handler(this);">
			GMOインターネットグループ サービス一覧
			</a>
		</div>
				*/},
				function(){
					var is_hidden = true;
					var is_svc_hidden = true;
					var is_hover = false;
					var shown = '';
					var gmoheader = document.getElementById('gmocommonheader');
					var toggle_jp = document.getElementById('gmoCommonToggleJp');
					var toggle_global = document.getElementById('gmoCommonToggleGlobal');
					var services_jp = document.getElementById('gmo_services_nav_wrap');
					var services_global = document.getElementById('zcomCommonServices');
					
					var menuToggleJp = function(is_hdn) {
						shown = 'jp';
						gmoheader.className = is_hdn? 'is-open-jp' : '';
						is_hidden = !is_hdn;
					};
					var menuToggleGlobal = function(is_hdn) {
						shown = 'global';
						gmoheader.className = is_hdn? 'is-open-global' : '';
						is_hidden = !is_hdn;
					};
					toggle_jp.onclick = function(){
						if( shown == 'global' ) {
							menuToggleGlobal(false);
						}
						menuToggleJp(is_hidden);
					};
					toggle_global.onclick = function(){
						if( shown == 'jp') {
							menuToggleJp(false);
						}
						menuToggleGlobal(is_hidden);
					};
					toggle_jp.onmouseover = function() { is_hover = true; };
					toggle_jp.onmouseout = function() { is_hover = false; };
					services_jp.onmouseover = function() { is_hover = true; };
					services_jp.onmouseout = function() { is_hover = false; };
					toggle_global.onmouseover = function() { is_hover = true; };
					toggle_global.onmouseout = function() { is_hover = false; };
					services_global.onmouseover = function() { is_hover = true; };
					services_global.onmouseout = function() { is_hover = false; };
					document.body.onmouseup = function(){
						if(!is_hover && !is_hidden) {
							menuToggleJp(false);
							menuToggleGlobal(false);
							shown = '';
						}
					};
				});
				
				addHtml('gmocommonfooter', function () {/*
<div class="gmo_footer_wrapper">
	<div class="gmo_footer_head">
		<ul class="gmo_list">
			<li data-group="common_gmo_cm_aozora"><a href="https://gmo-aozora.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_header" data-gmo-name="GMOあおぞらネット銀行 誕生" onclick="gmo_header_link_click_handler(this);"><span class="gmo_red">お知らせ</span><span>GMOあおぞらネット銀行 誕生！</span></a></li>
		</ul>
	</div>
	<div class="gmo_footer_logo">
		<div class="gmo_footer_inner">
			<a href="https://www.gmo.jp/service/search/" target="_blank" rel="nofollow" data-gmo-display="footer" data-gmo-category="gh_header" data-gmo-name="GMOインターネットグループ" onclick="gmo_header_link_click_handler(this);"><img src="//cache.img.gmo.jp/common_header/gmocommonheader_files/logo201701.png" alt="GMOインターネットグループ" /></a>
		</div>
		<div id="gmo_sp_opentab" class="gmo_opentab">
			<img src="//cache.img.gmo.jp/common_header/gmocommonheader_files/open_footer.png" width="18" height="18" id="open_footer_common_gmo_link" class="footer_common_gmo_link" onclick="window._gaq &amp;&amp; _gaq.push(['_trackEvent', 'gh_footer', 'click', 'button_for_gmo_services', null, true])" data-gmo-display="footer" data-gmo-category="gh_header" data-gmo-name="メニューを開く" /><img src="//cache.img.gmo.jp/common_header/gmocommonheader_files/close_footer.png" width="18" height="18" id="close_footer_common_gmo_link" class="footer_common_gmo_link" />
		</div>
	</div>
</div>


<div id="gmo_sp_services_nav_wrap">
	<div class="gmo-common-footer-select">
		<span id="gmoFooterToggleJp" class="gmo-common-footer-jp">国内サービス</span>
		<span id="gmoFooterToggleGlobal" class="gmo-common-footer-global">海外サービス</span>
	</div>
	
	##ZCOM_LIST##
	
	<div class="gmo_services_nav_content">
		<div class="gmo_services_nav_list">
			<p class="gmo_list_title gmo_cat_media"><span class="gmo_icon"></span>ネットで情報発信</p>
			<ul class="gmo_list" data-group="common_gmo_list_domain">
				<li class="gmo_list_subtitle">ドメイン取得</li>
				<li><a href="http://www.onamae.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ドメイン取得" data-gmo-name="お名前.com" onclick="gmo_header_link_click_handler(this);">お名前.com</a></li>
				<li><a href="http://muumuu-domain.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ドメイン取得" data-gmo-name="ムームードメイン" onclick="gmo_header_link_click_handler(this);">ムームードメイン</a></li>
				<li><a href="http://www.value-domain.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ドメイン取得" data-gmo-name="VALUE DOMAIN" onclick="gmo_header_link_click_handler(this);">VALUE DOMAIN</a></li>
				<li><a href="http://www.domainking.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ドメイン取得" data-gmo-name="ドメインキング" onclick="gmo_header_link_click_handler(this);">ドメインキング</a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">サーバー・クラウド</li>
				<li><a href="http://www.onamae-server.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_サーバークラウド" data-gmo-name="お名前.com レンタルサーバー" onclick="gmo_header_link_click_handler(this);">お名前.comレンタルサーバー</a></li>
				<li><a href="http://www.conoha.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_サーバークラウド" data-gmo-name="ConoHa" onclick="gmo_header_link_click_handler(this);">ConoHa</a></li>
				<li><a href="http://cloud.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_サーバークラウド" data-gmo-name="GMOアプリクラウド" onclick="gmo_header_link_click_handler(this);">GMOアプリクラウド</a></li>
				<li><a href="http://lolipop.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_サーバークラウド" data-gmo-name="ロリポップ! レンタルサーバー" onclick="gmo_header_link_click_handler(this);">ロリポップ!レンタルサーバー</a></li>
				<li><a href="http://www.gmocloud.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_サーバークラウド" data-gmo-name="GMOクラウドALTUS" onclick="gmo_header_link_click_handler(this);">GMOクラウドALTUS</a></li>
				<li><a href="https://shared.gmocloud.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_サーバークラウド" data-gmo-name="GMOクラウドレンタルサーバー" onclick="gmo_header_link_click_handler(this);">GMOクラウドレンタルサーバー</a></li>
				<li><a href="https://www.wadax.ne.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_サーバークラウド" data-gmo-name="WADAX" onclick="gmo_header_link_click_handler(this);">WADAX</a></li>
			</ul>
			<ul class="gmo_list gmo_end">
				<li class="gmo_list_subtitle">Webサイト制作</li>
				<li><a href="http://goope.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_Webサイト制作" data-gmo-name="グーペ" onclick="gmo_header_link_click_handler(this);">グーペ</a></li>
				<li><a href="http://www.petit.cc/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_Webサイト制作" data-gmo-name="プチホームページサービス" onclick="gmo_header_link_click_handler(this);">プチホームページサービス</a></li>
				<li><a href="http://www.makeshop.jp/main/plan/kodawari/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_Webサイト制作" data-gmo-name="こだわりデザイン" onclick="gmo_header_link_click_handler(this);">こだわりデザイン</a></li>
				<li><a href="http://www.cameramen.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_Webサイト制作" data-gmo-name="あつまれ!!キャメラメーン" onclick="gmo_header_link_click_handler(this);">あつまれ!!キャメラメーン </a></li>
				<li><a href="http://ec.omakaseweb.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_Webサイト制作" data-gmo-name="商品撮影サービス" onclick="gmo_header_link_click_handler(this);">商品撮影サービス</a></li>
			</ul>
		</div>
		<div class="gmo_services_nav_list">
			<p class="gmo_list_title gmo_cat_ec"><span class="gmo_icon"></span>ショップを開設</p>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">ショッピングカート</li>
				<li><a href="http://shop-pro.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピングカート" data-gmo-name="カラーミーショップ" onclick="gmo_header_link_click_handler(this);">カラーミーショップ</a></li>
				<li><a href="http://www.makeshop.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピングカート" data-gmo-name="MakeShop" onclick="gmo_header_link_click_handler(this);">MakeShop</a></li>
				<li><a href="http://custom.makeshop.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピングカート" data-gmo-name="カスタムMakeShop" onclick="gmo_header_link_click_handler(this);">カスタムMakeShop</a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">決済システム</li>
				<li><a href="https://www.gmo-pg.com/service/mulpay/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_決済システム" data-gmo-name="PGマルチペイメントサービス" onclick="gmo_header_link_click_handler(this);">PGマルチペイメントサービス </a></li>
				<li><a href="http://www.epsilon.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_決済システム" data-gmo-name="イプシロン" onclick="gmo_header_link_click_handler(this);">イプシロン</a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">販売管理システム</li>
				<li><a href="https://cloud.z.com/jp/products/kaking/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_販売管理システム" data-gmo-name="クラウド販売管理KaKing" onclick="gmo_header_link_click_handler(this);">クラウド販売管理KaKing</a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">セキュリティ強化</li>
				<li><a href="https://jp.globalsign.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_セキュリティ強化" data-gmo-name="GlobalSign" onclick="gmo_header_link_click_handler(this);">GlobalSign</a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">定期販売</li>
				<li><a href="https://colorme-repeat.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_定期販売" data-gmo-name="カラーミーリピート" onclick="gmo_header_link_click_handler(this);">カラーミーリピート</a></li>
			</ul>
			<p class="gmo_list_title gmo_cat_shopping"><span class="gmo_icon"></span>ネットで買物</p>
			<ul class="gmo_list gmo_end">
				<li class="gmo_list_subtitle">ショッピング</li>
				<li><a href="http://calamel.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピング" data-gmo-name="カラメル" onclick="gmo_header_link_click_handler(this);">カラメル</a></li>
				<li><a href="http://minne.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピング" data-gmo-name="minne" onclick="gmo_header_link_click_handler(this);">minne</a></li>
				<li><a href="http://www.itempost.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピング" data-gmo-name="アイテムポスト" onclick="gmo_header_link_click_handler(this);">アイテムポスト</a></li>
				<li><a href="http://kuchikomi-web.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピング" data-gmo-name="クチコミ.jp" onclick="gmo_header_link_click_handler(this);">クチコミ.jp</a></li>
				<li><a href="https://culumo.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ショッピング" data-gmo-name="クルモ" onclick="gmo_header_link_click_handler(this);">クルモ</a></li>
			</ul>
		</div>
		<div class="gmo_services_nav_list">
			<p class="gmo_list_title gmo_cat_business"><span class="gmo_icon"></span>ビジネスを支援</p>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">広告・SEO</li>
				<li><a href="http://taxel.media/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="TAXEL" onclick="gmo_header_link_click_handler(this);">TAXEL</a></li>
				<li><a href="https://akane-ad.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="AkaNe" onclick="gmo_header_link_click_handler(this);">AkaNe</a></li>
				<li><a href="http://gmodsp.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="GMODSP" onclick="gmo_header_link_click_handler(this);">GMODSP</a></li>
				<li><a href="http://www.koukoku.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="プロモーション全般" onclick="gmo_header_link_click_handler(this);">プロモーション全般</a></li>
				<li><a href="http://www.jword.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="JWord" onclick="gmo_header_link_click_handler(this);">JWord</a></li>
				<li><a href="http://news.merumo.ne.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="Yomerumo" onclick="gmo_header_link_click_handler(this);">Yomerumo</a></li>
				<li><a href="https://smaad.net/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="GMO SmaAD" onclick="gmo_header_link_click_handler(this);">GMO SmaAD</a></li>
				<li><a href="http://seo-airlines.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="SEO Airlines" onclick="gmo_header_link_click_handler(this);">SEO Airlines</a></li>
				<li><a href="http://seo.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="GMOSEO+" onclick="gmo_header_link_click_handler(this);">GMOSEO+</a></li>
				<li><a href="http://gmosocial.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_広告・SEO" data-gmo-name="ソーシャルメディアサポート" onclick="gmo_header_link_click_handler(this);">ソーシャルメディアサポート</a></li>
			</ul>
			<ul class="gmo_list gmo_end">
				<li class="gmo_list_subtitle">ビジネス支援</li>
				<li><a href="http://www.gmo-research.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="GMOリサーチ" onclick="gmo_header_link_click_handler(this);">GMOリサーチ</a></li>
				<li><a href="https://infoq.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="infoQ" onclick="gmo_header_link_click_handler(this);">infoQ</a></li>
				<li><a href="http://www.gmo-c.jp/service/marut_o2o.html?utm_source=gmogroup&amp;utm_medium=header" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="まるっとサポート! O2O" onclick="gmo_header_link_click_handler(this);">まるっとサポート! O2O</a></li>
				<li><a href="https://アップカプセル.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="GMO集客アップカプセル" onclick="gmo_header_link_click_handler(this);">GMO集客アップカプセル</a></li>
				<li><a href="https://www.iotnomadoguchi.com" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="IoTの窓口" onclick="gmo_header_link_click_handler(this);">IoTの窓口</a></li>
				<li><a href="https://sku.id" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="SKUID" onclick="gmo_header_link_click_handler(this);">SKUID</a></li>
				<li><a href="https://gmo-app.jp" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="GMOおみせアプリ" onclick="gmo_header_link_click_handler(this);">GMOおみせアプリ</a></li>
				<li><a href="https://www.gmo-agree.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_ビジネス支援" data-gmo-name="電子契約サービスAgree" onclick="gmo_header_link_click_handler(this);">電子契約サービスAgree</a></li>
			</ul>
		</div>
		<div class="gmo_services_nav_list">
			<p class="gmo_list_title gmo_cat_hobby"><span class="gmo_icon"></span>ネットを楽しむ</p>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">メール・ブログ</li>
				<li><a href="http://jugem.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_メールブログ" data-gmo-name="JUGEM" onclick="gmo_header_link_click_handler(this);">JUGEM</a></li>
				<li><a href="http://www.freeml.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_メールブログ" data-gmo-name="freeml" onclick="gmo_header_link_click_handler(this);">freeml</a></li>
				<li><a href="http://www.teacup.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_メールブログ" data-gmo-name="teacup." onclick="gmo_header_link_click_handler(this);">teacup. </a></li>
				<li><a href="http://www.yaplog.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_メールブログ" data-gmo-name="ヤプログ！" onclick="gmo_header_link_click_handler(this);">ヤプログ！ </a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">写真・画像</li>
				<li><a href="http://30d.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_写真・画像" data-gmo-name="30daysAlbum" onclick="gmo_header_link_click_handler(this);">30daysAlbum</a></li>
				<li><a href="http://www.kabegami.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_写真・画像" data-gmo-name="壁紙.com" onclick="gmo_header_link_click_handler(this);">壁紙.com</a></li>
				<li><a href="https://prican.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_写真・画像" data-gmo-name="prican" onclick="gmo_header_link_click_handler(this);">prican</a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">プロバイダー</li>
				<li><a href="http://gmobb.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_プロバイダー" data-gmo-name="GMOとくとくBB" onclick="gmo_header_link_click_handler(this);">GMOとくとくBB</a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">その他</li>
				<li><a href="http://www.freeml.com/kimetaro/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_その他" data-gmo-name="とっとと決め太郎" onclick="gmo_header_link_click_handler(this);">とっとと決め太郎</a></li>
				<li><a href="http://coordisnap.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_その他" data-gmo-name="コーデスナップ" onclick="gmo_header_link_click_handler(this);">コーデスナップ</a></li>
			</ul>
		</div>
		<div class="gmo_services_nav_list">
			<p class="gmo_list_title gmo_cat_point"><span class="gmo_icon"></span>ネットで得する</p>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">クーポン・ポイント</li>
				<li><a href="http://kumapon.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_クーポンポイント" data-gmo-name="くまポンbyGMO" onclick="gmo_header_link_click_handler(this);">くまポンbyGMO</a></li>
				<li><a href="http://point.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_クーポンポイント" data-gmo-name="GMOポイント" onclick="gmo_header_link_click_handler(this);">GMOポイント</a></li>
				<li><a href="http://www.pointtown.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_クーポンポイント" data-gmo-name="ポイントタウン" onclick="gmo_header_link_click_handler(this);">ポイントタウン</a></li>
			</ul>
			<p class="gmo_list_title gmo_cat_fx"><span class="gmo_icon"></span>ネットで金融</p>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">ネット銀行</li>
				<li><a href="https://gmo-aozora.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="header" data-gmo-category="gh_ネット銀行" data-gmo-name="GMOあおぞらネット銀行" onclick="gmo_header_link_click_handler(this);">GMOあおぞらネット銀行 <span class="gmo_red">NEW</span></a></li>
			</ul>
			<ul class="gmo_list">
				<li class="gmo_list_subtitle">証券・FX・CFD</li>
				<li><a href="https://www.click-sec.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_証券・FX・CFD" data-gmo-name="GMOクリック証券" onclick="gmo_header_link_click_handler(this);">GMOクリック証券 <span class="gmo_red">CM</span></a></li>
				<li><a href="https://www.fxprime.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_証券・FX・CFD" data-gmo-name="FXプライム byGMO" onclick="gmo_header_link_click_handler(this);">FXプライム byGMO</a></li>
				<li><a href="https://coin.z.com/jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_証券・FX・CFD" data-gmo-name="GMOコイン" onclick="gmo_header_link_click_handler(this);">GMOコイン</a></li>
			</ul>
			<p class="gmo_list_title gmo_cat_gmogroup"><span class="gmo_icon"></span>グループの活動</p>
			<ul class="gmo_list gmo_end">
				<li class="gmo_list_subtitle">カルチャー・スポーツ支援</li>
				<li><a href="http://www.shintaro.com/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_カルチャー支援" data-gmo-name="DJ SHINTARO" onclick="gmo_header_link_click_handler(this);">DJ SHINTARO</a></li>
				<li><a href="https://athletes.gmo.jp/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_カルチャー支援" data-gmo-name="GMO ATHLETES" onclick="gmo_header_link_click_handler(this);">GMO ATHLETES</a></li>
				<li><a href="https://www.click-sec.com/corp/company/sponsor/" target="_blank" rel="nofollow" class="common_gmo_link" data-gmo-display="footer" data-gmo-category="gh_カルチャー支援" data-gmo-name="競泳日本代表" onclick="gmo_header_link_click_handler(this);">競泳日本代表</a></li>
			</ul>
		</div>
	</div>
</div>
				*/},
				function(){
					var is_svc_hidden = true;
					var gmofooter = document.getElementById('gmocommonfooter');
					var toggle_jp = document.getElementById('gmoFooterToggleJp');
					var toggle_global = document.getElementById('gmoFooterToggleGlobal');
					var services_jp = document.getElementById('gmo_sp_services_nav_wrap');
					var services_global = document.getElementById('zcomFooterServices');
					var sp_open_tab = document.getElementById('gmo_sp_opentab');
					var open = document.getElementById('open_footer_common_gmo_link');
					var close = document.getElementById('close_footer_common_gmo_link');
					
					var menuToggle = function(is_hdn) {
						if(is_hdn) {
							gmofooter.className = 'is-open-jp is-open';
							close.style.display = 'block';
							open.style.display = 'none';
						} else {
							gmofooter.className = '';
							close.style.display = 'none';
							open.style.display = 'block';
						}
						is_svc_hidden = !is_hdn;
					};
					
					sp_open_tab.onclick = function(){
						menuToggle(is_svc_hidden);
					};
					toggle_jp.onclick = function(){
						gmofooter.className = 'is-open-jp is-open';
					};
					toggle_global.onclick = function(){
						gmofooter.className = 'is-open-global is-open';
					};
				});
			}
		});
	};
	
	var ua = window.navigator.userAgent;
	var match_ua = ua.toLowerCase().match(/msie\s(\d+)/);
	if(match_ua == null || parseInt(match_ua[1]) > 8){
		addHtmlSet();
	}
})();
//]]>

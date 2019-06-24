//<![CDATA[
(function(){
	//add css
	var newStyle = document.createElement("link");
	newStyle.href = '//cache.img.gmo.jp/common_footer/css/footerstyle.css';
	newStyle.type = 'text/css';
	newStyle.rel = 'stylesheet';
	document.getElementsByTagName('head')[0].insertBefore(newStyle, null);
	
	var gmoOnload = function(func){
		try { window.addEventListener("load", func, false); } catch(e) { window.attachEvent("onload", func); }
	};
	
	gmoOnload(function(){
		var body = document.body;
		
		if(body == undefined) {
			return false;
		}
		
		var parent = document.getElementById('gmofooter');
		
		if(parent == null) {
			return false;
		}
		
		var ua = window.navigator.userAgent;
		var match_ua = ua.toLowerCase().match(/msie\s(\d+)/);
		if(match_ua != null && parseInt(match_ua[1]) <= 8) {
			document.getElementsByTagName('head')[0].removeChild(newStyle);
			parent.parentNode.removeChild(parent);
			return false;
		}
		
		var cont = parent.childNodes[0];
		if(typeof cont.className == "undefined") {
			cont = parent.childNodes[1];
		}
		
		if(cont.className != "gmofooter") {
			return false;
		}
		
		//HTML
		var source = function() {/*
<div class="gmofooter_heading">グループサービス</div>
<div class="gmofooter_groupservicelist">
	<ul>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ネットで情報発信</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>ドメイン取得</dt>
					<dd><a rel="nofollow" target="_blank" href="http://www.onamae.com/">お名前.com</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://muumuu-domain.com/">ムームードメイン</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.value-domain.com/">VALUE DOMAIN</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.domainking.jp/">ドメインキング</a></dd>
				</dl>
				<dl>
					<dt>サーバー</dt>
					<dd><a rel="nofollow" target="_blank" href="http://www.onamae-server.com/">お名前.comレンタルサーバー</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://www.conoha.jp/">ConoHa</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://lolipop.jp/">ロリポップ!レンタルサーバー</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.value-server.com/">バリューサーバー</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://rentalserver.webk.net/">WEBKEEPERS 共用サーバー</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.wadax.ne.jp/">WADAX</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.ymc.ne.jp/">@YMCレンタルサーバー</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.serverqueen.jp/">ServerQueen</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://shared.gmocloud.com/">GMOクラウドレンタルサーバー</a></dd>
				</dl>
				<dl>
					<dt>クラウド</dt>
					<dd><a rel="nofollow" target="_blank" href="http://cloud.gmo.jp/">GMOアプリクラウド</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.gmocloud.com/">GMOクラウド Public</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://private-c.gmocloud.com/">GMOクラウド Private</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://th.gmocloud.com/">GMOクラウド Thailand</a></dd>
				</dl>
				<dl>
					<dt>Webサイト制作</dt>
					<dd><a rel="nofollow" target="_blank" href="http://goope.jp/">グーペ</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.petit.cc/">プチホームページサービス</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.makeshop.jp/main/plan/kodawari/">こだわりデザイン</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.cameramen.jp/">あつまれ!!キャメラメーン</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://ec.omakaseweb.com/">商品撮影サービス</a></dd>
				</dl>
			</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ショップを開設</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>ショッピングカート</dt>
					<dd><a rel="nofollow" target="_blank" href="http://shop-pro.jp/">カラーミーショップ</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.makeshop.jp/">MakeShop</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://custom.makeshop.jp/">カスタムMakeShop</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.makeshop-cloud.jp/">MakeShopクラウド</a></dd>
				</dl>
				<dl>
					<dt>決済システム</dt>
					<dd><a rel="nofollow" target="_blank" href="https://www.gmo-pg.com/service/mulpay/">PGマルチペイメントサービス</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.epsilon.jp/">イプシロン</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.gmo-ps.com/">GMO後払い</a></dd>
				</dl>
				<dl>
					<dt>セキュリティ強化</dt>
					<dd><a rel="nofollow" target="_blank" href="https://jp.globalsign.com/">GlobalSign</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://www.toritonssl.com/">アルファSSL</a></dd>
				</dl>
			</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ネットで買物</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>ショッピング</dt>
					<dd><a rel="nofollow" target="_blank" href="http://calamel.jp/">カラメル</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://minne.com/">minne</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.itempost.jp/">アイテムポスト</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://culumo.com/">クルモ</a></dd>
				</dl>
			</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ビジネスを支援</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>広告・SEO</dt>
					<dd><a rel="nofollow" target="_blank" href="http://taxel.media/">TAXEL</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://gmodsp.jp/">GMODSP</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://akane-ad.com/">AkaNe</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.koukoku.jp/">GMO NIKKO</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.jword.jp/">JWord</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://news.merumo.ne.jp/">Yomerumo</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://smaad.net/">GMO SmaAD</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://seo-airlines.com/">SEO Airlines</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://seo.gmo.jp/">GMOSEO+</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://gmosocial.com/">GMOソーシャルメディアサポート</a></dd>
				</dl>
				<dl>
					<dt>ビジネス支援</dt>
					<dd><a rel="nofollow" target="_blank" href="http://www.gmo-research.jp/">GMOリサーチ</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://infoq.jp/">infoQ</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.studio-woofoo.net/">studio woofoo</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.gmo-c.jp/service/marut_o2o.html">まるっとサポート! O2O</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.gmo-vp.com/">ベンチャーパートナー</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://アップカプセル.com/">GMO集客アップカプセル</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://www.iotnomadoguchi.com">IoTの窓口</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://sku.id">SKUID</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://gmo-app.jp">GMOおみせアプリ</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://www.gmo-agree.com/">電子契約サービスAgree</a></dd>
				</dl>
			</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ネットを楽しむ</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>メール・ブログ</dt>
					<dd><a rel="nofollow" target="_blank" href="http://jugem.jp/">JUGEM</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.freeml.com/">freeml</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.teacup.com/">teacup.</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.yaplog.jp/">ヤプログ！</a></dd>
				</dl>
				<dl>
					<dt>写真・画像</dt>
					<dd><a rel="nofollow" target="_blank" href="http://30d.jp/">30days Album</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.kabegami.com/">壁紙.com</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://prican.jp/">prican</a></dd>
				</dl>
				<dl>
					<dt>プロバイダー</dt>
					<dd><a rel="nofollow" target="_blank" href="http://gmobb.jp/">GMOとくとくBB</a></dd>
				</dl>
				<dl>
					<dt>その他</dt>
					<dd><a rel="nofollow" target="_blank" href="http://www.freeml.com/kimetaro/">とっとと決め太郎</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://coordisnap.com/">コーデスナップ</a></dd>
				</dl>
			</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ネットで得する</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>クーポン・ポイント</dt>
					<dd><a rel="nofollow" target="_blank" href="http://kumapon.jp/">くまポンbyGMO</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://point.gmo.jp/">GMOポイント</a></dd>
					<dd><a rel="nofollow" target="_blank" href="http://www.pointtown.com/">ポイントタウン</a></dd>
				</dl>
			</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ネットで金融</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>ネット銀行</dt>
					<dd><a rel="nofollow" target="_blank" href="https://gmo-aozora.com/">GMOあおぞらネット銀行</a></dd>
				</dl>
				<dl>
					<dt>証券・FX・CFD</dt>
					<dd><a rel="nofollow" target="_blank" href="https://www.click-sec.com/">GMOクリック証券</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://www.fxprime.com/">FXプライム byGMO</a></dd>
					<dd><a rel="nofollow" target="_blank" href="https://coin.z.com/jp/">GMOコイン</a></dd>
				</dl>
			</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="gmofooter_groupserviceheading">ネットでゲーム</a>
			<div class="gmofooter_submenu">
				<dl>
					<dt>スマホで遊ぶ</dt>
					<dd><a rel="nofollow" target="_blank" href="http://www.waguruma.jp/">わグルま!!</a></dd>
				</dl>
				<dl>
					<dt>パソコンで遊ぶ</dt>
					<dd><a rel="nofollow" target="_blank" href="http://www.livly.com/promo/livly_ad/">Livly Island COR</a></dd>
				</dl>
			</div>
		</li>
	</ul>
</div>
		*/};
		
		source = source.toString().match(/\/\*([\s\S]*)\*\//)[1];
		
		var newBox = document.createElement("div");
		newBox.setAttribute('class', 'gmofooter_groupservice');
		newBox.innerHTML = source;
		cont.insertBefore(newBox, null);
	});
})();
//]]>

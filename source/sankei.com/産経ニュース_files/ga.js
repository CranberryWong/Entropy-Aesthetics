// 2014.8 UAのみ横断なし スマホリダイレクト対応あり
// 個別対応あり

// 値取得
if( document.cookie.match( /rdjs_ref=([^;]+)/ ) ){
	var rdjs_ref = RegExp.$1;
	(function() {
	  	var date1 = new Date();
	  	date1.setTime(0);
	  	document.cookie = "rdjs_ref=;path=/;expires="+date1.toGMTString();
  })();
} else {
	var rdjs_ref = null;
}


// ua

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
  ga('create', 'UA-36184830-62','sankei.com', {'name' : '62', 'allowLinker': true});	// pc+sp
  
  // lixilアンケートフォーム(さくらインターネットサーバ)とのリンク
  ga('62.require', 'linker');
  ga('62.linker:autoLink', ['sankei-lixil.com'] );
  
  ga('62.require', 'displayfeatures');

  // クライアントID設定
  ga(function() {
  	try{
		  var t = ga.getByName('62');
		  var cid = t.get('clientId');
		  ga('62.set', 'dimension7', cid || "none");
	
	}catch(e){}
  });

  
  // スマホリダイレクト対応
  if( rdjs_ref != null ){
    ga('62.set', 'referrer', rdjs_ref);
  }
  
  // 小ジャンル設定
  // コンテンツグループ設定
  (function(){
  	var genre,meta;
  	if(meta = document.getElementsByName("dcterms.type")[0]) genre = meta.getAttribute("content");
  	
  		// トップの振り分け設定
  		var loc = location.pathname;
  		var res = loc.match(/^(?:\/smp)?(\/[^/]+)?\/(|top\.htm|top\.html|index\.htm|index\.html|west\.html|photo\.html)$/);
  		if(res){
  			genre = "news_top";
  			if(res[1]) {
  				genre = res[1] + "_top";
  				genre = genre.replace("/","");
  			}
  		}
  	
	ga('62.set', 'dimension1', genre || "not set");
	
	// コンテンツグループ設定
	if(genre && genre.indexOf("el14_") >= 0 ){
		ga('62.set', 'contentGroup1', '衆院選2014'); 
	}
	
  })();
  
  // コンテンツ提供タイプ設定
  (function(){

  	var type,meta;
  	if(meta = document.getElementsByName("dcterms.abstract")[0]) type = meta.getAttribute("content");
  
  	ga('62.set', 'dimension5', type || "owned");

  
  })();

  
  // アウトブレイン対応
  (function(){
	  if(location.search.length > 0){
	  	// パラメータチェック
	  	
	  	var q = /(?:\?|&)obtp_src=([^?&]+?)(?:$|&)/.exec(location.search);
	  	if(q){
	  		var host = ""+location.hostname;
	  		var q_re = new RegExp(host.replace(/\./g,"\\.")+"$");
	  		if(q_re.test(q[1])){
	  			ga('62.set', 'dimension3', q[1]);
	  		}else{
	  			ga('62.set', 'dimension4', q[1]);
	  		}
	  	}
	  }
  })();
 
  // ページ間誘導チェック
  (function(){
	  if(location.search.length > 0){
	  	// パラメータチェック
	  	
	  	var label = {
	  		"rna" : "related news in article",
	  		"soe" : "sp origin edit"
	  	};
	  	
	  	var q = /(?:\?|&)pdm_ref=([^?&]+?)(?:$|&)/.exec(location.search);
	  	if(q && q[1] && label[q[1]]){
			ga('62.set', 'dimension3', label[q[1]]);
	  	}
	  }
  })();   
 
  
  // コンテンツURL設定
	(function(){
	
		var path = ""+location.pathname;
		path = path.replace(/^\/smp(\/)/, "$1");
		path = path.replace(/(-[a-z]+)(?:\d+)(\.html)/,"$1"+"1"+"$2");
		path = path.replace(/\/$/,"/top.html");


		var merge = path.match(/^(\/photo)?(\/[^/]+\/)(?:news|photos|print|expand)(\/\d{6}\/\w{13}-)(?:s|s\d+|n\d+|p\d+|l\d+|c)(\.html)$/);
		if(merge){

			path = (merge[1] ? merge[1] : "")+merge[2]+"news"+merge[3]+"n1"+merge[4];

		}

	  	ga('62.set', 'dimension6', path || "not set");

	
	})();

  
  // アプリアクセス確認
  if(/sankei_news_[A-Za-z]+?$/.test(navigator.userAgent)){
	ga('62.set', 'page', '/app' + location.pathname + ( location.search.length > 0 ? location.search : "" ));
  }

	// 記事情報設定
	(function() {
		// 記事ID
		var id = document.getElementsByName("dcterms.identifier")[0];
		if(id) { ga('62.set', 'dimension9', id.getAttribute("content") || "not set"); }
		
		// 原稿分類
		var manuscript = document.getElementsByName("dcterms.subject")[0];
		if(manuscript) { ga('62.set', 'dimension10', manuscript.getAttribute("content") || "not set"); }
		
		var maps = { pub01: "%e7%94%a3%e7%b5%8c%e6%96%b0%e8%81%9e", pub02: "%e3%82%b5%e3%83%b3%e3%82%b1%e3%82%a4%e3%82%b9%e3%83%9d%e3%83%bc%e3%83%84", pub03: "%e5%a4%95%e5%88%8a%e3%83%95%e3%82%b8", pub04: "%e3%83%93%e3%82%b8%e3%83%8d%e3%82%b9%e3%82%a2%e3%82%a4", pub07: "%e5%86%99%e7%9c%9f%e5%a0%b1%e9%81%93%e5%b1%80", pub08: "%e3%82%b5%e3%83%b3%e3%82%b9%e3%83%9dCOM", pub10: "%e5%85%b1%e5%90%8c%e9%80%9a%e4%bf%a1%e7%a4%be", pub11: "%e6%99%82%e4%ba%8b%e9%80%9a%e4%bf%a1", pub13: "%ef%bc%a1%ef%bc%b0", pub14: "%e3%83%ad%e3%82%a4%e3%82%bf%e3%83%bc", pub15: "%e5%a4%a7%e9%98%aa%e3%82%b5%e3%83%b3%e3%82%b9%e3%83%9d%e3%82%bf%e3%83%96", pub16: "%e3%82%a8%e3%82%a4%e3%83%88%e3%83%bbGallop", pub18: "%e4%ba%88%e6%83%b3%e7%8e%8b", pub19: "%e5%a4%a7%e9%98%aa%e9%80%9f%e5%a0%b1%e3%82%bb%e3%83%b3%e3%82%bf%e3%83%bc", pub20: "%e9%80%9f%e5%a0%b1%e3%82%bb%e3%83%b3%e3%82%bf%e3%83%bc", pub21: "%e5%9c%b0%e6%96%b9%e3%83%bb%e6%9d%b1", pub22: "%e5%9c%b0%e6%96%b9%e3%83%bb%e8%a5%bf", pub23: "%e7%94%a3%e7%b5%8cEXPRESS", pub24: "ITmedia%20News", pub25: "ITmedia%20Biz%2eID", pub26: "ITmedia%20%2bD", pub27: "Impress%20Watch", pub28: "USA%20TODAY", pub29: "The%20Economist", pub30: "%e7%94%a3%e7%b5%8cWeb", pub31: "ZAKZAK", pub32: "iza", pub33: "%e3%83%87%e3%82%b8%e3%82%bf%e3%83%ab%e7%94%bb%e5%83%8f", pub34: "%e4%ba%94%e8%bc%aa", pub35: "%e3%82%a2%e3%82%a4%e3%82%b7%e3%82%a7%e3%82%a2", pub36: "%e3%83%99%e3%83%8d%e3%83%83%e3%82%bb", pub37: "GettyImages", pub38: "goo%e3%83%a9%e3%83%b3%e3%82%ad%e3%83%b3%e3%82%b0", pub39: "%e3%82%86%e3%81%8b%e3%81%97%e3%83%a1%e3%83%87%e3%82%a3%e3%82%a2", pub40: "%e3%83%96%e3%83%ab%e3%83%bc%e3%83%a0%e3%83%90%e3%83%bc%e3%82%b0", pub41: "%e3%82%aa%e3%83%83%e3%82%af%e3%82%b9%e3%83%95%e3%82%a9%e3%83%bc%e3%83%89", pub42: "SPA%21", pub43: "%e3%83%95%e3%82%b8%e3%83%86%e3%83%ac%e3%83%93", pub45: "%e3%83%9d%e3%82%b9%e3%83%88%e3%82%bb%e3%83%96%e3%83%b3", pub46: "WIRED", pub47: "Goal%2ecom", pub48: "SUUMO", pub49: "PRESIDENT", pub50: "%40Press", pub51: "PRTIMES", pub52: "%e3%82%ab%e3%83%bc%e3%82%bb%e3%83%b3%e3%82%b5%e3%83%bc", pub53: "Digital%20PR%20Platform", pub54: "%e3%83%aa%e3%82%af%e3%83%8a%e3%83%93", pub55: "%e5%85%b1%e5%90%8cPRWire", pub56: "%e7%9e%ac%e5%88%8a%e3%83%aa%e3%82%b5%e3%83%bc%e3%83%81", pub57: "OKWave", pub58: "OKWave%e3%81%82%e3%82%8a%e3%81%8c%e3%81%a8%e3%81%86", pub59: "%e6%95%99%e3%81%88%e3%81%a6%e3%82%a6%e3%82%a9%e3%83%83%e3%83%81%e3%83%a3%e3%83%bc", pub60: "GQ", pub61: "%e7%ac%ac%e4%b8%80%e8%b2%a1%e7%b5%8c", pub62: "%e4%b8%ad%e5%9b%bd%e6%96%b0%e8%81%9e", pub63: "%e3%83%a9%e3%83%82%e3%82%aa%e3%83%97%e3%83%ac%e3%82%b9", pub64: "%e5%8f%b0%e6%b9%be%e7%b5%8c%e6%b8%88%e6%97%a5%e5%a0%b1", pub65: "%e3%83%81%e3%83%a3%e3%82%a4%e3%83%8a%e3%83%81%e3%83%bc%e3%83%8a", pub66: "%e4%b8%ad%e6%97%a5", pub67: "%e8%a5%bf%e6%97%a5%e6%9c%ac%e6%96%b0%e8%81%9e%e7%a4%be", pub68: "%e4%ba%9c%e5%b7%9e%ef%bc%a9%ef%bc%b2", pub70: "DIME", pub71: "at%20home", pub72: "%e3%81%84%e3%81%97%e3%82%83%e3%81%be%e3%81%a1", pub73: "coFFee%20doctors", pub74: "clicccar", pub75: "EX%e5%a4%a7%e8%a1%86", pub76: "%e3%82%a2%e3%83%97%e3%83%aa%e3%82%b9%e3%82%bf", pub77: "%e7%be%8e%e3%83%a9%e3%83%9c", pub78: "%e3%82%ad%e3%83%ac%e3%82%b3%e3%83%a9", pub79: "%e5%af%a9%e7%be%8e%e6%ad%af%e7%a7%91%e3%83%8d%e3%83%83%e3%83%88", pub81: "iLIP", pub82: "MISS%20CAM%20NEWS", pub85: "%e3%83%87%e3%82%a4%e3%83%aa%e3%83%bcNK%e3%82%b8%e3%83%a3%e3%83%91%e3%83%b3", pub90: "%e7%94%a3%e7%b5%8c%e3%83%87%e3%82%b8%e3%82%bf%e3%83%ab", pub91: "MSN%e7%94%a3%e7%b5%8c", pub92: "SankeiBiz", pub93: "%e3%83%ad%e3%83%bc%e3%82%ba", pub94: "%e3%82%bd%e3%83%8a%e3%82%a8", pub99: "%e3%81%9d%e3%81%ae%e4%bb%96" };
		
		// 出稿元(東西)
		var delivery = document.getElementsByName("dcterms.delivery")[0];
		if(delivery) {
			var deliveryContent = delivery.getAttribute("content");
			for(var key in maps) {
				if(deliveryContent === key) {
					deliveryContent = decodeURI(maps[key]);
					break;
				}
			}
			ga('62.set', 'dimension11', deliveryContent || "not set");
		}
		
		// 発行者
		var publisher = document.getElementsByName("dcterms.publisher")[0];
		if(publisher) {
			var publisherContent = publisher.getAttribute("content");
			for(var key in maps) {
				if(publisherContent === key) {
					publisherContent = decodeURI(maps[key]);
					break;
				}
			}
			ga('62.set', 'dimension13', publisherContent || "not set");
		}
	})();

  // ABテストグループ設定
  if(window.__AB_TEST_PERIOD__ && window.__AB_TEST_USER_GROUP_NAME__) {
  	ga('62.set', 'dimension8', window.__AB_TEST_USER_GROUP_NAME__);
  	ga('62.set', 'dimension12', window.__AB_TEST_USER_GROUP_NAME__);
  }

  // ページビューヒット
  ga('62.send', 'pageview');

//-----------------------
// for adsense
google_analytics_uacct = "UA-36184830-62";
google_analytics_domain_name = "sankei.com";
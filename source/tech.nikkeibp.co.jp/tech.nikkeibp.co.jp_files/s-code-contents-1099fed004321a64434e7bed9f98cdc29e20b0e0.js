
/*
AppMeasurement for JavaScript version: 2.2.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/

var bpTrackVars = bpTrackVars;
s_getLoadTime();

var s_account='';
if (location.hostname.match(/^(t-|s-|p-|oced)/)) {
  s_account = 'nbpstgprod';
} else {
  if (typeof bpTrackVars === "object") {
    s_account = bpTrackVars.config.adobe.reportSuite+',nbpmstallprod,nikkeicojpgrpmstallprod';
  } else if ((typeof bptTrackVars !== "object") && location.hostname.match(/^(ers.nikkeibp.co.jp|event.nikkeibp.co.jp|expo.nikkeibp.co.jp|ac.nikkeibp.co.jp|scfmcs.jp|woman-expo.com|www.woman-expo.com)/)) {
    s_account = 'nbpevtprod,nbpmstallprod,nikkeicojpgrpmstallprod';
  } else {
    s_account = 'nbpmstallprod,nikkeicojpgrpmstallprod';
  }
}

var s=s_gi(s_account);
s.account = s_account;

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */

s.events="event1";
s.cookieDomainPeriods="3";
s.visitorNamespace="nikkeibp";
s.currencyCode="JPY";
s.charSet="UTF-8";
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=false;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkTrackVars="None";
s.linkTrackEvents="None";

/* s.campaign, s.dstStart, s.dstEnd, s.currentYear, s._channel は、後述 s_doPlugins() で設定 */


/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
  s.linkInternalFilters="javascript:," + location.host  + ",g-signon.nikkeibp.co.jp";
  s.trackInlineStats=false;
  /* timeparting config variables */
  s.dstStart="1/1/2008";
  s.dstEnd="1/1/2008";
  s.currentYear=new Date().getFullYear();

  /* 下記グローバルオブジェクト変数は必須項目のため、必ず値は設定される */
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageUrl'))
    s.pageName = s.bpSetUrlNormalize(bpTrackVars.pageUrl.replace(/index\.\w+/,''));

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageServer'))
    s.server = bpTrackVars.pageServer;

  if (s.bpHasValueTrackVars(bpTrackVars, 'channel'))
    s.channel = 'NBP-' + bpTrackVars.channel + '-';

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'config.adobe.trackingServer'))
    s.trackingServer = bpTrackVars.config.adobe.trackingServer;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'config.adobe.trackingServerSecure'))
    s.trackingServerSecure = bpTrackVars.config.adobe.trackingServerSecure;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'exrTrackingCode')){
    s.campaign=bpTrackVars.exrTrackingCode;
    s.eVar70=s.eVar71='D=v0';
  }

  /* ======================================== 
   * prop 変数設定
   * ======================================== */
  if (typeof bpTrackVars !== "object") {
    // bpTrackVars 定義なし時、以下だけ設定
    // prop19
    s.prop19 = document.title;
    
    // prop13
    prop13_cookielength = document.cookie.length;
    prop13_cookievaluearray = document.cookie.split("; ");
    var prop13_loop = 0; 
    while (prop13_cookievaluearray[prop13_loop]){
      if (prop13_cookievaluearray[prop13_loop].substr(0,18) == "NID-Serial-Cookie="){
        s.prop13 = prop13_cookievaluearray[prop13_loop].substr(18,prop13_cookievaluearray[prop13_loop].length);
        break;
      }
      prop13_loop++;
    }
  }

  // prop1 は、「参照する変数全てが値あり」の場合のみ設定
  if (s.bpHasValueTrackVars(bpTrackVars, 'channel') && s.bpHasValueTrackVars(bpTrackVars, 'parentThemeName'))
    s.prop1 = s.bpConv(s.channel + bpTrackVars.parentThemeName);

  // prop2 は、「参照する変数全てが値あり」の場合のみ設定
  if ((s.prop1 != null && s.prop1 !== '') & (s.bpHasValueTrackVars(bpTrackVars, 'themeName')))
    s.prop2 = s.bpConv(s.prop1 + '-' + bpTrackVars.themeName);

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'section')) {
    if (bpTrackVars.section === '0') {
      s.prop3 = s.bpConv(bpTrackVars.pageTitle);
    } else {
      s.prop3 = s.bpConv(bpTrackVars.section);
    }
  }

  // prop4 は、「参照する変数全てが値あり」の場合のみ設定
  if (s.bpHasValueTrackVars(bpTrackVars, 'channel') && s.bpHasValueTrackVars(bpTrackVars, 'articleId'))
    s.prop4 = (s.channel + bpTrackVars.articleId);

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageNumber'))
    s.prop5 = bpTrackVars.pageNumber;

  s.prop6 = new Date(); s.prop6 = String(s.prop6.getHours());

  s.prop9=s.getTimeParting("h","9");
  s.prop10=s.getTimeParting("d","9");
  s.prop11=s.getTimeParting("w","9");

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'userId'))
    s.prop13 = bpTrackVars.userId;

  s.prop15 = s.getNewRepeat();

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageTitle'))
    s.prop19 = s.bpConv(bpTrackVars.pageTitle);

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'aggregateId'))
    s.prop20 = bpTrackVars.aggregateId;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'themeId'))
    s.prop21 = s.bpConv(bpTrackVars.themeId);

  if (s.bpHasValueTrackVars(bpTrackVars, 'repTieupId')) {
    // bpTrackVars.repTieupId の値あり時 ⇒ prop22 には repTieupId の値をセット
    s.prop22 = s.bpConv(bpTrackVars.repTieupId);
  } else if (s.bpIsDefinedTrackVars(bpTrackVars, 'tieupId')) {
    //  bpTrackVars.repTieupId の値なし時 ⇒ prop22 には tieupId の値をセット
    s.prop22 = s.bpConv(bpTrackVars.tieupId);
  }

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'parentTitle'))
    s.prop23 = s.bpConv(bpTrackVars.parentTitle);

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'displayAuthorName'))
    s.prop24 = s.bpConv(bpTrackVars.displayAuthorName);

  s.prop28 = location.protocol + '//' + location.host + location.pathname.replace(/index\.\w+$/, '');
  if (location.search.replace(/^\?/, '&').match(/&P=(\d+)/)){
   if (RegExp.$1 != '1')
    s.prop28 += '?P=' + RegExp.$1;
  }
  if (location.search.replace(/^\?/, '&').match(/&ST=([\w\-]+)/)){
    if (s.prop28.indexOf('?') >= 0)
      s.prop28 += '&ST=' + RegExp.$1;
    else
      s.prop28 += '?ST=' + RegExp.$1;
  }
  s.prop28 = s.bpSetUrlNormalize(s.prop28);

  //s.prop26=s.getPreviousValue(s.prop28,'s_ppn');
  //s.prop27=s.getPercentPageViewed();
  //if(!s.prop26||s.prop26=='no value')s.prop27='';

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'userAgent'))
    s.prop30 = bpTrackVars.userAgent;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'authResult'))
    s.prop32 = bpTrackVars.authResult;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'authKind'))
    s.prop33 = bpTrackVars.authKind;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'publishDate'))
    s.prop42 = bpTrackVars.publishDate;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'category'))
    s.prop43 = bpTrackVars.category;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'mediaId'))
    s.prop44 = bpTrackVars.mediaId;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'tagName'))
    s.prop47 = bpTrackVars.tagName;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageStatus'))
    s.prop48 = bpTrackVars.pageStatus;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'authorName'))
    s.prop49 = s.bpConv(bpTrackVars.authorName);

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'userStatus'))
    s.prop50 = bpTrackVars.userStatus;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'genre'))
    s.prop51 = bpTrackVars.genre;

  if (s.bpHasValueTrackVars(bpTrackVars, 'repTieupId')) {
    // bpTrackVars.repTieupId の値あり時 ⇒ prop52 には repTieupId の値をセット
    s.prop52 = s.getNewRepeat('','s_nr_'+ bpTrackVars.repTieupId);
  } else if (s.bpHasValueTrackVars(bpTrackVars, 'tieupId')) {
    // bpTrackVars.repTieupId の値なし、bpTrackVars.tieupId の値あり時  ⇒ prop52 には tieupId の値をセット
    s.prop52 = s.getNewRepeat('','s_nr_'+ bpTrackVars.tieupId);
  } else if (s.bpIsDefinedTrackVars(bpTrackVars, 'subDomain')) {
    // 上記該当しない ⇒ prop52 には subDomain の値をセット。
    s.prop52 = s.getNewRepeat('','s_nr_' + bpTrackVars.subDomain);
  }

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'searchTagName'))
    s.prop53 = bpTrackVars.searchTagName;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'searchKeyword')) {
    var keyword = decodeURIComponent(decodeURIComponent(bpTrackVars.searchKeyword));
    keyword = s.bpConvSpace(keyword);
    s.prop54 = keyword.replace(/ /g,';');
  }

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageUrl'))
    s.prop55 = bpTrackVars.pageUrl.replace(/^https?:\/\//, '');

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'articleId'))
    s.prop56 = bpTrackVars.articleId;

  s.prop57 = s.prop28.replace(/^https?:\/\//, '');

  /* ======================================== 
   * eVar 変数設定
   * ======================================== */
  s.eVar1 = s.pageName;
  s.eVar57 = 'D=c32';
  s.eVar58 = 'D=c30';
  s.eVar59 = 'D=c33';
  s.eVar60 = 'D=c54';
  s.eVar61 = 'D=c13';
  s.eVar63 = s.bpSetUrlNormalize(location.protocol + '//' + location.host + location.pathname.replace(/index\.\w+$/, ''));
  s.eVar64 = 'D=c2';
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageReferrer'))
    s.eVar65 = bpTrackVars.pageReferrer;

  s.eVar67 = 'D=c15';
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'articlePageTotalNo'))
    s.eVar73 = bpTrackVars.articlePageTotalNo;

  /* s.eVar76, s.eVar77, s.eVar84 は後述処理で設定 */

  /* ======================================== 
   * list 変数設定
   * ======================================== */
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'tagName'))
    s.list1 = bpTrackVars.tagName;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'userStatus'))
    s.list2 = bpTrackVars.userStatus;

  /* ======================================== 
   * 全ページイベント計測
   * ======================================== */
  if ( !s.events ) s.events = "";
  s.events=s.apl(s.events,"event1",",",1);

  /* ======================================== 
   * products、purchaseID 設定
   *
   * ※products 変数は、
   *   bpTrackVars.product.name、count、price に
   *   値がある場合のみ設定
   *
   * ======================================== */
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.name') && bpTrackVars.product.name) {

    // カテゴリ判別
    var category;
    if (s.bpIsDefinedTrackVars(bpTrackVars, 'pageStatus')) {
      if (bpTrackVars.pageStatus.match(/^UEXH/)) {
        category = "exhibition";
      } else if (bpTrackVars.pageStatus.match(/^UREG/)) {
        category = "seminar_single";
      } else if (bpTrackVars.pageStatus.match(/^UREM/)) {
        category = "seminar_multi";
      }
    }

    // s.products 変数に値を設定
    s.products = s.bpGetProductsValue(category, bpTrackVars.product.name, bpTrackVars.product.count, bpTrackVars.product.price,bpTrackVars.product.id);
  }

  /* purchaseID */
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.purchaseId'))
    s.purchaseID = bpTrackVars.product.purchaseId;
  
  /* ======================================== 
   * product のイベント設定
   *
   *  ※下記イベントは、
   *   bpTrackVars.product.name、count、price に
   *   値がある場合のみ設定
   *
   * ======================================== */
  // 購入イベント
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.purchase')) {
    if (bpTrackVars.product.purchase === true) {
      s.events = s.apl(s.events,"purchase",",",1);
      s.events = s.apl(s.events,"event98",",",1);
    }
  }
  // 製品表示
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.prodView')) {
    if (bpTrackVars.product.prodView === true) {
      s.events = s.apl(s.events,"prodView",",",1);
    }
  }
  // かご追加
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.addCart')) {
    if (bpTrackVars.product.addCart === true) {
      s.events = s.apl(s.events,"scAdd",",",1);
    }
  }
  //かご削除
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.deleteCart')) {
    if (bpTrackVars.product.deleteCart === true) {
      s.events = s.apl(s.events,"scRemove",",",1);
    }
  }
  //かご表示
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.scView')) {
    if (bpTrackVars.product.scView === true) {
      s.events = s.apl(s.events,"scView",",",1);
    }
  }
  //チェックアウトプロセス開始
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'product.scCheckout')) {
    if (bpTrackVars.product.scCheckout === true) {
      s.events = s.apl(s.events,"scCheckout",",",1);
    }
  }

  /* ======================================== 
   * 内部キャンペーン
   * ======================================== */
  if (s.bpIsDefinedTrackVars(bpTrackVars, 'inTrackingCode'))
    s.eVar76 = bpTrackVars.inTrackingCode;

  if (s.bpIsDefinedTrackVars(bpTrackVars, 'sTrackingCode'))
    s.eVar84 = bpTrackVars.sTrackingCode;


  /* ======================================== 
   * 流入計測
   * ======================================== */
  s.channelManager('n_cid','','','0','s_cm','1');
  if (s._channel && s._channel != 'n/a') {
    if (s._channel == 'Other Natural Referrers'  || s._channel == 'Unknown Paid Channel') {
          if (s._referringDomain && s._referringDomain.match(/search\.yahoo\.com|search.yahoo\.co\.jp/) ) {
            s._channel = 'Organic Search';
          } else {
            s._channel = "Etc";
          }
    } else if (s._channel == 'Paid Search') {
      s._channel = 'Paid Search';
    } else if (s._channel == 'Natural Search') {
      s._channel = 'Organic Search';
    }

    if (s._referrer && s._referrer.match(/android-app:\/\/com\.google\.android\.gm|android-app:\/\/com\.google\.android\.googlequicksearchbox|www\.googleapis\.com/) ) {
      s._channel = "Android Google Search";
    }
    
    if (s._referringDomain && s._referringDomain.match(/m\.facebook\.com|l\.facebook\.com|lm\.facebook\.com|m\.facebook\.com|t\.co|www\.facebook\.com|business.facebook.com/) ) {
      s._channel = "SNS";
    }

    if (s._referringDomain && s._referringDomain.match(/b\.hatena\.ne\.jp|feedly\.com|newspicks\.com|officetanaka\.net|www\.hatena\.ne\.jp|www\.inoreader\.com|www\.msn\.com|www\.smartnews\.com|www\.st\.ryukoku\.ac\.jp|getpocket\.com|green\.search\.goo\.ne\.jp|ja\.wikipedia\.org|kamel\.io|m\.newspicks\.com|news\.google\.co\.jp|news\.google\.com|newspicks\.com|www\.inoreader\.com|blog\.livedoor\.jp|feed\.meltwater\.com|kabooo\.net|lithiumion\.info|www\.iotcert\.org|www\.patentsalon\.com|socialife\.app\.sony\.jp|mactree\.sannet\.ne\.jp/) ) {
      s._channel = "CurationApp";
    }

    if (s._referringDomain && s._referringDomain.match(/portal\.nws\.ricoh\.co\.jp|shimbun\.is\.nttdocomo\.co\.jp|gips\.sws\.com|webguide\.asia\.tel\.com|wml\.in\.kyocera\.co\.jp|www\.toshiba-medical\.co\.jp/) ) {
      s._channel = "Company/Organization";
    }

    if (s._referringDomain && s._referringDomain.match(/nikkei\.com/) ) {
      s._channel = "Site - nikkei.com";
    }

    if (s._referringDomain && s._referringDomain.match(/nikkeibp\.co\.jp/) ) {
      s._channel = "Site - xxxx.nikkeibp.co.jp";
    }

    if (s.campaign) {
      if (s.campaign.match(/twed|twcm|twbn|fbed|fbbn/)) {
        s._channel = "SNS";
      } else if (s.campaign.match(/pvyr|case|casa|casr|casm|enco|calr|cant/)) {
        s._channel = "CurationApp";
      } else if (s.campaign.match(/_ml/)) {
        s._channel = "Mail";
      } else if (s.campaign.match(/nbpds|ds99999/)) {
        s._channel = "Site - nikkei.com";
      } else if (s.campaign.match(/ad/)) {
        s._channel = "Ad";
      }
    }

    s.events = s.apl(s.events,"event117",",",1);
    s.eVar77 = s._channel;
  }

  /* ======================================== 
   * 記事ページ完読率計測
   * ======================================== */
  s.setArticleReadRate();

  /* ======================================== 
   * ページロード時間計測
   * ======================================== */
  s.prop29=String(s_getLoadTime());
}
s.doPlugins=s_doPlugins;


/* Plugins */
/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");


/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 */

s.getTimeParting=new Function("t","z",""
+"var s=this,cy;dc=new Date('1/1/2000');"
+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
+"if(t=='d'){return dow};if(t=='w'){return dt}}};");



/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


/*
 * Plugin: getPercentPageViewed v1.71
 */
s.getPercentPageViewed=new Function("n",""
+"var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load"
+"','unload','scroll','resize','zoom','keyup','mouseup','touchend','o"
+"rientationchange','pan'];W.s_Obj=s;s_PPVid=(n=='-'?s.pageName:n)||s"
+".pageName||location.href;if(!W.s_PPVevent){s.s_PPVg=function(n,r){v"
+"ar k='s_ppv',p=k+'l',c=s.c_r(n||r?k:p),a=c.indexOf(',')>-1?c.split("
+"',',10):[''],l=a.length,i;a[0]=unescape(a[0]);r=r||(n&&n!=a[0])||0;"
+"a.length=10;if(typeof a[0]!='string')a[0]='';for(i=1;i<10;i++)a[i]="
+"!r&&i<l?parseInt(a[i])||0:0;if(l<10||typeof a[9]!='string')a[9]='';"
+"if(r){s.c_w(p,c);s.c_w(k,'?')}return a};W.s_PPVevent=function(e){va"
+"r W=window,D=document,B=D.body,E=D.documentElement,S=window.screen|"
+"|0,Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWid"
+"th',Hc='clientHeight',C=100,M=Math,J='object',N='number',s=W.s_Obj|"
+"|W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e=e.subs"
+"tring(2);s_PPVi=W.s_PPVi||0;if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s"
+"_PPVt=0;if(s_PPVi<2)s_PPVi++}if(typeof s==J){var h=M.max(B[Hs]||E[H"
+"s],B[Ho]||E[Ho],B[Hc]||E[Hc]),X=W.innerWidth||E[Wc]||B[Wc]||0,Y=W.i"
+"nnerHeight||E[Hc]||B[Hc]||0,x=S?S.width:0,y=S?S.height:0,r=M.round("
+"C*(W.devicePixelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p"
+"=h>0&&b>0?M.round(C*b/h):0,O=W.orientation,o=!isNaN(O)?M.abs(o)%180"
+":Y>X?0:90,L=e=='load'||s_PPVi<1,a=s.s_PPVg(s_PPVid,L),V=function(i,"
+"v,f,n){i=parseInt(typeof a==J&&a.length>i?a[i]:'0')||0;v=typeof v!="
+"N?i:v;v=f||v>i?v:i;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iPod|i"
+"Pad|iPhone)').exec(navigator.userAgent||'')&&o){o=x;x=y;y=o}o=o?'P'"
+":'L';a[9]=L?'':a[9].substring(0,1);s.c_w('s_ppv',escape(W.s_PPVid)+"
+"','+V(1,p,L)+','+(L||!V(2)?p:V(2))+','+V(3,b,L,1)+','+X+','+Y+','+x"
+"+','+y+','+r+','+a[9]+(a[9]==o?'':o))}if(!W.s_PPVt&&e!='unload')W.s"
+"_PPVt=setTimeout(W.s_PPVevent,333)};for(var f=W.s_PPVevent,i=0;i<E."
+"length;i++)if(EL)EL(E[i],f,false);else if(AE)AE('on'+E[i],f);f()};v"
+"ar a=s.s_PPVg();return!n||n=='-'?a[1]:a");


/*
 * s.trackSendPartner
 */
s.trackSendPartner = function (element,to_url,from_url,is_delay_cancel) {
	var s = this;
	var _delay_cancel = (is_delay_cancel) ? true : false;

	// track_object
	var track_object = {
		'prop22':s.prop22,
		'eVar78':(!to_url) ? 'undefined' : to_url,
		'eVar79':(!from_url) ? location.href : from_url,
		'events':"event91"
	};

	var is_a = s.checkIsAtag(element);
	if (is_a && !to_url) {
		track_object.eVar78 = element.href;
	}

	s.trackClick(element,'trackSendPartner',track_object);

	if (is_a > 0  && !_delay_cancel)  {
		var url = element.href;
		setTimeout(
			function() {
				switch (is_a) {
					case 1:
						window.location.href = url;
						break;
					case 2:
						window.parent.location.href = url;
						break;
					case 3:
						window.top.location.href = url;
						break;
				}
			},
			500
		);
		return false;
	}
	return true;
};


/*
 * s.checkIsAtag
 */
s.checkIsAtag = function(element){
	var _ret = 0;
	if ( element
	   && typeof element == 'object'
	   && typeof element.tagName !== "undefined" 
	   && element.tagName.toLowerCase() == 'a'
	   && typeof element.href !== "undefined"
	) {
		_ret = 1;
		if ((!element.target || element.target == "_self" )) {
			if (element.target == "_parent") {
				_ret = 2;
			} else if (element.target == "_top") {
				_ret = 3;
			}
		}
	}
	return _ret;
};

/*
 * s.backup_tracking_setting
 */
s.backup_tracking_setting = function(append_hash) {
	var s = this;
	s._backup_params = {
		'linkTrackVars' : s.linkTrackVars,
		'linkTrackEvents' : s.linkTrackEvents,
		'usePlugins' : s.usePlugins
	};
	if (append_hash) {
		for (var i in append_hash) {
			s._backup_params[i] = append_hash[i];
		}
	}
	return ;
};


/*
 * s.recover_tracking_setting
 */
s.recover_tracking_setting = function() {
	var s = this;
	if (s._backup_params) {
		for (var i in s._backup_params) {
			s[i] = s._backup_params[i];
			s._backup_params[i] = '';
		}
	}
	return ;
};

/* 文字列変換関数 (制御コード等あれば削除、先頭から33文字にカット）*/
s.bpConv = function(str){
  if (str) {
    str = str.replace(/[^\u0020-\u007E\u00A1-\u00AC\u00AE-\u00FF\u0370-\u04FF\u3005\u3007\u303B\u3220-\u3243\u3280-\u32B0\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uC200-\uC3FF\uDC00-\uDFFF\u2010-\u2312\u2600-\u26FF\u3041-\u3093\u30A1-\u30F6\u3000-\u301C\u309B-\u309E\u30FB-\u30FE\u4E00-\u9FCC\uFFE3\u818F\uFF5E\uFF01-\uFF5D\uFF61-\uFF9F]/g, '');
   str = str.replace(/^(.{33}).*$/, '$1');
  }
  return(str);
}

/* 文字列変換関数 (エスケープが必要な特殊文字、全角スペースの連続、半角スペースの連続を半角スペース1つに変換。前後の空白除去）*/
s.bpConvSpace = function(str){
  if (str) {
    str = str.replace(/[\!\$\&\(\)\*\+\-\.\/\:\[\\\]\^\{\|\}\?~`#%"',;<=>@_]/g, ' ');
    str = str.replace(/　+/g, ' ');
    str = str.replace(/ +/g,' ');
    str = str.trim();
  }
  return(str);
}

/* URL標準化 */
s.bpSetUrlNormalize = function(str){
  if (str && /file\:\/\//.test(str)) {
        str = '';
  }
  return(str);
}

/* グローバルオブジェクト変数 定義済か判定 (定義あり = true, 未定義(undefined)の場合、false) */
s.bpIsDefinedTrackVars = function(obj, key){
  if (obj == null || key == null) return false;

  var k = key.split('.');
  for (var i = 0, v = obj; i < k.length; i++) {
    if (!(k[i] in v)) {
      return false;
    }
    v = v[k[i]];
  }
  return true;
}

/* グローバルオブジェクト変数 値ありか判定 (値あり = true, 未定義(undefined)か空文字の場合、false) */
s.bpHasValueTrackVars = function(obj, key){
  if (obj == null || key == null) return false;

  var k = key.split('.');
  for (var i = 0, v = obj; i < k.length; i++) {
    if (!(k[i] in v)) {
      return false;
    }
    v = v[k[i]];
  }
  if (v === '') {
    return false;
  }
  return true;
}

/* 
 * s.getProductsValue : s.products 変数にセットする値を取得
 */
s.bpGetProductsValue = function(category, name, count, price, id){
  var name_arr;
  var count_arr;
  var price_arr;
  var id_arr;

  // カテゴリ、製品名なし時は空文字返す
  if ((category == null || category === '') && 
      (name == null || name === '')) {
    return '';
  }

  // 取得した値を「,」で区切って配列に格納
  name_arr = name.split(",");
  if (count != null && count != '') 
    count_arr = count.split(",");
  if (price != null && price != '') 
    price_arr = price.split(",");
  if (id != null && id != '') 
    id_arr = id.split(",");

  // ループしてproductsの中身を作成
  var i = 0;
  var PRODUCT_MAX_LEN = 30;
  var products_arr = new Array();
  while (name_arr[i]){
    // カテゴリ＋製品ID(=製品名)
    products_arr[i] =  category + ';' + name_arr[i].slice(0, [PRODUCT_MAX_LEN]);

    // 製品数、製品価格の双方に値ある場合のみ、products に 製品数、合計金額（製品数 * 製品価格)を追加
    if ((count_arr != null && count_arr[i] != null) && 
        (price_arr != null && price_arr[i] != null)) {
      products_arr[i] += ';' + count_arr[i];
      products_arr[i] += ';' + (count_arr[i] * price_arr[i]);
    } else {
      // 製品数、製品価格のいずれかが空文字の場合は合計金額を計算できない。⇒製品数、合計金額は空文字とする
      products_arr[i] += ';;';
    }
    // products に 製品数、合計金額（製品数 * 製品価格)を追加
    if (id_arr != null && id_arr[i] != null) { 
      products_arr[i] += ';;eVar85=' + id_arr[i];
    } else {
      products_arr[i] += ';;eVar85=';
    }
    i++;
  }
  return products_arr.join(',');
};


/* ================================
 * Append Plugins
 * ================================ */
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * channelManager v2.82AM - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f","g",""
+"var s=this,h=new Date,i=0,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E"
+",F,G,H,I,J,K,L,M,N,O,P,Q,R,S;h.setTime(h.getTime()+1800000);if(e){i"
+"=1;if(s.c_r(e))i=0;if(!s.c_w(e,1,h))s.c_w(e,1,0);if(!s.c_r(e))i=0;i"
+"f(f&&s.c_r('s_tbm'+f))i=0;}j=s.referrer?s.referrer:document.referre"
+"r;j=j.toLowerCase();if(!j)k=1;else {l=j.indexOf('?')>-1?j.indexOf('"
+"?'):j.length;m=j.substring(0,l);n=s.split(j,'/');n=s.split(n[2],'?'"
+");o=n[0].toLowerCase();p=s.linkInternalFilters.toLowerCase();p=s.sp"
+"lit(p,',');for(q=0;q<p.length;q++){r=o.indexOf(p[q])==-1?'':j;if(r)"
+"break;}}if(!r&&!k){t=j;u=v=o;w='Other Natural Referrers';x=s.seList"
+"+'>'+s._extraSearchEngines;if(d==1){m=s.replace(m,'oogle','%');m=s."
+"replace(m,'ahoo','^');j=s.replace(j,'as_q','*');}y=s.split(x,'>');f"
+"or(z=0;z<y.length;z++){A=y[z];A=s.split(A,'|');B=s.split(A[0],',');"
+"for(C=0;C<B.length;C++){D=m.indexOf(B[C]);if(D>-1){if(A[2])E=v=A[2]"
+";else E=o;if(d==1){E=s.replace(E,'#',' - ');j=s.replace(j,'*','as_q"
+"');E=s.replace(E,'^','ahoo');E=s.replace(E,'%','oogle');}F=s.split("
+"A[1],',');for(G=0;G<F.length;G++){if(j.indexOf(F[G]+'=')>-1||j.inde"
+"xOf('https://www.google.')==0)H=1;I=s.Util.getQueryParam(F[G],j).to"
+"LowerCase();if(H||I)break;}}if(H||I)break;}if(H||I)break;}}if(!r||g"
+"!='1'){r=s.Util.getQueryParam(a,'',b);if(r){v=r;if(E)w='Paid Search"
+"';else w='Unknown Paid Channel';}if(!r&&E&&H){v=E;w='Natural Search"
+"';}}if(k==1&&!r&&i==1)t=u=v=w='Typed/Bookmarked';J=s._channelDomain"
+";if(J&&o){K=s.split(J,'>');for(L=0;L<K.length;L++){M=s.split(K[L],'"
+"|');N=s.split(M[1],',');O=N.length;for(P=0;P<O;P++){Q=N[P].toLowerC"
+"ase();R=o.indexOf(Q);if(R>-1){w=M[0];break;}}if(R>-1)break;}}J=s._c"
+"hannelParameter;if(J){K=s.split(J,'>');for(L=0;L<K.length;L++){M=s."
+"split(K[L],'|');N=s.split(M[1],',');O=N.length;for(P=0;P<O;P++){R=s"
+".Util.getQueryParam(N[P]);if(R){w=M[0];break;}}if(R)break;}}J=s._ch"
+"annelPattern;if(J){K=s.split(J,'>');for(L=0;L<K.length;L++){M=s.spl"
+"it(K[L],'|');N=s.split(M[1],',');O=N.length;for(P=0;P<O;P++){Q=N[P]"
+".toLowerCase();R=r.toLowerCase();S=R.indexOf(Q);if(S==0){w=M[0];bre"
+"ak;}}if(S==0)break;}}S=w?r+u+w+I:'';c=c?c:'c_m';if(c!='0')S=s.getVa"
+"lOnce(S,c,0);if(S){s._campaignID=r?r:'n/a';s._referrer=t?t:'n/a';s."
+"_referringDomain=u?u:'n/a';s._campaign=v?v:'n/a';s._channel=w?w:'n/"
+"a';s._partner=E?E:'n/a';s._keywords=H?I?I:'Keyword Unavailable':'n/"
+"a';if(f&&w!='Typed/Bookmarked'){h.setTime(h.getTime()+f*86400000);s"
+".c_w('s_tbm'+f,1,h);}}");
/* Top 130 Search Engines - Grouped */
s.seList="google.,googlesyndication.com|q,as_q|Google>yahoo.com,yahoo"
+".co.jp|p,va|Yahoo!>bing.com|q|Bing>altavista.co,altavista.de|q,r|Al"
+"taVista>.aol.,suche.aolsvc.de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>w"
+"ww.baidu.com|wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|i"
+"cq>myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|N"
+"aver>netscape.com|query,search|Netscape Search>reference.com|q|Refe"
+"rence.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www."
+"tiscali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text"
+"|Yandex.ru>search.cnn.com|query|CNN Web Search>search.earthlink.net"
+"|q|Earthlink Search>search.comcast.net|q|Comcast Search>search.rr.c"
+"om|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: getValOnce_v1.1
 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");


/*
 * s.get_contextData_keys: get contextData keys (canma separated)
 */
s.get_contextData_keys = function() {
  var s = this;
  var x = "contextData" in s ? s.contextData : null;
  if (!x || typeof x !== "object") {
    return "";
  }

  // get array 
  var a = s.get_contextData_keys_sub(new Array(),x,"contextData");

  return a.join(",");
};

/*
 * s.get_contextData_keys_sub: get contextData keys array
 */
s.get_contextData_keys_sub = function(_ret, obj, vname) {
  var s = this;
  if (typeof obj === "object") {
    for (var i in obj) {
      _ret = s.get_contextData_keys_sub(_ret, obj[i], vname + "." + i);
    }
  } else if (typeof obj === "function" ) {
    // _ret.push(vname);
  } else {
    _ret.push(vname);
  }
  return _ret;
};

/*
 * s.trackClickDelay
 */
s.trackClickDelay = function(element, area_name, action_name) {
  var s = this;
  s.trackClick_ed(element,area_name,action_name);

  try {
    if ( typeof element == 'object'
       && element.tagName.toLowerCase() == 'a'
       && typeof element.href !== "undefined" 
       && (!element.target || element.target == "_self")
    )  {
      var url = element.href;
      setTimeout(
        function() {
          location.href = url;
        },
        500);
      return false;
    }
  } catch (e) {};

  return true;
};


/*
 * s.trackClick
 */
s.trackClick = function(element,action_name,track_object) {
	if (!action_name) action_name = 'trackClick';

	var s = this;

	if ( track_object && (typeof track_object).toLowerCase() == "object") {
		var _trackVars_keys_object = [];

		s.backup_tracking_setting();

		// 2016.04.26 append code to track contextData
		if (typeof track_object.contextData === "object") {
			s.contextData = track_object.contextData;
			
			// 2017.05.18 
			_trackVars_keys_object.push(s.get_contextData_keys());
		}

		for ( var i in track_object) {
			if ( i.match(/^(prop|eVar)[0-9]+/) || i == 'events' ) {
				s[i] = track_object[i];
				_trackVars_keys_object.push(i);
			}
		}

		s.usePlugins = false;

		// 2017.05.18 
		s.linkTrackVars = _trackVars_keys_object.join(",");

		s.events = (!track_object['events']) ? '' : track_object['events'];
		s.linkTrackEvents = s.events;

		if (element) {
			s.tl(element,'o',action_name);
		} else {
			s.tl(true,'o',action_name);
		}
		s.recover_tracking_setting();
	}
};


/*
 * s.trackClick_ed
 */
s.trackClick_ed = function(element,area_name,action_name) {
  var s = this;
  s.backup_tracking_setting();

  s.usePlugins = false;
  s.events = "";

  // contextData
  s.contextData = new Object();
  s.eVar80 = (!area_name) ? 'No Area Name' : area_name;
  // 2016.04.26 append code to track contextData
  s.eVar81 = s.prop19;

  // 2017.05.18 
  if (!s.eVar81) {
    s.eVar81 = (typeof window.pageTitle !== "undefined" && window.pageTitle) ? window.pageTitle : document.title;
    if (s.eVar81 && typeof window.conv === "function") {
      try {
        s.eVar81 = window.conv(s.eVar81);
      } catch (e) {};
    }
  }

  if (!action_name) {
    action_name = 'No Action Name';
  } else {
    switch(action_name.toLowerCase()) {
      case 'login':
        action_name = 'Login';
        s.events = 'event88';
        break;

      case 'member':
        action_name = 'Member';
        s.events = 'event89';
        break;

      default:
        break;
    }
  }

  s.linkTrackVars = "events,eVar80,eVar81";
  s.linkTrackEvents = s.events;

  if (element) {
    s.tl(element,'o','trackClick_ed_' + action_name);
  } else {
    s.tl(true,'o','trackClick_ed_' + action_name);
  }

  s.recover_tracking_setting();
};


/*
 * s.trackLinkClick
 */
s.trackLinkClick = function (element,link_name,is_delay_cancel) {
	var s = this;
	var _delay_cancel = (is_delay_cancel) ? true : false;

	// track_object
	var track_object = {
		'prop45' : (!link_name) ? 'undefined' : link_name,
		'prop46' : s.prop28
	};

	var is_a = s.checkIsAtag(element);
	if (is_a && !link_name) {
		track_object.prop45 = element.href;
	}

	// append eVars and events 2016.07.05 
	track_object.eVar78 = track_object.prop45;
	track_object.eVar79 = track_object.prop46;
	track_object.events = 'event91';

	s.trackClick(element,'trackLinkClick',track_object);

	if (is_a > 0  && !_delay_cancel)  {
		var url = element.href;
		setTimeout(
			function() {
				switch (is_a) {
					case 1:
						window.location.href = url;
						break;
					case 2:
						window.parent.location.href = url;
						break;
					case 3:
						window.top.location.href = url;
						break;
				}
			},
			500
		);
		return false;
	}
	return true;
};

/*
 * s.trackSNS
 */
s.trackSNS = function(sns_name){
  var s = this;

  s.backup_tracking_setting();

  if (!sns_name) sns_name = "any sns";
  sns_name = sns_name.toLowerCase();
  switch (sns_name) {
    case 'twitter':
      s.events = "event96";
      break;

    case 'facebook':
      s.events = "event90";
      break;

    default:
      return ;
  }

  s.usePlugins = false;
  s.linkTrackVars = "events,eVar82";
  s.linkTrackEvents = s.events;
  s.eVar82 = (!s.pageName) ? location.href : s.pageName;
  s.tl(true, "o", sns_name);

  s.recover_tracking_setting();
}; 

/*
 * Plugin: exitLinkHandler - for AppMesurement 
 */
s.exitLinkHandler = s.exitLinkHandler2 = function (p) {
	var s = this;
	var h = ("linkObject" in s) ? s.linkObject : null;
	if(!h||!h.href||s.linkType!="e")return'';
	return h.href;
};

/*
 * Article Read Rate 
 */
s.setArticleDefine = [];
s.setArticleDefine[0] = {
     '25': {page:0}, //  1 - 25
     '50': {page:0}, // 26 - 50
     '75': {page:0}, // 51 - 75
     '99': {page:0}, // 76 - 99
    '100': {page:0}  // 100 
};
s.setArticleDefine[1] = {
     '25': {page:1},
     '50': {page:1},
     '75': {page:1},
     '99': {page:1},
    '100': {page:1}
};
s.setArticleDefine[2] = {
     '25': {page:1},
     '50': {page:1},
     '75': {page:2},
     '99': {page:2},
    '100': {page:2}
};
s.setArticleDefine[3] = {
     '25': {page:1},
     '50': {page:1},
     '75': {page:2},
     '99': {page:3},
    '100': {page:3}
};
s.setArticleDefine[4] = {
     '25': {page:1},
     '50': {page:2},
     '75': {page:3},
     '99': {page:4},
    '100': {page:4}
};
s.setArticleDefine[5] = {
     '25': {page:1},
     '50': {page:2},
     '75': {page:3},
     '99': {page:4},
    '100': {page:5}
};
s.setArticleDefine[6] = {
     '25': {page:1},
     '50': {page:2},
     '75': {page:4},
     '99': {page:5},
    '100': {page:6}
};
s.setArticleDefine[7] = {
     '25': {page:1},
     '50': {page:2},
     '75': {page:4},
     '99': {page:6},
    '100': {page:7}
};
s.setArticleDefine[8] = {
     '25': {page:1},
     '50': {page:3},
     '75': {page:5},
     '99': {page:7},
    '100': {page:8}
};
s.setArticleDefine[9] = {
     '25': {page:1},
     '50': {page:3},
     '75': {page:5},
     '99': {page:7},
    '100': {page:9}
};
s.setArticleDefine[10] = {
     '25': {page:1},
     '50': {page:3},
     '75': {page:6},
     '99': {page:8},
    '100': {page:10}
};

/*
 * Plugin: setArticleReadRate 1.0 
 */
/*
 * Plugin: setArticleReadRate 1.0 
 */
s.setArticleReadRate = function() {
  var s = this,
    _articleInfo = {
      'articlePageNo' : ('prop5' in s) ? s.prop5 : ('articlePageNo' in window) ? window.articlePageNo : 0,
      'articlePageTotalNo' : ('eVar73' in s) ? s.eVar73 : ('articlePageTotalNo' in window) ? window.articlePageTotalNo : 0,
      'rate_per_page' : 0,
      'tracking' : {
        events : '',
        eVar73 : '',
        eVar74 : 'D=c3'
      },
      'calc_readrate' : 0
    };

  // define eVar73 value  
  _articleInfo.tracking.eVar73 = _articleInfo.articlePageTotalNo;

  // check parameter 
  if (!_articleInfo.articlePageNo || !_articleInfo.articlePageTotalNo 
    || !isFinite(_articleInfo.articlePageNo) || !isFinite(_articleInfo.articlePageTotalNo)
    || !s.prop3 ) {
    return ;
  }

  // cast 
  _articleInfo.articlePageNo = Number(_articleInfo.articlePageNo);
  _articleInfo.articlePageTotalNo = Number(_articleInfo.articlePageTotalNo);

  // no page total or ellegal 
  if (_articleInfo.articlePageTotalNo < 1 || _articleInfo.articlePageTotalNo < _articleInfo.articlePageNo) {
    return ;
  }

  // define event per parcentage span 
  var check_flag = true;
  if (typeof s.setArticleDefine[_articleInfo.articlePageTotalNo] !== "undefined") {
    _articleInfo.events = s.setArticleDefine[_articleInfo.articlePageTotalNo];
  } else {
    _articleInfo.events = s.setArticleDefine[0];
    _articleInfo.events['100'].page = _articleInfo.articlePageTotalNo;
  
    // percentage per page 
    _articleInfo.rate_per_page = Math.floor((1 / _articleInfo.articlePageTotalNo) * 100);

    var n = _articleInfo.articlePageTotalNo + 1;
    for (var page=1; page<n; page++) {
      var _page_percenage =  _articleInfo.rate_per_page * page;
      var t = [];
      if (_page_percenage > 75) {
        var x = '99';
        var ev = _articleInfo.events[x];
        if (ev.page < 1) ev.page = page;
      }
      if (_page_percenage > 50) {
        var x = '75';
        var ev = _articleInfo.events[x];
        if (ev.page < 1) ev.page = page;
      }
      if (_page_percenage > 25) {
        var x = '50';
        var ev = _articleInfo.events[x];
        if (ev.page < 1) ev.page = page;
      } 
      if (_page_percenage > 0) {
        var x = '25';
        var ev = _articleInfo.events[x];
        if (ev.page < 1) ev.page = page;
      }

      if (page == _articleInfo.articlePageNo ) {
        break;
      }
    }
  }

  _articleInfo.events['25'].val = 'event125';
  _articleInfo.events['50'].val = 'event126';
  _articleInfo.events['75'].val = 'event127';
  _articleInfo.events['99'].val = 'event128';
  _articleInfo.events['100'].val = 'event129';

  for (var i in _articleInfo.events) {
    var p = Number(_articleInfo.events[i].page);
    var e = _articleInfo.events[i].val;
    if (p > 0 && p == _articleInfo.articlePageNo) {
      if (_articleInfo.tracking.events) {
        _articleInfo.tracking.events += ",";
      }
      _articleInfo.tracking.events += e;
    }
  }

  if (_articleInfo.tracking.events) {
    for (var i in _articleInfo.tracking) {
      if (i == 'events') {
        s[i] = (!s[i]) ? _articleInfo.tracking.events : s[i] + ',' + _articleInfo.tracking.events;
      } else {
        s[i] = _articleInfo.tracking[i];       
      }
    }
  }
};


// 
// signup tracking
// 
(function(){
  var _check_signup_func = function() {
    var obj = document.getElementById("loginGuide");
    if (!obj) {
      return false;
    }

    try {
      var s2 = window.s;
      s2.backup_tracking_setting();

      s2.linkTrackVars="events";
      s2.linkTrackEvents="event87";
      s2.usePlugins=false;
      s2.events = s2.linkTrackEvents;
      s2.tl(true,'o','Track SignupArea View');

      s2.recover_tracking_setting();
      return true;
    } catch (e) {
      return false;
    };
  };

  if(window.addEventListener) {
    window.addEventListener("load", _check_signup_func, false);    
  } else if(window.attachEvent){
    window.attachEvent("onload", _check_signup_func);
  }
})();

function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/1000):''}return s_loadT}

/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
/*
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
*/
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.2.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.2.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();
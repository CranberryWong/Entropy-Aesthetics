(function(){
 if ("bpTrackVars" in window) return;
 window.bpTrackVars = {
  "channel": '',
  "mediaId": '',
  "parentThemeName": '',
  "themeId": '',
  "themeName": '',
  "genre": '',
  "category": '',
  "aggregateId": '',
  "tagName": '',
  "section": '',
  "pageStatus": '',
  "articleId": '',
  "parentTitle": '',
  "pageTitle": '',
  "articlePageTotalNo": '',
  "pageNumber": location.search.replace(/^\?/, '&').match(/&P=(\d+)/) ? RegExp.$1 : 1,
  "publishDate": '',
  "authorName": '',
  "displayAuthorName": '',
  "tieupId": '',
  "repTieupId": '',
  "trackReadTarget": 'trackReadTarget',
  "userId": '',
  "userStatus": '',
  "serviceId": '',
  "authKind": '',
  "authResult": '',
  "searchKeyword":'',
  "pageUrl": location.href.match(/^https?:\/\//) ? location.href : '',
  "pageServer": location.host,
  "subDomain": location.host.replace(/\..*/, ''),
  "pageReferrer": document.referrer,
  "userAgent": navigator.userAgent,
  "exrTrackingCode": location.search.replace(/^\?/, '&').match(/&n_cid=(\w+)/) ? RegExp.$1 : '',
  "inTrackingCode": location.search.replace(/^\?/, '&').match(/&i_cid=(\w+)/) ? RegExp.$1 : '',
  "sTrackingCode": location.search.replace(/^\?/, '&').match(/&s_cid=(\w+)/) ? RegExp.$1 : '',
  "maTrackingCode": location.search.replace(/^\?/, '&').match(/&mam_cid=(\w+)/) ? RegExp.$1 : '',
  "product": {
     "name": '',
     "id": '',
     "price": '',
     "count": '',
     "purchaseId": '',
     "prodView": '',
     "scView": '',
     "scCheckout": '',
     "purchase": '',
     "addCart": '',
     "deleteCart": ''
   },
   "config": {
     "adobe": {
        "reportSuite": '',
        "trackingServer": 'stats.nikkeibp.co.jp',
        "trackingServerSecure": 'sstats.nikkeibp.co.jp'
	  },
      "cx": {
        "siteId": ''
      },
      "fb": {
        "id": ''
      },
      "krux": {
        "siteId": ''
      }
   }
};
 if (('; ' + document.cookie + ';').match(/; NID-Serial-Cookie=([^;]*);/)){
  bpTrackVars.userId = RegExp.$1;
 }
 var tags = document.body.getElementsByTagName('script');
 var sc;
 var i;
 for (i=0; i < tags.length; i++) {
   if (tags[i].src.match(/bpTrackVarsCommon\.js/)){
     sc = tags[i];
     break;
   }
 }
 try{
  var j, k, keySplit;
  var tmpVar;
  eval("var json = " + sc.innerHTML);
  for(var key in json){
    k = key.split(".");
    tmpVar = bpTrackVars;
    for (j=0; j < k.length; j++) {
       keySplit = k[j];
       if (typeof tmpVar[keySplit] === "object") {
          tmpVar = tmpVar[keySplit];
       } else {
          tmpVar[keySplit] = json[key];
       }
    }
  }
 } catch(e){
 } 
})();
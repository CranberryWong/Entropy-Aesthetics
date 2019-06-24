var FromSearchEngine = false;
(function(){
	var ref = document.referrer;
    var engines = [
        /^https?:\/\/([a-zA-Z0-9]+)\.google\.(co\.jp|com)/,
        /^http:\/\/blogsearch\.google\.co\.jp\/blogsearch/,
        /^http:\/\/search\.yahoo\.co\.jp\/search/,
        /^http:\/\/blog\-search\.yahoo\.co\.jp\/search/,
        /^http:\/\/search\.livedoor\.com\/search/,
        /^http:\/\/sf\.livedoor\.com\/search/,
        /^http:\/\/www\.bing\.com\/search/,
        /^http:\/\/www\.baidu\.jp/,
        /^http:\/\/blog\.baidu\.jp/,
        /^http:\/\/search\.goo\.ne\.jp\/web.jsp/,
        /^http:\/\/blog\.search\.goo\.ne\.jp\/search_goo\/result/,
        /^http:\/\/search\.nifty\.com\/websearch\/search/,
        /^http:\/\/search\.nifty\.com\/blogsearch\/search/,
        /^http:\/\/search\.www\.infoseek\.co\.jp\/Web/,
        /^http:\/\/blogsearch\.fc2\.com/,
        /^http:\/\/ask\.jp\/web\.asp/,
        /^http:\/\/www\.excite\.co\.jp\/search\.gw/
    ];
    for (var i = 0, max_i = engines.length; i < max_i; i++) {
        var engine = engines[i];
        if (engine) {
            if (engine.test(ref)) {
                FromSearchEngine = true;
                break;
            }
        }
    }
})();


var blog_counter_adtrk;

function blog_counter(name, id, url) {
   var vkey = "ldblog_v";
   var ckey = "ldblog_c";
   var fkey = "ldblog_f";
   var ukey = "ldblog_u";

   var counter2_base = "http://counter2.blog.livedoor.com/c?output=no&";
   var _get_cookie = function(key) {
      var value = document.cookie.match(new RegExp("(?:^|;) *" + key + "=([^;]*)"));
      return (value ? value[1] : null);
   };
   var _set_cookie = function(key, value, expires, path) {
      document.cookie = key + "=" + value + "; expires=" + expires.toGMTString() + "; path=/" + path + ";";
   };

   //
   var d = document; var w = window;
   if (w.self != w.parent) return;

   var r = d.referrer;  var u = d.referrer;
   if(d.parent && d.parent != undefined) r = d.parent.referrer;

   if(r.match(/^(undefined|unknown|bookmark)$/i)) r = "";
   if (w.top.location == d.location)  u = d.location;
   u = u + "";
   //

   var revisit = _get_cookie(vkey) ? true:false;
   var vcount = parseInt(_get_cookie(ckey)) + (revisit ? 0:1) || 1;
   var fvisit = _get_cookie(fkey); if (!fvisit) { var dt = new Date(); fvisit = Math.floor(dt.getTime()/1000); };
   var sid = _get_cookie(ukey) || '';

   var path = '';
   if (url) {
      if ( r.match(new RegExp("^" + url))) r = "";
      var value = url.match(new RegExp("^http://[^/]*/(.*)$"));
      path = (value ? value[1] : ''); 
   }

   var dt = new Date(); dt.setTime(dt.getTime() + 86400000);
   dt.setSeconds(0);dt.setMinutes(0);dt.setHours(0);
   _set_cookie(vkey, 1, dt, path);

   dt.setTime(dt.getTime() + 86400000 * 90);
   _set_cookie(ckey, vcount, dt, path);
   _set_cookie(fkey, fvisit, dt, path);

   var counter2 = counter2_base + "name=" + name + "&id=" + id + "&r=" + encodeURIComponent(r) + "&u=" + encodeURIComponent(u);
   if (revisit) counter2 += "&re=1";
   if (sid) counter2 += "&sid=" + sid;
   if (vcount) counter2 += "&vc=" + vcount;
   if (fvisit) counter2 += "&fv=" + fvisit;
   if (ld_blog_vars && ld_blog_vars.current_page) {
      var page = ld_blog_vars.current_page;
      if (page.type === 'article' && ld_blog_vars.articles[0])
          counter2 += "&pid=" + ld_blog_vars.articles[0].id;
      counter2 += "&ptype=" + page.type + "&ppage=" + page.page;
      var subtype = [];
      if (page.type == 'monthly') { subtype = [page.year, page.month] }
      else if (page.type == 'category') { subtype = [page.category] }
      else if (page.type == 'tag') { subtype = [page.tag_name] }
      else if (page.type == 'search') { subtype = page.search_keywords || [] }
      counter2 += "&psubtype=" + encodeURIComponent(subtype.join(','));

      if (page.is_smartphone == 1) { counter2 += '&is_smph=1' };
   }
   counter2 += "&noCache=" + (Math.floor(Math.random() * 1000000));
   document.writeln("<img" + " src=" + '"' + counter2 +'"' + " width=\"1\" height=\"1\" style=\"display:none;\" />");

   //
   blog_counter_adtrk = function(addiv, adtype) {
      var trkurl = counter2_base + "ro=1&act=ad&adiv=" + addiv + "&atype=" + adtype + "&name=" + name + "&id=" + id + "&r=" + encodeURIComponent(r) + "&u=" + encodeURIComponent(u);
      if (revisit) trkurl += "&re=1";
      if (sid) trkurl += "&sid=" + sid;
      if (vcount) trkurl += "&vc=" + vcount;
      if (fvisit) trkurl += "&fv=" + fvisit;
      trkurl += "&noCache=" + (Math.floor(Math.random() * 1000000));
      var img = document.createElement('img');
      img.setAttribute('src', trkurl);
      img.style.height = '1px';
      img.style.width = '1px';
      document.getElementsByTagName('body')[0].appendChild(img);
   };

}

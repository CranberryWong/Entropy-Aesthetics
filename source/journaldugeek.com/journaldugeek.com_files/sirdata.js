window.__cmp('getConsentData', 1, function(consentdata, issuccess1) {
  window.__cmp('getVendorConsents', [11], function(consents, issuccess2) {
    if(!consents.gdprapplies || (consents.purposeconsents[1] && consents.vendorconsents[11]))
        (function(){
        var service = "GS.d";
        var config = {
        pa : "21756",
        si : "1",
        u : document.location.href,
        r : document.referrer,
        s : "",/* SEARCH TERM */
        k : "",/* KEYWORDS */
        cat_name : "",/* CATEGORY NAME  */
        hd_m : "",/* EMAIL HASH MD5 */

        //DO NOT CHANGE BELOW
        rand : (new Date()).getTime()
        };
        var configParams = [];
        for(var v in config){
        configParams .push(v+'='+encodeURIComponent(config[v]));
        }
        var sddanJS=document.createElement('script');
        sddanJS.async = true;
        sddanJS.type = "text/javascript"; 
        sddanJS.src='//js.sddan.com/'+service+'?'+ configParams.join('&');
        document.getElementsByTagName('head')[0].appendChild(sddanJS);
        })();

  });
});

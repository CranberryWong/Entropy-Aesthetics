(function() {
try {
    (function(){
/**/

})();
//used to sync advertiser without leaking referer to final destination
(function() {
    try {
	var frm = document.createElement('iframe');
	frm.style.visibility = 'hidden';
	frm.style.display = 'none';
	frm.src = "https://pixel.mathtag.com/sync/iframe?mt_uuid=686f5aab-7bc1-4500-90ae-a9be68686a08&no_iframe=1&mt_lim=5";
	frm.setAttribute("id", "mm_sync_back_ground");
	var trys = 0;
        var interval = setInterval(function(){
            if (trys++ < 20 && interval && !document.getElementById("mm_sync_back_ground")) {
                if (document.body) {
                    if (interval) {
                        clearInterval(interval);
                        interval = 0;
                    }
                    document.body.appendChild(frm);
                }
            }
        }, 100);
    }
    catch(ex)
    {
	document.createElement("img").src="//pixel.mathtag.com/error/img?error_domain=synciframe&what="+encodeURIComponent(ex.message);
    }
})();

}
catch(ex)
{
   document.createElement("img").src="//pixel.mathtag.com/error/img?error_domain=wrap_js&what="+encodeURIComponent(ex.message);
}
})();
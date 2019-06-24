
var ASY_URL = 'http://asy.cps.com.cn';
function new_getUserLoginInfo(urlKey) {
	if(!urlKey){
		var href = window.location.href;
		var hash = window.location.hash;
		if(hash){
		  href = href.replace(hash, "");
		}
		urlKey = href;
	}
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: ASY_URL + '/user/GetLoginInfoNew',
        jsonpCallback: "callbackUserinfo",
        data: {urlKey: urlKey},
        success: function(data) {
            if (data.status) {
                $('#user_login_wrap').html(data.content);
            }
        },
        error: function(data) {
            alert('服务器无响应，请联系管理员!');
        }
    });
}
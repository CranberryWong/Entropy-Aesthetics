function flwrite(src, width, height) {
    document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="' + width + '" height="' + height + '" title="">');
    document.write('<param name="movie" value="' + src + '" />');
    document.write('<param name="quality" value="high" />');
    document.write('<param name="allowScriptAccess" value="always">');
    document.write('<param name="wmode" value="transparent" />');
    //document.write('<embed wmode="opaque" src="' + src + '" quality="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' +  height + '"></embed>');
    document.write('<embed src="' + src + '" quaity="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' +  height + '" allowScriptAccess=always wmode="transparent" ></embed>');
    document.write('</object>');
}

function flwrite2(src, width, height) {
    document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="' + width + '" height="' + height + '" title="">');
    document.write('<param name="movie" value="' + src + '" />');
    document.write('<param name="quality" value="high" />');
    document.write('<param name="allowScriptAccess" value="always">');
    document.write('<embed src="' + src + '" quaity="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' +  height + '" allowScriptAccess=always  ></embed>');
    document.write('</object>');
}

function OpenCategory(n){
    var menu, flag;
    if(document.all){
        menu = document.all(n);
        flag = menu.style.display;
        if(flag == "block"){
            menu.style.display = "none";
            document.cookie=n+"=0; expires=Thu, 1-Jan-2099 0:0:0; path=/;";
        }
        else{
            menu.style.display = "block";
            document.cookie=n+"=1; expires=Thu, 1-Jan-2099 0:0:0; path=/;";
        }
        
    }
    else if(document.getElementById){
        menu = document.getElementById(n);
        flag = menu.style.display;
        if(flag == "block"){
            menu.style.display = "none";
            document.cookie=n+"=0; expires=Thu, 1-Jan-2099 0:0:0; path=/;";
        }
        else{
            menu.style.display = "block";
            document.cookie=n+"=1; expires=Thu, 1-Jan-2099 0:0:0; path=/;";
        }
        
    }
}

function win_open(url, name, width, height){
    var subWin = window.open(url, name, 'width=' + width + ',height=' + height + ',location=yes,resizable=yes,scrollbars=yes');
    
    var check = ((navigator.appName.charAt(0) == "M") && (navigator.appVersion.charAt(0) <= 3));
    
    if (!check) {subWin.focus();}
}

function go_contact(url, target){
    var matches = target.match(/^([0-9]+)/);
    if (window.globalObj && window.globalObj.moveSecure && matches) {
        var id = matches[1];
        if (globalObj.moveSecure('contact', 'product/' + id)) {
            location.href = url + '/contact/product/' + target;
        }
    } else {
        location.href = url + '/contact/product/' + target;
    }
}

function mailmaga_msg(msg){
    if (msg !="") {
        alert(msg);
    }
}

function smartphoneLink(value){
    if (navigator.userAgent.indexOf('iPhone') > -1
        || navigator.userAgent.indexOf('iPod') > -1
        || (navigator.userAgent.indexOf('Android') > -1 && navigator.userAgent.indexOf('Mobile') > -1)
        || navigator.userAgent.indexOf('Opera Mini') > -1
        || navigator.userAgent.indexOf('Opera Mobi') > -1
        || (navigator.userAgent.indexOf('Firefox') > -1 && navigator.userAgent.indexOf('Mobile') > -1)
        || navigator.userAgent.indexOf('Windows Phone') > -1
        || navigator.userAgent.indexOf('BlackBerry') > -1
    ) {
        document.write('<a href="javascript:movePhone(true);">' + value + '</a>');
    }
    return false;
}

function movePhone(flag){
    var url;
    var host = phoneUrl ? phoneUrl.match(/^http[s]?:\/\/[^\/#\?]*/) : null;
    var val = flag ? '0' : '1';
    if (!phonesite) {
        url = location.pathname;
    } else {
        url = phonesite;
        if (!phonesite.match(/^http[s]?:\/\//) && phoneUrl) {
            if (host) {
                url = host + phonesite;
            }
        } else {
            host = phonesite.match(/^http[s]?:\/\/[^\/#\?]*/);
        }
    }
    var request_data = 'go=smartphone-display-type&v=0&p='+val;
     jQuery.ajax({
        type: 'GET',
        url: location.protocol + '//' + location.hostname + '/xml.php',
        data: request_data,
        dataType: 'text',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        success: function(data) {
            if (!phonesite) {
                if (phoneUrl) {
                    location.href = phoneUrl;
                } else {
                    location.reload();
                }
            } else {
                location.href = url;
            }
        }
    });
}

var phoneUrl;
var phonesite;
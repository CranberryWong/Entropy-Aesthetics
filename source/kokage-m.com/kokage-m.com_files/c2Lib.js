/*
 * @author yu_ito
 * @date 2017/08/17
 * @see No1098
 *
 */

	// get userAgent
	uaObj = {}; // global object
	var ua = window.navigator.userAgent.toLowerCase();

	uaObj.browser = ( function() {
		if( ua.indexOf('edge') !== -1 ){ return 'edge';}
		else if( ua.indexOf('msie 6.')   !== -1 ){ return 'ie6';}
		else if( ua.indexOf('msie 7.')   !== -1 ){ return 'ie7';}
		else if( ua.indexOf('msie 8.')   !== -1 ){ return 'ie8';}
		else if( ua.indexOf('msie 9.')   !== -1 ){ return 'ie9';}
		else if( ua.indexOf('msie 10.')  !== -1 ){ return 'ie10';}
		else if( ua.indexOf('trident/7') !== -1 ){ return 'ie11';}
		else if( ua.indexOf('chrome')  !== -1 && ua.indexOf('edge') === -1 ){ return 'chrome';}
		else if( ua.indexOf('safari')  !== -1 && ua.indexOf('chrome') === -1 ){ return 'safari';}
		else if( ua.indexOf('firefox') !== -1 ){ return 'firefox';}
		else{ return 'otherBrowser';}
	})();

	uaObj.device = ( function() {
		if( ua.indexOf('iphone') !== -1 || ua.indexOf('ipod') !== -1 ){ return 'iphone';}
		else if( ua.indexOf('ipad')    !== -1 ){ return 'ipad';}
		else if( ua.indexOf('android') !== -1 ){ return 'android';}
		else if( ua.indexOf('windows') !== -1 && ua.indexOf('phone') !== -1 ){ return 'windowsPhone';}
		else{ return 'otherDevice';}
	})();

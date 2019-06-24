/* load.js
  - Loading order
--------------------------------------------------------- */
jQuery.noConflict();
jQuery.ajaxSetup({scriptCharset:'utf-8'});

// domready
jQuery(document).ready(function() {
	// disable google map. when ie local.
	if (bindobj.ie && window.location.protocol=='file:') {
		jQuery('iframe').each(function(){
			var w = this.width, h = this.height;
			if (bindobj.ie90 && this.src.match("https?://maps.google.") != null) {
				jQuery('<div>Googleマップは公開サーバーにアップロードすると表示されます。</div>').css({
					width:w,
					height:h,
					display: 'block',
					color: '#000',
					background: '#fff',
					border: '1px solid #000'
				}).insertAfter(this);
				jQuery(this).remove();
				
			} else if (this.className.indexOf('live-ifrm') > -1) {
				var msg = jQuery('<div>LiVE Connectパーツは<br>アップロードすると表示されます。</div>').css({
					color:'#fff', width:220, height:200, marginLeft:'auto', marginRight:'auto', marginTop:h/2+100
				});
				jQuery('<div>').css({
					width:w,
					height:h,
					display: 'inline-block',
					color: '#000',
					background: '#666 url(' + bindobj.moduleroot + '/js/parts/live_connect.png) center center no-repeat'
				}).append(msg).insertAfter(this);
				jQuery(this).remove();
			}
		});
	}
	
	// cssskin
	if (typeof(bdCssNames) != 'undefined') {
		var len = bdCssNames.area.length;
		for (var i=0; i<len; i++) bd.util.addCss(bindobj.siteroot + bdCssNames.area[ i ]);
		len = bdCssNames.block.length;
		for (var i=0; i<len; i++) bd.util.addCss(bindobj.siteroot + bdCssNames.block[ i ]);
	}
	
	////////// parts
	if (bindobj.printstate) Bindprint.control();
	else Bindprint.set();
	
	////////// blockeditor
	if (bindobj.isLocal && !bindobj.ie52) BindApp.onload();
	
	////////// fx
	if (!bindobj.printstate) initFx();
	
});

// onload
jQuery(window).load(function(){
	////////// for legacy browser
	legacyCheck();
	
	////////// onload hash scroll
	fixBodyScrollPosition();
	
	////////// set footer
	Bindfooter.set();
	
	// reload
	setTimeout(function(){bd.util.bdRefresh()}, 400);
});

function fixBodyScrollPosition() {
	var h = window.location.hash;
	if (h.length>0) {
		var target = jQuery(h);
		if (target.length>0) scrollBody(target[0]);
	}
}
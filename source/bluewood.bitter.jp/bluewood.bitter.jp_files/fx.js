/*
	BiNDFx v6.53
	131118
	require jQuery1.x (http://jquery.com/)
*/
jQuery.noConflict();
jQuery.fnbind = function(t, fn){ return function() { return fn.apply(t, arguments);}};
jQuery.ajaxSetup({scriptCharset:'utf-8'});
jQuery.lazyLoad = function(url, options) {
	options = jQuery.extend(options || {}, {
		dataType: "script",
		cache: true,
		url: url
	});
	return jQuery.ajax(options);
};

// namespace
var bd = {};
bd.fx = {
	version : 4.00,
	debug : false
};

bd.slide = {};

/*
	BiNDZoom
	This code based on Slimbox
	by Christophe Beyls (http://www.digitalia.be) - MIT-style license.
*/
function BiNDZoom() {
	this.initialize.apply(this, arguments);
}
BiNDZoom.prototype = {
	groupCount: 0,
	options: {
		resizeDuration: 320,
		initialWidth: 250,
		initialHeight: 250,
		showCounter: true
	},
	initialize: function(ancs, caps, options){
		jQuery.extend(this.options, options, {});
		
		this.imageWidth = 0;
		this.imageHeight = 0;
		this.firstClick = true;
		
		this.addSet(ancs, caps);
		
		this.bindbox = jQuery('<div id="bindbox"></div>').css({
			width: this.options.initialWidth,
			height: this.options.initialHeight,
			display: 'none'
		}).appendTo(document.body);
		if (!bindobj.ie) this.bindbox.css('opacity', 0);
		
		this.bindbox.append('<div class="tl"></div>').append('<div class="tr"></div>').append('<div class="tc"></div>');
		
		var mm = jQuery('<div class="mm"></div>').append('<div class="ml"></div>').append('<div class="mr"></div>').appendTo(this.bindbox);
		var mc = jQuery('<div class="mc"></div>').appendTo(mm);
		
		this.bindbox.append('<div class="bl"></div>').append('<div class="br"></div>').append('<div class="bc"></div>');
		
		this.image = jQuery('<div id="bindbox_image"></div>').css({
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: '0px'
		}).appendTo(mc);
		
		var clazz = this;
		this.image.click(function() {
			clazz.close();
		});
		
		this.comment = jQuery('<div id="bindbox_comment"></div>').appendTo(mc);
		this.lineDiv = jQuery('<div id="bindbox_line"></div>').appendTo(mc);
		this.controlDiv = jQuery('<div id="bindbox_control"></div>').appendTo(mc);
		
		this.closeBox = jQuery('<div id="bindbox_close"></div>').appendTo(this.controlDiv).click(function(){
			clazz.close();
		});
		this.prevLink = jQuery('<div id="bindbox_back"></div>').appendTo(this.controlDiv);
		this.nextLink = jQuery('<div id="bindbox_next"></div>').appendTo(this.controlDiv);
		this.prevLink.click(function() {
			clazz.previous();
		});
		this.nextLink.click(function() {
			clazz.next();
		});
		
		this.number = jQuery('<div id="bindbox_num"></div>').css({
			display: 'none'
		}).appendTo(this.controlDiv);
		
		this.preloadPrev = new Image();
		this.preloadNext = new Image();
	},
	
	addSet: function(ancs, caps) {
		ancs = jQuery.extend([], ancs);
		caps = jQuery.extend([], caps);
		
		this.groupCount++;
		var groupName = "bindzoom-" + this.groupCount;
		
		var clazz = this;
		
		jQuery.each(ancs, function(i, el) {
			if (el.className.indexOf('bindzoom') > -1) {
				jQuery(el).attr('rel', groupName).click(function() {
					clazz.click(el)
					return false;
				}).bind('touchend', function() {
					clazz.click(el)
					return false;
				});
				
				if (!clazz.anchors) clazz.anchors = [];
				clazz.anchors.push(el);
				
				if (!clazz.captions) clazz.captions = [];
				clazz.captions.push(caps[i]);
				
			} else if (el.className.indexOf('bindpopup') > -1) {
				jQuery(el).click(function() {
					clazz.openURL(el);
					return false;
				});
				
				if (!clazz.pAnchors) clazz.pAnchors = [];
				clazz.pAnchors.push(el);
				
			}
		});
		
	},
	
	click: function(link){
		var j, imageNum, images = [];
		var cnt = 0;
		var clazz = this;
		jQuery.each(clazz.anchors, function(i, el) {
			if (el.rel == link.rel){
				images.push([el, clazz.captions[i], el.rel]);
				if (el == link) imageNum = cnt;
				cnt++;
			}
		});
		
		groupName = link.rel;
		
		if (typeof(this.currentGroup) != 'undefined'
			&& this.currentGroup == groupName
			&& typeof(this.activeImage) != 'undefined'
			&& this.activeImage == imageNum) {
			return false;
		}
		
		if (this.currentGroup != groupName) {
			this.images = images;
		}
		
		this.currentGroup = groupName;
		
		if (this.firstClick)
			return this.open(images, imageNum);
		else
			return this.changeImage(imageNum);
	},

	show: function(url, title){
		return this.open([[url, title]], 0);
	},
	
	open: function(images, imageNum){
		this.images = images;
		this.setup(true);
		
		var img = jQuery(this.images[imageNum][0]);
		
		var pos = getPosition(img[0]);
		this.top = pos.top - 34;
		this.left = pos.left - 34;
		
		this.anchorHeight = img.height() + 64;
		this.anchorWidth = img.width() + 64;
		this.anchorTop = pos.top - 34;
		this.anchorLeft = pos.left - 34;
		
		this.bindbox.css({
			top: this.top,
			marginLeft: this.left,
			height: this.anchorHeight,
			width: this.anchorWidth,
			display: ''
		});
		
		return this.changeImage(imageNum);
	},

	openURL: function(link){
		this.toggleObjectVisible(true);
		
		var pos = getPosition(link);
		this.top = pos.top - 34;
		this.left = pos.left - 34;
		
		this.anchorHeight = jQuery(link).height() + 64;
		this.anchorWidth = jQuery(link).width() + 64;
		this.anchorTop = pos.top - 34;
		this.anchorLeft = pos.left - 34;
		
		this.bindbox.css({
			top: this.top,
			marginLeft: this.left,
			height: this.anchorHeight,
			width: this.anchorWidth,
			display: ''
		});
		
		this.step = 1;
		return this.nextEffectURL(link);
	},
	
	toggleObjectVisible: function(open){
		var tags = 'object' + (bindobj.ie ? ',select' : ',embed');
		jQuery(tags).css('visibility', open ? 'hidden' : '');
	},
	
	setup: function(open){
		this.toggleObjectVisible(open);
		
		var clazz = this;
		if (open) {
			jQuery(document).bind('keydown', function(event) {
				switch (event.keyCode){
					case 27: case 88: case 67: clazz.close(); break;
					case 37: case 80: clazz.previous(); break;	
					case 39: case 78: clazz.next();
				}
			});
		} else {
			jQuery(document).unbind('keydown');
		}
		this.step = 0;
	},

	previous: function(){
		return this.changeImage(this.activeImage-1);
	},

	next: function(){
		return this.changeImage(this.activeImage+1);
	},

	changeImage: function(imageNum){
		if (this.step || (imageNum < 0) || (imageNum >= this.images.length)) return false;
		this.step = 1;
		this.activeImage = imageNum;
		
		this.prevLink.css({visibility:'hidden'});
		this.nextLink.css({visibility:'hidden'});
		if (!this.firstClick) {
			this.image.hide();
		}
		this.image.className = 'bdLoading';
		
		var clazz = this;
		this.preload = new Image();
		this.preload.onload = function() {
			clazz.nextEffect();
		};
		this.preload.src = (this.images[imageNum][0]).href;
		
		return false;
	},

	nextEffect: function(){
		switch (this.step++){
		case 1:
			this.image.className = '';
			
			this.closeBox.hide();
			
			var preWidth = this.imageWidth || 0;
			var preHeight = this.imageHeight || 0;
			this.imageWidth = this.preload.width;
			this.imageHeight = this.preload.height;
			if (this.imageWidth > document.body.offsetWidth - 50) {
				var rate = (document.body.offsetWidth - 50) / this.imageWidth;
				this.imageWidth = Math.round(this.imageWidth * rate);
				this.imageHeight = Math.round(this.imageHeight * rate);
			}
			
			this.img = document.getElementById('imgContents');
			if (this.img) this.image.html('');
			this.img = jQuery('<img id="imgContents" src="' + String(this.images[this.activeImage][0]) + '">').css({
				width: this.anchorWidth - 64,
				height: this.anchorHeight - 64,
				maxWidth: this.imageWidth,
				maxHeight: this.imageHeight
			}).appendTo(this.image);
			
			this.comment.html(this.images[this.activeImage][1] || '');
			var msg = 'Image '+(this.activeImage+1)+' of '+this.images.length + '<br />';
			msg += '<span id="bindbox_note"></span>';
			this.number.html(msg);
			
			if (this.activeImage) this.preloadPrev.src = (this.images[this.activeImage-1][0]).href;
			if (this.activeImage != (this.images.length - 1)) this.preloadNext.src = (this.images[this.activeImage+1][0]).href;
			
			if (preWidth != this.imageWidth || preHeight != this.imageHeight) {
				this.image.css({
					display: ''
				});
				if (!bindobj.ie) this.image.css('opacity', 0);
				
				if (this.firstClick) {
					this.image.css({
						width: this.anchorWidth - 64,
						height: this.anchorHeight - 64
					});
				}
				
				var clazz = this;
				var win = jQuery(window);
				var obj = {
					height: this.imageHeight + 140,
					width: this.imageWidth + 68,
					marginLeft: (win.width() - (this.imageWidth + 68)) / 2,
					top: win.scrollTop() + (win.height() / 15)
				};
				if (!bindobj.ie) obj['opacity'] = 1;
				this.bindbox.animate(obj, this.options.resizeDuration);
				
				this.image.animate({
					height: this.imageHeight,
					width: this.imageWidth
				}, this.options.resizeDuration);
				
				this.img.animate({
					height: this.imageHeight,
					width: this.imageWidth
				}, this.options.resizeDuration,
				function() {
					clazz.nextEffect();
				});
				
				break;
			}
			
			this.image.css({
				width: this.imageWidth,
				height: this.imageHeight
			});
			
			this.img.css({
				width: this.imageWidth,
				height: this.imageHeight
			});
			
			this.step++;
			
		case 2:
			if (!bindobj.ie) {
				this.image.css({
					opacity: 0
				});
				this.image.show();
				
				var clazz = this;
				this.image.animate({opacity: 1}, this.options.resizeDuration,
				function() {
					clazz.nextEffect();
				});
			} else {
				this.image.show();
				this.nextEffect();
			}
			break;
			
		case 3:
			this.firstClick = false;
			
			this.comment.show();
			this.number.show();
			this.controlDiv.show();
			this.lineDiv.show();
			this.prevLink.show();
			this.nextLink.show();
			if (this.activeImage) this.prevLink.css({visibility: 'visible'});
			if (this.activeImage != (this.images.length - 1)) this.nextLink.css({visibility: 'visible'});
			this.step = 0;
		}
	},
	
	nextEffectURL: function(link){
		switch (this.step++){
		case 1:
			var ancH = 0, ancW = 0, scroll = false, autoFit = false;
			var ary = link.className.split(' ');
			for (var i=0; i < ary.length; i++) {
				var wk = ary[ i ];
				if (wk == 'bdscroll') scroll = true;
				else if (wk == 'bdautofit') autoFit = true;
				else if (wk.substring(0, 1) == 'h') ancH = wk.substring(1);
				else if (wk.substring(0, 1) == 'w') ancW = wk.substring(1);
			}
			
			if (autoFit) {
				var win = jQuery(window);
				ancW = win.width();
				ancH = win.height() - 120;
			}
			
			this.img = document.getElementById('imgContents');
			if (this.img) this.image.html('');
			this.img = jQuery('<iframe id="imgContents" src="' + link.href + '" frameborder="0"></iframe>').appendTo(this.image);
			this.img.hide();
			
			this.img.attr('width', ancW - 68);
			this.img.attr('height', '100%');
			
			if (scroll) {
				this.img.attr('scrolling', 'auto');
			} else {
				this.img.attr('scrolling', 'no');
				this.img.css({
					overflow: 'hidden',
					overflowX: 'hidden',
					overflowY: 'hidden'
				});
			}
			
			var clazz = this;
			var win = jQuery(window);
			var obj = {
				height: ancH + 120,
				width: ancW,
				marginLeft: (win.width() - ancW) / 2,
				top: win.scrollTop()
			};
			if (!bindobj.ie) obj['opacity'] = 1;
			this.bindbox.animate(obj, this.options.resizeDuration);
			
			this.image.animate({
				height: ancH,
				width: ancW - 68
			}, this.options.resizeDuration,
			function() {
				clazz.nextEffectURL();
			});
			break;
			
		case 2:
			this.firstClick = false;
			this.img.show();
			this.closeBox.show();			this.prevLink.hide();
			this.nextLink.hide();
			this.controlDiv.show();
			this.step = 0;
		}
	},
	
	closeEffect: function(){
		this.comment.hide();
		this.number.hide();
		this.lineDiv.hide();
		this.closeBox.hide();
		this.controlDiv.hide();
		
		var clazz = this;
		var obj = {
			height: this.anchorHeight,
			width: this.anchorWidth
		};
		if (!bindobj.ie) obj['opacity'] = 0;
		this.img.animate(obj, this.options.resizeDuration,
		function() {
			clazz.closeEnd();
		});
		
		var bobj = {
			height: this.anchorHeight,
			width: this.anchorWidth,
			marginLeft: this.anchorLeft,
			top: this.anchorTop
		};
		if (!bindobj.ie) bobj['opacity'] = 0;
		this.bindbox.animate(bobj, this.options.resizeDuration,
		function() {
			clazz.closeEnd();
		});
		
	},
	
	closeEnd: function() {
		this.bindbox.css({
			width: this.options.initialWidth,
			height: this.options.initialHeight
		});
		this.bindbox.hide();
	},
	
	close: function(){
		if (this.step < 0) return;
		this.step = -1;
		if (this.preload){
			this.preload.onload = function(){};
			this.preload = null;
		}
		// TODO: Effect STOP
		//for (var f in this.fx) this.fx[f].stop();
		this.firstClick = true;
		this.imageWidth = 0;
		this.imageHeight = 0;
		this.activeImage = -1;
		this.currentGroup = '';
		
		this.setup(false);
		
		this.closeEffect();
		
		return false;
	}
};


function BiNDAccordion() {
	this.initialize.apply(this, arguments);
}
BiNDAccordion.prototype = {
	is1st: true,
	
	options: {
		onActive: function(){},
		onBackground: function(){},
		display: 0,
		show: false,
		height: true,
		opacity: true,
		fixedHeight: false,
		fixedWidth: false,
		wait: false,
		alwaysHide: false,
		useMouseOver: false
	},

	initialize: function(togglers, elements, options){
		this.togglers = togglers || [];
		this.elements = elements || [];
		jQuery.extend(this.options, options, {});
		this.previous = -1;
		if (this.options.alwaysHide) this.options.wait = true;
		if (this.options.show){
			this.options.display = false;
			this.previous = this.options.show;
		}
		if (this.options.start){
			this.options.display = false;
			this.options.show = false;
		}
		
		this.effects = {};
		if (this.options.opacity && !bindobj.ie) this.effects.opacity = 'opacity';
		if (this.options.height) this.effects.height = 'scrollHeight';
		for (var i = 0, l = this.togglers.length; i < l; i++) this.addSection(this.togglers[i], this.elements[i]);
		for (var i=0, l = this.elements.length; i < l; i++) {
			var el = this.elements[ i ];
			el.originalHeight = el.css('scrollHeight');
			
			if (bindobj.ie70) {
				setIE7CoreHeight(el, i, -1);
			}
			
			if (this.options.show === i){
				this.options.onActive(this.togglers[ i ], el);
			} else {
				for (var fx in this.effects) el.css(fx, 0);
				el.hide();
			}
		}
		
		this.options.onComplete = function() {
		};
		
		if (this.options.display) this.display(this.options.display);
	},
	addSection: function(toggler, element, pos){
		var len = this.togglers.length;
		
		var idx = jQuery.inArray(toggler, this.togglers);
		var clazz = this;
		if (this.options.useMouseOver) {
			toggler.mouseover(function(){
				clazz.display(idx);
			});
		} else {
			toggler.click(function(){
				clazz.display(idx);
			});
		}
		
		if (this.options.height) element.css({'paddingTop': 0, 'borderTop': 'none', 'paddingBottom': 0, 'borderBottom': 'none'});
		if (this.options.width) element.css({'paddingLeft': 0, 'borderLeft': 'none', 'paddingRight': 0, 'borderRight': 'none'});
		if (this.options.fixedWidth) element.fullWidth = this.options.fixedWidth;
		if (this.options.fixedHeight) element.fullHeight = this.options.fixedHeight;
		element.css('overflow', 'hidden');
		
		return this;
	},
	
	display: function(index){
		index = (typeof(index) == 'object' && index.nodeName) ? jQuery.inArray(index, this.elements) : index;
		if ((this.timer && this.options.wait) || (index === this.previous && !this.options.alwaysHide)) return this;
		this.previous = index;
		var obj = {};
		
		var clazz = this;
		for (var i=0; i<this.elements.length; i++) {
			var el = this.elements[ i ];
			var hide = (i != index) || (this.options.alwaysHide && (el.offsetHeight > 0));
			if (hide) {
				this.options.onBackground(this.togglers[ i ], el);
			} else {
				el.show();
				this.options.onActive(this.togglers[ i ], el);
			}
			
			obj = {};
			obj['height'] = hide ? 0 : el[0].scrollHeight;
			if (!bindobj.ie) obj['opacity'] = hide ? 0 : 1;
			
			el.animate(obj, 400, 'easeOutExpo', function() {
				if (this.style.height == '0px') this.style.display = 'none';
			});
		}
		
		this.is1st = false;
		
		return false;
	},
	
	showThisHideOpen: function(index){return this.display(index);}

};

/*
Class: ToggleAccordion
*/
function ToggleAccordion() {
	this.initialize.apply(this, arguments);
}
ToggleAccordion.prototype = {
	is1st: true,
	
	options: {
		onActive: function(){},
		onBackground: function(){},
		useMouseOver: false,
		open: false
	},

	initialize: function(toggler, element, pos, options){
		this.toggler = toggler;
		this.element = element;
		jQuery.extend(this.options, options, {});
		this.previous = -1;
		
		this.hide = true;
		this.locked = false;
		
		var e = this.setUp(this.toggler, this.element, pos);
		
		if (options.open) {
			this.hide = false;
		}
		
		this.display();
	},

	setUp: function(toggler, element, pos){
		var clazz = this;
		if (this.options.useMouseOver) {
			toggler.mouseover(function(){
				clazz.display();
			});
		} else {
			toggler.click(function(){
				clazz.display();
			});
		}
		element.css('overflow', 'hidden');
		
		this.element.originalHeight = element.height();
		
		if (bindobj.ie70) {
			setIE7CoreHeight(element, pos, -1);
		}
		
		return this;
	},
	
	display: function(){
		if (this.hide)
			this.options.onBackground(this.toggler, this.element);
		else
			this.options.onActive(this.toggler, this.element);
		
		if (this.is1st) {
			if (this.hide) {
				this.element.css({
					height: 0,
					display: 'none'
				});
				if (!bindobj.ie) this.element.css('opacity', 0);
			} else {
				if (!bindobj.ie) this.element.css('opacity', 1);
				if (jQuery.browser.msie) {
					this.element.css('height', this.element.originalHeight);
				} else {
					this.element.css('height', this.element.scrollHeight);
				}
			}
			
		} else {
			var clazz = this;
			if (this.hide) {
				var obj = {
					height: 0
				};
				if (!bindobj.ie) obj['opacity'] = 0;
				this.element.animate(obj, 400, 'easeOutExpo', function(){
					clazz.effectEnd();
				});
			} else {
				this.element.css('display', 'block');
				var obj = {
					height: (bindobj.ie) ? this.element.originalHeight : this.element[0].scrollHeight
				};
				if (!bindobj.ie) obj['opacity'] = 1;
				this.element.animate(obj, 400, 'easeOutExpo', function(){
					clazz.effectEnd();
				});
			}
		}
		
		this.hide = !this.hide;
		this.is1st = false;
	},
	
	effectEnd: function(){
		if (this.options.useMouseOver) {
		}
		if (!this.hide) this.element.css('display', 'none');
	}
};

/*
Class:BindTab
*/
function BindTab() {
	this.initialize.apply(this, arguments);
}
BindTab.prototype = {
	is1st: true,
	hasXmc: false,
	locked: false,
	
	options: {
		onActive: function(){},
		onBackground: function(){},
		display: 0,
		height: true,
		opacity: true,
		fixedHeight: false,
		fixedWidth: false,
		wait: true,
		alwaysHide: false,
		useMouseOver: false,
		blockOption: ''
	},
	
	initialize: function(togglers, elements, container, options){
		this.togglers = togglers || [];
		this.elements = elements || [];
		
		this.contents = [];
		for (var i=0; i<this.elements.length; i++) {
			var el = this.elements[ i ];
			var xmc = findDiv(el, 'xmc');
			if (!xmc) {
				xmc = el;
				this.hasXmc = false;
			} else this.hasXmc = true;
			if (xmc) {
				var cont = jQuery('<div class="pocket"></div>');
				var cl = xmc.childNodes;
				var total = cl.length;
				for (var j=0; j<total; j++) {
					cont.append(cl[0]);
				}
				
				cont.appendTo(xmc);
				this.contents.push(cont);
			}
		}
		
		this.container = jQuery(container);
		jQuery.extend(this.options, options);
		this.previous = -1;
		if (this.options.alwaysHide) this.options.wait = true;
		
		if (this.options.start){
			this.options.display = false;
			this.options.show = false;
		}
		
		for (var i = 0, l = this.togglers.length; i < l; i++) this.addSection(this.togglers[i], this.elements[i]);
		this.maxHeight = 0;
		
		var clazz = this;
		jQuery.each(this.elements, function(i, el) {
			el.originalHeight = el.scrollHeight;
			if (el.scrollHeight > clazz.maxHeight) clazz.maxHeight = el.scrollHeight;
			
			if (bindobj.ie70) {
				setIE7CoreHeight(el, i, -1);
			}
		});
		
		this.display(0);
	},
	
	addSection: function(toggler, element, pos){
		var idx = jQuery.inArray(toggler, this.togglers);
		
		var clazz = this;
		if (this.options.useMouseOver) {
			jQuery(toggler).mouseover(function(e){
				clazz.hideCurrent(idx);
			});
		} else {
			jQuery(toggler).click(function(){
				clazz.hideCurrent(idx);
			});
		}
		if (this.options.fixedWidth) element.fullWidth = this.options.fixedWidth;
		if (this.options.fixedHeight) element.fullHeight = this.options.fixedHeight;
		jQuery(element).css('overflow', 'hidden');
		
		return this;
	},
	
	hideCurrent: function(index) {
		if (index == this.previous) return;
		var prev = this.contents[this.previous];
		if (!bindobj.ie && prev) {
			var clazz = this;
			prev.animate({
				opacity: 0
			}, 150, 'easeOutExpo',
			function() {
				clazz.display(index);
			});
		} else {
			this.display(index);
		}
	},
	
	display: function(index) {
		if (this.locked) return;
		index = (typeof(index) == 'object' && index.nodeName) ?  jQuery.inArray(index, this.elements) : index;
		if ((this.timer && this.options.wait) || (index === this.previous && !this.options.alwaysHide)) return this;
		var prevHeight = 0;
		if (this.previous > -1) {
			if (window.ie) {
				prevHeight = this.maxHeight;
			} else {
				var prev = this.elements[this.previous];
				if (prev) prevHeight = this.contents[this.previous][0].offsetHeight;
			}
			
			var cur = jQuery(this.elements[index]);
			cur.css({
				height: prevHeight
			});
			if (!bindobj.ie) cur.css('opacity', 1);
		}
		
		for (var i=0; i<this.elements.length; i++) {
			var el = jQuery(this.elements[ i ]);
			var hide = (i != index) || (this.options.alwaysHide && (el.offsetHeight > 0));
			if (hide) {
				this.options.onBackground(this.togglers[ i ], el);
				el.css({
					display: 'none'
				});
				if (!bindobj.ie) el.css('opacity', 0);
			} else {
				this.options.onActive(this.togglers[ i ], el);
				el.css({
					display: 'block'
				});
			}
		}
		
		this.previous = index;
		this.is1st = false;
		
		var el = jQuery(this.elements[index]);
		var cn = this.contents[index];
		/* subtract side padding and side border width from box width */
		bw = el[0].parentNode.offsetWidth;
		bw -= el.css('padding-left').match(/[0-9]*/) - 0;
		bw -= el.css('padding-right').match(/[0-9]*/) - 0;
		bw -= el.css('border-left-width').match(/[0-9]*/) - 0;
		bw -= el.css('border-left-width').match(/[0-9]*/) - 0;
		bw += "px";
		el.css('width', bw);
		
		var clazz = this;
		
		el.animate({
			height: cn[0].offsetHeight + ((this.hasXmc) ? 30 : 15)
		}, 400, 'easeOutExpo', function() {
			clazz.locked = false;
		});
		
		if (!bindobj.ie) {
			jQuery(cn).animate({
				opacity: 1
			}, 400);
		}
		
		this.locked = true;
		
		return false;
	},
	
	showThisHideOpen: function(index){return this.display(index);}
	
};

// SlideManager
bd.slide.SlideManager = function() {
	this.init.apply(this, arguments);
};

bd.slide.SlideManager.prototype = {
	engines: {},
	init: function() {
	},
	addSlide: function(sid, autost, loop, elem) {
		for (var key in this.engines) {
			if (key == sid) {
				this.engines[ key ].addSlide( elem, autost, loop );
				return;
			}
		}
		
		this.engines[ sid ] = new bd.slide.SlideLoader( sid );
		this.engines[ sid ].addSlide( elem, autost, loop );
	}
};

// SlideLoader
bd.slide.SlideLoader = function() {
	this.init.apply(this, arguments);
};

bd.slide.SlideLoader.prototype = {
	init: function(slideId) {
		this.slideId = slideId;
		this.engineId = 'bd.slide.' + slideId.substring(0, 1).toUpperCase() + slideId.substring(1);
		
		this.elems = [];
		this.isReadyEngine = false;
		
		var tm = new Date().getTime();
		var clazz = this;
		head.load(bindobj.moduleroot + '/slide/' + this.slideId + '/engine.js?tm=' + tm,
			jQuery.fnbind(this, this.callback));
	},
	
	addSlide: function(elem, autost, loop) {
		if (this.isReadyEngine)
			this.slide.render( elem, autost, loop );
		else {
			this.elems.push({
				el: elem,
				autost: autost,
				loop: loop
			});
		}
	},
	
	callback: function() {
		this.waitStart();
	},
	
	waitStart: function() {
		this.chkTm = setInterval(jQuery.fnbind(this, this.checkLoaded), 100);
	},
	
	checkLoaded: function() {
		if (typeof(this.slide) == 'undefined') {
			try {
				this.slide = eval( 'new ' + this.engineId + '()' );
			} catch (e) {}
		} else {
			if (this.slide.isReady) {
				clearInterval(this.chkTm);
				var ttl = this.elems.length;
				for (var i=0; i<ttl; i++) {
					var e = this.elems[ i ];
					this.slide.render( e.el, e.autost, e.loop );
				}
				this.readyEngine = true;
			}
		}
	}
};

// util
bd.util = {
	addCss: function( url ) {
		var prev = document.getElementsByTagName('link')[0];
		var ln = document.createElement('link');
		ln.rel = 'stylesheet'; ln.type = 'text/css'; ln.href = url + "?tm=" + (new Date().getTime());
		prev.parentNode.appendChild(ln);
	},
	bdRefresh: function() {
		if (this.onEditBlock()) {
			BlockEdit.resize();
		}
	},
	onEditBlock: function() {
		return (typeof(BlockEdit) != 'undefined' && Value.preview == false);
	}
};

function processAccordion(b) {
	var opt = getBlockOption(b);
	var cmcs = getCmcs(b);
	if (opt=="opt-1" || opt=="opt-2" || opt=="opt-5" || opt=="opt-6") {
		for (var i=0; i<cmcs.length; i++) {
			var cmc = cmcs[i];
			var togglers = [];
			var elements = [];
			
			var prevToggler = null;
			var cl = cmc.childNodes;
			for (var j=0; j<cl.length; j++) {
				c = cl[j];
				if (c.tagName=='DIV') {
					if (c.className.indexOf("h2") > -1) {
						prevToggler = c;
						wrapAnchor(c);
						
						if (opt=="opt-2" || opt=="opt-6")
							c.style.cursor = 'default';
						else
							c.style.cursor = 'pointer';
					} else if (c.className.indexOf("box") > -1) {
						// toggle, element pair only.
						if (prevToggler!=null) {
							togglers.push(prevToggler);
							elements.push(c);
							prevToggler = null;
						}
					}
				}
			}
			
			// set wrapper
			var tgls = [];
			var elms = [];
			var ttl = togglers.length;
			for (var j=0; j<ttl; j++) {
				var is1st = (j==0);
				var isLast = (j==ttl-1);
				
				var cls = 'twrap';
				if (is1st) cls += ' top';
				if (isLast) cls += ' btm';
				
				var twrap = jQuery('<div class="' + cls + '"></div>');
				if (isLast) twrap.isLast = true;
				
				var t = togglers[ j ];
				twrap.insertBefore(t);
				twrap.append(t);
				tgls.push(twrap);
				
				cls = 'bwrap';
				if (is1st) cls += ' top';
				if (isLast) cls += ' btm';
				var bwrap = jQuery('<div class="' + cls + '"></div>');
				
				var e = elements[ j ];
				omitScript(e);
				bwrap.insertBefore(e);
				bwrap.append(e);
				elms.push(bwrap);
				
			}
			
			if (tgls.length > 0 && elms.length > 0) {
				var accordion = new BiNDAccordion(tgls, elms, {
					duration: 350,
//					transition: Fx.Transitions.Expo.easeOut,
					opacity: true,
					useMouseOver:(opt=="opt-2" || opt=="opt-6"),
					show:(opt=="opt-5" || opt=="opt-6") ? tgls.length - 1:0,
					onActive: function(t, e){
						jQuery(t).addClass('cr');
						if (t.isLast) jQuery(t).removeClass('btm');
						stopMovies(e, false);
					},
					
					onBackground: function(t, e){
						jQuery(t).removeClass('cr');
						if (t.isLast) jQuery(t).addClass('btm');
						stopMovies(e, true);
					}
				});
			}
			
		}
		
	} else if (opt=="opt-3" || opt=="opt-4" || opt=="opt-7" || opt=="opt-8") {
		for (var i=0; i<cmcs.length; i++) {
			var cmc = cmcs[i];
			var prevToggler = {};
			var pos = 0;
			
			// count togglers.
			var cl = cmc.childNodes;
			var ttl = 0;
			for (var j=0; j<cl.length; j++) {
				var c = cl[j];
				if (c.tagName=='DIV' && c.className.indexOf('h2') > -1) ttl++;
			}
			
			var tcnt = 0;
			for (var j=0; j<cl.length; j++) {
				var c = cl[j];
				if (c.tagName=='DIV') {
					if (c.className.indexOf("h2") > -1) {
						prevToggler = c;
						wrapAnchor(c);
						
						if (opt=="opt-4" || opt=="opt-8")
							c.style.cursor = 'default';
						else
							c.style.cursor = 'pointer';
						
					} else if (c.className.indexOf("box") > -1) {
						if (prevToggler) {
							tcnt++;
							var is1st = (tcnt==1);
							var isLast = (tcnt==ttl);
							var cls = 'twrap';
							if (is1st) cls += ' top';
							if (isLast) cls += ' btm';
							
							var t = jQuery('<div class="' + cls + '"></div>');
							if (isLast) t.isLast = true;
							t.insertBefore(prevToggler);
							t.append(prevToggler);
							
							cls = 'bwrap';
							if (is1st) cls += ' top';
							if (isLast) cls += ' btm';
							var e = jQuery('<div class="' + cls + '"></div>');
							omitScript(c);
							e.insertBefore(c);
							e.append(c);
							
							var tglAccordion = new ToggleAccordion(t, e, pos, {
								useMouseOver:(opt=="opt-4" || opt=="opt-8"),
								onActive: function(t, e){
									t.addClass('cr');
									if (t.isLast) t.removeClass('btm');
									stopMovies(e, false);
								},
								onBackground: function(t, e){
									t.removeClass('cr');
									if (t.isLast) t.addClass('btm');
									stopMovies(e, true);
								},
								open:(opt=="opt-7" || opt=="opt-8")
							});
							prevToggler = null;
							pos++;
						}
					}
				}
			}
		}
	}
	
}

function processTab(b) {
	var opt = getBlockOption(b);
	var cmcs = getCmcs(b);
	for (var i=0; i<cmcs.length; i++) {
		var cmc = cmcs[i];
		var tabs = [];
		var boxes = [];
		
		var twrap = jQuery('<div class="twrap"></div>').prependTo(cmc);
		var bwrap = jQuery('<div class="bwrap"></div>').insertAfter(twrap);
		
		var prevTab = null;
		var els = cmc.childNodes;
		for (var j=0; j<els.length; j++) {
			var e = els[j];
			if (typeof e == 'undefined') continue;
			if (e.nodeType==3 || e.nodeType==8) continue;
			
			if (e.className.indexOf('h2') > -1) {
				twrap.append(e);
				wrapAnchor(e);
				prevTab = e;
				j--;
				
			} else if (e.className.indexOf('box') > -1) {
				if (prevTab!=null) {
					omitScript(e);
					bwrap.append(e);
					
					tabs.push(prevTab);
					boxes.push(e);
					prevTab = null;
					j--;
				}
			}
		}
		
		try {
			var tab = new BindTab(tabs, boxes, bwrap, {
				onActive: function(t, e){
					stopMovies(e, false);
					jQuery(t).addClass('cr');
				},
				
				onBackground: function(t, e){
					stopMovies(e, true);
					jQuery(t).removeClass('cr');
				},
				
				useMouseOver: (opt=='opt-2' || opt=='opt-4' || opt=='opt-6' || opt=='opt-8'),
				
				blockOption: opt
			});
		} catch (e) {
			log(e);
		}
		
	}
}

function omitScript(p) {
	var elist;
	if (p.jquery)
		elist = p[0].childNodes;
	else
		elist = p.childNodes;
	for (var i=0; i<elist.length; i++) {
		var e = elist[i];
		if (typeof e == 'undefined') continue;
		// 3:text, 8:comment
		if (e.nodeType==3 || e.nodeType==8) continue;
		if (e.hasChildNodes()) omitScript(e);
		if (e.tagName.toLowerCase() == 'script') {
			p.removeChild(e);
		}
	}
}

function wrapAnchor(e) {
	if (!bindobj.ie6) return;
	
	var cl = e.childNodes;
	for (var j=0; j<cl.length; j++) {
		var c = cl[ j ];
		if (c.nodeName.toUpperCase() == 'H2') {
			var cll = c.childNodes;
			var a = jQuery('<a></a>');
			for (var k=0; k<cll.length; k++) {
				var cc = cll[ k ];
				a.append(cc);
			}
			a.appendTo(c);
			break;
		}
		if (c.hasChildNodes()) wrapAnchor(c);
	}
}

var namedAnchors = [];
var namePointers = [];
var smoothScroll = null;
var slideManager = null;
function processImageAndMovie(b) {
	var ancs = [];
	var caps = [];
	var popupAncs = [];
	var isNameFind = false;
	var findPageTop = false;
	var cls = getClassedTags(b, ['SPAN', 'A', 'DIV'], null, true);
	for (var i=0; i<cls.length; i++) {
		var cl = cls[i];
		var tagName = cl.tagName;
		var className = cl.className;
		if (tagName=='SPAN') {
			if (className.indexOf('img') > -1) {
				var hasZoom = false;
				var hasComment = false;
				var imgs = cl.childNodes;
				for (var j=0; j<imgs.length; j++) {
					var e = imgs[j];
					if (e.tagName=='A' && e.className.indexOf('bindzoom') > -1) {
						ancs.push(e);
						hasZoom = true;
					} else if (hasZoom && e.tagName=='SPAN') {
						caps.push(jQuery(e).text());
						hasComment = true;
					}
				}
				if (hasZoom && !hasComment) caps.push('');
				
			// Slide Parts
			} else if (className.indexOf('bd-slide') > -1) {
				if (slideManager == null) {
					slideManager = new bd.slide.SlideManager();
				}
				
				var args = className.split(" ");
				var autost = false;
				var loop = false;
				for (var j=2; j<args.length; j++) {
					if (args[ j ] == 'bd-slide-auto') autost = true;
					else if (args[ j ] == 'bd-slide-loop') loop = true;
				}
				slideManager.addSlide(args[1], autost, loop, cl);
				jQuery(cl).parent().css('padding-bottom', '0px');
				
			// SYNC check
			} else if (className.indexOf("sync") > -1) {
				loadSync();
			}
			
		} else if (tagName=='A') {
			if (className.indexOf('movieButton') > -1) processMovieButton(cl);
			if (className.indexOf('bindpopup') > -1 && bindobj.theme!="jquerymobile") popupAncs.push(cl);
			else if (className=='bindtexts' || className=='size-s') cl.onclick = function() {Textsize.resize(10); return false;};
			else if (className=='bindtextm' || className=='size-m') cl.onclick = function() {Textsize.resize(12); return false;};
			else if (className=='bindtextl' || className=='size-l') cl.onclick = function() {Textsize.resize(14); return false;};
			else if (cl.name && cl.name.length > 0) {
				namedAnchors.push(cl);
				isNameFind = true;
			} else if (cl.href.indexOf('#') > -1) {
				var nm = cl.href.substring(cl.href.indexOf('#') + 1);
				if (nm.length > 0) {
					namePointers.push(cl);
					isNameFind = true;
				}
			}
			
			// rollover img
			var imgs = cl.childNodes;
			for (var j=0; j<imgs.length; j++) {
				var e = imgs[j];
				if (e.tagName=='IMG' && e.className=='over-img') {
					if (bindobj.ipad == false && bindobj.iphone == false) {
						jQuery(cl).mouseover( function(event){
							jQuery('img', event.target.parentNode).each(function(i, img) {
								if (img.className=='over-img') jQuery(img).show();
								else jQuery(img).hide();
							});
						}).mouseout(function(event){
							jQuery('img', event.target.parentNode).each(function(i, img) {
								if (img.className=='over-img') jQuery(img).hide();
								else jQuery(img).show();
							});
						});
					}
					break;
				}
			}
			
		} else if (tagName=='DIV' && className.indexOf("sync") > -1) {
			loadSync();
		}
		
	}
	
	if (isNameFind) {
		for (var i=0; i<namePointers.length; i++) {
			var p = namePointers[i];
			var href = p.href;
			var nm = href.substring(href.indexOf('#') + 1);
			
			var find = false;
			for (var j=0; j<namedAnchors.length; j++) {
				var a = namedAnchors[j];
				if (a.name == nm) {
					addSmoothScroll(p, a);
					find = true;
					break;
				}
			}
			
			if (find == false) {
				var divTarget = document.getElementById(nm);
				if (divTarget) addSmoothScroll(p, divTarget);
			}
		}
	}
	
	if (ancs.length > 0) {
		if (bindobj.theme=="jquerymobile") {
			jQuery.each(ancs, function(i){
				var imgs = this.getElementsByTagName('img');
				if (imgs.length > 0) {
					imgs[0].alt = caps[ i ];
				}
			});
			jQuery(ancs).photoSwipe({allowUserZoom:false});
		} else {
			if (myBindZoom==null) {
				myBindZoom = new BiNDZoom(ancs, caps, {});
			} else {
				myBindZoom.addSet(ancs, caps);
			}
		}
	}
	
	if (popupAncs.length > 0) {
		if (myBindZoom==null) {
			myBindZoom = new BiNDZoom(popupAncs);
		} else {
			myBindZoom.addSet(popupAncs);
		}
	}
}

function addSmoothScroll(pointer, namedAnchor) {
	jQuery(pointer).click(function() {
		var top = jQuery(namedAnchor).offset().top;
		var el = (bindobj.sf || bindobj.chr) ? 'body' : 'html';
		jQuery(el).stop().animate({
			scrollTop: top
		}, 1000, 'easeOutExpo');
		return false;
	});
}

function processMovieButton(e) {
	if (myBindMovie==null) {
		myBindMovie = new BiNDMovie(e, {});
	} else {
		myBindMovie.addAnchor(e);
	}
}

function getBlockOption(b) {
	var o = b.firstChild;
	if (o) {
		var opt = o.className;
		if (opt.indexOf('color') > -1) {
			opt = opt.substring(0, opt.indexOf(' '));
		}
		return opt;
	}
	return "";
}

function getClassedTags(b,names,clazz,deep) {
	var cl;
	if (b.jquery)
		cl = b[0].childNodes;
	else
		cl = b.childNodes;
	var rtn = [];
	for (var i=0; i<cl.length; i++) {
		var c = cl[i];
		var nmfind = false;
		var nm = c.nodeName;
		var cls = c.className;
		
		if (nm=='#text') continue;
		
		for (var j=0; j<names.length; j++) {
			if (nm == names[j]) {
				nmfind = true;
				break;
			}
		}
		
		var find = false;
		if (nmfind) {
			var clsfind = false;
			
			if (clazz==null) {
				clsfind = true;
			} else {
				for (var j=0; j<clazz.length; j++) {
					if (cls.indexOf(clazz[j]) > -1) {
						clsfind = true;
						break;
					}
				}
			}
			
			if (clsfind) {
				rtn.push(c);
				find = !deep;
			}
		}
		
		if (find == false && c.hasChildNodes) {
			var wkary = getClassedTags(c, names, clazz, deep);
			for (var j=0; j<wkary.length; j++) {
				rtn.push(wkary[j]);
			}
		}
	}
	return rtn;
}

function getCmcs(b) {
	var rtn = getClassedTags(b, ['DIV'], ['cmc'], false);
	if (rtn.length == 0) rtn = getClassedTags(b, ['DIV'], ['column'], false);
	return rtn;
}

function stopMovies(e, sw) {
	var elements = getClassedTags(e, ['object', 'embed'], null, true);
	jQuery.each(elements, function(i, el){
		if (bindobj.msf || bindobj.wsf) {
			el.style.visibility = (sw) ? 'hidden':'';
		} else {
			el.style.display = (sw) ? 'none':'';
		}
		
		if (el.disabled) el.disabled = sw;
		if ((bindobj.ie60 || bindobj.ie70 || bindobj.ie80) && sw) {
			var mv = document.all(el.id);
			if (mv) {
				if (typeof(mv.stop)=='function') mv.stop();
				if (typeof(mv.Stop)=='function') mv.Stop();
			}
		}
	});
}

function setIE7CoreHeight(el, i, amnt) {
	var xmcs = getClassedTags(el, ['DIV'], ['xmc'], false);
	if (xmcs.length==0) {
		xmcs = getClassedTags(el, ['DIV'], ['box'], false);
	}
	if (xmcs.length > 0) {
		var xmc = xmcs[0];
		if (amnt == -1) {
			xmc.style.maxHeight = xmc.scrollHeight - 12;
		} else {
			var perc = Math.round(xmc.scrollHeight / el.originalHeight * 100) - (amnt + i);
			xmc.style.maxHeight = perc + '%';
		}
	}
}

function findDiv(p, cls) {
	var ns = p.childNodes;
	for (var i=0; i<ns.length; i++) {
		var n = ns[i];
		if (n && n.className) {
			if (n.className.indexOf(cls) > -1) return n;
			if (n.hasChildNodes()) {
				var rtn = findDiv(n, cls);
				if (rtn!=null) return rtn;
			}
		}
	}
	return null;
}

function dig(p) {
	var cl = p.childNodes;
	for (var i=0; i<cl.length; i++) {
		var c = cl[i];
		
		var nm = c.nodeName;
		var cls = c.className;
		
		switch (nm)
		{
		case '#text': continue;
		case 'DIV':
			if (cls.indexOf("block") > -1) {
				if (bindobj.theme!="jquerymobile"
				  && (typeof(Value)=="undefined" || Value.preview)) {
					if (cls.indexOf('accordion') > -1) {
						processAccordion(c);
						
					} else if (cls.indexOf('tab') > -1) {
						processTab(c);
					}
					
				}
				
				processImageAndMovie(c);
				
				if (!window.ie6) continue;
			}
			break;
			
		default:
			break;
			
		}
		
		if (window.ie6) {
			clearpng.fixone(c);
		}
		
		if (c.hasChildNodes()) {
			dig(c);
		}
	}
}

function loadSync() {
	if (!bd.syncLoaded) {
		bd.syncLoaded = true;
		bd.util.addCss(SYNC_SVR + "_modules/css/sync.css");
		head.load(SYNC_SVR + "_modules/js/swfaddress.js");
		head.load(SYNC_SVR + "_modules/js/json.js");
		head.load(SYNC_SVR + "_modules/js/sync.js");
	}
}

function log(msg) {
	if (bd.fx.debug) {
		var n = document.getElementById("log");
		if (n) {
			var buf = n.innerHTML;
			n.innerHTML = buf + msg + "<br />";
		}
	}
	if (typeof(console)!='undefined') {
		console.log(msg);
	}
}

function setupLog() {
	if (bd.fx.debug) {
		var logDiv = document.createElement("div");
		logDiv.setAttribute("id", "log");
		
		var css = "";
		if (window.ie6) {
			css = "position:absolute; height:200px; width:400px; left:0px; top:0px; " +
				"background-color:#ffffff; filter: alpha(opacity=60);" +
				"overflow-y:scroll;";
		} else {
			css = "position:absolute; height:200px; width:400px; left:0px; top:0px; " +
				"background-image:url(_module/theme/_default/blockskin/rich_wht/acc_box_bg.png);" +
				"overflow:scroll;";
		}
		logDiv.style.cssText = css;
		document.body.appendChild(logDiv);
	}
}

function getPosition(el, overflown){
	overflown = overflown || [];
	//var el = this, left = 0, top = 0;
	var left = 0, top = 0;
	do {
		left += el.offsetLeft || 0;
		top += el.offsetTop || 0;
		el = el.offsetParent;
	} while (el);
	for (var i=0, l=overflown.length; i<l; i++) {
		var element = overflown[ i ];
		left -= element.scrollLeft || 0;
		top -= element.scrollTop || 0;
	}
	return {'left': left, 'top': top};
}

var myBindZoom = null;
var myBindMovie = null;
function initFx() {
	setupLog();
	
	dig(document.body);
	
}

/*
	BiNDMovie
	130218
*/
function BiNDMovie() {
	this.initialize.apply(this, arguments);
}
BiNDMovie.prototype = {
	movies: [],
	sizes: [],
	movieObj: null,
	options: {
		resizeDuration: 200,
		resizeTransition: false,	// default transition
		initialWidth: 200,
		initialHeight: 30,
		showCounter: true
	},
	initialize: function(anc, options){
		jQuery.extend(this.options, options, {});
		
		this.addAnchor(anc);
		
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
			marginRight: 'auto'
		}).appendTo(mc);
		
		this.comment = jQuery('<div id="bindbox_comment"></div>').appendTo(mc);
		this.lineDiv = jQuery('<div id="bindbox_line"></div>').appendTo(mc);
		this.controlDiv = jQuery('<div id="bindbox_control"></div>').appendTo(mc);
		
		var clazz = this;
		jQuery('<div id="bindbox_close"></div>').appendTo(this.controlDiv).click(function(){
			clazz.close();
		});
	},
	
	addAnchor: function(anc){
		anc = jQuery(anc);
		var clazz = this;
		anc.click(function(){
			return clazz.click(anc);
		});
		this.movies.push(anc);
		var sz = anc.attr("rel");
		var pair = sz.split(',');
		this.sizes.push({width: Number(pair[0]), height: Number(pair[1])});
	},
	
	click: function(link){
		var anc, sz;
		for (var i=0; i<this.movies.length; i++) {
			var a = this.movies[i];
			if (a == link) {
				var pos = a.position();
				if (this.movieObj==null) {
					this.top = pos.top - 34;
					this.left = pos.left - 34;
				}
				this.anchorHeight = a.height();
				this.anchorWidth = a.width();
				this.anchorTop = this.top;
				this.anchorLeft = this.left;
				
				anc = a;
				sz = this.sizes[i];
				break;
			}
		}
		
		this.removeMovie();
		this.setup(true);
		
		this.movie = anc;
		this.movieWidth = sz.width;
		this.movieHeight = sz.height;
		
		this.bindbox.css({top: this.top, marginLeft:this.left, display: ''});
		return this.dispMovie();
	},
	
	toggleObjectVisible: function(open){
		var tags = 'object' + (bindobj.ie ? ',select' : ',embed');
		jQuery(tags).css('visibility', open ? 'hidden' : '');
	},
	
	setup: function(open){
		this.toggleObjectVisible(open);
		this.step = 0;
	},
	
	keyboardListener: function(event){
		switch (event.keyCode){
			case 27: case 88: case 67: this.close();
		}
	},
	
	dispMovie: function(){
		this.step = 1;
		this.nextEffect();
		
		return false;
	},
	
	nextEffect: function(){
		switch (this.step++){
		case 1:
			this.image[0].innerHTML = '';
			this.image.css({
				width: this.movieWidth
			});
			
			if (this.bindbox.clientHeight != this.movieHeight){
				var clazz = this;
				var win = jQuery(window);
				var obj = {
					height: this.movieHeight + 68,
					width: this.movieWidth + 68,
					marginLeft: (win.width() - (this.movieWidth + 68)) / 2,
					top: win.scrollTop() + (win.height() / 15)
				};
				if (!bindobj.ie) obj['opacity'] = 1;
				this.bindbox.animate(obj, this.options.resizeDuration,
				function() {
					clazz.nextEffect();
				});
				break;
			}
			this.step++;
			
		case 2:
			this.movieObj = this.createObj();
			this.controlDiv.show();
			this.lineDiv.show();
			this.step = 0;
		}
	},
	
	closeEffect: function(){
		this.controlDiv.hide();
		this.lineDiv.hide();
		
		var clazz = this;
		var obj = {
			height: this.anchorHeight,
			width: this.anchorWidth,
			marginLeft: this.anchorLeft,
			top: this.anchorTop
		};
		if (!bindobj.ie) obj['opacity'] = 1;
		this.bindbox.animate(obj, this.options.resizeDuration,
		function() {
			clazz.closeEnd();
		});
		
	},
	
	closeEnd: function() {
		this.bindbox.hide();
		
	},
	
	createObj: function(){
		var t = this.movie[0].getAttribute('movtype');
		var p = this.getMovieParams(t);
		var movieId = getNextMovieId();
		var url = this.movie.attr('href');
		
		var outer = document.createElement('object');
		outer.setAttribute('id', movieId);
		outer.setAttribute('classid', p.cls);
		outer.setAttribute('width', this.movieWidth);
		outer.setAttribute('height', this.movieHeight + 16);
		if (p.codebase && p.codebase.length > 0) outer.setAttribute('codebase', p.codebase);
		addParameter(outer, "src", url);
		
		if (bindobj.ffx) {
			var e = document.createElement('embed');
			e.setAttribute('type', p.tp);
			e.setAttribute('src', url);
			e.setAttribute('width', this.movieWidth);
			e.setAttribute('height', this.movieHeight + 16);
			outer.appendChild(e);
			
		} else if (!bindobj.ie) {
			var e = document.createElement('object');
			e.setAttribute('type', p.tp);
			e.setAttribute('data', url);
			e.setAttribute('id', movieId + 'Inner');
			e.setAttribute('width', this.movieWidth);
			e.setAttribute('height', this.movieHeight + 16);
			addParameter(e, 'autoplay', 'true');
			addParameter(e, 'controller', 'true');
			addParameter(e, 'cache', 'true');
			addParameter(e, 'saveembedtags', true);
			
			outer.appendChild(e);
			outer.inner = e;
		}
		
		addParameter(outer, 'autoplay', 'true');
		addParameter(outer, 'controller', 'true');
		addParameter(outer, 'cache', 'true');
		addParameter(outer, 'saveembedtags', true);
		
		if (t == 'rm') {
			addParameter(e, 'controls', 'ImageWindow');
			addParameter(outer, 'controls', 'ImageWindow');
			addParameter(e, 'autostart', 'true');
			addParameter(outer, 'autostart', 'true');
		}
		
		if (!bindobj.ie) {
			this.image.append(outer);
			
		} else {
			var markup = "";
			markup = outer.outerHTML.replace('</OBJECT>', '');
			for (var i = 0; i < outer.childNodes.length; i++) {
				markup += outer.childNodes[i].outerHTML;
			}
			markup += '</OBJECT>';
			this.image[0].innerHTML = markup;
		}
		
		return outer;
	},
	
	close: function(e){
		if (this.step < 0) return;
		this.step = -1;
		//for (var f in this.fx) this.fx[f].stop();
		
		this.removeMovie();
		
		//this.closeEffect.bind(this);
		this.closeEffect();
		
		this.setup(false);
		
		return false;
	},
	
	removeMovie: function() {
		if (this.movieObj != null) {
			if (bindobj.ie) {
				this.movieObj.style.display = 'none';		// for ie6.
			} else {
				this.movieObj.style.visibility = 'hidden';
			}
			
			if (typeof(this.movieObj.Stop)=="function") {
				this.movieObj.Stop();
			} else if (typeof(this.movieObj.pause)=="function") {
				this.movieObj.pause();
			} else if (this.movieObj.inner) {
				if (typeof(this.movieObj.inner.Stop)=="function") {
					try {
						this.movieObj.inner.Stop();
					} catch(e) {}
				} else if (typeof(this.movieObj.inner.pause)=="function") {
					try {
						this.movieObj.inner.pause();
					} catch(e) {}
				}
			}
			
			this.movieObj = null;
			
			this.image[0].innerHTML = '';
			
		}
	},
	
	getMovieParams: function(t) {
		var cls, cb, tp, pg;
		if (t=='mov') {
			cls = 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B';
			cb = 'http://www.apple.com/qtactivex/qtplugin.cab#version=7,3,0,0';
			tp = 'video/quicktime';
			pg = 'http://www.apple.com/quicktime/download/';
			
		} else if (t=='swf') {
			cls = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
			cb = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0';
			tp = 'application/x-shockwave-flash';
			pg = 'http://www.macromedia.com/go/getflashplayer';
			
		} else if (t=='asf') {
			cls = 'clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95';
			cb = 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715';
			tp = 'application/x-mplayer2';
			pg = 'http://www.microsoft.com/isapi/redir.dll?prd=windows&sbp=mediaplayer&ar=Media&sba=Plugin&';
			
		} else if (t=='wmv') {
			if (window.webkit) {
				cls = 'clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6';
				cb = '';
				tp = 'video/x-ms-wmv';
				pg = '';
			} else {
				cls = 'clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95';
				cb = 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715';
				tp = 'application/x-mplayer2';
				pg = 'http://www.microsoft.com/isapi/redir.dll?prd=windows&sbp=mediaplayer&ar=Media&sba=Plugin&';
			}
			
		} else if (t=='rm') {
			cls = 'clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA';
			cb = '';
			tp = 'audio/x-pn-realaudio-plugin';
			pg = 'http://www.real.com/player/index.html';
			
		}
		
		return {'cls':cls, 'codebase':cb, 'tp':tp, 'pluginspage':pg};
	}
};

/*
	bindmovie functions
*/
var bindMovieNum = 0;
var movies = [];

function bindmovie() {
	if (bindobj.printstate) return;	//*** modified by sato

	var t = arguments[0];
	var f = arguments[1];
	var w = arguments[2];
	var h = arguments[3];
	var at = arguments[4];
	var dl = arguments[5];
	var pu = arguments[6];
	var cp = arguments[7];
	
	if (f=='') return;
	/*
	if (jQuery.inArray(f, movies) > -1) return;
	movies.push(f);
	*/
	
	if (t=="mov") {
		writeQt(t, f, w, h, at, dl, pu, cp);
		
	} else if (t=="swf") {
		writeSwf(t, f, w, h, at, dl, pu, cp);
		
	} else if (t=="wmv" || t=="asf") {
		writeWmv(t, f, w, h, at, dl, pu, cp);
		
	} else if (t=="rm") {
		writeReal(t, f, w, h, at, dl, pu, cp);
		
	} else if (t=="flv") {
		//alert("flvにはプレイヤーswfが必要です！");
	}
}

function writeQt(t, f, w, h, at, dl, pu, cp) {
	if (bindobj.isJQueryMobile) {
		writeMovieLink(f, cp);
	} else if (pu == "0") {
		writeDirectQt(f, w, h, at, dl);
	} else {
		writeEnlergeQt(t, f, w, h, at, dl, cp);
	}
}

function writeEnlergeQt(t, f, w, h, at, dl, cp) {
	writeMovieButton(t, f, w, h, cp);
}

function writeDirectQt(f, w, h, at, dl) {
	var buf = '';
	buf = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"'
		+ ' codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,3,0,0"';
	
	var ht = new Number(h) + 16;
	
	buf += ' width="' + w + '"';
	buf += ' height="' + ht + '"';
	buf += '>';
	
	buf += '<param name="src" value="' + f + '" />';
	
	if (at=="1")
		buf += '<param name="autoplay" value="true" />';
	else
		buf += '<param name="autoplay" value="false" />';
	
	buf += '<embed src="' + f + '" type="video/quicktime"'
	buf += ' width="' + w + '"';
	buf += ' height="' + ht + '"';
	
	if (at=="1")
		buf += ' autoplay="true"';
	else
		buf += ' autoplay="false"';
	
	buf += '></embed>';
	
	buf += '</object>';
	
	if (dl=="1") {
		buf += '<p><a href="' + f + '">ダウンロード</a></p>';
	}
	
	document.write(buf);
}

function writeSwf(t, f, w, h, at, dl, pu, cp) {
	if (bindobj.isJQueryMobile) {
		writeMovieLink(f, cp);
	} else if (pu == "0") {
		writeDirectSwf(f, w, h, at, dl);
	} else {
		writeEnlergeSwf(t, f, w, h, at, dl, cp);
	}
}

function writeEnlergeSwf(t, f, w, h, at, dl, cp) {
	writeMovieButton(t, f, w, h, cp);
}

function writeDirectSwf(f, w, h, at, dl) {
	var mvId = getNextMovieId();
	var buf = '';
	
	if (window.ie) {
		buf = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'
			+ ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0"';
		
		buf += ' id="' + mvId + '"';
		buf += ' width="' + w + '"';
		buf += ' height="' + h + '"';
		buf += '>';
		
		buf += '<param name="src" value="' + f + '" />';
		
		if (at=="1")
			buf += '<param name="play" value="true" />';
		else
			buf += '<param name="play" value="false" />';
		
		buf += '<param name="wmode" value="transparent" />';
		buf += '</object>';
		
	} else {
		buf = '<embed src="' + f + '" type="application/x-shockwave-flash"'
		buf += ' id="' + mvId + '"';
		buf += ' width="' + w + '"';
		buf += ' height="' + h + '"';
		
		if (at=="1")
			buf += ' play="true"';
		else
			buf += ' play="false"';
		
		buf += ' wmode="transparent"';
		buf += '></embed>';
	
	}
	
	
	if (dl=="1") {
		buf += '<p><a href="' + f + '">ダウンロード</a></p>';
	}
	
	document.write(buf);
}

function writeWmv(t, f, w, h, at, dl, pu, cp) {
	if (bindobj.isJQueryMobile) {
		writeMovieLink(f, cp);
	} else if (pu == "0") {
		writeDirectWmv(f, w, h, at, dl);
	} else {
		writeEnlergeWmv(t, f, w, h, at, dl, cp);
	}
}

function writeEnlergeWmv(t, f, w, h, at, dl, cp) {
	writeMovieButton(t, f, w, h, cp);
}

function writeDirectWmv(f, w, h, at, dl) {
	var mvId = getNextMovieId();
	var buf = '';
	buf = '<object classid="clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95"'
		+ ' codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715"';
	
	buf += ' id="' + mvId + '"';
	buf += ' width="' + w + '"';
	h = Number(h) + 60;
	buf += ' height="' + h + '"';
	buf += '>';
	
	buf += '<param name="src" value="' + f + '" />';
	
	if (at=="1")
		buf += '<param name="autoplay" value="true" />';
	else
		buf += '<param name="autoplay" value="false" />';
	
	buf += '<embed src="' + f + '" type="application/x-mplayer2"'
	buf += ' id="' + mvId + '"';
	buf += ' width="' + w + '"';
	buf += ' height="' + h + '"';
	
	if (at=="1")
		buf += ' autoplay="true"';
	else
		buf += ' autoplay="false"';
	
	buf += '></embed>';
	
	buf += '</object>';
	
	if (dl=="1") {
		buf += '<p><a href="' + f + '">ダウンロード</a></p>';
	}
	
	document.write(buf);
}

function writeReal(t, f, w, h, at, dl, pu, cp) {
	if (bindobj.isJQueryMobile) {
		writeMovieLink(f, cp);
	} else if (pu == "0") {
		writeDirectReal(f, w, h, at, dl);
	} else {
		writeEnlergeReal(t, f, w, h, at, dl, cp);
	}
}

function writeEnlergeReal(t, f, w, h, at, dl, cp) {
	writeMovieButton(t, f, w, h, cp);
}

function writeDirectReal(f, w, h, at, dl) {
	var hh = Number(h) + 36;
	var mvId = getNextMovieId();
	var buf = '';
	buf = '<object classid="clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA"';
	
	buf += ' id="' + mvId + '"';
	buf += ' width="' + w + '"';
	buf += ' height="' + h + '"';
	buf += '>';
	
	buf += '<param name="src" value="' + f + '" />';
	buf += '<param name="controls" value="ImageWindow" />';
	
	if (at=="1")
		buf += '<param name="autoplay" value="true" />';
	else
		buf += '<param name="autoplay" value="false" />';
	
	buf += '<embed src="' + f + '" type="audio/x-pn-realaudio-plugin"'
	buf += ' id="' + mvId + '"';
	buf += ' width="' + w + '"';
	buf += ' height="' + h + '"';
	buf += 'controls="ImageWindow"';	// <--> ControlPanel
	
	if (at=="1")
		buf += ' autoplay="true"';
	else
		buf += ' autoplay="false"';
	
	buf += '></embed>';
	
	buf += '</object>';
	
	if (dl=="1") {
		buf += '<p><a href="' + f + '">ダウンロード</a></p>';
	}
	
	document.write(buf);
}



/*
	ムービーボタン！
*/
function writeMovieButton(t, f, w, h, cp) {
	var buf = '';
	var mvId = getNextMovieId();
	if (cp=='') cp = 'ムービー';
	buf = '<a href="' + f + '" class="movieButton"' +
		' id="' + mvId + '"' +
		' movtype="' + t + '"' +
		' rel="' + w + ',' + h + '">' +
		'<span>' + cp + '</span></a>';
	document.write(buf);
}

/*
	リンクのみ（jQuery Mobile）
*/
function writeMovieLink(f, cp) {
	var buf = '';
	if (cp=='') cp = 'ムービー';
	buf = '<a href="' + f + '">' +
		'<span>' + cp + '</span></a>';
	document.write(buf);
}

function getNextMovieId() {
	bindMovieNum++;
	return 'bindMovie' + bindMovieNum;
}

function idflash() {
	var f = arguments[0];
	var w = arguments[1];
	var h = arguments[2];
	var bg = arguments[3];
	
	var ua = navigator.userAgent;
	var tm = (new Date()).getTime();
	var idbase = f.substring(0, f.lastIndexOf("/")+1);
	
	var buf = '';
	
	buf = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'
		+ ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0"';
	
	buf += ' id="idswf"';
	buf += ' width="' + w + '"';
	buf += ' height="' + h + '"';
	buf += '>';
	
	buf += '<param name="movie" value="' + f + "&tm=" + tm + '" />';
	buf += '<param name="base" value="." />';
	
	buf += '<param name="bgcolor" value="' + bg + '" />';
	buf += '<param name="wmode" value="transparent" />';
	buf += "<param name=\"FlashVars\" value=\"b=" + ua + "&idbase=" + idbase + "\"/>";
	
	buf += '<embed src="' + f + "&tm=" + tm + '" type="application/x-shockwave-flash"'
	buf += ' id="idswf"';
	buf += ' width="' + w + '"';
	buf += ' height="' + h + '"';
	buf += ' base="."';
	buf += ' wmode="transparent"';
	
	buf += ' bgcolor="' + bg + '"';
	buf += " FlashVars=\"b=" + ua + "&idbase=" + idbase + "\"";
	
	buf += '></embed>';
	
	buf += '</object>';
	
	document.write(buf);

}

function addParameter(parent,name,value){
	if(!parent){
		return;
	}

	var param=document.createElement('param');
	param.setAttribute('value',value);
	param.setAttribute('name',name);
	parent.appendChild(param);
}

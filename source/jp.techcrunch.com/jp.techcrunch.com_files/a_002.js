/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.4 | Apr 1 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
    "use strict";

    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define("factory", function () {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function () {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8 and 9: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function () {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For IE10 we need to change our technique again...
     * thanks https://github.com/stefanvanburen
     * @return {Object}
     * @private
     */
    var ie10 = function () {
        var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Mobile WebKit
     * the trick: window.innerWIdth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
        var zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    var webkit = function () {
        var important = function (str) {
            return str.replace(/;/g, " !important;");
        };

        var div = document.createElement('div');
        div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
        div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

        // The container exists so that the div will be laid out in its own flow
        // while not impacting the layout, viewport size, or display of the
        // webpage as a whole.
        // Add !important and relevant CSS rule resets
        // so that other rules cannot affect the results.
        var container = document.createElement('div');
        container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
        container.appendChild(div);

        document.body.appendChild(container);
        var zoom = 1000 / div.clientHeight;
        zoom = Math.round(zoom * 100) / 100;
        document.body.removeChild(container);

        return{
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.top.outerWidth / window.top.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback;
        //IE8+
        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
            func = ie8;
        }
        // IE10+ / Touch
        else if (window.navigator.msMaxTouchPoints) {
            func = ie10;
        }
        //Mobile Webkit
        else if ('orientation' in window && typeof document.body.style.webkitMarquee === 'string') {
            func = webkitMobile;
        }
        //WebKit
        else if (typeof document.body.style.webkitMarquee === 'string') {
            func = webkit;
        }
        //Opera
        else if (navigator.userAgent.indexOf('Opera') >= 0) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());


    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return detectFunction().devicePxPerCssPx;
        }
    });
}));

var wpcom_img_zoomer = {
        clientHintSupport: {
                gravatar: false,
                files: false,
                photon: false,
                mshots: false,
                staticAssets: false,
                latex: false,
                imgpress: false,
        },
	useHints: false,
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

        hintsFor: function( service ) {
                if ( this.useHints === false ) {
                        return false;
                }
                if ( this.hints() === false ) {
                        return false;
                }
                if ( typeof this.clientHintSupport[service] === "undefined" ) {
                        return false;
                }
                if ( this.clientHintSupport[service] === true ) {
                        return true;
                }
                return false;
        },

	hints: function() {
		try {
			var chrome = window.navigator.userAgent.match(/\sChrome\/([0-9]+)\.[.0-9]+\s/)
			if (chrome !== null) {
				var version = parseInt(chrome[1], 10)
				if (isNaN(version) === false && version >= 46) {
					return true
				}
			}
		} catch (e) {
			return false
		}
		return false
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = detectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Wait for original images to load
			if ( "complete" in imgs[i] && ! imgs[i].complete )
				continue;

			// Skip images that have srcset attributes.
			if ( imgs[i].hasAttribute('srcset') ) {
				continue;
			}

			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			// Skip images from Lazy Load plugins
			if ( ! imgScale && imgs[i].getAttribute("data-lazy-src") && (imgs[i].getAttribute("data-lazy-src") !== imgs[i].getAttribute("src")))
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

                var isFiles = false;
                var isLatex = false;
                var isPhoton = false;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
                        if ( this.hintsFor( "gravatar" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
                        if ( this.hintsFor( "mshots" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});

			// Update height attribute to match width
			newSrc = newSrc.replace( /([?&]h=)(\d+)/, function($0, $1, $2) {
				if ( newSrc == img.src ) {
					return $0;
				}
				// Stash the original size
				var originalAtt = 'originalh', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
				}
				// Get the height of the image in CSS pixels
				var size = img.clientHeight;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalHeight )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
                        if ( this.hintsFor( "imgpress" ) === true ) {
                                return false; 
                        }
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale files.wordpress.com, LaTeX, or Photon images (i#.wp.com)
		else if (
			( isFiles = img.src.match(/^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/) ) ||
			( isLatex = img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ) ||
			( isPhoton = img.src.match(/^https?:\/\/i[\d]{1}\.wp\.com\/(.+)/) )
		) {
                        if ( false !== isFiles && this.hintsFor( "files" ) === true ) {
                                return false
                        }
                        if ( false !== isLatex && this.hintsFor( "latex" ) === true ) {
                                return false
                        }
                        if ( false !== isPhoton && this.hintsFor( "photon" ) === true ) {
                                return false
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 ) {
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			} else {
				newSrc = img.src;

				var url_var = newSrc.match( /([?&]w=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.width );
				}

				url_var = newSrc.match( /([?&]h=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.height );
				}

				var zoom_arg = '&zoom=2';
				if ( !newSrc.match( /\?/ ) ) {
					zoom_arg = '?zoom=2';
				}
				img.setAttribute( 'srcset', newSrc + zoom_arg + ' ' + scale + 'x' );
			}
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
                        if ( this.hintsFor( "staticAssets" ) === true ) {
                                return false; 
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			prevSrc = img.src;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
/* global pm, wpcom_reblog */

var jetpackLikesWidgetQueue = [];
var jetpackLikesWidgetBatch = [];
var jetpackLikesMasterReady = false;

function JetpackLikespostMessage( message, target ) {
	if ( 'string' === typeof message ){
		try {
			message = JSON.parse( message );
		} catch(e) {
			return;
		}
	}

	pm( {
		target: target,
		type: 'likesMessage',
		data: message,
		origin: '*'
	} );
}

function JetpackLikesBatchHandler() {
	var requests = [];
	jQuery( 'div.jetpack-likes-widget-unloaded' ).each( function() {
		if ( jetpackLikesWidgetBatch.indexOf( this.id ) > -1 ) {
			return;
		}
		jetpackLikesWidgetBatch.push( this.id );
		var regex = /like-(post|comment)-wrapper-(\d+)-(\d+)-(\w+)/,
			match = regex.exec( this.id ),
			info;

		if ( ! match || match.length !== 5 ) {
			return;
		}

		info = {
			blog_id: match[2],
			width:   this.width
		};

		if ( 'post' === match[1] ) {
			info.post_id = match[3];
		} else if ( 'comment' === match[1] ) {
			info.comment_id = match[3];
		}

		info.obj_id = match[4];

		requests.push( info );
	});

	if ( requests.length > 0 ) {
		JetpackLikespostMessage( { event: 'initialBatch', requests: requests }, window.frames['likes-master'] );
	}
}

function JetpackLikesMessageListener( event, message ) {
	var allowedOrigin, $container, $list, offset, rowLength, height, scrollbarWidth;

	if ( 'undefined' === typeof event.event ) {
		return;
	}

	// We only allow messages from one origin
	allowedOrigin = window.location.protocol + '//widgets.wp.com';
	if ( allowedOrigin !== message.origin ) {
		return;
	}

	if ( 'masterReady' === event.event ) {
		jQuery( document ).ready( function() {
			jetpackLikesMasterReady = true;

			var stylesData = {
					event: 'injectStyles'
				},
				$sdTextColor = jQuery( '.sd-text-color' ),
				$sdLinkColor = jQuery( '.sd-link-color' );

			if ( jQuery( 'iframe.admin-bar-likes-widget' ).length > 0 ) {
				JetpackLikespostMessage( { event: 'adminBarEnabled' }, window.frames[ 'likes-master' ] );

				stylesData.adminBarStyles = {
					background: jQuery( '#wpadminbar .quicklinks li#wp-admin-bar-wpl-like > a' ).css( 'background' ),
					isRtl: ( 'rtl' === jQuery( '#wpadminbar' ).css( 'direction' ) )
				};
			}

			// enable reblogs if we're on a single post page
			if ( jQuery( 'body' ).hasClass( 'single' ) ) {
				JetpackLikespostMessage( { event: 'reblogsEnabled' }, window.frames[ 'likes-master' ] );
			}

			if ( ! window.addEventListener ) {
				jQuery( '#wp-admin-bar-admin-bar-likes-widget' ).hide();
			}

			stylesData.textStyles = {
				color:          $sdTextColor.css( 'color' ),
				fontFamily:     $sdTextColor.css( 'font-family' ),
				fontSize:       $sdTextColor.css( 'font-size' ),
				direction:      $sdTextColor.css( 'direction' ),
				fontWeight:     $sdTextColor.css( 'font-weight' ),
				fontStyle:      $sdTextColor.css( 'font-style' ),
				textDecoration: $sdTextColor.css('text-decoration')
			};

			stylesData.linkStyles = {
				color:          $sdLinkColor.css('color'),
				fontFamily:     $sdLinkColor.css('font-family'),
				fontSize:       $sdLinkColor.css('font-size'),
				textDecoration: $sdLinkColor.css('text-decoration'),
				fontWeight:     $sdLinkColor.css( 'font-weight' ),
				fontStyle:      $sdLinkColor.css( 'font-style' )
			};

			JetpackLikespostMessage( stylesData, window.frames[ 'likes-master' ] );

			JetpackLikesBatchHandler();

			jQuery( document ).on( 'inview', 'div.jetpack-likes-widget-unloaded', function() {
				jetpackLikesWidgetQueue.push( this.id );
			});
		});
	}

	if ( 'showLikeWidget' === event.event ) {
		jQuery( '#' + event.id + ' .post-likes-widget-placeholder'  ).fadeOut( 'fast', function() {
			jQuery( '#' + event.id + ' .post-likes-widget' ).fadeIn( 'fast', function() {
				JetpackLikespostMessage( { event: 'likeWidgetDisplayed', blog_id: event.blog_id, post_id: event.post_id, obj_id: event.obj_id }, window.frames['likes-master'] );
			});
		});
	}

	if ( 'clickReblogFlair' === event.event ) {
		wpcom_reblog.toggle_reblog_box_flair( event.obj_id );
	}

	if ( 'showOtherGravatars' === event.event ) {
		$container = jQuery( '#likes-other-gravatars' );
		$list = $container.find( 'ul' );

		$container.hide();
		$list.html( '' );

		$container.find( '.likes-text span' ).text( event.total );

		jQuery.each( event.likers, function( i, liker ) {
			var element = jQuery( '<li><a><img /></a></li>' );
			element.addClass( liker.css_class );

			element.find( 'a' ).
				attr({
					href: liker.profile_URL,
					rel: 'nofollow',
					target: '_parent'
				}).
				addClass( 'wpl-liker' );

			element.find( 'img' ).
				attr({
					src: liker.avatar_URL,
					alt: liker.name
				}).
				css({
					width: '30px',
					height: '30px',
					paddingRight: '3px'
				});

			$list.append( element );
		} );

		offset = jQuery( '[name=\'' + event.parent + '\']' ).offset();

		$container.css( 'left', offset.left + event.position.left - 10 + 'px' );
		$container.css( 'top', offset.top + event.position.top - 33 + 'px' );

		rowLength = Math.floor( event.width / 37 );
		height = ( Math.ceil( event.likers.length / rowLength ) * 37 ) + 13;
		if ( height > 204 ) {
			height = 204;
		}

		$container.css( 'height', height + 'px' );
		$container.css( 'width', rowLength * 37 - 7 + 'px' );

		$list.css( 'width', rowLength * 37 + 'px' );

		$container.fadeIn( 'slow' );

		scrollbarWidth = $list[0].offsetWidth - $list[0].clientWidth;
		if ( scrollbarWidth > 0 ) {
			$container.width( $container.width() + scrollbarWidth );
			$list.width( $list.width() + scrollbarWidth );
		}
	}
}

pm.bind( 'likesMessage', JetpackLikesMessageListener );

jQuery( document ).click( function( e ) {
	var $container = jQuery( '#likes-other-gravatars' );

	if ( $container.has( e.target ).length === 0 ) {
		$container.fadeOut( 'slow' );
	}
});

function JetpackLikesWidgetQueueHandler() {
	var $wrapper, wrapperID, found;
	if ( ! jetpackLikesMasterReady ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	if ( jetpackLikesWidgetQueue.length > 0 ) {
		// We may have a widget that needs creating now
		found = false;
		while( jetpackLikesWidgetQueue.length > 0 ) {
			// Grab the first member of the queue that isn't already loading.
			wrapperID = jetpackLikesWidgetQueue.splice( 0, 1 )[0];
			if ( jQuery( '#' + wrapperID ).hasClass( 'jetpack-likes-widget-unloaded' ) ) {
				found = true;
				break;
			}
		}
		if ( ! found ) {
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	} else if ( jQuery( 'div.jetpack-likes-widget-unloaded' ).length > 0 ) {
		// Grab any unloaded widgets for a batch request
		JetpackLikesBatchHandler();

		// Get the next unloaded widget
		wrapperID = jQuery( 'div.jetpack-likes-widget-unloaded' ).first()[0].id;
		if ( ! wrapperID ) {
			// Everything is currently loaded
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	}

	if ( 'undefined' === typeof wrapperID ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	$wrapper = jQuery( '#' + wrapperID );
	$wrapper.find( 'iframe' ).remove();

	if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
		$wrapper.find( '.post-likes-widget-placeholder' ).after( '<iframe class="post-likes-widget jetpack-likes-widget" name="' + $wrapper.data( 'name' ) + '" height="22px" width="68px" frameBorder="0" scrolling="no" src="' + $wrapper.data( 'src' ) + '"></iframe>' );
	} else {
		$wrapper.find( '.post-likes-widget-placeholder' ).after( '<iframe class="post-likes-widget jetpack-likes-widget" name="' + $wrapper.data( 'name' ) + '" height="55px" width="100%" frameBorder="0" src="' + $wrapper.data( 'src' ) + '"></iframe>' );
	}

	$wrapper.removeClass( 'jetpack-likes-widget-unloaded' ).addClass( 'jetpack-likes-widget-loading' );

	$wrapper.find( 'iframe' ).load( function( e ) {
		var $iframe = jQuery( e.target );
		$wrapper.removeClass( 'jetpack-likes-widget-loading' ).addClass( 'jetpack-likes-widget-loaded' );

		JetpackLikespostMessage( { event: 'loadLikeWidget', name: $iframe.attr( 'name' ), width: $iframe.width() }, window.frames[ 'likes-master' ] );

		if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
			$wrapper.find( 'iframe' ).Jetpack( 'resizeable' );
		}
	});
	setTimeout( JetpackLikesWidgetQueueHandler, 250 );
}
JetpackLikesWidgetQueueHandler();
;
(function() {
	var ajaxurl = window.ajaxurl || '/wp-admin/admin-ajax.php',
		data = window.wpcomVipAnalytics,
		dataQs, percent;

	if ( typeof XMLHttpRequest === 'undefined' ) {
		return;
	}

	if ( ! data ) {
		return;
	}

	percent = ~~data.percentToTrack;
	if ( percent && percent < 100 && ( ~~( ( Math.random() * 100 ) + 1 ) > percent ) ) {
		return;
	}

	dataQs = 'action=wpcom_vip_analytics';

	for ( var key in data ) {
		if ( key === 'percentToTrack' ) {
			continue;
		}
		if ( data.hasOwnProperty( key ) ) {
			dataQs += '&' +
				encodeURIComponent( key ).replace(/%20/g, '+' ) + '=' +
				encodeURIComponent( data[key] ).replace(/%20/g, '+' );
		}
	}

	function sendInfo() {
		var xhr = new XMLHttpRequest();
		xhr.open( 'POST', ajaxurl, true );
		xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
		xhr.send( dataQs );
	}

	// Delay for some time after the document is ready to ping
	function docReady() {
		setTimeout( function() {
			sendInfo();
		}, 1500 );
	}

	if ( document.readyState === 'complete' ) {
		docReady.apply();
	}
	else if ( document.addEventListener ) {
		document.addEventListener( 'DOMContentLoaded', docReady, false );
	}
	else if ( document.attachEvent ) {
		document.attachEvent( 'onreadystatechange', docReady );
	}
})();
;
!function(a,b,c){function d(b){if(!u){var c=a._gaq;b.Event.subscribe("edge.create",function(a){c.push(["_trackSocial","Facebook","like",a])}),b.Event.subscribe("edge.remove",function(a){c.push(["_trackSocial","Facebook","unlike",a])}),b.Event.subscribe("message.send",function(a){c.push(["_trackSocial","Facebook","send",a])}),u=!0}}function e(a,b){if(a){var c=new RegExp("[\\?&#]"+b+"=([^&#]*)"),d=c.exec(a);return null!=d?decodeURIComponent(d[1]):void 0}}function f(b){var c=a._gaq;if(b){var d;b.target&&"IFRAME"===b.target.nodeName&&(d=e(b.target.src,"url")),c.push(["_trackSocial","Twitter","tweet",d])}}function g(){return p||(p=a.FB),p}function h(){return q||(q=a.IN),q||w.loader.load("linkedin","https://platform.linkedin.com/in.js"),q}function i(){return a.___gcfg={lang:"ja"},r||(r=a.gapi),r||w.loader.load("gapi","https://apis.google.com/js/plusone.js"),r}function j(a,b){var c='<fb:like href="'+encodeURI(b)+'" layout="button_count" send="false" data-width="100px" data-height="20px" show_faces="false"></fb:like>';w.loader.on("fb",function(){a.innerHTML=c,g().XFBML.parse(a),d(p)})}function k(b,c,d){var e=s.createElement("span"),g=s.createElement("a");if(g.setAttribute("href","https://twitter.com/share"),g.setAttribute("class","twitter-share-button"),g.setAttribute("data-counturl",encodeURI(c)),g.setAttribute("data-lang","ja"),g.setAttribute("data-text",d),g.setAttribute("data-count","none"),g.setAttribute("data-url",encodeURI(c)),g.setAttribute("data-via","jptechcrunch"),g.setAttribute("data-related","jptechcrunch"),g.innerHTML="Tweet",e.appendChild(g),b.innerHTML="",b.appendChild(e),v)try{a.twttr.widgets.load()}catch(h){}else a.twttr=function(b,c,d){var e,f,g=b.getElementsByTagName(c)[0];return b.getElementById(d)?a.twttr:(f=b.createElement(c),f.id=d,f.async=!0,f.src="//platform.twitter.com/widgets.js",g.parentNode.insertBefore(f,g),a.twttr||(e={_e:[],ready:function(a){e._e.push(a)}}))}(s,"script","twitter-wjs"),a.twttr.ready(function(a){a.events.bind("tweet",f)}),v=!0}function l(a,b,c){var d=s.createElement("script");d.id="inshare-"+b,d.setAttribute("type","IN/Share"),d.setAttribute("data-url",encodeURI(c+"?ncid=linkedin_social_share")),d.setAttribute("data-counter","right"),d.setAttribute("data-onsuccess","trackLinkedIn"),d.setAttribute("data-showzero","true"),a.innerHTML="",a.appendChild(d);try{h().parse(a)}catch(e){}}function m(b,c){try{b.innerHTML="",i(),a.TechCrunch.loader.on("gapi",function(){i().plusone.render(b,{href:c,size:"medium"})})}catch(d){}}function n(a,b,c){var d='<div class="hatena-bm"><a href="https://b.hatena.ne.jp/entry/'+encodeURI(b)+'" class="hatena-bookmark-button" data-hatena-bookmark-title="'+encodeURI(c)+'" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="'+encodeURI(c)+'"><img src="https://b.st-hatena.com/images/entry-button/button-only.gif" alt="'+encodeURIComponent(c)+'" width="20px" height="20px" style="border: none;" /></a></div>';w.loader.on("hatena",function(){a.innerHTML=d})}function o(a,c){var d=s.createElement("a");d.setAttribute("href","https://getpocket.com/save"),d.setAttribute("class","pocket-btn"),d.setAttribute("data-lang","en"),d.setAttribute("data-save-url",encodeURI(c)),d.setAttribute("data-pocket-count","horizontal"),d.setAttribute("data-pocket-align","left"),d.innerHTML="Pocket",a.innerHTML="",a.appendChild(d),b.getScript("https://widgets.getpocket.com/v1/j/btn.js?v=1")}var p,q,r,s=a.document,t=b,u=!1,v=!1;a.TechCrunch=a.TechCrunch||{};var w=a.TechCrunch;a.trackLinkedIn=function(b){a._gaq.push(["_trackSocial","LinkedIn","share",b])},w.showShareButtons=function(c){if(c){for(var d,e,f=c,g=c.querySelector(".icon-facebook").parentNode,h=c.querySelector(".icon-twitter").parentNode,i=c.querySelector(".icon-pocket").parentNode,l=c.querySelector(".icon-gplus").parentNode,p=c.querySelector(".icon-hatena").parentNode;f&&!("li"===f.nodeName.toLowerCase()&&/(^|\s)river-block(\s|$)/.test(f.className)||"ul"===f.nodeName.toLowerCase()&&/(^|\s)inline-list(\s|$)/.test(f.className));)f=f.parentNode;f&&(f.id,d=f.getAttribute("data-permalink")||a.location.href.replace(a.location.search,""),e=f.getAttribute("data-sharetitle")||b(".tweet-title").text(),j(g,d),k(h,d,e),n(p,d,e),o(i,d),m(l,d))}},w.showAdditionalShareButtons=function(b){var c,d,e;if(b=b||t(s.querySelector(".more-social-share-list")),!b.hasClass("rendered")){b.addClass("rendered"),t(s.getElementsByClassName("social-share")).css("overflow","visible");try{w.size.isSmall()&&(e=b[0].querySelector(".icon-linkedin").parentNode)&&l(e,"inshare-main",a.location.href)}catch(f){}if((c=s.getElementsByClassName("g-plusone")).length)for(d=0;d<c.length;d+=1)m(c[d])}},t(function(){t(s.getElementsByClassName("river")).on("click mouseenter",".social-cluster",function(a){var b=a.target||a.srcElement;if(!b||"icon-comment"!==b.className){for("click"===a.type&&a.preventDefault();b&&!/(^|\s)social-cluster(\s|$)/.test(b.className);)b=b.parentNode;b&&b.querySelector(".icon-facebook")&&w.showShareButtons(b)}}),t("body").on("click",".social-share-more",function(a){a.preventDefault(),a.stopPropagation(),w.showAdditionalShareButtons()})}),t(".twitter-intent-tweet").each(function(){var a=t(this).attr("data-url"),b=t(this).attr("data-title");t(this).attr("href","https://twitter.com/intent/tweet?text="+b+"&url="+a)})}(this,this.jQuery),function(a){"use strict";a.fn.fitVids=function(b){var c={customSelector:null};if(!document.getElementById("fit-vids-style")){var d=document.createElement("div"),e=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];d.className="fit-vids-style",d.id="fit-vids-style",d.style.display="none",d.innerHTML="&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>",e.parentNode.insertBefore(d,e)}return b&&a.extend(c,b),this.each(function(){var b=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];c.customSelector&&b.push(c.customSelector);var d=a(this).find(b.join(","));d=d.not("object object"),d.each(function(){var b=a(this);if(!("embed"===this.tagName.toLowerCase()&&b.parent("object").length||b.parent(".fluid-width-video-wrapper").length)){var c="object"===this.tagName.toLowerCase()||b.attr("height")&&!isNaN(parseInt(b.attr("height"),10))?parseInt(b.attr("height"),10):b.height(),d=isNaN(parseInt(b.attr("width"),10))?b.width():parseInt(b.attr("width"),10),e=c/d;if(!b.attr("id")){var f="fitvid"+Math.floor(999999*Math.random());b.attr("id",f)}b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*e+"%"),b.removeAttr("height").removeAttr("width")}})})}}(jQuery),function(a,b,c,d){function e(a){throw"VideoLoaders must implement "+a}function f(a){var b;a=a||{};for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])}function g(){function e(c){var d,e=b(c),f=e.width(),g=f/p,i=0,j=!1;if(0!==(d=e.parents(".video-lightbox")).length){j=!0;var k=d.find(".banner-header");i=d.find("header").height()+d[0].offsetTop+k.height()+a.parseInt(k.css("padding-top"),10)+a.parseInt(k.css("padding-bottom"),10)+a.parseInt(d.css("margin-top"),10)+a.parseInt(d.css("margin-bottom"),10)}var l;if(j&&g+i>h.height()){var m=d.find(".banner-body");2*parseInt(m.css("padding-left"),10)+f>h.width()?(l=Math.floor((h.height()-i-q)*p)-2*parseInt(m.css("padding-left"),10),c.style.width=l+"px",f=l):(l=Math.floor((h.height()-i-q)*p),c.style.width=l+"px",f=l)}else g+i>h.height()&&(l=Math.floor((h.height()-i-q)*p),c.style.width=l+"px",f=l);return f}function g(a,b){b.setAttribute("width","100%"),b.setAttribute("height","100%"),b.className+=" dyn-size"}function l(a,b){b.style.width="100%",b.style.height="100%",b.className+=" dyn-size"}function m(a){var b,c;for(b in k)if(k.hasOwnProperty(b)){c=k[b];try{if(c.test(a))return c}catch(d){}}return null}var n,o=this,p=1280/720,q=100,r=[];k.fivemin=f.create({resize:function(){var a=b(i.getElementsByClassName("fmvps-wrapper"));a.find("object:not(.dyn-size), canvas:not(.dyn-size)").each(g),a.find("div[id^=playbuttonDiv]:not(.dyn-size), div[id^=adaptvDiv]:not(.dyn-size), video:not(.dyn-size)").each(l)},test:function(a){return/(^|\s)dyn-load-fivemin(\s|$)/.test(a.className)},load:function(a){var b=a.getAttribute("data-container"),c=a.parentNode,d=a.getAttribute("data-video"),e=a.getAttribute("data-autostart"),f=a.getAttribute("data-params"),g=this.source(c,d,e,f),h=i.createElement("script");h.src=g,a.parentNode.insertBefore(h,a.nextSibling),r[b]=h,a.parentNode.removeChild(a)},source:function(a,b,c,f){d===c&&(c=!1),null===f||d===f?f="":f.length>0&&"&"!==f[0]&&(f="&"+f);var g=e(a);return"https://pshared.5min.com/Scripts/PlayerSeed.js?sid=577&width="+g+"&height="+g/p+"&colorPallet=%2300B100&playerActions=8260&hasCompanion=false&playList="+b+"&autoStart="+c+f}}),k.youtube=f.create({resize:function(){var a=i.querySelector(".lightbox");e(a.querySelector(".video-container")),b(a).fitVids()},test:function(a){return/(^|\s)dyn-load-youtube(\s|$)/.test(a.className)},load:function(a){var d,e=this,f=a.getAttribute("data-video");d="https://www.googleapis.com/youtube/v3/videos?part="+encodeURIComponent("snippet")+"&id="+encodeURIComponent(f)+"&key="+encodeURIComponent(c.yt_key)+"&callback=?",b.getJSON(d,function(a){e.dataLoaded(a)})},dataLoaded:function(b){var c,e,f,g,h,j,k=i.querySelector(".video-lightbox-youtube"),l=this;if(d!==b.items&&b.items.length){if(c=b.items[0],e=c.snippet.title,h=i.createElement("p"),h.innerHTML=c.snippet.channelTitle+": "+e,k.innerHTML=k.innerHTML.replace(/%%title%%/g,e),k.querySelector("h2.post-title").className="post-title",k.querySelector(".banner-show-desc").appendChild(h),j=c.snippet.description,j.length>200){if(j=j.substr(0,200),201!==c.snippet.description.lastIndexOf(" ")){var m=j.lastIndexOf(" ");j=m>0?j.substr(0,m):j}j+="&hellip;"}k.querySelector(".video-caption").innerHTML=j.replace(/\n+/g,"<br>"),g=this.createEmbed(c.id),f=k.querySelector(".dyn-load-youtube"),f.parentNode.insertBefore(g,f.nextSibling),f.parentNode.removeChild(f),a.setTimeout(l.resize,150)}},createEmbed:function(b){var c=i.createElement("iframe");return c.src=a.location.protocol+"//www.youtube.com/embed/"+encodeURIComponent(b)+"?autoplay=1",c.setAttribute("autoplay","1"),c.setAttribute("allowfullscreen","true"),c.setAttribute("frameborder","0"),c}}),k.ustream=f.create({resize:function(){b(i.querySelector(".lightbox")).fitVids({customSelector:"iframe[src^='https://www.ustream.tv'], iframe[src^='https://www.ustream.tv']"})},test:function(a){return/(^|\s)dyn-load-ustream(\s|$)/.test(a.className)},load:function(a){var b=a.getAttribute("data-video");if(b){var c=this.createEmbed(b);a.parentNode.insertBefore(c,a.nextSibling),this.resize(),a.parentNode.removeChild(a)}},createEmbed:function(b){var c=i.createElement("iframe");return c.src=a.location.protocol+"//www.ustream.tv/embed/"+b+"?autoplay=true&volume=80",c.setAttribute("scrolling","no"),c.setAttribute("frameborder","0"),c.style.border="0px none transparent",c}}),o.load=function(a){try{m(a).load(a)}catch(b){}},o.parse_scripts=function(a){a=a&&d!==a.querySelectorAll?a:i;for(var b=a.querySelectorAll(".tc-dyn-load-video"),c=0,e=b.length;c<e;c++){var f=b[c];o.load(f)}},o.resize=function(){n=d;for(var a=i.querySelectorAll(".tc-dyn-load-video"),b=0;b<a.length;b+=1)try{m(a[b]).resize()}catch(c){}},j.ready(o.parse_scripts),h.on("resize",function(){d===n&&(n=a.setTimeout(function(){o.resize()},250))})}var h=b(a),i=a.document,j=b(i),k={};f.prototype.resize=function(){e("resize")},f.prototype.test=function(){e("test")},f.prototype.load=function(){e("load")},f.create=function(a){function b(){}return b.prototype=new f(a),new b},a.video=new g}(this,this.jQuery,this.TC_VideoLoader_Settings),function(a,b,c,d,e){"use strict";function f(a,c){for(var d,e=0;e<a.length;e+=1)d=a[e],e&&c.appendChild(b.createElement("br")),c.appendChild(d);return c}function g(a){var c,d,e,g,h,i=[].slice.call(a.querySelectorAll("a")),j=Math.ceil(i.length/2);i.length>1&&(c=b.createElement("ul"),c.className="g g-2up",d=i.slice(0,j),e=b.createElement("li"),g=i.slice(j),h=b.createElement("li"),e.className=h.className="gi",c.appendChild(e),c.appendChild(h),e.appendChild(f(d,b.createElement("p"))),h.appendChild(f(g,b.createElement("p"))),a.parentNode.insertBefore(c,a),a.parentNode.removeChild(a))}if(!c.csscolumns&&!d.size.isSmall()){var h,i=b.querySelectorAll(".topic-alpha-column"),j=0;if(i.length)for(;j<i.length;j+=1)h=i[j],g(h)}}(0,this.document,this.Modernizr,this.TechCrunch),function(a,b,c){a.loadLivecaster=!1;var d=b(a),e=a.document,f=b(e),g=b("body"),h=a.Modernizr,i=function(){var b;return function(){return b!==c?b:function(){return b="WebkitOverflowScrolling"in e.documentElement.style||function(){var b=a.navigator.userAgent,c=b.match(/AppleWebKit\/([0-9]+)/),d=c&&c[1],e=c&&d>=534;return b.match(/Android ([0-9]+)/)&&RegExp.$1>=3&&e||b.indexOf(/PlayBook/)>-1&&RegExp.$1>=0&&e||b.match(/Fennec\/([0-9]+)/)&&RegExp.$1>=4||b.match(/wOSBrowser\/([0-9]+)/)&&RegExp.$1>=233&&e||b.match(/NokiaBrowser\/([0-9\.]+)/)&&7.3===parseFloat(RegExp.$1)&&c&&d>=533}()}()}}();b.fn.bounderize=function(c){function f(){n&&clearTimeout(n),n=setTimeout(j,200)}function h(){try{k=Math.round(p.upperBound.offset().top+p.upperBoundSpacing+p.viewportSpacing),l=Math.round(p.lowerBound.offset().top-p.lowerBoundSpacing-p.viewportSpacing-r.outerHeight());(a.innerWidth||e.documentElement.clientWidth)>p.minWindowWidth?(r.show(),q.addClass("hide")):(r.hide(),q.removeClass("hide")),j()}catch(b){}}function i(){m&&clearTimeout(m),m=setTimeout(h,200)}function j(){if((a.innerWidth||e.documentElement.clientWidth)>p.minWindowWidth){var b=d.scrollTop();b<k-p.viewportSpacing?r.css({position:"absolute",top:k}):b<l?(a.repaint=!1,r.css({position:"fixed",top:p.viewportSpacing})):r.css({position:"absolute",top:l})}}var k,l,m,n,o={lowerBoundSpacing:0,minWindowWidth:1425,upperBoundSpacing:0,viewportSpacing:10},p=b.extend(o,c),q=this,r=b(q).clone();g.append(r),r.hide(),h(),d.on("resize",i),d.on("scroll",f)},b.fn.collapsify=function(){this.each(function(){var c,d,e,f,g,h;if(c=b(this),!c.hasClass("tabs-no-select")){e=this.querySelectorAll("a"),h=e.length<3?"small":"med",c.addClass("hide-"+h+"-max"),f="";for(var i=0,j=e.length;i<j;i++)d=e[i],g=d.href===a.location?'selected="selected"':"",f+='<option value="'+d.href+'" '+g+">"+d.innerText+"</option>";c.after('<select class="block hide-'+h+' nav subnav full">'+f+"</select>")}})},b.fn.toasterize=function(c){function f(){clearTimeout(j),j=setTimeout(function(){n=i.attractor.offset().top,o=k.offset().top,p=k.outerHeight(),q=k.outerWidth(),g()},500)}function g(){if(!((a.innerWidth||e.documentElement.clientWidth)<i.minWindowWidth)){var b=d.scrollTop();b<n-d.height()?m&&!i.retoast||k.css({bottom:0-p}):b<o+p+i.viewportSpacing-d.height()?(l=!0,m&&!i.retoast||(k.addClass(i.poppedClass),k.css({bottom:i.viewportSpacing,position:"fixed",zIndex:1e3}))):(m=!0,k.removeClass(i.poppedClass),k.css({position:"static",zIndex:"auto"}))}}var h={animate:!0,minWindowWidth:960,poppedClass:"popped",retoast:!1,viewportSpacing:20},i=b.extend(h,c);if(i.attractor.offset()&&this.offset()){var j,k=this,l=!1,m=!1,n=i.attractor.offset().top,o=k.offset().top,p=k.outerHeight(),q=k.outerWidth();i.animate&&k.css("webkitTransition","all 750ms ease-in-out");try{g(),d.on("scroll",g),d.on("resize",f)}catch(r){}}},b.fn.slideshowify=function(){this.each(function(){function d(a,b){return function(){var c=b.getAttribute("data-src"),d=a.find(".image img");c?(a.css("background-image","url("+c+")"),d.attr("src",c)):a.css("background-image","url("+b.src+")")}}function e(a){a.stopPropagation(),a.target.href||C.toggleClass("show-caption")}function g(a){a.preventDefault(),p(a)}function i(a){a.preventDefault(),q(a)}function j(a){var b=37,c=39;if(I)switch(a.preventDefault(),a.keyCode){case b:s();break;case 9:case 32:case c:r();break;case 8:case 27:q()}else a.keyCode===b?s():a.keyCode===c&&r()}function k(a){a.preventDefault(),r()}function l(a){a.preventDefault(),s()}function m(a){a.preventDefault(),I?w():p()}function n(a){a.preventDefault();var c=b(this).data("index");c!==x&&(c>x?(t(c),u(c+1)):(t(c,"back"),u(x)))}function o(a){a.preventDefault(),a.stopPropagation(),v()}function p(){I=!0,C.addClass("fullscreen"),b(".slideshowify").not(".fullscreen").hide(),u(1)}function q(){I=!1,C.removeClass("fullscreen hide-chrome"),b(".slideshowify").show()}function r(){var a=x===B.length-1?0:x+1;t(a),u(a+1)}function s(){var a=0===x?B.length-1:x-1;t(a,"back"),u(a)}function t(a,c){var d="",e="",f="";c=c||"forward",x=a,A=0===a?B.length-1:a-1,z=a===B.length-1?0:a+1;var g=b(B[a]);e=g.find(".image>img"),f=e.attr("data-trigger-notification"),"none"===(d=g.css("background-image"))&&"1"===f&&e.trigger("tc.lazyloaded");var h=b(B[A]);e=h.find(".image>img"),f=e.attr("data-trigger-notification"),"none"===(d=h.css("background-image"))&&"1"===f&&e.trigger("tc.lazyloaded");var i=b(B[z]);e=i.find(".image>img"),f=e.attr("data-trigger-notification"),d=i.css("background-image"),"none"===d&&"1"===f&&e.trigger("tc.lazyloaded"),C.find(".active").removeClass("active"),g.addClass("active"),b(L[a]).addClass("active");var j=K.find(".thumbnail.active").outerWidth();K.scrollLeft(j*a+j/2-K.width()/2)}function u(b){c!==a.s_265&&(a.s_265.prop2="gallery",a.s_265.prop52="photo_"+Math.round(b/B.length*100),a.s_265.t())}function v(){C.toggleClass("show-caption")}function w(){C.toggleClass("hide-chrome")}var x,y,z,A,B,C,D,E,F,G,H,I=!1;if(C=b(this),!C.hasClass("list")){for(C.addClass("slideshowify"),B=b(this.querySelectorAll("li")),y=b(this.querySelectorAll(".image img")),D=0,E=y.length;D<E;D++)G=b(B[D]),F=y.get(D),F.hasAttribute("data-trigger-notification")?b(F).on("tc.lazyloaded",d(G,F)):G.css("background-image","url("+F.src+")");var J='<div class="thumbnails">';for(D=0,E=y.length;D<E;D++)F=b(y[D]),H=F.data("thumb")?F.data("thumb"):F.attr("src"),J+='<a class="thumbnail" data-index='+D+' href="#"><img src="'+H+'" /></a>';J+="</div>",C.append(J);var K=b(this.querySelectorAll(".thumbnails")),L=b(this.querySelectorAll(".thumbnails > a.thumbnail"));C.on("click","li",m),f.on("keydown",j),C.on("click",".caption",e),C.on("click",".title",o),C.on("click","a.enter",g),C.on("click","a.exit",i),C.on("click","a.next",k),C.on("click","a.prev",l),C.on("click","a.thumbnail",n),!I&&h.touch&&(C.on("hover","a.enter",g),C.on("hover","li.active",g)),C.swipe({swipeRight:s,swipeLeft:r,tap:g}),t(0)}})},b.fn.carouselify=function(e){try{this.each(function(){function f(a){a.preventDefault(),p()}function g(a){a.preventDefault(),q()}function j(){clearTimeout(L),L=a.setTimeout(t,500)}function k(){}function l(a){0===a.originalEvent.touches.length&&(A?u>0?q():p():O||a.target.className)}function m(a){var b=a.originalEvent.touches;if(1===b.length){var c=b[0];w=c.pageX,x=c.pageY,u=w-M,v=x-N,A?(a.preventDefault(),r(0-z*R+u)):O||(Math.abs(v)>U?O=!0:Math.abs(u)>T&&(A=!0))}}function n(a){var b=a.originalEvent.touches;if(1===b.length){var c=b[0];M=c.pageX,N=c.pageY,u=0,v=0,A=!1,O=!1,s(0)}}function o(a){R=a,J=0===R?y-1:R-1,F=R===y-1?0:R+1,s(),r(0-z*R)}function p(){o(R<y-1?R+1:R)}function q(){R>0?o(R-1,"back"):o(R)}function r(a){h.csstransforms3d?B.css({transform:"translate3d("+a+"px, 0, 0)"}):h.csstransforms?B.css({transform:"translate("+a+"px, 0)"}):B.css({"margin-left":a+"px"})}function s(a){S.animate&&h.csstransitions&&(a===c&&(a=100*P),0===a?B.css({"-webkit-transition":"none",transition:"none"}):B.css({"-webkit-transition":"-webkit-transform "+a+"ms ease-in-out",transition:"transform "+a+"ms ease-in-out"}))}function t(){V?(E=b(D[0]).outerWidth(),C=(E+16)*D.length,B.width(C)):(E=b(D[1]).position().left-b(D[0]).position().left,I=H.width(),P=parseInt((H.width()+S.visibilityThreshhold)/E,10),P<1&&(P=1),y=Math.ceil(D.length/P),z=E*P,C=y*I+E,B.width(C),o(0))}var u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q={animate:!0,visibilityThreshhold:10},R=0,S=b.extend(Q,e),T=16,U=16;H=b(this.querySelectorAll(S.outerWrapperSelector)),B=b(this.querySelectorAll(S.innerWrapperSelector)),D=b(this.querySelectorAll(S.itemSelector)),K=b(this.querySelectorAll(S.previousSelector)),G=b(this.querySelectorAll(S.nextSelector));var V=i();t(),d.on("resize",j),V?(H.css({"-webkit-overflow-scrolling":"touch","margin-bottom":"0","overflow-y":"none","overflow-x":"scroll","padding-bottom":"1em"}),B.css({position:"relative","white-space":"nowrap"}),G.hide(),K.hide()):"ontouchstart"in a?(B.on("touchcancel",k),B.on("touchend",l),B.on("touchmove",m),B.on("touchstart",n),G.hide(),K.hide()):(G.on("click",f),K.on("click",g))})}catch(f){}},b.fn.readmorify=function(c){function e(a){a.preventDefault(),f(!0)}function f(b){if(h)h=!1,g(!0),l.css("height",m+"px"),j.show(),k.hide(),setTimeout(function(){g(!1),l.css("height","auto")},i);else{h=!0;var c=l.offset().top-42,e=setInterval(function(){if(d.scrollTop()>c)try{a.scrollBy(0,-25)}catch(f){a.scrollTo(0,c)}else clearTimeout(e),m=l.height(),g(!1),l.css("height",m+"px"),j.hide(),k.show(),setTimeout(function(){g(b),l.css("height",n+"px")},1)},10)}}function g(a){a?l.css({"-webkit-transition":"height "+i+"ms ease-in-out",transition:"height "+i+"ms ease-in-out"}):l.css({"-webkit-transition":"none",transition:"none"})}var h=!1,i=c.duration,j=b(c.buttons.less),k=b(c.buttons.more),l=b(this),m=l.height(),n=c.threshold;try{m>n&&(k.on("click",e).appendTo(l).hide(),j.on("click",e).appendTo(l),f())}catch(o){}},b.fn.vidify=function(c,d){if(d){var e={primaryBlockSelector:".island-main",secondaryBlockSelector:".island-secondary",thumbBlockSelector:".feature-video",idAttribute:"data-video-id",activeClass:"active"},f=b.extend(e,c);this.each(function(){function c(c){c.preventDefault();var h=b(this),i=h.attr(f.idAttribute);e.html(d[i].html),g.find("."+f.activeClass).removeClass(f.activeClass),h.addClass(f.activeClass),a.video.parse_scripts()}var e=b(this.querySelectorAll(f.primaryBlockSelector)),g=b(this.querySelectorAll(f.secondaryBlockSelector));g.find(f.thumbBlockSelector).on("click",c)})}},b.fn.lightboxify=function(c){function h(){var a=b(".lightbox");a.css({opacity:"0"}),setTimeout(function(){a.remove()},1e3)}function i(){var c=b(".video-lightbox"),e=b(".lightbox");if(0!==c.length){var f=c.find(".video-container"),g=c.find(".banner-header"),h=1280/720,j=c.find(".byline").height(),k=c.find("header").height()+parseInt(e.css("top"),10)+g.height()+parseInt(g.css("padding-top"),10)+parseInt(g.css("padding-bottom"),10)+parseInt(c.css("margin-top"),10)+parseInt(c.css("margin-bottom"),10);if(f.height()+k>d.height()){var l=c.find(".banner-body");if(2*parseInt(l.css("padding-left"),10)+2*parseInt(c.css("margin-top"),10)+f.width()>b(a).width())f.css("width","auto"),i();else{var m=Math.floor((d.height()-k-j-100)*h);f.width(m)}}else f.css("width","auto"),f.height()+k>d.height()&&i()}}var j={lightboxClass:"lightbox",loadingClass:"loading",exitClass:"exit",remoteWrapperSelector:".video-lightbox",clickableElementSelector:"img[data-lightbox-url]",urlDataAttribute:"data-lightbox-url"},k=b.extend(j,c);g.on("click",k.remoteWrapperSelector,function(a){a.stopPropagation()}),g.on("click","."+k.lightboxClass,function(a){a.preventDefault(),h()}),g.on("click",".exit",function(a){a.preventDefault(),h()}),f.on("keydown",function(a){8!==a.keyCode&&27!==a.keyCode||h()});var l=null;d.on("resize",function(){clearTimeout(l),l=setTimeout(i,250)}),this.each(function(){b(this).on("click",function(c){if((a.innerWidth||e.documentElement.clientWidth)<800||b(c.target).hasClass("nolightbox"));else{c.preventDefault();var d=b(this).find(k.clickableElementSelector).attr(k.urlDataAttribute),f=b('<div class="'+k.lightboxClass+" "+k.loadingClass+'"></div>'),h=b(e.getElementById("wpadminbar"));g.append(f),h.length&&f.css("top",h.height()),f.load(d,function(){var c=b('<a class="'+k.exitClass+'" href="#">Exit</a>');h.length&&c.css("top",h.height()),f.removeClass(k.loadingClass).fitVids().append(c),a.video.parse_scripts()})}})})},b(".river-block").each(function(){var a=b(this);a.height()<182?b(this.querySelectorAll(".tags a")).each(function(a){a>=2&&b(this).hide()}):a.height()<230&&b(this.querySelectorAll(".tags a")).each(function(a){a>=4&&b(this).hide()})}),a.aslSidebarCallback=function(c){function d(b){function c(a){return a.nodeName.toLowerCase()}var d=b.target;if("a"!==c(d)&&"a"!==c(d.parentNode)){for(var e=this;"li"!==c(e);)e=e.parentNode;var f=e.querySelector("a");a.open(f.href,"_blank")}}var f=c.response.data.placement[0],g=b(e.getElementById("sponsored-links-side"));g.append('<small class="advertise-here">Sponsored Links</small>'),g.append('<ul class="info-list ads-list-sidebar"></ul>');var h=b(e.querySelectorAll(".ads-list-sidebar"));b.each(f.listing,function(){h.append('<li><h5 class="h-alt ttl"><a href="'+this.targetUrl+'" target="_blank">'+this.title+"</a></h5><p>"+this.description+"<br/>"+this.domain+"</p></li>")}),h.on("click","li",d),g.append('<a href="https://aoltech.sl.advertising.com/admin/advertisers/indexPl.jsp" target="_blank" class="text-btn right">Buy a link here</a>'),g.show()},b.fn.asladifySidebar=function(){a.ASL={cfg:{c:"aslSidebarCallback",pid:"2360767",type:"0",k:"www.aol.com",placements:[{placementId:1530658,numAds:3,pageElements:["sponsored-links-side"]}]}}},b.fn.asladify=function(c){if(c=b.extend({dataAttributeName:"adcount",callBackName:"aslHandleAds"+Math.floor(1e6*Math.random()+1),test:"techcrunch.com"!==a.location.hostname,referrer:encodeURIComponent(a.location),placementIds:1584487,previousPlacementIds:null,pubId:3110767,minWindowWidth:640},c),!((a.innerWidth||e.documentElement.clientWidth)<c.minWindowWidth)){var d=0,f=this;if(f.each(function(){var a=parseInt(b(this).data(c.dataAttributeName),10);d+=isNaN(a)?0:a}),0!==d){var g={c:c.callBackName,key:"techcrunch.com",type:0,pubId:c.pubId,previousPlacementIds:c.previousPlacementIds,placementIds:c.placementIds,nb:d,referrer:c.referrer,version:3,format:"json",test:c.test};b.ajax({type:"GET",url:"https://ads.tw.adsonar.com/adserving/getAdsAPI.jsp?callback=?",data:g,jsonpCallback:c.callBackName,contentType:"application/json",dataType:"jsonp"}),a[c.callBackName]=function(a){return function(d){var e={defaultAdCount:6,parentClusterContainerSelector:".ad-cluster-container"},f=b.extend(e,c),g=d.response.data.placement[0].listing,h=0,i=0,j=null,k=-1,l=!1,m=null;if(0!==g.length)for(var n=0;n<g.length;++n&&++h){if(null==j||h>=i){if(k+1>a.length)break;j=b(a[++k]),h=0,i=j.data(f.dataAttributeName)||f.defaultAdCount,m=j.closest(f.parentClusterContainerSelector),m.css("display","inherit")}g[n].targetUrl&&g[n].image&&g[n].image.src&&(b('<li><a href="'+g[n].targetUrl+'" target="_blank"><img src="//'+g[n].image.src+'" /></a></li>').appendTo(j),!1===l&&(m.removeClass("ad-cluster-no-ad"),m.find(".advertise-here").text("Advertisement"),l=!0))}}}(f)}}}}(this,this.jQuery),function(a,b,c){function d(a){a=a||180,X=setInterval(function(){O.querySelectorAll(".fyre-comment-article").length>5&&(b(O.querySelectorAll(".l-main .crunchboard-listings")).appendTo(".l-sidebar-2"),clearInterval(X))},1e3*a)}function e(a){var b=a.height(),c=a.width(),d=c/b,e=a.parent().height(),f=a.parent().width();d<=f/e?(c=f,b=Math.round(f/d)):(b=e,c=Math.round(e*d)),a.css({width:c,height:b,position:"relative",left:-(c-f)/2,top:-(b-e)/2})}function f(a){var c=b(a),d=P.scrollTop()-300,e=d+P.height()+1200,f=c.height(),g=c.offset().top,h=g+f;return f>0&&g<=e&&h>=d}function g(a){var c=!1;a.each(function(a,d){if("false"!==d.getAttribute("data-scalable")&&j(d),d.hasAttribute("data-src")&&f(d)&&d.src.match(/(1x1|145x90|210x210|220x164|300x169).png/)){if(d.src=d.getAttribute("data-src"),d.removeAttribute("data-src"),this.hasAttribute("data-lightbox-url"))try{b(this).parent(".feature-video").children(".play-banner").show()}catch(e){}else/(^|\s)feature-gallery(\s|$)/.test(this.parentNode.className)&&b(this.parentNode).children(".gallery-view-banner").show();c=!0,d.hasAttribute("data-trigger-notification")&&b(d).trigger("tc.lazyloaded")}}),c&&P.trigger("resize")}function h(a,b){var c=b.match(/(wp.com|wordpress.com)/i);if(null===c)return b;var d=b.split("?")[0],e=i(a);return"wp.com"===c[1].toLowerCase()?d+="?resize="+e.width+"%2C"+e.height:d+="?w="+e.width+"&h="+e.height+"&crop=1",d}function i(a){var b,c={height:0,width:0};return a.hasAttribute("data-aspect-ratio")?(b=a.getAttribute("data-aspect-ratio"),b=parseInt(b.split("x")[0],10)/parseInt(b.split("x")[1],10),c.width=a.width,c.height=Math.round(c.width/b)):(c.width=a.width,c.height=a.height),c}function j(a){if(a.hasAttribute("data-src")){var b=a.getAttribute("data-src"),c=h(a,b);a.setAttribute("data-src",c),a.setAttribute("data-scalable","true")}}function k(a){a.hasAttribute("data-scalable")&&(a.src=h(a,a.src))}function l(){if(S.svg||(b("html").addClass("no-svg"),b(O.querySelectorAll('img[src*=".svg"]')).each(function(){this.src=this.src.replace(".svg",".png")})),(D=O.querySelectorAll(".carousel-horizontal")).length&&b(D).carouselify({outerWrapperSelector:".carousel-container",innerWrapperSelector:".carousel-list",itemSelector:".carousel-list > li",previousSelector:".carousel-prev",nextSelector:".carousel-next"}),(E=O.querySelectorAll(".tab-list, .tabs-subnav")).length&&b(E).collapsify(),(F=O.querySelectorAll(".slideshow")).length&&b(F).slideshowify(),(G=O.querySelectorAll(".video-island")).length&&b(G).vidify(null,a.videos),(H=O.querySelectorAll(".video-aside .vid-list li, .thumb .feature-video, .river .feature-hero-video")).length&&b(H).lightboxify(),(H=O.querySelectorAll(".tc_5min_lightbox, .tc_video_lightbox")).length&&b(H).lightboxify({clickableElementSelector:".text-btn"}),(I=O.querySelectorAll(".press-release")).length&&b(I).readmorify({buttons:{more:'<p class="align-center text-btn read-more"><a href="#">Read more</a></p>',less:'<p class="align-center text-btn read-less"><a href="#">Read less</a></p>'},threshold:280,duration:1e3}),(J=O.querySelectorAll(".next-link")).length)try{b(J).css({top:b(".l-main").first().postion().top})}catch(f){}if((K=O.querySelectorAll(".toaster")).length)try{b(K).toasterize({attractor:b(".article-entry p:last"),minWindowWidth:960,viewportSpacing:44})}catch(f){}(M=O.querySelectorAll(".filter")).length&&b(M).clone().appendTo(".small-filter"),R.fitVids();var c=O.querySelectorAll(".crunch-island img");if(c.length){g(b(c));for(var d,e=0;e<c.length;e+=1)d=c[e],d.setAttribute("data-src",d.src)}(L=O.querySelectorAll(".ad-cluster-container ul")).length&&b(L).asladify(),(a.innerWidth||O.documentElement.clientWidth)>=960&&b(O.getElementById("sponsored-links-side")).asladifySidebar()}function m(){(a.innerWidth||O.documentElement.clientWidth)<=480&&O.body.scrollTop<10&&a.scrollTo(0,1)}function n(){if(!P.hasClass("devil-loaded")&&0!==O.getElementsByClassName("l-featured-container").length){var c=b(O.getElementsByClassName("ad-unit")).not(".devil-parsed"),d=b(O.getElementsByClassName("l-featured-container"));if(0===c.length)return P.addClass("devil-loaded"),!1;c.each(function(a,c){var e=b(c),f=e.height();if(f>0&&e.addClass("devil-parsed"),f>300){d.addClass("devil-ad-loaded");var g=b(O.querySelector("img.size-full")),h=g.parent();return g.addClass("devil-img"),h.css({width:g.width()}),h.find("p").css({clear:"both"}),!1}}),a.setTimeout(n,1e3)}}function o(a){"eyebrow"!==a&&b(O.querySelectorAll(".tags .active")).removeClass("active"),"follow"!==a&&Q.removeClass("followus-open"),"nav"!==a&&b(O.getElementById("nav").querySelectorAll(".active")).removeClass("active"),
"scope"!==a&&b(O.querySelectorAll(".search-scope-list")).removeClass("active"),"share"!==a&&Q.removeClass("share-open"),"speaker"!==a&&b(O.querySelectorAll(".speaker-block")).removeClass("active"),"tooltip"!==a&&b(O.querySelectorAll(".tooltip-container")).removeClass("active")}function p(c,d){if(/#(?!$)/.test(c)){var e=c.split("#")[1],f=d.closest(".tab-control"),h=O.getElementById(e);f.find(".tab-panel.active").removeClass("active"),b(h).addClass("active"),f.find("a.active").removeClass("active"),f.find('a[href="#'+e+'"]').addClass("active"),f.find("select.nav option").each(function(){this.selected=this.value===c}),g(f.find("img"))}else b.ajax({url:c,dataType:"html",success:function(b){var d=P.scrollTop();O.body.innerHTML=b.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g,""),l(),a.scrollTo(0,d);try{history.pushState(null,null,c)}catch(e){}}})}function q(a){o();var c=b(O.querySelectorAll(".scope-label"));c.html(a),b(O.querySelectorAll(".search-form select")).css({width:c.parent().outerWidth()}),b(O.querySelectorAll('input[name="search-field"]')).css({"padding-left":c.parent().outerWidth()+10+"px"}).focus()}function r(a){a.hasClass("active")?o():(o(),a.addClass("active"))}function s(){o("follow"),Q.toggleClass("followus-open")}function t(a){a.toggleClass("collapsed")}function u(a){a.hasClass("active")?o():(o(),a.addClass("active"))}function v(){b(O.querySelectorAll(".nav-toggle")).toggleClass("active"),b(O.querySelectorAll(".nav-primary")).toggleClass("active")}function w(){var a=b(O.querySelectorAll(".small-filter"));a.toggleClass("active"),a.find("ul").css({width:a.width()})}function x(){var a=b(".search-form");a.hasClass("active")?(a.find(".search-field").blur(),a.removeClass("active"),b(".search-form-toggle").removeClass("active")):(a.addClass("active"),b(".search-form-toggle").addClass("active"),a.find(".search-field").focus())}function y(){o("share"),Q.toggleClass("share-open")}function z(a){o("speaker"),a.hasClass("active")?a.removeClass("active"):(b(".speaker-block").removeClass("active"),a.addClass("active"))}function A(a){o("tooltip"),a.closest(".tooltip-container").toggleClass("active")}function B(c){var d=b(this);if(0<d.find("img").length){var e=d.attr("href");if(C(e)){c.preventDefault();var f=b(O.getElementById("wpadminbar")),g=P.height()-80,h=P.width()-80,i="https://o.aolcdn.com/dims-global/dims3/GLOB/";f.length&&(g-=f.height()),i+="resize/"+h+"x"+g+"/quality/80/"+e;var j=b('<div class="lightbox loading" style="display:table;height:100%;width:100%;"><div style="display:table-cell;vertical-align:middle;"><img src="'+i+'" /></div></div>');R.append(j),f.length&&j.css("top",f.height()),j.load(e,function(){var c=b('<a class="exit" href="#">Exit</a>');f.length&&c.css("top",f.height()),c.on("click",function(){j.css({opacity:"0"}),a.setTimeout(function(){j.remove()},1e3)}),j.removeClass("loading").append(c)})}}}function C(a){var b=a.split(".").pop();b=b.toLowerCase();for(var c=["jpg","jpeg","png","gif"],d=0;d<c.length;d++){if(b===c[d])return!0}return!1}var D,E,F,G,H,I,J,K,L,M,N=a.TechCrunch,O=a.document,P=b(a),Q=b("html"),R=b("body"),S=a.Modernizr,T=a.TC_Async_Scripts;if(N.size.isSmall()){var U=!!O.querySelector(".article"),V=["fb","tc_livefyre"];if(!U)for(var W=0;W<V.length;W+=1)delete T[V[W]]}b(function(){if(c!==T){var b;for(b in T)T.hasOwnProperty(b)&&a.TechCrunch.loader.load(b,T[b])}});var X;d(60);try{S.touch||setTimeout(function(){b(O.querySelectorAll(".crunch-island")).addClass("hover"),b(O.querySelector(".crunch-item")).addClass("hover")},1)}catch(Y){}b(O.querySelectorAll("img[data-tc-lazyload]")).each(function(a,b){b.removeAttribute("height"),b.removeAttribute("width")}),function(){var d,f,h=a.images=b("img[data-src]");g(h),a.setTimeout(function(){P.on("scroll",function(){c===d&&(d=a.setTimeout(function(){g(h),d=c},250))}),P.on("resize",function(){c===f&&(f=a.setTimeout(function(){h.each(function(a,b){k(b)}),f=c},250))})},2e3),b(O.querySelectorAll(".image-link-icym img")).on("load",function(){e(b(this))}),P.trigger("resize")}(),P.on("load",function(){b(".slideshowify ol").each(function(){var a=Math.max.apply(Math,b(this).find("li").map(function(){return b(this).height()}));b(this).height(a)}),b(".slideshowify ol li").each(function(){b(this).css("background-position","center"),b(this).find(".image").hide()})}),l();try{setTimeout(function(){m()},0)}catch(Y){}R.on("click",function(){o()}),R.on("click",".tab-list > li > a",function(a){var c=b(this);c.hasClass("tabs-no-preventdefault")||(a.preventDefault(),p(this.href,c))}),R.on("change",".nav",function(a){a.preventDefault(),p(this.value,b(this))}),R.on("click",".collapse-title",function(a){a.preventDefault(),a.stopPropagation(),b(this).toggleClass("active").siblings(".collapse-body").toggleClass("active"),P.trigger("resize"),g(b(this.parentNode.querySelectorAll("img")))}),R.on("click",".card-acc-handle",function(a){a.preventDefault(),b(O.querySelectorAll(".crunchbase-card.active")).removeClass("active"),b(this).closest(".crunchbase-card").addClass("active")}),R.on("click",".tags",function(a){a.stopPropagation()}),R.on("click",".tags .tag-item .tag",function(a){var c=b(this);c.siblings("div.links").children("ul").length>0&&(a.preventDefault(),r(c.closest(".tag-item")))}),S.touch||(R.on("mouseover",".crunch-island",function(){b(this).addClass("hover")}),R.on("mouseout",".crunch-island",function(){b(this).removeClass("hover")}),R.on("mouseover",".crunch-item",function(){b(O.querySelectorAll(".crunch-item")).removeClass("hover"),b(this).addClass("hover")}),R.on("mouseout",".crunch-item",function(){b(this).removeClass("hover")})),R.on("click",".nav-social-more",function(a){a.preventDefault(),a.stopPropagation(),s()}),R.on("mouseover",".follow-tc-writers .gi",function(){var a=b(this),c=b(this).closest("ul");a.position().left>(c.width()-a.width())/2?a.addClass("right"):a.removeClass("right")}),R.on("click",".livecaster-wrapper .announcement",function(d){d.preventDefault(),!1===a.loadLivecaster||a.loadLivecaster===c?(b(".livecaster-island .feature-video").prepend('<div class="live-island-iframe">'+a.live_island_iframe+"</div>"),a.loadLivecaster=!0):!0===a.loadLivecaster&&(b(".livecaster-island .live-island-iframe").remove(),a.loadLivecaster=!1),t(b(this).closest(".livecaster-wrapper"))}),R.on("click","#nav",function(b){(a.innerWidth||O.documentElement.clientWidth)>=960&&b.stopPropagation()}),R.on("click","#nav .nav-level1 a.nav-parent",function(c){(a.innerWidth||O.documentElement.clientWidth)>=960&&(c.preventDefault(),u(b(this).parent()))}),R.on("click",".nav-toggle",function(a){a.preventDefault(),a.stopPropagation(),v()}),R.on("click",".new-stories a",function(a){a.preventDefault(),a.stopPropagation()}),R.on("click",".search-form",function(a){a.stopPropagation()}),R.on("click",".search-form-toggle",function(a){a.preventDefault(),a.stopPropagation(),x(b(this))}),R.on("click",".small-filter .toggle-button",function(a){a.preventDefault(),a.stopPropagation(),w()}),R.on("change","select[name=search-scope]",function(a){a.preventDefault(),a.stopPropagation(),q(this.value)}),R.on("click",".social-share-more",function(a){a.preventDefault(),a.stopPropagation(),y()}),R.on("click",".speaker-block",function(a){a.stopPropagation()}),R.on("click",".speaker-block > a, .speaker-block > h3 a",function(a){a.preventDefault(),a.stopPropagation(),z(b(this).closest(".speaker-block"))}),a.location.hash!==c&&O.querySelector(".speaker-block")&&b(a.location.hash).click(),R.on("click",".tooltip-link",function(a){a.preventDefault(),a.stopPropagation(),A(b(this))}),N.loader.on("tc_livefyre",function(){a.LF.CommentCount({replacer:function(a,b){a.innerHTML=b}})}),P.on("load",n),b(O.querySelectorAll(".article-entry")).on("click","a",B)}(this,this.jQuery),this.jQuery,function(a){a(".crunchdaily-newsletter").submit(function(b){b.preventDefault();var c=a(this),d=c.find('input[name="email"]'),e=d.val(),f=c.parent(),g=c.data("crunchlist");if(!d.hasClass("loading")&&(d.addClass("loading"),void 0!=e&&""!=e)){var h=a.get("/wp-admin/admin-ajax.php",{action:"dailynewsletter",subaction:"subscribe",email_list:g,email:e});h.done(function(a,b,c){a.success?f.empty().append("ご登録ありがとうございました！"):alert("The data that you submitted was invalid."==a.data.message?"あなたが送信したデータが無効です。":"間違った、もう一度試してください")}),h.fail(function(){alert("間違った、もう一度試してください")}),h.always(function(){d.removeClass("loading")})}})}(jQuery),function(a,b,c){function d(){var a=document.getElementById("wpadminbar"),c=document.getElementById("unb-bar");a&&c&&(f=b(a),g=b(c),h=!0,e(),setTimeout(e,5e3))}function e(){h&&g.css("top",f.height()+"px")}var f,g,h=!1;a.UNB={config:{referrer:document.referrer,devId:"ao12eneeyhGuZbDo",theme:"light",minimumBrowserWidth:1380,onResize:e,onLoadComplete:d}}}(this,this.jQuery);;
/***
 * Warning: This file is remotely enqueued in Jetpack's Masterbar module.
 * Changing it will also affect Jetpack sites.
 */
jQuery( document ).ready( function( $, wpcom ) {
	var masterbar,
		menupops = $( 'li#wp-admin-bar-blog.menupop, li#wp-admin-bar-newdash.menupop, li#wp-admin-bar-my-account.menupop' ),
		newmenu = $( '#wp-admin-bar-new-post-types' );

	// Unbind hoverIntent, we want clickable menus.
	menupops
		.unbind( 'mouseenter mouseleave' )
		.removeProp( 'hoverIntent_t' )
		.removeProp( 'hoverIntent_s' )
		.on( 'mouseover', function(e) {
			var li = $(e.target).closest( 'li.menupop' );
			menupops.not(li).removeClass( 'ab-hover' );
			li.toggleClass( 'ab-hover' );
		} )
		.on( 'click touchstart', function(e) {
			var $target = $( e.target );

			if ( masterbar.focusSubMenus( $target ) ) {
				return;
			}

			e.preventDefault();
			masterbar.toggleMenu( $target );
		} );

	masterbar = {
		focusSubMenus: function( $target ) {
			// Handle selection of menu items
			if ( ! $target.closest( 'ul' ).hasClass( 'ab-top-menu' ) ) {
				$target
					.closest( 'li' );

				return true;
			}

			return false;
		},

		toggleMenu: function( $target ) {
			var $li = $target.closest( 'li.menupop' ),
				$html = $( 'html' );

			$( 'body' ).off( 'click.ab-menu' );
			$( '#wpadminbar li.menupop' ).not($li).removeClass( 'ab-active wpnt-stayopen wpnt-show' );

			if ( $li.hasClass( 'ab-active' ) ) {
				$li.removeClass( 'ab-active' );
				$html.removeClass( 'ab-menu-open' );
			} else {
				$li.addClass( 'ab-active' );
				$html.addClass( 'ab-menu-open' );

				$( 'body' ).on( 'click.ab-menu', function( e ) {
					if ( ! $( e.target ).parents( '#wpadminbar' ).length ) {
						e.preventDefault();
						masterbar.toggleMenu( $li );
						$( 'body' ).off( 'click.ab-menu' );
					}
				} );
			}
		}
	};
} );;
/*globals JSON */
( function( $ ) {
	var eventName = 'wpcom_masterbar_click';

	var linksTracksEvents = {
		//top level items
		'wp-admin-bar-blog'                        : 'my_sites',
		'wp-admin-bar-newdash'                     : 'reader',
		'wp-admin-bar-ab-new-post'                 : 'write_button',
		'wp-admin-bar-my-account'                  : 'my_account',
		'wp-admin-bar-notes'                       : 'notifications',
		//my sites - top items
		'wp-admin-bar-switch-site'                 : 'my_sites_switch_site',
		'wp-admin-bar-blog-info'                   : 'my_sites_site_info',
		'wp-admin-bar-site-view'                   : 'my_sites_view_site',
		'wp-admin-bar-blog-stats'                  : 'my_sites_site_stats',
		'wp-admin-bar-plan'                        : 'my_sites_plan',
		'wp-admin-bar-plan-badge'                  : 'my_sites_plan_badge',
		//my sites - manage
		'wp-admin-bar-edit-page'                   : 'my_sites_manage_site_pages',
		'wp-admin-bar-new-page-badge'              : 'my_sites_manage_add_page',
		'wp-admin-bar-edit-post'                   : 'my_sites_manage_blog_posts',
		'wp-admin-bar-new-post-badge'              : 'my_sites_manage_add_post',
		'wp-admin-bar-edit-attachment'             : 'my_sites_manage_media',
		'wp-admin-bar-new-attachment-badge'        : 'my_sites_manage_add_media',
		'wp-admin-bar-comments'                    : 'my_sites_manage_comments',
		'wp-admin-bar-edit-jetpack-testimonial'    : 'my_sites_manage_testimonials',
		'wp-admin-bar-new-jetpack-testimonial'     : 'my_sites_manage_add_testimonial',
		'wp-admin-bar-edit-jetpack-portfolio'      : 'my_sites_manage_portfolio',
		'wp-admin-bar-new-jetpack-portfolio'       : 'my_sites_manage_add_portfolio',
		//my sites - personalize
		'wp-admin-bar-themes'                      : 'my_sites_personalize_themes',
		'wp-admin-bar-cmz'                         : 'my_sites_personalize_themes_customize',
		//my sites - configure
		'wp-admin-bar-sharing'                     : 'my_sites_configure_sharing',
		'wp-admin-bar-people'                      : 'my_sites_configure_people',
		'wp-admin-bar-people-add'                  : 'my_sites_configure_people_add_button',
		'wp-admin-bar-plugins'                     : 'my_sites_configure_plugins',
		'wp-admin-bar-domains'                     : 'my_sites_configure_domains',
		'wp-admin-bar-domains-add'                 : 'my_sites_configure_add_domain',
		'wp-admin-bar-blog-settings'               : 'my_sites_configure_settings',
		'wp-admin-bar-legacy-dashboard'            : 'my_sites_configure_wp_admin',
		//reader
		'wp-admin-bar-followed-sites'              : 'reader_followed_sites',
		'wp-admin-bar-reader-followed-sites-manage': 'reader_manage_followed_sites',
		'wp-admin-bar-discover-discover'           : 'reader_discover',
		'wp-admin-bar-discover-search'             : 'reader_search',
		'wp-admin-bar-my-activity-my-likes'        : 'reader_my_likes',
		//account
		'wp-admin-bar-user-info'                   : 'my_account_user_name',
		// account - profile
		'wp-admin-bar-my-profile'                  : 'my_account_profile_my_profile',
		'wp-admin-bar-account-settings'            : 'my_account_profile_account_settings',
		'wp-admin-bar-billing'                     : 'my_account_profile_manage_purchases',
		'wp-admin-bar-security'                    : 'my_account_profile_security',
		'wp-admin-bar-notifications'               : 'my_account_profile_notifications',
		//account - special
		'wp-admin-bar-get-apps'                    : 'my_account_special_get_apps',
		'wp-admin-bar-next-steps'                  : 'my_account_special_next_steps',
		'wp-admin-bar-help'                        : 'my_account_special_help',
	};

	var notesTracksEvents = {
		openSite: function( data ) {
			return {
				clicked: 'masterbar_notifications_panel_site',
				site_id: data.siteId
			};
		},
		openPost: function( data ) {
			return {
				clicked: 'masterbar_notifications_panel_post',
				site_id: data.siteId,
				post_id: data.postId
			};
		},
		openComment: function( data ) {
			return {
				clicked: 'masterbar_notifications_panel_comment',
				site_id: data.siteId,
				post_id: data.postId,
				comment_id: data.commentId
			};
		}
	};

	function recordTracksEvent( eventProps ) {
		eventProps = eventProps || {};
		window._tkq = window._tkq || [];
		window._tkq.push( [ 'recordEvent', eventName, eventProps ] );
	}

	function parseJson( s, defaultValue ) {
		try {
			return JSON.parse( s );
		} catch ( e ) {
			return defaultValue;
		}
	}

	$( document ).ready( function() {
		var trackableLinks = '.mb-trackable .ab-item:not(div),' +
			'#wp-admin-bar-notes .ab-item,' +
			'#wp-admin-bar-user-info .ab-item,' +
			'.mb-trackable .ab-secondary';

		$( trackableLinks ).on( 'click touchstart', function( e ) {
			var $target = $( e.target ),
				$parent = $target.closest( 'li' );

			if ( ! $parent ) {
				return;
			}

			var trackingId = $target.attr( 'ID' ) || $parent.attr( 'ID' );

			if ( ! linksTracksEvents.hasOwnProperty( trackingId ) ) {
				return;
			}

			var eventProps = { 'clicked': linksTracksEvents[ trackingId ] };

			recordTracksEvent( eventProps );
		} );
	} );

	// listen for postMessage events from the notifications iframe
	$( window ).on( 'message', function( e ) {
		var event = ! e.data && e.originalEvent.data ? e.originalEvent : e;
		if ( event.origin !== 'https://widgets.wp.com' ) {
			return;
		}

		var data = ( 'string' === typeof event.data ) ? parseJson( event.data, {} ) : event.data;
		if ( 'notesIframeMessage' !== data.type ) {
			return;
		}

		var eventData = notesTracksEvents[ data.action ];
		if ( ! eventData ) {
			return;
		}

		recordTracksEvent( eventData( data ) );
	} );

} )( jQuery );
;
var wpcom = window.wpcom || {};
wpcom.actionbar = {};
wpcom.actionbar.data = actionbardata;

// This might be better in another file, but is here for now
(function($){
	var fbd = wpcom.actionbar.data,
			d = document,
			docHeight = $( d ).height(),
			b = d.getElementsByTagName( 'body' )[0],
			lastScrollTop = 0,
			lastScrollDir, fb, fhtml, fbhtml, fbHtmlLi,
			followingbtn, followbtn, fbdf, action,
			slkhtml = '', foldhtml = '', reporthtml = '',
			customizeIcon, editIcon, statsIcon, themeHtml = '', signupHtml = '', loginHtml = '',
			viewReaderHtml = '', editSubsHtml = '', editFollowsHtml = '',
			toggleactionbar, $actionbar;

	// Don't show actionbar when iframed
	if ( window != window.top ) {
		return;
	}

	fhtml = '<ul>';

	// Customize Icon
	customizeIcon = '<svg class="gridicon gridicon__customize" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M2 6c0-1.505.78-3.08 2-4 0 .845.69 2 2 2 1.657 0 3 1.343 3 3 0 .386-.08.752-.212 1.09.74.594 1.476 1.19 2.19 1.81L8.9 11.98c-.62-.716-1.214-1.454-1.807-2.192C6.753 9.92 6.387 10 6 10c-2.21 0-4-1.79-4-4zm12.152 6.848l1.34-1.34c.607.304 1.283.492 2.008.492 2.485 0 4.5-2.015 4.5-4.5 0-.725-.188-1.4-.493-2.007L18 9l-2-2 3.507-3.507C18.9 3.188 18.225 3 17.5 3 15.015 3 13 5.015 13 7.5c0 .725.188 1.4.493 2.007L3 20l2 2 6.848-6.848c1.885 1.928 3.874 3.753 5.977 5.45l1.425 1.148 1.5-1.5-1.15-1.425c-1.695-2.103-3.52-4.092-5.448-5.977z" data-reactid=".2.1.1:0.1b.0"></path></g></svg>';

	if ( fbd.canCustomizeSite && fbd.isLoggedIn ) {
		fhtml += '<li class="actnbr-btn actnbr-customize"><a href="'+ fbd.customizeLink +'">' + customizeIcon + '<span>' + fbd.i18n.customize + '<span></a></li>';
	}

	// Edit Icon
	editIcon = '<svg class="gridicon gridicon__pencil" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path></g></svg>';

	if ( fbd.canEditPost ) {
		fhtml += '<li class="actnbr-btn actnbr-edit"><a href="'+ fbd.editLink +'">' + editIcon + '<span>' + fbd.i18n.edit + '</span></a></li>';
	}

	// Stats Icon
	statsIcon = '<svg class="gridicon gridicon__stats-alt" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M21,21H3v-2h18V21z M8,10H4v7h4V10z M14,3h-4v14h4V3z M20,6h-4v11h4V6z"/></path></g></svg>';

	if ( fbd.canEditPost ) {
		fhtml += '<li class="actnbr-btn actnbr-stats"><a href="'+ fbd.statsLink +'">' + statsIcon + '<span>' + fbd.i18n.stats + '</span></a></li>';
	}

	// Follow/Unfollow Icon
	followingbtn = '<svg class="gridicon gridicon__following" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M23 13.482L15.508 21 12 17.4l1.412-1.388 2.106 2.188 6.094-6.094L23 13.482zm-7.455 1.862L20 10.89V2H2v14c0 1.1.9 2 2 2h4.538l4.913-4.832 2.095 2.176zM8 13H4v-1h4v1zm3-2H4v-1h7v1zm0-2H4V8h7v1zm7-3H4V4h14v2z"/></g></svg>';
	followbtn = '<svg class="gridicon gridicon__follow" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M23 16v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3zM20 2v9h-4v3h-3v4H4c-1.1 0-2-.9-2-2V2h18zM8 13v-1H4v1h4zm3-3H4v1h7v-1zm0-2H4v1h7V8zm7-4H4v2h14V4z"/></g></svg>';

	fbhtml = '<a class="actnbr-action actnbr-actn-follow" href="">' + followbtn + '<span>' + fbd.i18n.follow + '</span></a>';
	if ( fbd.isFollowing ) {
		fbhtml = '<a class="actnbr-action actnbr-actn-following" href="">' + followingbtn + '<span>' + fbd.i18n.following + '</span></a>';
	}

	// Show follow/unfollow icon on top level, when this is not your own site
	if ( fbd.canFollow && ! ( fbd.canEditPost || fbd.canCustomizeSite ) ) {
		fhtml += '<li class="actnbr-btn actnbr-hidden"> \
			    	' + fbhtml + ' \
			    	<div class="actnbr-popover tip tip-top-left actnbr-notice"> \
			    		<div class="tip-arrow"></div> \
			    		<div class="tip-inner actnbr-follow-bubble"></div> \
			    	</div> \
			    </li>';
	}

	if ( ! fbd.canCustomizeSite ) {
		// Report Link
		reporthtml = '<li class="flb-report"><a href="http://en.wordpress.com/abuse/">' + fbd.i18n.report + '</a></li>';
	}

	// Show shortlink on single posts
	if ( fbd.isSingular ) {
		slkhtml = '<li class="actnbr-shortlink"><a href="' + fbd.shortlink + '">' + fbd.i18n.shortlink + '</a></li>'
	}

	// Set up fold/unfold menu item
	foldhtml = '<li class="actnbr-fold"><a href="">' + fbd.i18n.foldBar + '</a></li>'
	if ( fbd.isFolded ) {
		foldhtml = '<li class="actnbr-fold"><a href="">' + fbd.i18n.unfoldBar + '</a></li>'
	}
	if ( ! fbd.isLoggedIn && ! fbd.canFollow ) {
		foldhtml = '';
	}

	if ( fbd.isLoggedIn ) {
		if ( '' != fbd.themeURL ) {
			themeHtml = '<li class="actnbr-theme"><a href="' + fbd.themeURL + '">' + fbd.i18n.themeInfo.replace( /{theme}/, fbd.themeName ) + '</a></li>';
		}
		if ( fbd.canFollow ) {
			if ( fbd.isSingular ) {
				viewReaderHtml = '<li class="actnbr-reader"><a href="https://wordpress.com/read/blogs/' + fbd.siteID + '/posts/' + fbd.postID +'">' + fbd.i18n.viewReadPost + '</a></li>';
			} else {
				viewReaderHtml = '<li class="actnbr-reader"><a href="https://wordpress.com/read/' + ( fbd.feedID ? 'feeds/' + fbd.feedID : 'blogs/' + fbd.siteID ) + '">' + fbd.i18n.viewReader + '</a></li>';
			}
		}
		editFollowsHtml = '<li class="actnbr-follows"><a href="https://wordpress.com/following/edit">' + fbd.i18n.editSubs + '</a></li>';
	} else {
		loginHtml += '<li class="actnbr-login"><a href="' + fbd.loginURL + '">' + fbd.i18n.login + '</a></li>';
		signupHtml = '<li class="actnbr-signup"><a href="' + fbd.signupURL + '">' + fbd.i18n.signup + '</a></li>';
		editSubsHtml = '<li class="actnbr-subs"><a href="https://subscribe.wordpress.com/">' + fbd.i18n.editSubs + '</a></li>';
	}

	// Hide follow/unfollow completely for static sites, and sites not allowing followers (VIP, private, etc).
	if ( ! fbd.canFollow ) {
		fbHtmlLi = '';
	} else {
		fbHtmlLi = '<li class="actnbr-folded-follow">' + fbhtml + '</li>';
	}

	// Ellipsis Menu
	fhtml += '<li class="actnbr-ellipsis actnbr-hidden"> \
			  <svg class="gridicon gridicon__ellipsis" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="12" r="2"/></g></svg> \
			  <div class="actnbr-popover tip tip-top-left actnbr-more"> \
			  	<div class="tip-arrow"></div> \
			  	<div class="tip-inner"> \
				  <ul> \
				    <li class="actnbr-sitename"><a href="' + fbd.siteURL + '">' + fbd.icon + ' ' + actionBarEscapeHtml( fbd.siteName ) + '</a></li> \
				   	<li class="actnbr-folded-customize"><a href="'+ fbd.customizeLink +'">' + customizeIcon + '<span>' + fbd.i18n.customize + '<span></a></li> \
				    ' + fbHtmlLi + ' \
					' + signupHtml + ' \
				    ' + loginHtml + ' \
				    ' + themeHtml + ' \
				    ' + slkhtml + ' \
				    ' + reporthtml + ' \
				    ' + viewReaderHtml + ' \
				    ' + editFollowsHtml + ' \
				    ' + editSubsHtml + ' \
				    ' + foldhtml + ' \
			      </ul> \
			    </div> \
		      </div> \
		    </li> \
	      </ul>';

	fbdf = d.createElement( 'div' );
	fbdf.id = 'actionbar';
	fbdf.innerHTML = fhtml;
	b.appendChild( fbdf );

	$actionbar = $( '#actionbar' ).addClass( 'actnbr-' + fbd.themeSlug.replace( '/', '-' ) );

	// Add classes based on contents
	if ( fbd.canCustomizeSite ) {
		$actionbar.addClass( 'actnbr-has-customize' );
	}

	if ( fbd.canEditPost ) {
		$actionbar.addClass( 'actnbr-has-edit' );
	}

	if ( ! fbd.canCustomizeSite ) {
		$actionbar.addClass( 'actnbr-has-follow' );
	}

	if ( fbd.isFolded ) {
		$actionbar.addClass( 'actnbr-folded' );
	}

	// Show status message if available
	if ( fbd.statusMessage ) {
		showActionBarStatusMessage( fbd.statusMessage );
	}

	// *** Actions *****************

	// Follow Site
	$actionbar.on(  'click', '.actnbr-actn-follow', function(e) {
		e.preventDefault();

		if ( fbd.isLoggedIn ) {
			showActionBarStatusMessage( '<div class="actnbr-reader">' + fbd.i18n.followedText + '</div>' );
			bumpStat( 'followed' );
			var eventProps = {
				'follow_source': 'actionbar',
				'url': fbd.siteURL
			};
			recordTracksEvent( 'wpcom_actionbar_site_followed', eventProps );

			request( 'ab_subscribe_to_blog' );
		} else {
			showActionBarFollowForm();
		}
	} )

	// UnFollow Site
	.on(  'click', '.actnbr-actn-following', function(e) {
		e.preventDefault();
		$( '#actionbar .actnbr-actn-following' ).replaceWith( '<a class="actnbr-action actnbr-actn-follow" href="">' + followbtn + '<span>' + fbd.i18n.follow + '</span></a>' );

		bumpStat( 'unfollowed' );
		var eventProps = {
			'follow_source': 'actionbar',
			'url': fbd.siteURL
		};
		recordTracksEvent( 'wpcom_actionbar_site_unfollowed', eventProps );

		request( 'ab_unsubscribe_from_blog' );
	} )

	// Show shortlink prompt
	.on( 'click', '.actnbr-shortlink a', function(e) {
		e.preventDefault();
		window.prompt( "Shortlink: ", fbd.shortlink );
	} )

	// Toggle more menu
	.on( 'click', '.actnbr-ellipsis', function(e) {
		if ( $( e.target ).closest( 'a' ).hasClass( 'actnbr-action' ) ) {
			return false;
		}

		var popoverLi = $( '#actionbar .actnbr-ellipsis' );
		popoverLi.toggleClass( 'actnbr-hidden' );

		setTimeout( function() {
			if ( ! popoverLi.hasClass( 'actnbr-hidden' ) ) {
				bumpStat( 'show_more_menu' );

				$( document ).on( 'click.actnbr-body-click', function() {
					popoverLi.addClass( 'actnbr-hidden' );

					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	})

	// Fold/Unfold
	.on( 'click', '.actnbr-fold', function(e) {
		e.preventDefault();

		if ( $( '#actionbar' ).hasClass( 'actnbr-folded' ) ) {
			$( '.actnbr-fold a' ).html( fbd.i18n.foldBar );
			$( '#actionbar' ).removeClass( 'actnbr-folded' );

			$.post( fbd.xhrURL, { 'action': 'unfold_actionbar' } );
		} else {
			$( '.actnbr-fold a' ).html( fbd.i18n.unfoldBar );
			$( '#actionbar' ).addClass( 'actnbr-folded' );

			$.post( fbd.xhrURL, { 'action': 'fold_actionbar' } );
		}
	})

	// Record stats for clicks
	.on( 'click', '.actnbr-sitename a', createStatsBumperEventHandler( 'clicked_site_title' ) )
	.on( 'click', '.actnbr-customize a', createStatsBumperEventHandler( 'customized' ) )
	.on( 'click', '.actnbr-folded-customize a', createStatsBumperEventHandler( 'customized' ) )
	.on( 'click', '.actnbr-theme a', createStatsBumperEventHandler( 'explored_theme' ) )
	.on( 'click', '.actnbr-edit a', createStatsBumperEventHandler( 'edited' ) )
	.on( 'click', '.actnbr-stats a', createStatsBumperEventHandler( 'clicked_stats' ) )
	.on( 'click', '.flb-report a', createStatsBumperEventHandler( 'reported_content' ) )
	.on( 'click', '.actnbr-follows a', createStatsBumperEventHandler( 'managed_following' ) )
	.on( 'click', '.actnbr-shortlink a', function() {
		bumpStat( 'copied_shortlink' );
	} )
	.on( 'click', '.actnbr-reader a', createStatsBumperEventHandler( 'view_reader' ) )
	.on( 'submit', '.actnbr-follow-bubble form', createStatsBumperEventHandler( 'submit_follow_form', function() {
		$( '#actionbar .actnbr-follow-bubble form button' ).attr( 'disabled', true );
	} ) )
	.on( 'click', '.actnbr-login-nudge a', createStatsBumperEventHandler( 'clicked_login_nudge' ) )
	.on( 'click', '.actnbr-signup a', createStatsBumperEventHandler( 'clicked_signup_link' ) )
	.on( 'click', '.actnbr-login a', createStatsBumperEventHandler( 'clicked_login_link' ) )
	.on( 'click', '.actnbr-subs a', createStatsBumperEventHandler( 'clicked_manage_subs_link' ) );

	// Make Follow/Unfollow requests
	var request = function( action ) {
		$.post( fbd.xhrURL, {
			'action': action,
			'_wpnonce': fbd.nonce,
			'source': 'actionbar',
			'blog_id': fbd.siteID
		});
	};

	// Show/Hide actionbar on scroll
	fb = $('#actionbar');
	toggleactionbar = function() {
		var st = $(window).scrollTop(),
			topOffset = 0;

		if ( $(window).scrollTop() < 0 ) {
			return;
		}

		// Still
		if ( lastScrollTop == 0 || ( ( st == lastScrollTop ) && lastScrollDir == 'up' ) ) {
			fb.removeClass( 'actnbr-hidden' );

		// Moving
		} else {
			 // Scrolling Up
		    if ( st < lastScrollTop ){
				fb.removeClass( 'actnbr-hidden' );
				lastScrollDir = 'up';

			// Scrolling Down
			} else {
				// check if there are any popovers open, and only hide action bar if not
				if ( $( '#actionbar > ul > li:not(.actnbr-hidden) > .actnbr-popover' ).length === 0 ) {
					fb.addClass( 'actnbr-hidden' );
					lastScrollDir = 'down';

					// Hide any menus
					$( '#actionbar li' ).addClass( 'actnbr-hidden' );
				}
			}
		}

		lastScrollTop = st;
	};
	setInterval( toggleactionbar, 100 );

	var bumpStat = function( stat ) {
		return $.post( fbd.xhrURL, {
			'action': 'actionbar_stats',
			'stat': stat
		} );
	};

	var recordTracksEvent =	function( eventName, eventProps ) {
		eventProps = eventProps || {};
		window._tkq = window._tkq || [];
		window._tkq.push( [ 'recordEvent', eventName, eventProps ] );
	};

	/**
	 * A factory method for creating an event handler function that will bump a specific stat and ONLY THEN re-dispatch
	 * the event. This will ensure that the bumped stat is indeed recorded before navigating the page away, as otherwise
	 * some browsers may very well decide to cancel the stat request in that case.
	 *
	 * @param {String} stat the name of the stat to bump
	 * @param {Function} additionalEffect an additional function that should be called after the stat is bumped
	 */
	function createStatsBumperEventHandler( stat, additionalEffect ) {
		var completedEvents = {};

		return function eventHandler( event ) {
			if ( completedEvents[ event.timeStamp ] ) {
				delete completedEvents[ event.timeStamp ];

				// hack-around to submit forms, dispatching "submit" event is not enough for them
				if ( event.type === 'submit' ) {
					event.target.submit();
				}

				if ( typeof additionalEffect === 'function' ) {
					return additionalEffect( event );
				}

				return true;
			}

			event.preventDefault();
			event.stopPropagation();

			function dispatchOriginalEvent() {
				var newEvent;

				// Retrieves the native event object created by the browser from the jQuery event object
				var originalEvent = event.originalEvent;

				/**
				 * Handles Internet Explorer that doesn't support Event nor CustomEvent constructors
				 *
				 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
				 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
				 * @see https://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work/
				 */
				if ( typeof window.CustomEvent !== 'function' ) {
					newEvent = document.createEvent( 'CustomEvent' );
					newEvent.initCustomEvent(
						originalEvent.type,
						originalEvent.bubbles,
						originalEvent.cancelable,
						originalEvent.detail
					);
				} else {
					newEvent = new originalEvent.constructor( originalEvent.type, originalEvent );
				}

				completedEvents[ newEvent.timeStamp ] = true;

				originalEvent.target.dispatchEvent( newEvent );
			}

			bumpStat( stat ).then( dispatchOriginalEvent, dispatchOriginalEvent );
		}
	}

	function actionBarEscapeHtml(string) {
		return String(string).replace(/[&<>"'\/]/g, function (s) {
			var entityMap = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': '&quot;',
				"'": '&#39;',
				"/": '&#x2F;'
			};
			return entityMap[s];
		});
	}

	function showActionBarStatusMessage( message ) {
		$( '#actionbar .actnbr-actn-follow' ).replaceWith( '<a class="actnbr-action actnbr-actn-following" href="">' + followingbtn + '<span>' + fbd.i18n.following + '</span></a>' );
		$( '#actionbar .actnbr-follow-bubble' ).html( ' \
			<ul> \
				<li class="actnbr-sitename"><a href="' + fbd.siteURL + '">' + fbd.icon + ' ' + actionBarEscapeHtml( fbd.siteName ) + '</a></li> \
				<li class="actnbr-message">' + message + '</li> \
			</ul> \
		');

		var btn = $( '#actionbar .actnbr-btn' );
		btn.removeClass( 'actnbr-hidden' );

		setTimeout( function() {
			if ( ! btn.hasClass( 'actnbr-hidden' ) ) {
				$( '#actionbar .actnbr-email-field' ).focus();
				$( document ).on( 'click.actnbr-body-click', function(e) {
					if ( $( e.target ).closest( '.actnbr-popover' )[0] ) {
						return;
					}
					btn.addClass( 'actnbr-hidden' );
					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	}

	function showActionBarFollowForm() {
		var btn = $( '#actionbar .actnbr-btn' );
		btn.toggleClass( 'actnbr-hidden' );

		var form = $('<form>');

		if ( fbd.i18n.followers ) {
			form.append( $( '<div class="actnbr-follow-count">' ).html( fbd.i18n.followers ) );
		}

		form.append($('<div>').append($('<input>').attr({"type": "email", "name": "email", "placeholder": fbd.i18n.enterEmail, "class": "actnbr-email-field"})));
		form.append($('<input type="hidden" name="action" value="subscribe"/>'));
		form.append($('<input type="hidden" name="blog_id">').attr('value', fbd.siteID));
		form.append($('<input type="hidden" name="source">').attr('value', fbd.referer));
		form.append($('<input type="hidden" name="sub-type" value="actionbar-follow"/>'));
		form.append($(fbd.subscribeNonce));
		form.append($('<div class="actnbr-button-wrap">').append($('<button type="submit">').attr('value', fbd.i18n.subscribe).html(fbd.i18n.subscribe)));
		form.attr('method', 'post');
		form.attr('action', 'https://subscribe.wordpress.com');
		form.attr('accept-charset', 'utf-8');

		var html = $('<ul/>');
		html.append($('<li class="actnbr-sitename">').append($('<a>').attr('href', fbd.siteURL).append($(fbd.icon)).append(' ' + actionBarEscapeHtml( fbd.siteName ))))
		html.append($('<li>').append(form));
		html.append($('<li class="actnbr-login-nudge">').append($('<div>').html(fbd.i18n.alreadyUser)));

		$( '#actionbar .actnbr-follow-bubble' ).empty().append(html);

		setTimeout( function() {
			if ( ! btn.hasClass( 'actnbr-hidden' ) ) {
				bumpStat( 'show_follow_form' );

				$( '#actionbar .actnbr-email-field' ).focus();

				$( document ).on( 'click.actnbr-body-click', function( event ) {
					if ( $( event.target ).closest( '.actnbr-popover' )[ 0 ] ) {
						return;
					}

					btn.addClass( 'actnbr-hidden' );

					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	}
})(jQuery);
;

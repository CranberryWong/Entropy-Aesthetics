/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function ($, win, dataAndEvents) {
    /**
     * @param {string} images
     * @param {string} options
     * @return {?}
     */
    $.fn.backstretch = function (images, options) {
        if (images === dataAndEvents || 0 === images.length) {
            $.error("No images were supplied for Backstretch");
        }
        if (0 === $(win).scrollTop()) {
            win.scrollTo(0, 0);
        }
        return this.each(function () {
            var $this = $(this);
            var obj = $this.data("backstretch");
            if (obj) {
                if ("string" == typeof images && "function" == typeof obj[images]) {
                    obj[images](options);
                    return;
                }
                options = $.extend(obj.options, options);
                obj.destroy(true);
            }
            obj = new Backstretch(this, images, options);
            $this.data("backstretch", obj);
        });
    };
    /**
     * @param {?} images
     * @param {string} options
     * @return {?}
     */
    $.backstretch = function (images, options) {
        return $("body").backstretch(images, options).data("backstretch");
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    $.expr[":"].backstretch = function (elem) {
        return $(elem).data("backstretch") !== dataAndEvents;
    };
    $.fn.backstretch.defaults = {
        centeredX: true,
        centeredY: true,
        duration: 5E3,
        fade: 0
    };
    var obj = {
        left: 0,
        top: 0,
        overflow: "hidden",
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
        zIndex: -999999
    };
    var defaults = {
        position: "absolute",
        display: "none",
        margin: 0,
        padding: 0,
        border: "none",
        width: "auto",
        height: "auto",
        maxHeight: "none",
        maxWidth: "none",
        zIndex: -999999
    };
    /**
     * @param {string} container
     * @param {Object} images
     * @param {Object} options
     * @return {undefined}
     */
    var Backstretch = function (container, images, options) {
        this.options = $.extend({}, $.fn.backstretch.defaults, options || {});
        this.images = $.isArray(images) ? images : [images];
        $.each(this.images, function () {
            $("<img />")[0].src = this;
        });
        /** @type {boolean} */
        this.isBody = container === document.body;
        this.$container = $(container);
        this.$root = this.isBody ? supportsFixedPosition ? $(win) : $(document) : this.$container;
        container = this.$container.children(".backstretch").first();
        this.$wrap = container.length ? container : $('<div class="backstretch"></div>').css(obj).appendTo(this.$container);
        if (!this.isBody) {
            container = this.$container.css("position");
            images = this.$container.css("zIndex");
            this.$container.css({
                position: "static" === container ? "relative" : container,
                zIndex: "auto" === images ? 0 : images,
                background: "none"
            });
            this.$wrap.css({
                zIndex: -999998
            });
        }
        this.$wrap.css({
            position: this.isBody && supportsFixedPosition ? "fixed" : "absolute"
        });
        /** @type {number} */
        this.index = 0;
        this.show(this.index);
        $(win).on("resize.backstretch", $.proxy(this.resize, this)).on("orientationchange.backstretch", $.proxy(function () {
            if (this.isBody) {
                if (0 === win.pageYOffset) {
                    win.scrollTo(0, 1);
                    this.resize();
                }
            }
        }, this));
    };
    Backstretch.prototype = {
        /**
         * @return {?}
         */
        resize: function () {
            try {
                var pos = {
                    left: 0,
                    top: 0
                };
                var rootWidth = this.isBody ? this.$root.width() : this.$root.innerWidth();
                var bgWidth = rootWidth;
                var rootHeight = this.isBody ? win.innerHeight ? win.innerHeight : this.$root.height() : this.$root.innerHeight();
                /** @type {number} */
                var bgHeight = bgWidth / this.$img.data("ratio");
                var distance;
                if (bgHeight >= rootHeight) {
                    /** @type {number} */
                    distance = (bgHeight - rootHeight) / 2;
                    if (this.options.centeredY) {
                        /** @type {string} */
                        pos.top = "-" + distance + "px";
                    }
                } else {
                    bgHeight = rootHeight;
                    /** @type {number} */
                    bgWidth = bgHeight * this.$img.data("ratio");
                    /** @type {number} */
                    distance = (bgWidth - rootWidth) / 2;
                    if (this.options.centeredX) {
                        /** @type {string} */
                        pos.left = "-" + distance + "px";
                    }
                }
                this.$wrap.css({
                    width: rootWidth,
                    height: rootHeight
                }).find("img:not(.deleteable)").css({
                    width: bgWidth,
                    height: bgHeight
                }).css(pos);
            } catch (h) {
            }
            return this;
        },
        /**
         * @param {number} newIndex
         * @return {?}
         */
        show: function (newIndex) {
            if (!(Math.abs(newIndex) > this.images.length - 1)) {
                var self = this;
                var oldImage = self.$wrap.find("img").addClass("deleteable");
                var evtOptions = {
                    relatedTarget: self.$container[0]
                };
                self.$container.trigger($.Event("backstretch.before", evtOptions), [self, newIndex]);
                /** @type {number} */
                this.index = newIndex;
                clearInterval(self.interval);
                self.$img = $("<img />").css(defaults).bind("load", function (data) {
                    var imgWidth = this.width || $(data.target).width();
                    data = this.height || $(data.target).height();
                    $(this).data("ratio", imgWidth / data);
                    $(this).fadeIn(self.options.speed || self.options.fade, function () {
                        oldImage.remove();
                        if (!self.paused) {
                            self.cycle();
                        }
                        $(["after", "show"]).each(function () {
                            self.$container.trigger($.Event("backstretch." + this, evtOptions), [self, newIndex]);
                        });
                    });
                    self.resize();
                }).appendTo(self.$wrap);
                self.$img.attr("src", self.images[newIndex]);
                return self;
            }
        },
        /**
         * @return {?}
         */
        next: function () {
            return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0);
        },
        /**
         * @return {?}
         */
        prev: function () {
            return this.show(0 === this.index ? this.images.length - 1 : this.index - 1);
        },
        /**
         * @return {?}
         */
        pause: function () {
            /** @type {boolean} */
            this.paused = true;
            return this;
        },
        /**
         * @return {?}
         */
        resume: function () {
            /** @type {boolean} */
            this.paused = false;
            this.next();
            return this;
        },
        /**
         * @return {?}
         */
        cycle: function () {
            if (1 < this.images.length) {
                clearInterval(this.interval);
                /** @type {number} */
                this.interval = setInterval($.proxy(function () {
                    if (!this.paused) {
                        this.next();
                    }
                }, this), this.options.duration);
            }
            return this;
        },
        /**
         * @param {boolean} dataAndEvents
         * @return {undefined}
         */
        destroy: function (dataAndEvents) {
            $(win).off("resize.backstretch orientationchange.backstretch");
            clearInterval(this.interval);
            if (!dataAndEvents) {
                this.$wrap.remove();
            }
            this.$container.removeData("backstretch");
        }
    };
    var supportsFixedPosition;
    /** @type {string} */
    var ua = navigator.userAgent;
    /** @type {string} */
    var platform = navigator.platform;
    /** @type {(Array.<string>|null)} */
    var wkversion = ua.match(/AppleWebKit\/([0-9]+)/);
    /** @type {(boolean|string)} */
    wkversion = !!wkversion && wkversion[1];
    /** @type {(Array.<string>|null)} */
    var arg = ua.match(/Fennec\/([0-9]+)/);
    /** @type {(boolean|string)} */
    arg = !!arg && arg[1];
    /** @type {(Array.<string>|null)} */
    var index = ua.match(/Opera Mobi\/([0-9]+)/);
    /** @type {(boolean|string)} */
    var i = !!index && index[1];
    /** @type {(Array.<string>|null)} */
    var opt_timeLimit = ua.match(/MSIE ([0-9]+)/);
    /** @type {(boolean|string)} */
    opt_timeLimit = !!opt_timeLimit && opt_timeLimit[1];
    /** @type {boolean} */
    supportsFixedPosition = !((-1 < platform.indexOf("iPhone") || (-1 < platform.indexOf("iPad") || -1 < platform.indexOf("iPod"))) && (wkversion && 534 > wkversion) || (win.operamini && "[object OperaMini]" === {}.toString.call(win.operamini) || (index && 7458 > i || (-1 < ua.indexOf("Android") && (wkversion && 533 > wkversion) || (arg && 6 > arg || ("palmGetResource" in win && (wkversion && 534 > wkversion) || (-1 < ua.indexOf("MeeGo") && -1 < ua.indexOf("NokiaBrowser/8.5.0") || opt_timeLimit &&
    6 >= opt_timeLimit)))))));
})(jQuery, window);

// Plugin options par défaut.
var defaultOptions = {
    id: "srpOverlay",
    iframeTemplate: '<div class="srp_overlay_container" style="display:none;"><div class="srp_overlay_bg"><a class="srp_overlay_close" href="javascript:;" ></a><div class="srp_overlay_iframe"><iframe id="iframe_id" frameborder="0"></iframe></div><a class="srp_overlay_continue" href="javascript:;"></a></div></div>',
    contentTemplate: '<div class="srp_overlay_container" style="display:none;"><div class="srp_overlay_bg"><a class="srp_overlay_close" href="javascript:;" ></a><div class="srp_overlay_content"></div></div>',
    overlayTemplate: '<div class="srp_overlay" style="display:none;"><div id="floatingBarsG" class="srp_overlay_loader"><div class="blockG" id="rotateG_01"></div><div class="blockG" id="rotateG_02"></div><div class="blockG" id="rotateG_03"></div><div class="blockG" id="rotateG_04"></div><div class="blockG" id="rotateG_05"></div><div class="blockG" id="rotateG_06"></div><div class="blockG" id="rotateG_07"></div><div class="blockG" id="rotateG_08"></div></div></div></div>',
    continueTemplate: '<a class="srp_overlay_continue" href="javascript:;"></a>',
    mode: 'iframe', // permet de définir le template à utiliser 'iframe' ou 'content'
    className: false,
    closeButton: true,
    closeText: window['GlobalJsText'] != null && window['GlobalJsText'].closeText ? window['GlobalJsText'].closeText : 'X',
    continueButton: false,
    continueText: window['GlobalJsText'] != null && window['GlobalJsText'].continueText ? window['GlobalJsText'].continueText : 'OK',
    closeOnOutsideClick: true,
    loader: true,
    onShow: false,
    onClose: false,
    fit: {
        appendMargin: true,
        auto: true, // redimenssionne automatiquement en fonction du contenu (Ne fonctionne pas en cross domaine)
        minWidth: false,
        minHeight: false,
        maxHeight: false,
        width: false,
        height: false
    },
    iframeOptions: { // options concernant le mode iframe
        scrolling: 'no'
    }
};

var SrpOverlay = (function (options) {
    function SrpOverlay(options, $sender) {
        this.configs = {};
        this.$component = {}; // Correspond au composant affiché
        this.$sender = {}; // Correspond au lien lancant l'affichage [optionnel]
        this.$overlay = {}; // Correspond au fond affiché
        this.$loader = {}; // Correspond au fond affiché
        this.$continueButton = {}; // Correspond au fond affiché

        this.$sender = $sender;
        $.extend(true, this.configs, defaultOptions, options);
        this.init();
    };

    // Initialisation du composant
    SrpOverlay.prototype.init = function () {
        var component = this;

        // Initialisation de l'overlay et du loader
        component.initLoader();

        // Injection et paramétrage du control
        if (component.configs.mode == 'iframe') {
            component.$component = $(component.configs.iframeTemplate);
            if (component.configs.className) {
                component.$component.addClass(component.configs.className);
            }
            var $iframe = component.$component.find("iframe");
            component.$component.prop("id", component.configs.id);
            $iframe.prop("id", "iframe_" + component.configs.id);
            $iframe.prop("name", "iframe_" + component.configs.id);
            $iframe.prop("scrolling", component.configs.iframeOptions.scrolling);
            $iframe.css("width", component.configs.fit.width + "px");
            if (!component.configs.fit.auto) {
                $iframe.css("height", component.configs.fit.height + "px");
            }
            else if (component.configs.fit.minHeight) {
                $iframe.css("min-height", component.configs.fit.minHeight + "px");
            }
            $('body').append(component.$component);
        }
        else if (component.configs.mode == 'content') {
            component.$component = $(component.configs.contentTemplate);
            component.$component.data("srpOverlay", component);
            component.$component.prop("id", component.configs.id);
            $('body').append(component.$component);
        }

        // Initialisation de l'overlay et du loader
        component.closeButton();
        component.continueButton();
    };

    SrpOverlay.prototype.initLoader = function () {
        var component = this;
        component.$overlay = $("body > .srp_overlay");
        if (component.$overlay.length == 0) {
            component.$overlay = $(component.configs.overlayTemplate);
            component.$loader = component.$overlay.find(".srp_overlay_loader");

            if (component.configs.loader === true) {
                component.$loader.show();
            }
            else {
                component.$loader.hide();
            }
            $('body').append(component.$overlay);
        }
        else {
            component.$loader = component.$overlay.find(".srp_overlay_loader");
        }
    };

    SrpOverlay.prototype.closeButton = function () {
        var component = this;

        var $buttonClose = component.$component.find(".srp_overlay_close");
        if (component.configs.closeButton) {
            $buttonClose.show();
            $buttonClose.text(component.configs.closeText);
            $buttonClose.click(function () {
                component.close();
            });
        }
        else {
            $buttonClose.hide();
        }
    };

    SrpOverlay.prototype.continueButton = function() {
        var component = this;
        component.$continueButton = $(component.configs.continueTemplate);
        component.$continueButton.text(component.configs.continueText);
        component.$continueButton.click(function() {
            component.close();
        });
    };

    // Destruction du composant
    SrpOverlay.prototype.destroy = function (options) {
        var component = this;
        var evtOptions = { relatedTarget: component.$component[0] };
        component.$component.remove();
        component.$component.data("srpOverlay", null);
    };

    // Affichage de l'overlay
    SrpOverlay.prototype.show = function (content, event) {
        var component = this;

        component.$overlay.show();
        
        // Injection et paramétrage du control
        if (component.configs.mode == 'iframe') {
            $iframe = component.$component.find("iframe");
            component.iframeUrl = content;
            $iframe.prop("src", content);
            $iframe.load(function () {
                component.EndShow(event);
            });
        }
        else if (component.configs.mode == 'content') {
            var $content = component.$component.find(".srp_overlay_content");
            $content.empty().append(content);
            if (component.configs.continueButton)
            {
                $content.append(component.$continueButton);
            }
            component.EndShow(event);
        }
    };

    SrpOverlay.prototype.resize = function (height) {
        var component = this;

        if (height > (screen.height * 0.9)) {
            component.$component.find(".srp_overlay_iframe").css('max-height', screen.height * 0.9 + 'px');
        }
        $iframe.css('height', height + 'px');

        if (component.configs.fit.maxHeight)
        {
            component.$component.find(".srp_overlay_iframe").css('max-height', component.configs.fit.maxHeight + 'px');
            component.$component.find(".srp_overlay_iframe").css('overflowY', 'auto');
        }
    };

    SrpOverlay.prototype.EndShow = function (event) {
        var component = this;

        if (component.configs.closeOnOutsideClick === true) {
            component.$overlay.unbind('click');
            component.$overlay.on('click', function (e) {
                if ($(e.target).closest(".srp_overlay_container").length === 0) {
                    component.close();
                }
            });
        } else if (component.configs.closeOnOutsideClick !== false) {
            component.$overlay.unbind('click');
            component.$overlay.on('click', function (e) {
                if (typeof component.configs.closeOnOutsideClick === "string" && component.configs.closeOnOutsideClick.length > 0) {
                    document.location.href = component.configs.closeOnOutsideClick;
                }
            });
        }

        component.$loader.hide();

        component.$component.css("overflow", "hidden");
        //component.$component.css("width", "0");
        //component.$component.css("height", "0");
        component.$component.show();

        var $refDiv = component.$component.find("> div");
        var h = minHeightInt || $refDiv.outerHeight();
        var w = $refDiv.outerWidth();

        if (component.configs.mode == "iframe")
        {
            if (component.configs.fit.auto) {

                // Auto-resizing for iframe
                try {
                    component.resize($iframe[0].contentWindow.document.body.offsetHeight);
                    h = $refDiv.outerHeight();
                }
                catch (ex) {
                    if (component && component.configs && component.configs.fit && component.configs.fit.minHeight)
                    {
                        var minHeightInt = parseInt(component.configs.fit.minHeight);
                        component.resize(minHeightInt);
                        h = minHeightInt;
                    }
                }
                
            }
            

            // Add reference into iframe
            try {
                $iframe[0].contentWindow['overlayInstance'] = component;
            }
            catch (ex) { }
        }

        component.appendMargin(w, h);
        component.$component.css('top', '50%');
        component.$component.css('left', '50%');
        component.$component.animate({ width: w, height: h }, 300);

        if (component.configs.onShow && typeof (component.configs.onShow) == "function") {
            if (component.configs.onShow(component) === false) {
                return;
            }
        }
    };

    SrpOverlay.prototype.appendMargin = function (w, h) {
        var component = this;
        // Ajout du margin-top : -(height/2) px
        if (component.configs.fit.appendMargin) {
            var mt = Math.ceil(h / 2);
            component.$component.css("margin-top", -mt + "px");
            var ml = Math.ceil(w / 2);
            component.$component.css("margin-left", -ml + "px");
        }
    };

    // Masquage de l'overlay
    SrpOverlay.prototype.close = function () {
        var component = this;
        if (component.configs.onClose && typeof (component.configs.onClose) == "function") {
            if (component.configs.onClose(component) !== false) {
                component.$component.hide();
                component.$overlay.hide();
            }
        } else {
            component.$component.hide();
            component.$overlay.hide();
        }
        window._uxa = window._uxa || [];
        if ($("#inscriptionContainer")) {
            window._uxa.push([
                'trackPageview', window.location.pathname +
                window.location.hash.replace('#', '?__') +
                '?cs-close-popin-anniversaire'
            ]);
        } else {
            window._uxa.push(['trackPageview', window.location.pathname + window.location.hash.replace('#', '?__')]);
        }
    };

    // Redirection de la popin avec update et resize
    SrpOverlay.prototype.redirect = function (url, options) {
        var component = this;
        var $iframe = component.$component.find("iframe");
        var updateHeight = 0;

        if (options && options.fit) {
            if (options.fit.auto) {
                updateHeight = options.fit.minHeight;
            }
            else {
                updateHeight = options.fit.height;
            }
        }
        if (updateHeight > 0) {
            component.$component.css('height', "auto");
            component.$component.css('min-height', updateHeight + "px");
            component.$component.css('height', "auto");
            component.$component.css('min-height', updateHeight + "px");
        }
        component.update(options);
        component.show(url);
    };

    // Mise à jour des options du plugin.
    SrpOverlay.prototype.update = function (options) {
        var component = this;
        if (!options) return;
        $.extend(true, component.configs, options);
    };


    return SrpOverlay;
})();

(function ($) {

    /* Jquery plugin pattern for overlay on link */
    $.fn.srpOverlay = function () {
        var instances = [];
        $(this).each(function (index, item) {

            // Load smoothbox Options
            var raws = $(item).prop("rev").split(",");
            var opts = {};
            for (var i = 0; i < raws.length; i++) {
                var values = raws[i].split("=");
                if (values.length == 2) {
                    opts[values[0].trim()] = values[1].trim();
                }
            }

            // Iframe options
            var height = opts['height'] || false;
            var width = opts['width'] || 580;
            var minHeight = opts['minHeight'] || 200;
            var maxHeight = opts['maxHeight'] || false;
            var scrolling = opts['scroll'] || "no";

            var srpOverlayOption = {
                fit: {
                    auto: (height <= 0 || height == false),
                    width: width,
                    height: height,
                    minHeight: minHeight,
                    maxHeight: maxHeight
                },
                iframeOptions: {
                    scrolling: scrolling
                }
            };

            // Création ou mise à jour de l'instance
            var instance = new SrpOverlay(srpOverlayOption || {}, $(this));
            $(item).data("srpOverlay", instance);
            instances.push(instance);
        });

        return instances.length == 1 ? instances[0] : instances;
    };

})(jQuery);

function displayMessage(id, content, configs) {
    var overlayDefaultConfig = {
        id: id,
        loader: false,
        closeButton: true,
        continueButton: true,
        mode: 'content',
        fit: {
            auto: true,
            appendMargin: true,
            width: 580,
            minHeight: 150
        }
    };

    $.extend(true, overlayDefaultConfig, configs);

    var msgOverlay = new SrpOverlay(overlayDefaultConfig);
    msgOverlay.show(content);
    return msgOverlay;
}

function displayIframe(id, url, closeText, configs) {
    var closeText = closeText || false;
    var hasClose = closeText ? true : false;
    var defaultConfigs = {
        id: id,
        loader: true,
        closeButton: hasClose,
        closeText: closeText,
        mode: 'iframe',
        fit: {
            auto: true,
            appendMargin: true,
            width: 580,
            minHeight: 250
        }
    };
    
    $.extend(true, defaultConfigs, configs);
    
    var iframeOverlay = new SrpOverlay(defaultConfigs);
    // bind event
    iframeOverlay.show(url);
}

function overlayResize(iframeId, height) {
    var $currentIframe = $("#" + iframeId);
    var currentOverlay = $currentIframe.closest(".srp_overlay_container");
    var overlay = currentOverlay.data("srpOverlay");
    if (overlay != null)
    {
        overlay.resize(height);
    }
}

function initializeSmoothBox() {
    $('.smoothbox').each(function (index, item) {

        // Load smoothbox Options
        var raws = $(item).prop("rev").split(",");
        $(this).srpOverlay();
        $(this).click(function (e) {
            var e  = e || window.event;
            var urlIframe = $(this).prop("href");
            var overlay = $(this).data("srpOverlay");
            if(e && e.pageX && e.pageY)
            {
                overlay.show(urlIframe, { top: e.pageY, left: e.pageX });
            }
            else{
                overlay.show(urlIframe);
            }
            return srpHelper.stopEventPropagation(e);
        });
    });
}

$(document).ready(function () {
    initializeSmoothBox();
});


/*  TODO 
    - Fix redimmenssionnement
*/
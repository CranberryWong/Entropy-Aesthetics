// Compatibilité IE de Console.log
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };
if (!window.console.time) window.console.time = function () { };
if (!window.console.timeEnd) window.console.timeEnd = function () { };

// Ajax Error Handling
$.ajaxSetup({ global: true });
$(document).ajaxError(function (event, xhr, settings) {
    if (xhr.status == 581) { // Erreur SRP
        if (xhr && xhr.responseText) {
            console.log(xhr.responseText);
        }
    }
    if (xhr.status == 582) { // Redirect SRP
        if (xhr && xhr.responseText) {
            var jsonObject = JSON.parse(xhr.responseText);
            console.log(jsonObject);
            if (jsonObject.srpRedirect != null) {
                window.top.document.location = jsonObject.srpRedirect;
            }
        }
    }
});

// String Extensions
String.prototype.trim = function () {
    var x = this.toString();
    x = x.replace(new RegExp("^\\s+", ""), "");
    x = x.replace(new RegExp("\\s+$", ""), "");
    return x;
}

String.prototype.replaceFirstChar = function (r) {
    return this.trim().length > 0 ? r + this.substring(1) : '';
}

// SRP Helpers
var srpUrlHelper = {};

// retourne la liste des urls produits
srpUrlHelper.GetUrlsForProduct = function (saleId, productId, size, indexes) {
    var baseUrl = configUrls.UrlMedia;

    if (configUrls.urlCdn.length > 0) {
        baseUrl = configUrls.urlCdn;
    }

    var urls = [];
    for (var i = 0; i < indexes.length; i++) {
        var template = configUrls.templateProductUrl.replace("[BASEURL]", baseUrl).replace("[SALEID]", saleId).replace("[PRODUCTID]", productId).replace("[INDEX]", indexes[i]).replace("[SIZE]", size);
        urls.push(template);
    }
    return urls;
}

// SRP Helpers
var srpHelper = {};
srpHelper.stopEventPropagation = function (e) {
    if (!e)
        e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        //IE8 and Lower
        e.cancelBubble = true;
    }
    return false;
}

//Sharing all medias
function Shared(share, page, id) {
    $.ajax({
        type: "POST",
        url: "/Ajax/GetShare.aspx?share=" + share + "&page=" + page + "&id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (share == 'facebook') {
                FB.ui({ method: 'share', href: data.share });
            } else if (share == 'email') {
                var overlay = new SrpOverlay({
                    id: "srpOverlayShare",
                    loader: true,
                    closeButton: true,
                    mode: 'iframe',
                    fit: {
                        auto: true,
                        appendMargin: true,
                        width: 580,
                        minHeight: 450
                    }
                });
                overlay.show(data.share);
            } else {
                var sharing = $('<a onclick="' + data.share + '" />');
                $("body").append(sharing);
                sharing.click();
            }
        },
        failure: function (data) {
            alert(data.srpError);
        }
    });
}


/**
*
*  Run - Creation d'un objet unique accessible de partout.
*
**/
var SRP = SRP || {};
var EVENTS_TC = EVENTS_TC || {};
var tagSection = '';

/**
*
*  Run
*
**/
$(function () {

    // On execute le code commun sur la page courante - Constructeur SRP
    try {
        SRP.init();

        if (SRP[tagSection] !== undefined) {
            SRP[tagSection].init();
        }
    } catch (e) {
        SRP.ConsoleLog(e);
    }

    // Instancie events.js
    try {

        EVENTS_TC.init();

        if (EVENTS_TC[tagSection] !== undefined) {
            EVENTS_TC[tagSection].init();
        }
    } catch (e) {
        SRP.ConsoleLog(e);
    }        
});


/**
*
*  Classe SRP
*
**/
(function (publics) {
    // Tout ce qui devra etre accessible en dehors de ce contexte 
    // d'execution sera accroche a 'publics' et accessible via 'SRP'.

    var privates = {}; // Tout ce qui ne devra pas quitter le contexte d'execution sera accrocha a 'privates' et accessible uniquement via 'privates'.

    /**
    *
    *   Méthode commune de récupération de paramètre GET
    *   
    **/
    publics.GetParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

   
    /**
    *
    *   Méthode commune de log
    *   
    **/
    publics.ConsoleLog = function (o) {
        if (typeof(GlobalJsVar) != "undefined" && GlobalJsVar.IsDebugMode) {
            console.log(o);
        }
    };

	publics.ConsoleTime = function (label) {
		if (typeof (GlobalJsVar) != "undefined" && GlobalJsVar.IsDebugMode) {
			console.log("Start - " + label + " ----- ");
			console.time("End - " + label);
		}
	};

	publics.ConsoleTimeEnd = function (label) {
		if (typeof (GlobalJsVar) != "undefined" && GlobalJsVar.IsDebugMode) {
			console.timeEnd("End - " + label);
		}
	};

    /**
    *
    *   Test if a list contain an object
    *   
    **/
    publics.ContainsObject = function (obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] !== undefined) {
                if (list[i] === obj) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
    *
    *   Test if a list contain an object with a test of a property value
    *   
    **/
    publics.ContainsObject = function (property, value, list) {
        var isContain = false;
        _.forEach(list, function (element) {
            if (element !== undefined) {
                if (element.hasOwnProperty(property) && element[property] === value) {
                    isContain = true;
                }
            }
        });
        return isContain;
    };

    /**
    *
    *   Submit form to Fnac
    *   Parameters:
    *       - fnacReference: product reference
    *       - fnacUrl: Fnac url
    *       - formId: form id (optional)
    *   
    **/
    publics.GoToFnac = function (fnacReference, fnacUrl, formId){
        var form = privates.createCustomForm(fnacReference, fnacUrl, formId);

        var res = false;
        var codMan = form.find("input[name='CODMAN']").val();

        try {
            var context = new Object();
            context.call = form;

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'ajax/GetInfosFnac.aspx',
                data: 'codeMan=' + codMan,
                context: context,
                async: false,
                success: function (dataJSON) {

                    form.find("input[name='Token']").val(dataJSON.t);
                    form.find("input[name='UUID']").val(dataJSON.u);
                    form.find("input[name='SIGNATURE']").val(dataJSON.s);
                    form.find("input[name='URL']").val(dataJSON.w);
                    res = true;

                    $(form).submit();
                },
                error: function () {
                    console.log("erreur");
                }
            });
        } catch (e) {
            console.log("erreur" + e);
        }

        return res;
    }

    /**
    *
    *   Create custom form to submit
    *   
    **/
    privates.createCustomForm = function (fnacReference, fnacUrl, formId) {
        var formId = formId || 'customForm';
        $('body').append('<form id="' + formId + '"></form>');
        var form = $('#' + formId + '');

        $('<input>').attr({
            type: 'hidden',
            name: 'Token',
            value: ''
        }).appendTo('#' + formId + '');

        $('<input>').attr({
            type: 'hidden',
            name: 'UUID',
            value: ''
        }).appendTo('#' + formId + '');

        $('<input>').attr({
            type: 'hidden',
            name: 'CODMAN',
            value: fnacReference
        }).appendTo('#' + formId + '');

        $('<input>').attr({
            type: 'hidden',
            name: 'URL',
            value: ''
        }).appendTo('#' + formId + '');

        $('<input>').attr({
            type: 'hidden',
            name: 'SIGNATURE',
            value: ''
        }).appendTo('#' + formId + '');

        form.attr('action', fnacUrl);
        form.attr('method', 'post');

        return form;
    }

    /**
    *
    *  Constructeur de la classe SRP
    *
    **/
    publics.init = function () {};

}(SRP));

/* Add on JQUERY For getting if object is in view */
jQuery.extend(jQuery.expr[':'], {
    inview: function (elem) {
        var t = $(elem);
        var offset = t.offset();
        var win = $(window);
        var winST = win.scrollTop();
        var elHeight = t.outerHeight(true);

		if (offset.top > winST && offset.top + elHeight < winST + win.height()) {
            return true;
        }
        return false;
    }
});
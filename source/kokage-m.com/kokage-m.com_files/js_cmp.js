/*!
 *
 * jQuery Form Plugin
 * version: 3.35.0-2013.05.23
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */
;(function($) {
"use strict";

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

var hasProp = !!$.fn.prop;

// attr2 uses prop when it can but checks the return type for
// an expected string.  this accounts for the case where a form 
// contains inputs with names like "action" or "method"; in those
// cases "prop" returns the element
$.fn.attr2 = function() {
    if ( ! hasProp )
        return this.attr.apply(this, arguments);
    var val = this.prop.apply(this, arguments);
    if ( ( val && val.jquery ) || typeof val === 'string' )
        return val;
    return this.attr.apply(this, arguments);
};

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }

    method = options.type || this.attr2('method');
    action = options.url  || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || 'GET',
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || this ;    // jQuery 1.4+ supports scope context
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    if (options.error) {
        var oldError = options.error;
        options.error = function(xhr, status, error) {
            var context = options.context || this;
            oldError.apply(context, [xhr, status, error, $form]);
        };
    }

     if (options.complete) {
        var oldComplete = options.complete;
        options.complete = function(xhr, status) {
            var context = options.context || this;
            oldComplete.apply(context, [xhr, status, $form]);
        };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled[value!=""]', this);

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                jqxhr = fileUploadIframe(a);
            });
        }
        else {
            jqxhr = fileUploadIframe(a);
        }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        jqxhr = fileUploadXhr(a);
    }
    else {
        jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++)
        elements[k] = null;

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
        var serialized = $.param(extraData, options.traditional).split('&');
        var len = serialized.length;
        var result = [];
        var i, part;
        for (i=0; i < len; i++) {
            // #252; undo param space replacement
            serialized[i] = serialized[i].replace(/\+/g,' ');
            part = serialized[i].split('=');
            // #278; use array instead of object storage, favoring array serializations
            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
        }
        return result;
    }

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            var serializedData = deepSerialize(options.extraData);
            for (i=0; i < serializedData.length; i++)
                if (serializedData[i])
                    formdata.append(serializedData[i][0], serializedData[i][1]);
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: method || 'POST'
        });

        if (options.uploadProgress) {
            // workaround because jqXHR does not expose upload property
            s.xhr = function() {
                var xhr = jQuery.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position; /*event.position is deprecated*/
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        options.uploadProgress(event, position, total, percent);
                    }, false);
                }
                return xhr;
            };
        }

        s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function(xhr, o) {
                o.data = formdata;
                if(beforeSend)
                    beforeSend.call(this, xhr, o);
        };
        return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var deferred = $.Deferred();

        if (a) {
            // ensure that every serialized input is still enabled
            for (i=0; i < elements.length; i++) {
                el = $(elements[i]);
                if ( hasProp )
                    el.prop('disabled', false);
                else
                    el.removeAttr('disabled');
            }
        }

        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr2('name');
            if (!n)
                 $io.attr2('name', id);
            else
                id = n;
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;

                try { // #214, #257
                    if (io.contentWindow.document.execCommand) {
                        io.contentWindow.document.execCommand('Stop');
                    }
                }
                catch(ignore) {}

                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error)
                    s.error.call(s.context, xhr, e, status);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, e]);
                if (s.complete)
                    s.complete.call(s.context, xhr, e);
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            deferred.reject();
            return deferred;
        }
        if (xhr.aborted) {
            deferred.reject();
            return deferred;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }

        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;
                
        function getDoc(frame) {
            /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */
            
            var doc = null;
            
            // IE8 cascading access check
            try {
                if (frame.contentWindow) {
                    doc = frame.contentWindow.document;
                }
            } catch(err) {
                // IE8 access denied under ssl & missing protocol
                log('cannot get iframe.contentWindow document: ' + err);
            }

            if (doc) { // successful getting content
                return doc;
            }

            try { // simply checking may throw in ie8 under ssl or mismatched protocol
                doc = frame.contentDocument ? frame.contentDocument : frame.document;
            } catch(err) {
                // last attempt
                log('cannot get iframe.contentDocument: ' + err);
                doc = frame.document;
            }
            return doc;
        }

        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr2('target'), a = $form.attr2('action');

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }

            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized')
                        setTimeout(checkState,50);
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle)
                        clearTimeout(timeoutHandle);
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                           // if using the $.param format that allows for multiple values with the same name
                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                               extraInputs.push(
                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
                                   .appendTo(form)[0]);
                           } else {
                               extraInputs.push(
                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
                                   .appendTo(form)[0]);
                           }
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                    if (io.attachEvent)
                        io.attachEvent('onload', cb);
                    else
                        io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);

                try {
                    form.submit();
                } catch(err) {
                    // just in case form has element with name/id of 'submit'
                    var submitFn = document.createElement('form').submit;
                    submitFn.apply(form);
                }
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            
            doc = getDoc(io);
            if(!doc) {
                log('cannot access response document');
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                deferred.reject(xhr, 'timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                deferred.reject(xhr, 'error', 'server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut)
                    return;
            }
            if (io.detachEvent)
                io.detachEvent('onload', cb);
            else
                io.removeEventListener('load', cb, false);

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml)
                    s.dataType = 'xml';
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (err) {
                    status = 'parsererror';
                    xhr.error = errMsg = (err || status);
                }
            }
            catch (err) {
                log('error caught: ',err);
                status = 'error';
                xhr.error = errMsg = (err || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success)
                    s.success.call(s.context, data, 'success', xhr);
                deferred.resolve(xhr.responseText, 'success', xhr);
                if (g)
                    $.event.trigger("ajaxSuccess", [xhr, s]);
            }
            else if (status) {
                if (errMsg === undefined)
                    errMsg = xhr.statusText;
                if (s.error)
                    s.error.call(s.context, xhr, status, errMsg);
                deferred.reject(xhr, 'error', errMsg);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
            }

            if (g)
                $.event.trigger("ajaxComplete", [xhr, s]);

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete)
                s.complete.call(s.context, xhr, status);

            callbackProcessed = true;
            if (s.timeout)
                clearTimeout(timeoutHandle);

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget)
                    $io.remove();
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error)
                    $.error('parsererror');
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };

        return deferred;
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(this).ajaxSubmit(options);
    }
}

function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest('[type=submit]');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n || el.disabled) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements)
                elements.push(el);
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file') {
            if (elements)
                elements.push(el);
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements)
                elements.push(el);
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array)
            $.merge(val, v);
        else
            val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
		else if (t == "file") {
			if (/MSIE/.test(navigator.userAgent)) {
				$(this).replaceWith($(this).clone(true));
			} else {
				$(this).val('');
			}
		}
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) )
                this.value = '';
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug)
        return;
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

})(jQuery);

/* ==============================
 *
 * init
 *
 * ============================== */

/* ------------------------------
 * 
 * get uid 
 *
 * ----------------------------- */
var thisUrl = location.href;
var urlSplit = thisUrl.split("/");
var fromMng = thisUrl.match(/mng.at-ml.jp/);
//var isUniqDomain = urlSplit[2].match(/.*[^(at\-ml\.jp)|^(just\.st)]$/);

/*
if( fromMng )
{
	var urlSplitQue = thisUrl.split('?')
	var urlSplitQueSplit = urlSplitQue[1].split('/')
	var uid = urlSplitQueSplit[3]
}
else
{
	var uid = urlSplit[3];
}
*/
var uid = document.getElementsByName('c2userid')[0].getAttribute('content');


/* ------------------------------
 * 
 * set DBG
 *
 * ----------------------------- */
if( urlSplit[2].match(/^test/) ) {
	D_SYSTEM_DBG = true;
} else {
	D_SYSTEM_DBG = false;
}

/* ------------------------------
 * 
 * sp flag
 *
 * ----------------------------- */
/*
jQuery(document).ready(function($) {
	var c2SpFlag = jQuery('input[name="c2SpFlag"]').val();
})
*/

/* ------------------------------
 * 
 * set ajaxUrl
 * set reverseProxy from mng
 *
 * ----------------------------- */

if( D_SYSTEM_DBG )
{

	if( fromMng ) {
		D_PROXY_PREFIX = '/testHpJust';
		var D_PROXY_HPADMIN_PREFIX = '';
		var D_PROXY_CONTROLLERADMIN_PREFIX = '/testHpAdmin/controlIndex.php';
	} else {
		var D_PROXY_PREFIX = '';
		var D_PROXY_HPADMIN_PREFIX = '';
		var D_PROXY_CONTROLLERADMIN_PREFIX = '/controllerAdmin.php';
	}
}
else
{
	if( fromMng ) {
		D_PROXY_PREFIX = '/hp';
		var D_PROXY_HPADMIN_PREFIX = '';
		var D_PROXY_CONTROLLERADMIN_PREFIX = '/hpAdmin/controlIndex.php';
	} else {
		var D_PROXY_PREFIX = '';
		var D_PROXY_HPADMIN_PREFIX = '';
		var D_PROXY_CONTROLLERADMIN_PREFIX = '/controllerAdmin.php';
	}
}

if( fromMng ) {

	if( D_SYSTEM_DBG ) {
		D_PROXY_PREFIX = '/testHpJust';
	} else {
		D_PROXY_PREFIX = '/hp';
	}
}

/* -----------------------------------
 * loader
 * ----------------------------------- */
function showIndicator( pan )
{
	var $j= jQuery.noConflict();

	$j('#' + pan ).css('position','relative');
	$j('#' + pan ).prepend('<img id="c2ajaxLoaderImgAb" src="https://www.at-ml.jp/mh/wp-content/plugins/c2wp_ajaxitem/ajax-loader.gif">');
}

function showIndicator2( target )
{
	var $j= jQuery.noConflict();

	$j( target ).css('position','relative');
	$j( target ).prepend('<img id="c2ajaxLoaderImgAb" src="https://www.at-ml.jp/mh/wp-content/plugins/c2wp_ajaxitem/ajax-loader.gif">');
}

/* -----------------------------------
 * animate window scroll
 * ----------------------------------- */
function scrolltoThisInfo(pan, mode, callback)
{
	var $j= jQuery.noConflict();
	panPos = $j('#' + pan).offset().top - 50;
	if(mode=='animate'){
		$j('html,body').animate({scrollTop:panPos},500,callback);
	}else {
		$j(window).scrollTop(panPos);
	}
}


/* -----------------------------------
 * test or relase
 * ----------------------------------- */
if( D_SYSTEM_DBG ){
	jQuery(document).ready(function($) {
		$('body').append('<div id="debugFlag">testwp</div>');

		jQuery('#debugFlag').on('click', function(){
			$(this).fadeOut();
		});

	});
}


// GET引数の値を取得する関数
// usage
// getUrlVars()['name']		// nameという引数を取得
// 同一キー名の値が渡された場合は、前者を優先するように改修
// 例： ?lang=en&lang=zhの場合は、PHPの内部的には en が優先されるべきなのだが、
// このロジックでは zh が優先されるので対応
function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		if( !vars[hash[0]] ) {
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
	}
	return vars;
}

jQuery(document).ready(function($){
	
	var $j= jQuery.noConflict();
	
	if($j('.updateTimeItem').length > 0)
	{

		if( fromMng ) {
			if( D_SYSTEM_DBG ) {
				ajaxPrefix = '/testHpAdmin/controlIndex.php'
			} else {
				ajaxPrefix = '/hpAdmin/controlIndex.php'
			}
		} else {
			ajaxPrefix = '/controllerAdmin.php';
		}
		
		$j('.updateTimeItem').each(function(){

			pan = $j(this).attr('id');
			ajaxUrl = ajaxPrefix + '?com=rpc_getConversionItem&in=' + uid + '&pan=' + pan,
			
			//$j('.updateTimeItem').activity();
			
			//ajax
			$j.ajax({
				type: 'GET',
				context: this,
				url: ajaxUrl,
				success: function( data )
				{

					$j(this).html(data);
					//$j('.updateTimeItem').activity(false);
				},
				error: function() {
					$j(this).html('通信エラーです。');
					//$j('.updateTimeItem').activity(false);
				}
			});
		});
	}
});

/*
jQuery.jPrintArea=function(el){
	
	var iframe=document.createElement('IFRAME');
	var doc=null;
	var printHead=jQuery(".c2_siteTitle").html()+'<p style="margin-top:5px">�N�[�|��</p>';

	jQuery(iframe).attr('style','position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
	document.body.appendChild(iframe);
	doc=iframe.contentWindow.document;
	var links=window.document.getElementsByTagName('link');
	for(var i=0;i<links.length;i++)
		if(links[i].rel.toLowerCase()=='stylesheet')
			doc.write('<link type="text/css" rel="stylesheet" href="'+links[i].href+'"></link>');
	doc.write(printHead+'<div class="'+jQuery(el).attr("class")+'">'+jQuery(el).html()+'</div>');
	doc.close();
	iframe.contentWindow.focus();
	iframe.contentWindow.print();
	document.body.removeChild(iframe);
}
*/

jQuery(document).ready(function($){

	var $j= jQuery.noConflict();
	
	if($j('.planItem').length > 0)
	{

		$j('.planItem').each(function(){

			pan = $j(this).attr('id');
				
			$j.ajaxSetup({
					cache: false
			});
			//first load
			$j.ajax({
				type: 'GET',
				url: D_PROXY_PREFIX + '/?tn=schedule&in=' + uid + '&pan=' + pan + '&pc=off&wpConversion=&noHeader=1',	
				context: this,
				success: function( data )
				{
					$j(this).html(data);
					$j(this).find('a').addClass('ajax');
					// 2016/11/29 yu_ito No0643
					// 2017/02/20 yu_ito No0886
						//$('.scheduleDetail').find('a').removeClass('ajax');
						$('.scheduleDetail a').not('.detailLink').removeClass('ajax');
				},
				error: function() {
					$j(this).html('通信エラーです');
				}
			});
		});		
		
		//after load
		$j('.planItem a.ajax').live('click',function()
		{
			pan = $j(this).parents('.planItem').attr('id');

			ajaxUrl = $j(this).attr('href');

			showIndicator(pan);

			if (ajaxUrl.match(/^http/)) {
				return true;
			} 

			ajaxUrl = '/' + ajaxUrl + '&noHeader=1';


			$j(this).attr('href','javascript:void(0)');
			$j.ajaxSetup({
					cache: false
			});
			$j.ajax({
				type: 'GET',
				url: ajaxUrl,
				context:this,		
				success: function( data )
				{			
					$j( '#' + pan ).html(data);
					$j( '#' + pan ).find('a').addClass('ajax');
					// 2016/11/29 yu_ito No0643
					// 2017/02/20 yu_ito No0886
						//$('.scheduleDetail').find('a').removeClass('ajax');
						$('.scheduleDetail a').not('.detailLink').removeClass('ajax');
				},
				error: function() {
					$j(this).html('通信エラーです');
				},
        complete: function()
				{
					$j('#' + pan).css('position','static');
				}
			});
		});
		
	}	


});

jQuery(document).ready(function($){
	
	var $j= jQuery.noConflict();
	
	if( $j('.mailLogItem').length )
	{
		
		pan = $j('.mailLogItem').attr('id');
		
		//first load
		$j.ajax({
			type: 'GET',
			url: D_PROXY_PREFIX + '/?tn=maillog&in=' + uid + '&pan=' + pan + '&pc=off&wpConversion=&noHeader=1',	
			success: function( data )
			{
				$j('.mailLogItem').html(data);
				
				$j('.mailLogItem').find('a').addClass('ajax');
				$j('.mailLogItem form').append('<input type="button" class="ajaxSubmit" style="display:none;">');
				$j('.mailLogItem form').append('<input type="hidden" name="noHeader" value="1">');
			},
			error: function() {
				$j(this).html('通信エラーです');
			}
		});


		//after load
		//link
		$j('.mailLogItem .ajax').live('click' , function()
		{
			
			thisAjaxUrl = $j(this).attr('href');
			
			if( thisAjaxUrl.match('/mailto/') ) {
				return false;
			}
			
			pan = $j(this).parents('.mailLogItem').attr('id');
			
			showIndicator(pan)
			
			if( thisAjaxUrl.match(/http/) )
			{
				urlSplit = thisAjaxUrl.split("/");
				ajaxUrlTmp = urlSplit[3];
				ajaxUrl = '/' + ajaxUrlTmp;
			}
			else
			{
				ajaxUrl = '/' + thisAjaxUrl;
			}

			ajaxUrl = ajaxUrl + '&noHeader=1';
			
			$j(this).attr('href','javascript:void(0)');

		
			$j.ajax({
				type: 'GET',
				url: ajaxUrl + '&noHeader=1',			
				success: function( data )
				{			
					$j('.mailLogItem').html(data);
					//$j('.mailLogItem').activity(false);
				  $j('.mailLogItem').find('a').addClass('ajax');
					$j('.mailLogItem form').append('<input type="button" class="ajaxSubmit" style="display:none;">');
					$j('.mailLogItem form').append('<input type="hidden" name="noHeader" value="1">');
				},
				error: function() {
					$j(this).html('通信エラーです');
					//$j('.mailLogItem').activity(false);
				}
			});
		});
		
		
		//after load
		//submit		
		$j('.mailLogItem input[type="submit"]').live('click' , function(){
			$j('.mailLogItem .ajaxSubmit').click();
			return false;
		});
		
		$j('.mailLogItem .ajaxSubmit').live('click' , function(){
			
			//$j('.mailLogItem').activity();		
			pan = $j(this).parents('.mailLogItem').attr('id');
			showIndicator(pan)

			var form = $j('.mailLogItem form');
			form.attr('action','/maillog.php');
			var pd = form.serialize();

			$j.ajax({
				type: 'POST',
				url: '/maillog.php',
				data: pd,
				success: function( data )
				{			
					$j('.mailLogItem').html(data);
					//$j('.mailLogItem').activity(false);
				  $j('.mailLogItem').find('a').addClass('ajax');
					$j('.mailLogItem form').append('<input type="button" class="ajaxSubmit" style="display:none;">');
					$j('.mailLogItem form').append('<input type="hidden" name="noHeader" value="1">');
				},
				error: function() {
					$j(this).html('通信エラーです');
					//$j('.mailLogItem').activity(false);
				}
			});
		});

	}

});

jQuery(document).ready(function($){
	
	var $j= jQuery.noConflict();
	var c2SpFlag = $j('input[name="c2SpFlag"]').val();
	

	if($j('.mailItem').length > 0 )
	{

		$j('.mailItem').each(function()
		{
			pan = $j(this).attr('id');

			//$j('.mailItem').activity();
			//first load
			$j.ajax({
				type: 'GET',
				context: this,
				url: D_PROXY_PREFIX + '/indexNew.php?com=mail_qrcode&in=' + uid + '&pan=' + pan + '&hpid=1&noHeader=1&c2SpFlag=' + c2SpFlag,	
				success: function( data )
				{
					$j(this).html(data);
					//$j('.mailItem').activity(false);
					$j(this).find('a').addClass('ajax');
				},

				error: function() {
					$j(this).html('通信エラーです');
					//$j('.mailItem').activity(false);
				}
			});
		});
	}		
});

jQuery(document).ready(function($){
	
	var $j= jQuery.noConflict();
	var c2SpFlag = $j('input[name="c2SpFlag"]').val();
	
	if($j('.cubeMailItem').length > 0 )
	{
		
		pan = $j('.cubeMailItem').attr('id');

		//first load
		$j.ajax({
			type: 'GET',
			url: D_PROXY_PREFIX + '/indexNew.php?com=mail_qrcodeCube&in=' + uid + '&pan=' + pan + '&hpid=1&noHeader=1&c2SpFlag=' + c2SpFlag,
			success: function( data )
			{
				$j('.cubeMailItem').html(data);
				//$j('.cubeMailItem').activity(false);
				$j('.cubeMailItem').find('a').addClass('ajax');
			},

			error: function() {
				$j(this).html('通信エラーです');
				//$j('.cubeMailItem').activity(false);
			}
		});

	}		
});

jQuery(document).ready(function($)
{

	var $j= jQuery.noConflict();
	
	if($j('.newsBoardItem').length > 0)
	{
		$j('.newsBoardItem').each(function(){

			pan = $j(this).attr('id');
			
			//first load
			$j.ajax({
				type: 'GET',
				url: D_PROXY_PREFIX + '/?tn=info&in=' + uid + '&pan=' + pan + '&pc=off&wpConversion=&noHeader=1',	
				context: this,
				success: function( data )
				{

					$j(this).html(data);
					$j(this).find('a').addClass('ajax');

					// 2016/09/05 yu_ito No0491 target_self
					$j(this).find("[target = '_self']").removeClass('ajax');

					if( $j(this).find('input[name="authpass"]').length > 0 )
					{
						$j(this).find('hr').remove();
						$j(this).prepend('<div>お知らせ板</div><hr style="display: block;margin: 10px 0;">');
						$j(this).find('input[name="authpass"]').attr("maxlength", 4);
					}

					var foldFlag = $j(this).find('input[name="fold"]').val();
					if( foldFlag == 'off' ) {
						$j(this).find('.infoArticle').each(function()
						{
							$j(this).css('display', 'block');
						});
					} else {

						//more link
						num = 1;
						$j(this).find('.infoArticle').each(function()
						{
							if( num != 1 )
							{
								$j(this).addClass('control');
							}
							num ++;
						});
				
						//for mngPreview
						//cannot control from mng due to iframe
						
						if ( thisUrl.match(/mng.at-ml.jp/) )
						{
							var moreStr = '';
						}
						else
						{
							var moreStr = 'もっと見る';
						}

						$j(this).find('.control').wrapAll('<div class="controlWrap" style="display:none;"></div>');
						$j(this).find('.controlWrap').after('<div class="more"><a href="javascript:void(0)" class="moreLinkInfo" return false;>' + moreStr + '</a></div>');
					}
			
				},
				error: function() {
					$j(this).html('通信エラーです');
				}
			});
		});
		
		
		//after load
		$j('.newsBoardItem a.ajax').live('click',function()
		{
			
			pan = $j(this).parents('.newsBoardItem').attr('id');
			thisAjaxUrl = $j(this).attr('href');

			if ( !thisAjaxUrl.match(/wp.at-ml.jp/) && !thisAjaxUrl.match(/noHeader/) )
			{
				window.open( thisAjaxUrl );
				return false;
			}
			else if( thisAjaxUrl.match(/com=rss/) || thisAjaxUrl.match(/ecreal/) )
			{
				window.open( thisAjaxUrl );
				return false;
			}
			else
			{
				ajaxUrl = D_PROXY_PREFIX + '/' + thisAjaxUrl + '&pc=off';
			}
			
			$j(this).attr('href','javascript:void(0)');

			showIndicator(pan);

			$j.ajaxSetup({
					cache: false
			});
			$j.ajax({
				type: 'GET',
				url: ajaxUrl,
				dataType : 'html',
				context: this,		
				success: function( data )
				{			
					$j('#' + pan).html(data);
					$j('#' + pan).find('a').addClass('ajax');
					
					// 2016/09/05 yu_ito No0491 target_self
					$('.newsBoardItem').find("[target = '_self']").removeClass('ajax');
					
					var foldFlag = $j('#' + pan).find('input[name="fold"]').val();
					if( foldFlag == 'off' ) {
						$j('#' + pan).find('.infoArticle').each(function()
						{
							$j(this).css('display', 'block');
						});
					} else {

						//more link
						num2 = 1;
						$j('#' + pan).find('.infoArticle').each(function(){
							if( num2 != 1 )
							{
								$j(this).addClass('control');
							}
							num2 ++;
						});

						$j('#' + pan).find('.control').wrapAll('<div class="controlWrap" style="display:none;"></div>');
						$j('#' + pan).find('.controlWrap').after('<div class="more"><a href="javascript:void(0)" class="moreLinkInfo" return false;>もっと見る</a></div>');

						scrolltoThisInfo(pan, false, false);
					}
		
				},
				error: function() {
					$j(this).html('通信エラーです');
				},
				complete: function()
				{
					$j('#' + pan).css('position','static');
				}
			});
		});
		
		//after load
		//authpass submit action 
		$j('.newsBoardItem input[type="submit"]').live('click' , function()
		{
			if( $j(this).parents('.newsBoardItem').find('input[name="authpass"]').length > 0 && $j(this).parents('.newsBoardItem').find('input[name="authpass"]').val() == '' )
			{
				alert("パスワードを入力してください");
				return false;
			}

			if( confirm("送信しますか？") )
			{
				pan = $j(this).parents('.newsBoardItem').attr('id');
				sk = $j(this).parents('.newsBoardItem').find('input[name="sk"]').val();
				t = $j(this).parents('.newsBoardItem').find('input[name="t"]').val();
				authpass = $j(this).parents('.newsBoardItem').find('input[name="authpass"]').val();

				$j.ajaxSetup({
						cache: false
				});

				$j.ajax({
					type: 'POST',
					url: D_PROXY_PREFIX + '/?tn=info&in=' + uid + '&pan=' + pan + '&sk=' + sk + '&t=' + t + '&authpass=' + authpass + '&pc=off&noHeader=1',	
					context: this,
					success: function( data )
					{
						$j(this).parents('.newsBoardItem').html(data).find('a').addClass('ajax');

					  // 2016/09/05 yu_ito No0491 target_self
						$('.newsBoardItem').find("[target = '_self']").removeClass('ajax');

						var foldFlag = $j('#' + pan).find('input[name="fold"]').val();
						if( foldFlag == 'off' ) {
							$j('#' + pan).find('.infoArticle').each(function()
							{
								$j(this).css('display', 'block');
							});
						} else {
							//more link
							num = 1;

							// 2017/02/20 ishiyama_a No0758
							// $j(this).find('.infoArticle').each(function()
							$( '.newsBoardItem' + '#' + pan ).find( '.infoArticle' ).each( function()
							{
								if( num != 1 )
								{
									$j(this).addClass('control');
								}
								num ++;
							});
					
							$j('#' + pan).find('.control').wrapAll('<div class="controlWrap" style="display:none;"></div>');
							$j('#' + pan).find('.controlWrap').after('<div class="more"><a href="javascript:void(0)" class="moreLinkInfo" return false;>もっと見る</a></div>');			
						}
				
					},
					error: function() {
						$j(this).html('通信エラーです');
					}

				}); //end ajax
		
			} // end if

			return false;
		});

	
		$j('.moreLinkInfo').live('click',function()
		{
			pan = $j(this).parents('.newsBoardItem').attr('id');
			
			$j('#' + pan).find('.infoArticle').css('display','block');
			$j('#' + pan).find('.controlWrap').show('normal');

			$j(this).addClass('closeLinkInfo').removeClass('moreLinkInfo').text('折りたたむ');
		});
		
		$j('.closeLinkInfo').live('click',function()
		{
			pan = $j(this).parents('.newsBoardItem').attr('id');
			scrolltoThisInfo(pan, 'animate', function()
			{
				$j('#' + pan).find('.controlWrap').hide('normal');
			});
			$j(this).addClass('moreLinkInfo').removeClass('closeLinkInfo').text('もっと見る');
		});
	}


});

jQuery(document).ready(function($){
	
	var $j= jQuery.noConflict();
	
	if ( $j('.newQuestionnaireItem').length > 0 )
	{

		$j('.newQuestionnaireItem').each(function()
		{

			pan = $j(this).attr('id');

			//get font color
			fontColor = $j(this).attr('color');
			if (typeof fontColor === "undefined") {
				fontColor = false;
			}

			$j.ajaxSetup({
					cache: false
			});
			//load
			$j.ajax({
				type: 'GET',
				context: this,
				url: D_PROXY_PREFIX + '/?tn=enquetematerial&in=' + uid + '&pan=' + pan + '&pc=off&noHeader=1',
				success: function( data )
				{
					$j(this).html(data);
					$j(this).find('form').append('<input type="button" class="ajaxSubmit" style="display:none;">').append('<input type="hidden" name="noHeader" value="1">');

					$j(this).find('a').each(function()
					{
						if( typeof $j(this).attr('href') != "undefined" && $j(this).attr('href').match(/https/) )
						{
							$j(this).remove();
						}
					});

					//apply font color
					applyFontColor( pan , fontColor );

				},
				error: function() {
					$j(this).html('通信エラーです');
				}
			}); // end ajax

		}); //end each


		//after load
		//link
		$j('.newQuestionnaireItem a').live('click' , function()
		{
			pan = $j(this).parents('.newQuestionnaireItem').attr('id');
			fontColor = $j(this).parents('.newQuestionnaireItem').attr('color');
			thisUrl = D_PROXY_PREFIX + '/' + $j(this).attr('href') + '&noHeader=1';

			showIndicator( pan );

			$j(this).attr('href','javascript:void(0)');

			$j.ajax({
				type: 'GET',
				url: thisUrl,
				context: this,
				success: function( data )
				{			
					$j('#' + pan).html(data);

					//@sakai_m 2016/02/25追加
					$j('#' + pan).find('form').append('<input type="button" class="ajaxSubmit" style="display:none;">').append('<input type="hidden" name="noHeader" value="1">');
					applyFontColor( pan , fontColor );
				},
				error: function() {
					$j('#' + pan).html('通信エラーです');
				},
				complete: function()
				{
					$j('#' + pan).css('position','static');
				}
			});
		});
		
		//$j('.newQuestionnaireItem .ajaxSubmit').live('click' , function()
		$j('.newQuestionnaireItem input[type="submit"]').live('click' , function()
		{

			pan = $j(this).parents('.newQuestionnaireItem').attr('id');
			fontColor = $j(this).parents('.newQuestionnaireItem').attr('color');
			showIndicator( pan );

			var form = $j(this).parents('.newQuestionnaireItem').find('form');
			form.attr('action','/?tn=enquetematerial.php');

			// 2014/12/29 matsuoka 戻る、送信を押した時にPOSTで送信したい値を追加
			//add self value
			var thisName=$j(this).attr('name');
			var thisValue=$j(this).attr('value');
			form.append('<input type="hidden" name="' + thisName + '" value="' + thisValue + '" />');

			var pd = form.serialize();

			$j.ajaxSetup({
					cache: false
			});

			/* 2018/02/05 ishiyama_a No1280 */
			var emUrl;
			if( navigator.userAgent.indexOf( 'Android' ) > 0 && parseFloat( navigator.userAgent.slice( navigator.userAgent.indexOf( 'Android' ) + 8 )) < 5 ){
				emUrl = '/?tn=enquetematerial.php';
			}else{
				var userFqdn = $( 'input:hidden[name="userFqdn"]' ).val();
				emUrl = 'https://' + userFqdn + '/?tn=enquetematerial.php';
			}

			$j.ajax({
				type: 'POST',
				/* 2018/02/05 ishiyama_a No1280 */
				// url: '/?tn=enquetematerial.php',
				//url: '/hp/index.php?guid=on',
				url: emUrl,
				data: pd,
				context: this,
				success: function( data )
				{			
					$j('#' + pan).html(data);
					$j('#' + pan).find('form').append('<input type="button" class="ajaxSubmit" style="display:none;">').append('<input type="hidden" name="noHeader" value="1">');
					applyFontColor(pan , fontColor);
				},
				error: function() {
					$j('#' + pan).html('通信エラーです');
				},
				complete: function()
				{
					$j('#' + pan).css('position','static');
				}
			});


			return false;
		});



		// apply font color
		applyFontColor = function( pan , fontColor )
		{
			$j('#' + pan).find( 'span').css('color' , fontColor );
			$j('#' + pan).find( 'input').css('color' , fontColor );
			$j('#' + pan).find( 'select').css('color' , fontColor );
			$j('#' + pan).find( '.newQuestionnaireItemTitle').css('color' , fontColor );
			$j('#' + pan).find( '.enquetematerial').css('color' , fontColor );
		};
	};
});

jQuery(document).ready(function($){
	
	var $j= jQuery.noConflict();
		
	if( $j('.questionnaireItem').length > 0 ) 
	{
		
		$j('.questionnaireItem').each(function()
		{
			
			pan = $j(this).attr('id');
			
			$j('body').data('pan',pan);

			//becuase diff of RELESE and DBG
			if( D_SYSTEM_DBG ) {
				ajaxUrl =  D_PROXY_PREFIX + '/index.php?tn=enquete&in=' + uid + '&pan=' + pan + '&pc=off&noHeader=1';
			} else {
				ajaxUrl =  D_PROXY_PREFIX + '/enquete.php?in=' + uid + '&pan=' + pan + '&pc=off&noHeader=1';
			}
			
			//load board
			$j.ajax({
				type: 'POST',
				url: ajaxUrl,
				cache: false,
				context: this,
				success: function( data )
				{
					$j(this).html(data);
					
					// more link
					spanNum = $j(this).find('.questionnaireItemResult').find('span').length;
					if( spanNum > 3 )
					{
						cnt = 0;
						$j(this).find('.questionnaireItemResult span').each(function() {
							if( cnt < 4 )
							{
								$j(this).css('display','block');
							}
							else
							{
								$j(this).addClass('control');
							}

							cnt++;
							
							if( spanNum  == cnt )
							{
								$j(this).parent('.questionnaireItemResult').append('<div class="more"><a href="javascript:void(0)" class="moreLinkQue" return false;>すべて表示</a></div>');
							}
						});
						
						$j(this).find('.control').wrapAll('<div class="questionControl" style="display:none;"></div>');
						
					}
	
					// 2016/04/19 abe_shiori No0196
					//$j(this).find('form').append('<input type="button" class="ajaxSubmit" style="display:none;">');
					// 2016/10/24 sato_hironori No0579 投票と承認で分ける
					//$j(this).find('form').append('<input type="button" class="ajaxSubmit c2hidden">');
					//$j(this).find('form').append('<input type="hidden" name="noHeader" value="1">');
					var submitButton = $j(this).find('form').find('input[type="submit"]');
					var submitClass = $j(submitButton).prop('class');
					if (submitClass == 'sbtn') {
						$j(this).find('form').append('<input type="button" class="ajaxSubmit c2hidden">');
						$j(this).find('form').append('<input type="hidden" name="noHeader" value="1">');
					} else if (submitClass == '') {
						$(submitButton).prop('class', 'passAuthSubmit');
					}
				},
				error: function() {
					$j(this).html('通信エラーです');
				}
			});
		});


		//after load
		//submit action
		$j('.questionnaireItem input[type="submit"]').live('click',function(){
			
			pan = $j(this).parents('.questionnaireItem').attr('id');
			
			$j('#' + pan).find('.ajaxSubmit').click();
			return false;
		});

		$j('.questionnaireItem .ajaxSubmit').live('click',function(){
			
			pan = $j(this).parents('.questionnaireItem').attr('id');

			showIndicator( pan );
				
			var form = $j('#' + pan + ' form');
			
			form.attr('action','/enquete.php');
			//form.attr('action','/hp/enquete.php');
			var pd = form.serialize();

			ajaxUrl = '/index.php?tn=enquete&in=' + uid + '&pan=' + pan + '&pc=off';

			$j.ajax({
				type: 'POST',
				url : ajaxUrl,
				//url: '/enquete.php',
				//url: '/hp/enquete.php',
				data: pd,	
				cache: false,
				context:this,
				success: function( data2 )
				{
					$j('#' + pan).html(data2);

					// 2016/04/19 abe_shiori No0196
					//$j('#' + pan).find('form').append('<input type="button" class="ajaxSubmit" style="display:none;">');
					$j('#' + pan).find('form').append('<input type="button" class="ajaxSubmit c2hidden">');

					$j('#' + pan).find('form').append('<input type="hidden" name="noHeader" value="1">');
					alert('投票が完了しました。');
					
					$j('#' + pan).find('.sbtn').css('display','none');
					$j('#' + pan).find('.sbtn').css('disabled','disabled');
					$j('#' + pan).find('.sbtn').after('<p style="color:red !important;">投票ありがとうございました</p>');
										
				},
				error: function() {
					$j(this).html('通信エラーです');
				}
			});
		});

		// 2016/10/24 sato_hironori No0579 承認用処理の追加
		$j('.questionnaireItem .passAuthSubmit').live('click',function(){
			var itemParent = $j(this).parents('.questionnaireItem');
			if( $j(itemParent).find('input[name="authpass"]').length > 0 && $j(itemParent).find('input[name="authpass"]').val() == '' ) {
				alert("パスワードを入力してください");
				return false;
			}

			if( confirm("送信しますか？") ) {
				pan = $j(itemParent).attr('id');
				sk = $j(itemParent).find('input[name="sk"]').val();
				t = $j(itemParent).find('input[name="t"]').val();
				authpass = $j(itemParent).find('input[name="authpass"]').val();

				$j.ajaxSetup({
						cache: false
				});

				$j.ajax({
					type: 'POST',
					url: D_PROXY_PREFIX + '/?tn=enquete&in=' + uid + '&pan=' + pan + '&sk=' + sk + '&t=' + t + '&authpass=' + authpass + '&pc=off&noHeader=1',	
					context: this,
					success: function( data ) {
						$j(itemParent).html(data);

						// more link
						spanNum = $j(itemParent).find('.questionnaireItemResult').find('span').length;
						if( spanNum > 3 ) {
							cnt = 0;
							$j(itemParent).find('.questionnaireItemResult span').each(function() {
								if( cnt < 4 ) {
									$j(itemParent).css('display','block');
								} else {
									$j(itemParent).addClass('control');
								}

								cnt++;

								if( spanNum  == cnt ) {
									$j(itemParent).find('.questionnaireItemResult').append('<div class="more"><a href="javascript:void(0)" class="moreLinkQue" return false;>すべて表示</a></div>');
								}
							});

							$j(itemParent).find('.control').wrapAll('<div class="questionControl" style="display:none;"></div>');
						}

						var submitButton = $j(itemParent).find('form').find('input[type="submit"]');
						var submitClass = $j(submitButton).prop('class');
						if (submitClass == 'sbtn') {
							$j(itemParent).find('form').append('<input type="button" class="ajaxSubmit c2hidden">');
							$j(itemParent).find('form').append('<input type="hidden" name="noHeader" value="1">');
						} else if (submitClass == '') {
							$(submitButton).prop('class', 'passAuthSubmit');
						}
	
					},
					error: function() {
						$j(this).html('通信エラーです');
					}

				}); //end ajax
		
			} // end if

			return false;

		});
		
		$j('.moreLinkQue').live('click',function(){
			pan = $j(this).parents('.questionnaireItem').attr('id');
			$j( '#' + pan ).find('.questionControl').show('normal');
			$j(this).text('非表示');
			$j(this).addClass('closeLinkQue').removeClass('moreLinkQue');
		});
		$j('.closeLinkQue').live('click',function(){
			pan = $j(this).parents('.questionnaireItem').attr('id');
			$j( '#' + pan ).find('.questionControl').hide('normal');
			$j(this).text('すべて見る');
			$j(this).addClass('moreLinkQue').removeClass('closeLinkQue');
		});
	}


});

jQuery(document).ready(function($){

	var $j= jQuery.noConflict();
	var ua = navigator.userAgent;
	var isIE8 = ua.match(/msie [8.]/i);
	var agent = navigator.userAgent;

		if ( $j('.domainInfoItem').length > 0 ) {

		$j('.domainInfoItem').each(function() {
			pan = $j(this).attr('id');
			homeUrl = D_PROXY_PREFIX + '/indexNew.php?com=dmnsetting_top&in=' + uid + '&pan=' + pan + '&hpid=1&noHeader=1';

			$j.ajaxSetup({
				cache: false
			});

			//first load
			$j.ajax({
				type: 'GET',
				context: this,
				url: homeUrl,
				//url: '/' + homeUrl,
				success: function( data ) {
					//remove tags
					if (!isIE8) {
						data = removeTags(data);
					}

					data = data.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>/gi, "");
					$j(this).html(data);

					$j(this).find('a').addClass('ajax');
					$j(this).find('a.ajax').each(function() {
						if ( $j(this).text().match(/戻る/) ) {
							$j(this).remove();
						}
					});

					replaceImg(pan);

				}, error: function() {
					$j('#' + pan).html('通信エラーです');
				}
			});
		});

		//after load
		$j('.domainInfoItem a').live('click',function() {
			// 2016/04/29 yu_ito No0217 message app link 
			if( $(this).hasClass('messageLink') ){
				window.open('sms:#5000');
				return false;
			}
			pan = $j(this).parents('.domainInfoItem').attr('id');
			ajaxUrl = $j(this).attr('href');
			ajaxUrlSplit = ajaxUrl.split("/");
			
			//2016/06/22　yu_ito No0341
			var href = window.location.href;
			if(  href.match(/\/[0-9]+\//) === null ){
				uid = $('meta[name=c2userid]').attr('content');
			}

			//add backUrl
			if( ajaxUrl.match(/dmnsetting_explain/) || ajaxUrl.match(/ezweb/) || ajaxUrl.match(/au/) || ajaxUrl.match(/career=android/) ) {
				addBack = true;
			} else {
				addBack = false;
			}

			if ( ajaxUrl.match(/support.google.com/) || ajaxUrl.match(/support.apple.com/) || ajaxUrl.match(/yahoo-help.jp/) || ajaxUrl.match(/mailSubscript_support/) ) {
				window.open(ajaxUrl);
				return false;
			} else if ( ajaxUrlSplit[2] && ( ajaxUrlSplit[2].match(/docomo/) || ajaxUrlSplit[2].match(/ezweb/) || ajaxUrlSplit[2].match(/au/) || ajaxUrlSplit[2].match(/softbank/) || ajaxUrlSplit[2].match(/spmode/) ) ) {
		// 2016/04/29 yu_ito No0217 
				/*
				if ( !agent.match(/Android/) && !agent.match(/iPhone/) && !agent.match(/iPad/) ) {
					alert('携帯からのみアクセスできます。');
					return false;
				} else {
				*/
					window.open(ajaxUrl);
					return false;
				//}

			} else if ( ajaxUrlSplit[3] && ( ajaxUrlSplit[3].match(/sms/) || ajaxUrl.match(/^sms/) || ajaxUrl.match(/^\#/) ) ) {
				if ( !agent.match(/iPhone/) && !agent.match(/iPad/) ) {
					return false;
				} else {
					return false;
				}
			} else if (ajaxUrl.match(/^#/)) {
				return false;
			}

			$j(this).attr('href','javascript:void(0)');

			showIndicator(pan);

			//scroll
			if ( true || agent.match(/Android/) || agent.match(/iPhone/) ) {
				targetOffset = $j('#' + pan).offset().top - 50;
				$('html,body').animate({scrollTop: targetOffset}, 750);
			}


			$j.ajax({
				type: 'GET',
				context: this,
				url: '/' + ajaxUrl + '&in=' + uid + '&pan=' + pan + '&hpid=1&noHeader=1',
				success: function( data ) {
					//remove tags
					if (!isIE8) {
						data = removeTags(data);
					}

					$j('#' + pan).html(data);

					$j('#' + pan).find('a').each(function() {
						if( typeof $j(this).attr('href') != 'undefined' ) {
							if( $j(this).attr('href').match(/top$/) ) {
								//replaceUrl = 'indexNew.php?com=dmnsetting_top&in=' + uid + '&pan=' + pan + '&hpid=1&noHeader=1';
								//$j(this).attr('href', replaceUrl);
							}
						}

						if ( $j(this).text().match(/戻る/) ) {
							$j(this).remove();
						}

					});

					replaceImg(pan);

					if(addBack == true) {
						backHomeUrl = 'indexNew.php?com=dmnsetting_top&in=' + uid + '&pan=' + pan + '&hpid=1&noHeader=1';
						$j('#' + pan).append('<a href="' + backHomeUrl + '" class="ajax">戻る</a>');
					}

				}, error: function() {
					$j(this).html('通信エラーです');
				}, complete: function() {
					$j('#' + pan).css('position','static');
					$j('#c2ajaxLoaderImgAb').remove();
				}
			});
		});

		function replaceImg(pan) {

			var newUrlHead = urlSplit[0] + '/' + urlSplit[1] + '/' + urlSplit[2] + '/';
			$j('.domainInfoItem').find('img').each(function(){
				imgUrl = $j(this).attr('src');
				if( !imgUrl.match(/http/) ) {
					newUrl = newUrlHead + $j(this).attr('src');
					$j(this).attr('src',newUrl);
				}

				if ( urlSplit[0] == "https:" )  {
					newUrl = $j(this).attr('src').replace( "http://", "https://" );
					$j(this).attr('src',newUrl);
				}

			});
		}

		function removeTags( data )
		{
			//remove script
			data = data.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>/gi, "");
			data = data.replace(/<link(?:[ \t\r\n][^>]*)?>[\S\s]*?>/gi, "");
			data = data.replace(/<meta(?:[ \t\r\n][^>]*)?>[\S\s]*?>/gi, "");
			data = data.replace(/<title(?:[ \t\r\n][^>]*)?>[\S\s]*?>/gi, "");
			return data;
		}

	}
});

jQuery(document).ready(function($){
	
	var $j= jQuery.noConflict();
	
	if( $j('.counterItem').length > 0 )
	{
		
		pan = $j('.counterItem').attr('id');
		if( fromMng ) {
			if( D_SYSTEM_DBG ) {
				ajaxPrefix = '/testHpAdmin/controlIndex.php'			
			} else {
				ajaxPrefix = '/hpAdmin/controlIndex.php'			
			}
		} else {
			ajaxPrefix = '/controllerAdmin.php';
		}
		
		ajaxUrl = ajaxPrefix + '?com=rpc_getConversionItem&in=' + uid + '&pan=' + pan;
		
		//ajax
		$j.ajax({
			type: 'GET',
			url: ajaxUrl,
			success: function( data )
			{
				counterItem = $j('.counterItem')
				counterItem.html(data);
				
				position = 	counterItem.find('hr').attr('align')
				counterItem.find('.count').css('text-align' , position)

				hr = counterItem.find('hr')

				//border
				hrSize = hr.attr('size')
				hrWidth = hr.attr('width')
				hrAlign = hr.attr('align')
				hrColor = hr.attr('color')

				if( typeof hrColor == 'undefined' )
				{
					hrColor = '#555'
				}

				hr.css({
					'border' : 'none',
					'border-top' : hrSize + 'px solid ' + hrColor,
					'width' : hrWidth
				})

				if( hrAlign == 'center' )
				{
					hr.css({
							'margin-left' : 'auto',
							'margin-right' : 'auto'
					})
				}
				else if ( hrAlign == 'right')
				{
					hr.css('float' , 'right')
				}


			},
			error: function() {
				$j(this).html('通信エラーです');
				$j('.counterItem').activity(false);
			}
		});
	}	
});

jQuery(document).ready(function($)
{

	var $j= jQuery.noConflict();

	if( $j('.bbsItem').length > 0 )
	{

		// 2017/09/11 inomata_s No1114-2 reCaptcha用の変数を定義
		var ReCaptchaLoaded = false;

		$j('.bbsItem').each(function()
		{
			pan = $j(this).attr('id');

			//load board
			$j.ajax({
				type: 'GET',
				url: D_PROXY_PREFIX + '/?tn=board&in=' + uid + '&pan=' + pan + '&pc=off&noHeader=1',	
				context: this,
				success: function( data )
				{
					if(data)
					{
						$j(this).html(data);

						if( $j(this).find('input[name="authpass"]').length > 0 )
						{
							$j(this).prepend('<div>掲示板</div><hr style="display: block;">');
							$j(this).find('input[name="authpass"]').attr("maxlength", 4);
						}
						//add more link
						initMore(this);

					}
					else
					{
						$j(this).html('<p style="color:red;">通信エラーです</p>');
					}

					$j('.bbsItem').find('a').addClass('ajax');

					// 2017/09/11 inomata_s No1114-2 reCaptcha用のscriptは1回だけ読み込むようにする
					if ( !ReCaptchaLoaded ) {
					 	$j('<script>').attr("src", "https://www.google.com/recaptcha/api.js?render=explicit").appendTo("head");
					 	ReCaptchaLoaded = true;
					}

				},
				error: function()
				{
					$j(this).html('通信エラーです');
				},
				complete: function()
				{
					$j('.more a').removeClass('ajax');
				}
			});
		});
		
		
		
		//after load
		$j('.bbsItem .ajax').live('click' , function()
		{

			ajaxUrl = D_PROXY_PREFIX + '/' + $j(this).attr('href');

			// 2017/11/24 yu_ito No1236
			var	parentBbs = $j(this).parents('.bbsItem');
			// 2015/11/17 abe_shiori 掲示板URLの動作がtestでのみ正しく動かない
			// ので運用から持ってきた。
			if ( !ajaxUrl.match(/mailto+/) && $(this).attr('target') != '_blank' )
			{
				pan = $j(this).parents('.bbsItem').attr('id');

				showIndicator( pan );

				$j(this).attr('href','javascript:void(0)');

				$j.ajaxSetup({
						cache: false,
				});

				$j.ajax({
					type: 'GET',
					url: ajaxUrl,
					context:this,		
					success: function( data )
					{			
						// 2017/09/14 sato_hironori No1114-2 reCaptcha 導入
						// $j( '#' + pan ).html(data);
						var htmlPart = $j( '#' + pan ).html(data);
						if( htmlPart.find( '.g-recaptcha' ).length > 0 )
						{
							var createReCaptcha = $j('.g-recaptcha', htmlPart);
							dataSiteKey =$j(createReCaptcha[0]).attr('data-sitekey');
							grecaptcha.render(createReCaptcha[0], {'sitekey' : dataSiteKey});
						}
						
						// 2017/09/20 inomata_s No1114-2 代入した変数を用いる
						// if( $j( '#' + pan ).find('form').length > 0 )
						// {
							// 2016/04/18 abe_shiori No0196
							//$j( '#' + pan ).find('form input[type="submit"]').after('<input type="submit" value="back" id="atmlBoardFormBack" style="margin-left:20px;">');
							//$j( '#' + pan ).find('form').append('<input type="button" class="ajaxSubmit ' + pan + '" style="display:none;">');
							// $j( '#' + pan ).find('form input[type="submit"]').after('<input type="submit" value="back" id="atmlBoardFormBack">');
							// $j( '#' + pan ).find('form').append('<input type="button" class="ajaxSubmit c2hidden ' + pan + '" >');
							// $j( '#' + pan ).find('form').append('<input type="hidden" name="noHeader" value="1">');
						// }
						// $j( '#' + pan ).find('a').addClass('ajax');*/
						 if( htmlPart.find('form').length > 0 )
						 {
							// 2018/02/15 taniguchi_k No1126 投稿ボタンと合わせて戻るに変更
							//htmlPart.find('form input[type="submit"]').after('<input type="submit" value="back" id="atmlBoardFormBack">');
							htmlPart.find('form input[type="submit"]').after('<input type="submit" value="戻る" id="atmlBoardFormBack">');
							htmlPart.find('form').append('<input type="button" class="ajaxSubmit c2hidden ' + pan + '" >');
							htmlPart.find('form').append('<input type="hidden" name="noHeader" value="1">');
						}
						htmlPart.find('a').addClass('ajax');

						// 2017/11/24 yu_ito No1236
						initMore($j(parentBbs));

					},
					error: function() {
						$j(this).html('通信エラーです');
					},
					complete: function()
					{
						$j('#' + pan).css('position','static');
					}
				});

			} // end if
		});



		//after load
		//submit action
		$j('.bbsItem input[type="submit"]:not(#atmlBoardFormBack)').live('click' , function()
		{
			if( $j('.bbsItem input[name="authpass"]').length > 0 && $j('.bbsItem input[name="authpass"]').val() == '' )
			{
				alert("パスワードを入力してください");
				return false;
			}

			if( confirm("送信しますか？") )
			{
				pan = $j(this).parents('.bbsItem').attr('id');

				if( $j('input[name="authpass"]').length > 0 )
				{
					submitFunc( $j(this) );
				}
				else
				{
					$j('#' + pan).find('.ajaxSubmit').click();
				}
			}
			return false;
		});
		
		$j('.bbsItem .ajaxSubmit').live('click' , function()
		{
			submitFunc( $j(this) );
		});

		submitFunc = function( that )
		{

			pan = that.parents('.bbsItem').attr('id');
			parentBbs = that.parents('.bbsItem');

			showIndicator( pan );
				
			var form = $j('#' + pan + ' form');
			form.attr('action', D_PROXY_PREFIX + '/board.php');

			var options = {
				type: 'POST',
				// 2017/01/11 yu_ito No0748
				//url: D_PROXY_PREFIX + '/board.php',
				url: D_PROXY_PREFIX + '/?tn=board&in=' + uid + '&pan=' + pan + '&pc=off&noHeader=1',	
				context: this,
				success: function( data )
				{
					// 2017/09/18 inomata_s No1114-2 reCaptcha用に変数に代入
					// $j( '#' + pan ).html(data);
					var htmlPart = $j( '#' + pan ).html(data);
					// 2017/09/20 inomata_s No1114-2 代入した変数を用いる
					// $j( '#' + pan ).find('a').addClass('ajax');
					// if( $j( '#' + pan ).find('form').length > 0 )
					htmlPart.find('a').addClass('ajax');
					if( htmlPart.find('form').length > 0 )
					{
						// 2017/09/18 inomata_s No1114-2 バリデートの際のreCaptchaの再表示
						if( htmlPart.find( '.g-recaptcha' ).length > 0 )
						{
							var createReCaptcha = $j('.g-recaptcha', htmlPart);
							dataSiteKey =$j(createReCaptcha[0]).attr('data-sitekey');
							grecaptcha.render(createReCaptcha[0], {'sitekey' : dataSiteKey});
						}
						// 2017/01/11 yu_ito No0748
						//$j( '#' + pan ).find('form input[type="submit"]').after('<input type="submit" value="back" id="atmlBoardFormBack" style="margin-left:20px !important;">');
						// 2017/09/20 inomata_s No1114-2 代入した変数を用いる
						// $j( '#' + pan ).find('form').append('<input type="button" class="ajaxSubmit ' + pan + '" style="display:none;">');
						// $j( '#' + pan ).find('form').append('<input type="hidden" name="noHeader" value="1">');
						htmlPart.find('form').append('<input type="button" class="ajaxSubmit ' + pan + '" style="display:none;">');
						htmlPart.find('form').append('<input type="hidden" name="noHeader" value="1">');
						
						// 2018/02/12 taniguchi_k No1126 バリデート後backも表示するために追加
						htmlPart.find('form input[type="submit"]').after('<input type="submit" value="戻る" id="atmlBoardFormBack">');
						htmlPart.find('form').append('<input type="button" class="ajaxSubmit c2hidden ' + pan + '" >');
						htmlPart.find('form').append('<input type="hidden" name="noHeader" value="1">');
					}
					
					//more link
					initMore(parentBbs);
				},
				error: function() {
					$j(this).html('通信エラーです');
				},
	      complete: function()
				{
					$j('#' + pan).css('position','static');
				}
			};

			//with plugin(to submit img
			form.ajaxSubmit(options);

		}; // end function
		
		//function
		function initMore( that )
		{
			bbsNum = $j(that).find('dl').length;

			if( bbsNum > 1 )
			{
				// 2017/11/24 yu_ito No1236 not first of each
				// $j(that).find('dl').each(function(){
					//if( !$j(this).hasClass('mustNew') )
				$j(that).find('dl').each(function(num){ 
					if(num !== 0 ) 
					{
						$j(this).addClass('controlDl');
					}
				});

				if ( thisUrl.match(/mng.at-ml.jp/) )
				{
					var moreStr = '';
				}
				else
				{
					var moreStr = 'もっと見る';
				}
				// 2016/12/26 hongo_r No0532 折りたたみ設定のstatusを取得しそれに応じて表示を変える
				var collapsedDisplayStatus = $j(that).find('input[name="collapsedDisplay"]').val();

				if( collapsedDisplayStatus =='off' ){

					$j(that).find('dl.controlDl').wrapAll('<div class="bbsDlWrap" style="overflow: hidden;"></div>');
					$j(that).find('dl.controlDl').css('display','block');
					$j(that).find('.bbsDlWrap').after('<div class="more"><a href="javascript:void(0)" class="closeLinkBbs" return false;>最新のみ表示</a></div>');

				}else{
					$j(that).find('.controlDl').wrapAll('<div class="bbsDlWrap" style="display: none;"></div>');
					$j(that).find('.bbsDlWrap').after('<div class="more"><a href="javascript:void(0)" class="moreLinkBbs" return false;>' + moreStr + '</a></div>');

				}
			}
		}
		
		
		$j('.moreLinkBbs').live('click' , function()
		{
			pan = $j(this).parents('.bbsItem').attr('id');
			
			$j('#' + pan).find('.controlDl').css('display','block');
			$j('#' + pan).find('.bbsDlWrap').show('normal');

			$j(this).addClass('closeLinkBbs').removeClass('moreLinkBbs').text('最新のみ表示');
		});
		
		$j('.closeLinkBbs').live('click' , function()
		{
			pan = $j(this).parents('.bbsItem').attr('id');
			scrolltoThisInfo(pan, 'animate', function()
			{
				$j('#' + pan).find('.bbsDlWrap').hide('normal');
			});
			$j(this).addClass('moreLinkBbs').removeClass('closeLinkBbs').text('もっと見る');
		});
	}


	//backsubmit
	$j('#atmlBoardFormBack').live('click' , function(e)
	{

		pan = $j(this).parents('.bbsItem').attr('id');

		showIndicator( pan );

		parentBbs = $j(this).parents('.bbsItem');


		$j.ajaxSetup({
				cache: false
		});

		$j.ajax({
			type: 'GET',
			url: D_PROXY_PREFIX + '/?tn=board&in=' + uid + '&pan=' + pan + '&pc=off&noHeader=1',
			context: this,
			success: function( data )
			{
				if(data)
				{
					$j(this).parents('.bbsItem').html(data);
				}
				else
				{
					 $j(this).parents('.bbsItem').html('<p style="color:red;">通信エラーです</p>');
				}

				$j('.bbsItem').find('a').addClass('ajax');
				initMore( parentBbs );
			},
			error: function()
			{
				$j(this).parents('.bbsItem').html('通信エラーです');
			},
			complete: function()
			{
				$j('.more a').removeClass('ajax');
				$j('#' + pan).css('position','static');
			}
		});

		return false;
	});

});

jQuery(document).ready(function($)
{
	var $j= jQuery.noConflict();
	var c2SpFlag = $j('input[name="c2SpFlag"]').val();

	if( $j('.couponItem').length > 0 )
	{
		if(c2SpFlag)
		{
			  var now = new Date();
			  var y = now.getFullYear();
			  var m = now.getMonth() + 1;
			  var d = now.getDate();
			  var w = now.getDay();
			  var h = now.getHours();
			  var min = now.getMinutes();
			  
			  date = y + '/' + m + '/' + d + ' ' + h + ':' + min;
			  $j('.receiveTime').html( date );
		}
		else
		{
			getTime = jQuery.now();
			date = new Date( getTime ).toLocaleString();
			$j('.receiveTime').html( date );			
		}
	}
});

/*
 * c2.inc
 * couponItem
 * ----------------------------------- */


jQuery(document).ready(function($)
{

	var $j= jQuery.noConflict();
	var c2SpFlag = $j('input[name="c2SpFlag"]').val();

	var ua = navigator.userAgent;
	var isIE = ua.match(/trident/i);

	if( !$j.support.opacity ) {
	 var isIE8 = true;
	} else {
	 var isIE8 = false;
	}


	if( $j('.couponItem').length > 0)
	{
		$j('.couponItem').each(function()
		{
			loadItem( $j(this) );
		});

	} //end execute


	/*
	 * printOut 2016/03/01 tsukita_t
	 * ---------------------------------------------------- */
	$j('.couponPringButton').live('click' ,function()
			{

				var targetHeader = $('.c2_siteTitle').html();
				var targetBody = $('.hpItemWrapper').html();
				var targetHtml = '<div class="printTarget" style="display:none;">' + targetHeader + targetBody +'</div>';
				$('body').append(targetHtml);

				var style = '<style type="text/css" class="printStyle">';
				style += '@media print{';
					style += 'body > *{display:none;}';
					// 2016/12/01 yu_ito No0644
					style += '.imageItem img {display: block!important;}';
					style += '.printTarget{display:block !important;}';
					style += '}';
					style += '</style>';
					$('head').append( style );

				window.print();

				$('.printStyle').remove();
				$('.printTarget').remove();

			});

	/*
	 * function
	 * ------------------------ */

	function loadItem( that )
	{
		pan = that.attr('id');

		$j.ajaxSetup({
				cache: false
		});
		$j.ajax({
			type: 'GET',
			url: D_PROXY_CONTROLLERADMIN_PREFIX + '?com=rpc_getConversionItem&in=' + uid + '&pan=' + pan + '&c2SpFlag=' + c2SpFlag,
			context: that,
			success: function( data )
			{

				if(data)
				{
					that.html(data);
				}
				else
				{
					that.html('<p style="color:red;">通信エラーです</p>');
				}
			},
			error: function() {
				that.html('通信エラーです');
			}
		}); // end ajax

	} // end func

}); // end ready

jQuery(document).ready(function($)
{

		var $j= jQuery.noConflict();
		var c2SpFlag = $j('input[name="c2SpFlag"]').val();

		//isTablet
		var agent = navigator.userAgent;
		if( agent.match('/Mobile/i') || agent.match('iPad') )
		{
			c2TabletFlag = true
		}
		else
		{
			c2TabletFlag = false
		}

		windowH = $(window).height()


		/* ---------------------------
		 *
		 * return if old chirashi item
		 *
		 * --------------------------- */
		if( $j('.flyerViewerItem a').length > 0 )
		{

				$j('.flyerViewerItem a').attr('target','_blank');
				return false

		}


		/* ------------------------------
		 *
		 * get new chirashi item by ajax
		 *
		 * -----------------------------*/

		$j('.flyerViewerItem').each(function()
		{

			pan = $j(this).attr('id');

			$j.ajax({

					type: 'GET',
					url: D_PROXY_PREFIX + '/controllerAdmin.php?com=rpc_getConversionItem&in=' + uid + '&pan=' + pan + '&wpConversion=on&c2SpFlag=' + c2SpFlag + '&c2TabletFlag=' + c2TabletFlag,
					context: this,
					success: function( data )
					{

							if(data)
							{
								$j(this).html(data);

								if ( $j(this).find('iframe').length > 0 )
								{
									$j(this).find('iframe').css('height' , windowH + 'px')
								}

								$j(this).find('#pagenation').addClass('nextPage');

                var flyerVieweObj = $j(this);
                $j(document).ajaxStop(function() {
                  addClassToImg( flyerVieweObj )
                })
								
							}	
							else
							{
								$j(this).html('<p style="color:red;">通信に失敗しました。<br>時間を置いてからアクセスし直してください</p>');
							}

					},
					error: function(xhr, ajaxOptions, thrownError)
					{
								$j(this).html('<p style="color:red;">通信に失敗しました。<br>時間を置いてからアクセスし直してください</p>')
					}	

			}); // end ajax

		});

	/*  -----------------------------
	 *
	 *  chirashi pager
	 *
	 *  ---------------------------- */


		$j('.flyerViewerItem .nextPage a').live('click' , function()
		{
			flyerViewerItem = $j(this).parents('.flyerViewerItem');
			pan = flyerViewerItem.attr('id')

			thisUrl = $j(this).attr('href')

			$j('.flyerViewerItem[id="' + pan +'" ]').load(thisUrl,function()
			{
					addClassToImg( $j(this) )
					$j(this).find('#pagenation').addClass('nextPage');
					$j($j.browser.webkit ? 'body' : 'html').animate({ scrollTop: flyerViewerItem.offset().top })
			});
			
			return false;
		});



	/*  -----------------------------
	 *
	 *  chirashi thumbnail click moveto iframe
	 *
	 *  ---------------------------- */

	$j('.chirashiThumWp a').live('click' , function()
	{
		$j(this).parents('.flyerViewerItem').find('iframe').css('height' , $j(window).height() + 'px')
		$j($j.browser.webkit ? 'body' : 'html').animate({ scrollTop: $j(this).parents('.flyerViewerItem').find('.chirashiIframe').offset().top })
	})

	/*  -----------------------------
	 *
	 *  check thumbnail size
	 *	if vertical-long, add class to css
	 *
	 *  ---------------------------- */
	addClassToImg = function( chirashiArea )
	{
		chirashiArea.find('.chirashiThumWp img').each(function()
		{
			$j(this).load(function()
			{
				if( $j(this).height() > $j(this).width() )
				{
					$j(this).addClass('vlong')
				}
				else
				{
					$j(this).addClass('hlong')
				}

			})
		})
	}

})

jQuery(document).ready(function($)
{
	var $j= jQuery.noConflict();

	// 2018/01/16 yu_ito No1259
	// if( $j('.snsButtonItem').length > 0 )
	if( $j('.snsButtonItem').length > 0 && $j('.blogSnsButtonWrap').length == 0 )
	{
		len = $j('.snsButtonItem').length;
		num = 0;
 
		$j('.snsButtonItem').each(function()
		{
			twFlag = false;
			fbFlag = false;
			mxFlag = false;
		/*	
			src = $j(this).find('iframe').attr('src')
			if ( $j(this).find('iframe').attr('src').match(/twitter/) )
			{
				twFlag = true
			}
			else if ( $j(this).find('iframe').attr('src').match(/facebook/) )
			{
				fbFlag = true
			}
*/
			num ++;
			try{ 
				if( $j(this).find(':last')[0].nodeName != 'BR')
				{
					$j(this).css({ 'width':'110px' , 'float':'left' });
				}
			} catch(e) {
	
			}

			if( len == num )
			{
				$j(this).after('<div class="clear"></div>');
			}
			//for twitter
			if( $j(this).find('div:first-child').find('br').length > 0 )
			{
				$j(this).find('div').find('br').css('display','none');
			}

			//centering
			if( $j(this).find('div:first-child').attr('align') == 'center' )
			{
				$j(this).css({'float':'none','margin':'0 auto'});
			}
			else if( $j(this).find('div:first-child').attr('align') == 'right' )
			{
				$j(this).css({'float':'right'});
			}
		});
	}
});

jQuery(document).ready(function($)
{

	var $j= jQuery.noConflict();
	var c2SpFlag = $j('input[name="c2SpFlag"]').val();


	if( $j('.telItem').length > 0 )
	{
		thisUrl = location.href;

		$j('.telItem').each(function()
		{	

			// 2016/04/18 abe_shiori No0196
			//$j(this).find('.telValue').css('display','none');
			if ( c2SpFlag == 'true' )
			{
				if ( $j(this).find('span').length > 0 )
				{
					telValue =  $j(this).find('.telValue').text();
					telName =  $j(this).find('.telName').text();
					output = '<a href="tel:' + telValue + '">' + telName + '</a>';
					if( $j(this).find('div[align="center"]').length > 0 )
					{
						$j(this).find('div').html(output);
					}
					else
					{
						$j(this).html(output);
					}


				}else{

					telLink = '';
					telText = $j(this).text();


					telsplit = telText.split('TEL');
					telNum = telsplit[1].replace(/^./ , '');

					telLink = '<a href="tel:' + telNum + '">' + telText  + '</a><br>';

					if( $j(this).find('div').length > 0 )
					{

						$j(this).find('div').html(telLink);
					}
					else
					{
						$j(this).html(telLink);
					}
				}
			}

		});
	}

});

/*
 * c2.inc
 * imageAndTextItem
 * tableFormItem
 * sitemapItem
 * ----------------------------------- */


jQuery(document).ready(function($)
{

	var $j= jQuery.noConflict();
	var c2SpFlag = $j('input[name="c2SpFlag"]').val();
	var panLists = new Array();
	var D_SYSTEM_FLAG = '';

	if( $j('.imageAndTextItem').length > 0 || $j('.tableFormItem').length > 0 || $j('.sitemapItem').length > 0 || $j('.inquiryBannerItem').length > 0 )
	{

		/* 
		 * to array imageandtext-id
		 * ------------------------------------ */
		loop = 0;
		$j('.imageAndTextItem').each(function()
		{
			panLists.push( $j(this).attr('id') );
			if( loop++ == 50 ) {
				loadItem2( panLists );
				loop = 0;
				panLists = new Array();
			}
		});

		if( panLists.length > 0 ) {
			loadItem2( panLists );
			panLists = new Array();
		}

		$j('.tableFormItem').each(function()
		{
			loadItem( $j(this) );
		});
		
		$j('.sitemapItem').each(function()
		{
			loadItem( $j(this) );
		});
		
		$j('.inquiryBannerItem').each(function()
		{
			loadItem( $j(this) );
		});
	

	} //end execute

	/*
	 * post json-array
	 * ------------------------ */
	function loadItem2( panList )
	{
		var lang="";
		if( getUrlVars()['lang'] ) {
			lang = "&lang=" + getUrlVars()['lang'];
		}

			$j.ajaxSetup({
						cache: false
			});

			$j.ajax({
				type: 'GET',
				dataType: 'JSON',
				url: D_PROXY_CONTROLLERADMIN_PREFIX + '?nFunc=on&com=rpc_getConversionItem2&in=' + uid + '&pan=' + panLists.join() + '&c2SpFlag=' + c2SpFlag + lang,
				success: function( data )
				{
					for ( var name in data ) {
						$j("#" + name ).html( data[name] );
					}
				},
				error: function() {
					//that.html('error');
				}
			}); // end ajax
	}
	
	/*
	 * function
	 * ------------------------ */
	function loadItem( that )
	{
		pan = that.attr('id');

		$j.ajaxSetup({
			    cache: false
		});

		$j.ajax({
			type: 'GET',
			url: D_PROXY_CONTROLLERADMIN_PREFIX + '/?com=rpc_getConversionItem&in=' + uid + '&pan=' + pan + '&c2SpFlag=' + c2SpFlag,
			context: that,
			success: function( data )
			{
				if(data)
				{
					that.html(data);
				}
				else
				{
					that.html('<p style="color:red;">通信エラーです</p>');
				}
			},
			error: function() {
				that.html('error');
			}
		}); // end ajax

	} // end func



});

// 2014.01.21 sakai_m
// 列幅の取得
jQuery(document).ajaxStop(function()
{
		var $j= jQuery.noConflict();

		if( $j('.tableFormItem').length > 0 )
		{
			$j('.tableFormItem').each(function()
			{

				var pan = $j(this).attr('id');
				var tdwidth = $j('#' + pan ).find('.tableformWidth').attr('tdwidth');

				$j('#' + pan ).find('.tableformWidth th').css('width',tdwidth + '%');

			});

		}
});

jQuery(document).ajaxStart(function($)
{
	var $j= jQuery.noConflict();

	if ( !fromMng )
	{
		if( typeof $j('body').data('itemLoaded') === 'undefined')
		{
			$j('.hpItemWrapper > div').each(function()
			{
				 if ( !$j(this).hasClass('newMapItem') && !$j(this).hasClass('accessItem') )
				 {
						$j(this).css('display','none');
				 }
			});

			$j('.hpItemWrapper').css('height','500px');

			if ( $j('.hpItemWrapper').length > 0 ) 
			{
				$j('.hpItemWrapper').prepend('<img id="c2ajaxLoaderImg" src="//www.at-ml.jp/mh/wp-content/plugins/c2wp_ajaxitem/ajax-loader.gif">');
			}

		}
	}
});


jQuery(document).ajaxStop(function($)
{

	var $j= jQuery.noConflict();
	if ( !fromMng )
	{
		if (typeof $j('body').data('itemLoaded') === "undefined")
		{

				// 2016/06/10 tsukita_t No0291
			/*
			if ( $j('#c2ajaxLoaderImg').length > 0 );
			{
				$j('#c2ajaxLoaderImg').addClass('hidden');
			}
			*/
			if ( $j('[id="c2ajaxLoaderImg"]').length > 0 )
			{
				$j('[id="c2ajaxLoaderImg"]').addClass('hidden');
			}

			$j('.hpItemWrapper').css('height','auto');
			$j('.hpItemWrapper > div').fadeIn();

			$j('body').data('itemLoaded',true);
				
			$j('.hpItemWrapper > div').each(function(){
				$j(this).addClass('clearfix');	
			});		
		}



		/* ------------------------
		 *
		 * line item border
		 * counterItem is @getC2ApiCounter.js
		 *
		 * ----------------------- */
		if ( $j('.hpItemWrapper hr').length > 0 )
		{
			$j('.hpItemWrapper hr').each(function()
			{
				enableHrAttr( $j(this) );
			});
		}

	}
	else
	{
		//clearfix
		$j('.hpItemWrapper > div').each(function(){
			$j(this).addClass('clearfix');	
		});

		/* ------------------------
		 *
		 * add mask for click disable
		 *
		 * ----------------------- */
		var maskHeight = $j('.hpItemWrapper').height();
		$j('.hpItemWrapper').css('position','relative');
		$j('.hpItemWrapper').append('<div id="previewMask" style="height:' + maskHeight + 'px;"></div>');
		/* ------------------------
		 *
		 * cancel event on mngPreview
		 *
		 * ----------------------- */
		$j('a , input[type="submit"]').live('click' , function(e)
		{
			e.preventDefault();
			return false;
		});


	}

	// 2018/01/17 yu_ito No1120 textItem marquee load
	if ( $j('.textItem marquee').length > 0 ) {
		$j('.textItem').each( function() {
			if( $j(this).find( 'marquee' )) {
				var tag = $j(this).html();
				$j(this).html(tag);
			}
		});
	}

	//for now
	if ( jQuery('.hpItemWrapper').find('svg').length > 0 ) {
		jQuery('.hpItemWrapper').find('svg').css('display','none');
	}


});


jQuery(document).ready(function($)
{

	/*
	 * anchor
	 * --------------------------------- */
	var anchor = $(location).attr('hash');
	if( anchor ) {
		anchor = anchor.slice(1);
		$(document).ajaxStop(function(e){

			// 2017/05/10 yu_ito No1003
			//var targetObj = $('a[name="' + anchor + '"]')
			if( $('a[name="' + anchor + '"]').length > 0){
				var targetObj = $('a[name="' + anchor + '"]');
			}else{
				var targetObj = $('#' + anchor );
			}

			var menuHeight = 0;
			if( $('body').find('.pinzolo').length > 0 ){
				menuHeight = $('#navwrap').height();
			}

				if( typeof targetObj !== 'undefined' && targetObj.length > 0 ) {
					var delay = setTimeout(function(){
						var posY = targetObj.offset().top;
						// 2017/05/10 yu_ito No1003
						posY = posY - menuHeight;
						$('html,body').scrollTop(posY);
					}, 200 );
				}

		})
	}


	/* ------------------------
	 *
	 * for mailBanner
	 *
	 * ----------------------- */
	if ( $('.htmlItem:has(.c2MailBannerImg)' ).length > 0 )
	{
		$('.htmlItem:has(.c2MailBannerImg)' ).addClass('c2MailBanner');
	}

	/* ------------------------
	 *
	 * newMap Item
	 *
	 * ----------------------- */
	if ( $('.newMapItem').length > 0 )
	{
		var mapTitleColor = $('.newMapItem table font').attr('color');
		var mapTitleBg = $('.newMapItem table tr').attr('bgcolor');
		if (typeof mapTitleColor !== "undefined")
		{
			$('.newMapItem table font').css( 'color' , mapTitleColor );
		}
		if (typeof mapTitleBg !== "undefined")
		{
			$('.newMapItem table td').css( 'background' , mapTitleBg );
		}

	}

	/* ------------------------
	 *
	 * text item bgcolor
	 *
	 * ----------------------- */
	if ( $('.textItem table').length > 0 )
	{
		$('.textItem table').each(function()
		{
			bgcolor = $(this).attr('bgColor');
			$(this).css('background' , bgcolor);
			$(this).find('tr').css('background' , bgcolor).find('td').css('background' , bgcolor);
		});
	}

	/* ------------------------
	 *
	 * blinkElem
	 *
	 * ------------------------ */
	if( $('.blinkElem').length > 0 )
	{
		setInterval(function(){
				$('.blinkElem').toggleClass('blinkHide');
				},500);
	}

	/* ------------------------
	 *
	 * hr size/color
	 *
	 * ------------------------ */
	if ( $('.hpItemWrapper hr').length > 0 )
	{
		$('.hpItemWrapper hr').each(function()
		{
			enableHrAttr( $(this) );
		});
	}

	/* ------------------------
	 *
	 * contents slider
	 *
	 * ------------------------ */
		var sliderName = 'contentsSlider';
		var sliderWhereName = 'c2ContentsSlider';
		var prependClass = 'contentsTop';

		if(	typeof jQuery.simplyScroll == 'function' && $('#' + sliderWhereName).length > 0 && $('.' + sliderName).length > 0 ) {
			if( $('.' + sliderName).hasClass(prependClass) ) {
				$('.' + sliderName + '.' + prependClass).prependTo( '#' + sliderWhereName );
			}

			$('.' + sliderName).each(function(){

				var _$this = $(this);
				if( $(this).parents('.htmlItem').length > 0 && $(this).parents('.htmlItem').css('display') == 'none' ) {

					//isAjaxLoading...
					$(document).ajaxStop(function(){
						var thisOpt = { startOnLoad: false };
						contentsSlider( _$this, thisOpt );
					});
				} else {
					contentsSlider( _$this );
				}
			});

		}


		function contentsSlider( obj, args ) {

			var opt = {
				startOnLoad: true,
				autoMode: 'loop',
				speed: 1,
				frameRate: 24,
				horizontal: true,
				pauseOnHover:   true,
				pauseOnTouch: true
			}

			//merge
			if( typeof args == 'object') {
				$.extend( opt, args );
			}

			//run
			obj.simplyScroll(opt);
		}


	// 2017/08/08 yu_ito No1098 tel link
	 if( uaObj.device !== 'iphone' && uaObj.device !== 'android' && uaObj.device !== 'windowsPhone') {
		 if( $('a[href^="tel:"]').length > 0 ) {
			 $('a[href^="tel:"]').css( 'cursor', 'default' );
			 $('a[href^="tel:"]').css( 'pointer-events', 'none' );
			 $('a[href^="tel:"]').on('click', function() {
				 return false;
			 });
		 }
	 }

	



	 // 2017/08/10 sakai_m No1103 sns tweet button
	 if ( $( '.snsButtonItem a.twitter-share-button' ).length > 0 ){
		 if( $( '#c2ajaxLoaderImg' ).length > 0 ){
			 $( document ).ajaxStop(function(){
				 readingTweetButtonScript();
			 });
		 }else{
			 readingTweetButtonScript();
		 }
	 }

}); //end document ready



/* ======================================
 *
 * function
 *
 * ===================================== */
function enableHrAttr( target )
{

	var hr = target;
	var size  = hr.attr('size');
	var width = hr.attr('width');
	var align = hr.attr('align');
	var color = hr.attr('color');

	if( typeof color == 'undefined' )
	{
		color = '#555';
	}

	if( size && color )
	{
		hr.css({
			'border' : 'none',
			'border-top' : size + 'px solid ' + color
		})
	}

	hr.css({
		'width' : width
	})

	if( align == 'center' )
	{
		hr.css('margin' , '0 auto')
	}

} // end func

/* 2017/08/21 sakai_m No1103 sns tweet button */
function readingTweetButtonScript(){
	var head       = document.getElementsByTagName('head')[0] || document.documentElement;
	var script     = document.createElement('script');
	script.type    = 'text/javascript';
	script.src     = '//platform.twitter.com/widgets.js';
	script.charset = 'utf-8';
	head.appendChild( script );
}

jQuery(document).ready(function($)
{
	var $j= jQuery.noConflict();

	if( $j('.newInfoWrap').length > 0 )
	{

		$j('.blogMore').live('click' , function(e)
		{

			$j(this).parents('.c2Article').find('.littleContent').addClass('hidden')
			$j(this).parents('.c2Article').find('.fullContent').fadeIn('normal')
			
			$j(this).text('折りたたむ').addClass('showAll')

			e.preventDefault()
			return false;
		})

		$j('.blogMore.showAll').live('click' , function(e)
		{
			var that = $j(this);
      var pos = $j(this).parents('.c2Article').offset().top
      $j('html,body').animate(
        {
          scrollTop: pos - 80 + 'px'
        },
				{
	        complete: function(){
						that.parents('.c2Article').find('.fullContent').fadeOut('normal', function(){
							$j(this).parents('.c2Article').find('.littleContent').removeClass('hidden')
							that.text('全て表示').removeClass('showAll')
						})
					} // end complete
				}

      );

			e.preventDefault()
			return false

		})
	}

})

jQuery(document).ready(function($)
{

	ua = navigator.userAgent
	isIE = ua.match(/msie/i)
	isIE8 = ua.match(/msie [8.]/i)
	isIphone = ua.match(/iPhone/i)
	isIpad = ua.match(/iPad/i)

	var $j= jQuery.noConflict();

	/* -----------------------------------
	 *
	 * heightalignimg function
	 * for new imageitem
	 *
	 * ---------------------------------- */
	function heightAlignImg( that )
	{

		//new imageItem 20140208
		var heightAry = new Array();

		//2017/04/20 yu_ito No0928 
		//that.find('table.heightAlign img').each(function()
		that.find('.heightAlign img').each(function()
		{
			if( !$j(this).hasClass('spacer') )
			{
				heightAry.push( $j(this).height() )
			}
		})

		var imgMinHeight = Math.min.apply(null, heightAry)
		if( imgMinHeight != 0 )
		{
			//2017/04/20 yu_ito No0928 
			//that.find('table.heightAlign img').css({'height':imgMinHeight + 'px' , 'width':'auto'});
			that.find('.heightAlign img').css({'height':imgMinHeight + 'px' , 'width':'auto'});
		}

	}

	/* -----------------------------------
	 *
	 * main function
	 *
	 * ---------------------------------- */
	
	function mainFunc()
	{
		$j('.imageItem').each(function()
		{

			//2017/04/20 yu_ito No0928
			//if( $j(this).find('table.heightAlign').length > 0 && $j(this).find('table.heightAlign img').length > 1 )
			if( $j(this).find('.heightAlign').length > 0 && $j(this).find('.heightAlign img').length > 1 )
			{
				heightAlignImg( $j(this) )
			}
			else
			{
				if ( $j(this).find('div').length == 0 && $j(this).find('img').next('br').length == 0 )
				{
					$j(this).css({'float':'left'})
				}

				if ( $j(this).next('.imageItem').length == 0 )
				{
					$j(this).next().css('clear','left')
				}
			}

		}) // end each.fn
	}



	/* -----------------------------------
	 *
	 * document ready
	 *
	 * ---------------------------------- */
	// for yokonarabi 	
	if( $j('.imageItem').length > 0 )
	{

			//not cache for load.fn
			$j('.imageItem img').each(function()
			{
				if( !$j(this).hasClass('spacer') )
				{
					// 2017/08/28 inomata_s No1131 Comment out the time stamp to increase SEO display speed
					// $j(this).attr('src' , $j(this).attr('src') + '?imgts=' + $j.now() )
					$j(this).attr('src' , $j(this).attr('src') )
				}
			})


			// .newMapItem is due to not working img load-function
			if( $j('.photothemeResponsible').length > 0 )
			{
				$j('.imageItem img').load(function()
				{
					if( !$j(this).hasClass('spacer') )
					{
						setTimeout(function() {
							mainFunc()
						}, 1000 )
					}
				})
			}
			else if( $j('.zenith').length > 0 && !isIE ) // sato_hironori
			{
				$j('.imageItem img:last').load(function()
				{
					setTimeout(function() {
						mainFunc()
					} , 600 )
				})
			}
			else if( isIE || isIpad || isIphone )
			{

				$j('.imageItem img').load(function()
				{
					if( !$j(this).hasClass('spacer') )
					{
						setTimeout(function() {
							mainFunc()
						}, 600 )
					}
				})
			}
			else
			{
				$j('.imageItem img:last').load(function()
				{
					setTimeout(function() {
						mainFunc()
					} , 600 )
				})
			}

	} // end yokonarabi



})


;
var globalObj = {
    formErrorStatus : false,
    moveSelector: function (selector, space, animation, speed, hash) {
        var $elem, offsetValue, addLocationHash;
        $elem = jQuery(selector);
        if ($elem.length === 0) {
            return false;
        }
        offsetValue = $elem.offset().top - space;
        addLocationHash = function () {
            if (hash) {
                location.hash = hash;
                window.scrollTo(0, offsetValue);
            }
        };
        if (animation) {
            if (!speed) {
                speed = 'fast';
            }
            jQuery('html,body').animate({scrollTop: (offsetValue)}, speed, addLocationHash);
        } else {
            setTimeout(function() {
                window.scrollTo(0, offsetValue);
                addLocationHash();
            }, 10);
        }
        return !hash;
    },
    move: function (id, space, animation) {
        globalObj.moveSelector('#' + id, space, animation, null, null);
    },
    autoFitTextareaHeight : function(elem, keyCode, fit) {
        var padding = 5;
        //backspace or delete or onblor
        if (keyCode === 8 || keyCode === 46 || fit) {
            elem.style.height = 'auto';
        }
        if (elem.scrollHeight > elem.offsetHeight) {
            elem.style.height = (elem.scrollHeight + padding) + 'px';
        }
    },
    setAutoFitTextareaHeight : function (name) {
        var selector = name ? 'textarea.' + name : 'textarea';
        jQuery(selector).each(function(index, elem) {
            globalObj.autoFitTextareaHeight(elem);
            jQuery(elem).bind('keyup', function (e) {
                globalObj.autoFitTextareaHeight(e.target, e.keyCode, false);
            });
            jQuery(elem).bind('blur', function (e) {
                globalObj.autoFitTextareaHeight(e.target, e.keyCode, true);
            });
        });
    },
    hideErrorDisplay : function (id, value, errorClassName, hiddenMessage, nullOk) {
        var blockElem = document.getElementById(id + '_block');
        if (blockElem) {
            var statusElem = document.getElementById(id + '_status');
            if (value !== '' || nullOk) {
                var borderElem = document.getElementById(id + '_border');
                var noticeElem = document.getElementById(id + '_notice');
                if (jQuery(blockElem).hasClass(errorClassName)) {
                    jQuery(blockElem).removeClass(errorClassName);
                    if (borderElem) {
                        borderElem.style.display = 'none';
                    }
                    if (noticeElem) {
                        noticeElem.innderHTML = '';
                        noticeElem.style.display = 'none';
                    }
                    if (statusElem) {
                        statusElem.style.display = 'none';
                    }
                    if (hiddenMessage) {
                        var errorBox = jQuery('.' + errorClassName);
                        if (errorBox.length === 0) {
                            jQuery('.error_box').each(function (elem) {
                                elem.style.display = 'none';
                            });
                        }
                    }
                }
            } else {
                if (statusElem) {
                    statusElem.style.display = 'inline';
                }
            }
        }
    },
    setHideErrorDisplay : function (id, eventType, errorClassName, hiddenMessage) {
        var eventType = eventType ? eventType : 'change';
        var elem = document.getElementById(id);
        var nullOk = (eventType === 'focus') ? true : false;
        jQuery(elem).bind(eventType, function (evt) {
            globalObj.hideErrorDisplay(id, evt.target.value, errorClassName, hiddenMessage, nullOk);
        });
    },
    checkCartQuestion : function (name, type, errorClassName) {
        var baseName = 'question_' + name;
        var tmpValue;
        if (type == 'checkbox' || type == 'radio') {
            tmpValue = '';
            jQuery('.'+baseName).each(function (i, elem) {
                var flag = jQuery(elem).prop('checked');
                if (flag) {
                    tmpValue = 'ok';
                }
            });
        } else {
            q_length = document.getElementById(baseName).value.length;
            if (q_length==0) {
                tmpValue = '';
            } else {
                tmpValue = 'ok';
            }
        }
        globalObj.hideErrorDisplay(baseName, tmpValue, errorClassName, false, false);
    },
    setCookie : function(cookie_name, cookie_value, effective_days, cookie_path) {
        var cookie_name = cookie_name;
        var cookie_display_flag = cookie_value;
        var exp_str = '';
        if (effective_days) {
            var exp = new Date();
            exp.setTime(exp.getTime()+1000*60*60*24*effective_days);
            exp_str = '; expires=' + exp.toUTCString();
        }
        ckstr = encodeURIComponent(cookie_display_flag);
        document.cookie = cookie_name + '=' + ckstr + exp_str + '; path=' + cookie_path;
    },
    getAllCookies : function () {
        var cookies = {};
        var all = document.cookie;
        if (all !== '') {
            var lists = all.split('; ');
            var cnt = lists.length;
            for (var i = 0; i < cnt; i++) {
                var cookie = lists[i];
                var p = cookie.indexOf('=');
                var name = cookie.substring(0,p);
                var value = cookie.substring(p+1);
                value = decodeURIComponent(value);
                cookies[name] = value;
            }
        }
        return cookies;
    },
    getCookie : function(cookie_name) {
        var allCookies = globalObj.getAllCookies();
        if (!allCookies[cookie_name] && allCookies[cookie_name] === undefined) {
            return null
        } else {
            return allCookies[cookie_name];;
        }
    },
    checkDateSelect : function (yElem, mElem, dElem, emptyLabel, useZeroPad) {
        var y,
            m,
            d,
            selectedDateIndex,
            dateObj,
            nextYear,
            nextMonth,
            lastDateObj,
            lastDay,
            optionCnt;
        y = parseInt(yElem.value, 10);
        m = parseInt(mElem.value, 10);
        d = parseInt(dElem.value, 10);
        selectedDateIndex = dElem.selectedIndex;
        dateObj = new Date(y, (m - 1), d);
        if (m === 12) {
            nextYear = y + 1;
            nextMonth = 1;
        } else {
            nextYear = y;d
            nextMonth = m + 1;
        }
        lastDateObj = new Date(nextYear, (nextMonth - 1), 0);
        lastDay = lastDateObj.getDate();
        optionCnt = isNaN(lastDay) ? 31 : lastDay;
        dElem.options.length = 0;
        if (typeof emptyLabel === 'undefined') {
            emptyLabel = '--';
        }
        dElem.options[0] = new Option(emptyLabel, '');
        for (var i = 1; i <= optionCnt; i++) {
            var dayVal = i;
            if (useZeroPad && i < 10) {
                dayVal = '0' + i;
            }
            dElem.options[i] = new Option(i, dayVal);
        }
        dElem.selectedIndex = (optionCnt < 31 && lastDay < d) ? 0 : selectedDateIndex;
    },
    addSelectDateCheck : function (param) {
        var defaults = {
                selectors  : null, // [{y:'',m:'',d:''}, ...]
                emptyLabel : '--',
                useZeroPad : false
            },
            config;
        config = jQuery.extend(defaults, param);
        if (config.selectors === null || (!config.selectors.length || config.selectors.length === 0)) {
            return false; // no selecter
        }
        var _setDateCheck = function (ySelector, mSelector, dSelector) {
            globalObj.checkDateSelect(
                jQuery(ySelector)[0],
                jQuery(mSelector)[0],
                jQuery(dSelector)[0],
                config.emptyLabel,
                config.useZeroPad
            );
            jQuery(ySelector + ',' + mSelector).bind('change', function (e) {
                globalObj.checkDateSelect(
                    jQuery(ySelector)[0],
                    jQuery(mSelector)[0],
                    jQuery(dSelector)[0],
                    config.emptyLabel,
                    config.useZeroPad
                );
            });
        };
        jQuery(config.selectors).each(function (index, obj) {
            var ySelector, mSelector, dSelector;
            ySelector = obj.y;
            mSelector = obj.m;
            dSelector = obj.d;
            if (jQuery(ySelector)[0] && jQuery(mSelector)[0] && jQuery(dSelector)[0]) {
                _setDateCheck(ySelector, mSelector, dSelector);
            }
        });
    },
    processGaCookie : function() {
        var contentLimitLength = 200;
        var partLimitLength = 50;
        var cookieVal = globalObj.getCookie('__utmz');
        if (cookieVal && contentLimitLength < cookieVal.length) {
            var tmpVals = cookieVal.split('|');
            var i = 0;
            while (tmpVals[i]) {
                var tmpVals2 = tmpVals[i].split('=');
                if (tmpVals2[1] && partLimitLength < tmpVals2[1].length) {
                    tmpVals2[1] = tmpVals2[1].slice(0, partLimitLength);
                    tmpVals[i] = tmpVals2.join('=');
                }
                i++;
            }
            cookieVal = tmpVals.join('|');
            globalObj.setCookie('__utmz', cookieVal, 180, '/');
        }
    }
};

globalObj.setFavoriteAddButton = function () {};

// secure page link for unique domain
globalObj.useUniqueGaq = false;
globalObj.home = null;
globalObj.b = null;
globalObj.s = null;
globalObj.h = null;

globalObj.appendSecureForm = function (id, url, requestData) {
    var h = jQuery('<input>').attr({type: 'hidden', name: 'hashId', value: requestData.hashId});
    var f = jQuery('<form>').attr({id: id, action: url, method: 'post'}).append(h);
    jQuery('body').append(f);
};

globalObj.bindGaqToSecureForm = function (formSelector ) {
    if (globalObj.useUniqueGaq && window._gaq) {
        globalObj.processGaCookie();
        jQuery(formSelector).submit(function (e) {
            _gaq.push(['_linkByPost', e.currentTarget]);
        });
    }
};

globalObj.isSecurePage = function (page) {
    return (page && (page === 'contact' || page === 'register' || page === 'member' || page === 'member-login' || page === 'mail' || page === 'mobilesite' || page === 'cart' || page === 'favorite' || page === 'form' || page === 'bbs'));
};

globalObj.moveSecure = function(page, parameter) {
    if (!globalObj.b || !globalObj.s || !globalObj.h || !page) {
        return true;
    }
    if (!globalObj.isSecurePage(page)) {
        return true;
    }
    var requestData = {hashId: globalObj.h};
    var secureUrl = globalObj.b + '/' + page + (parameter ? '/' + parameter : '') + '/' + globalObj.s;
    var id = 'move_secure_' + page + '_' + (new Date()).getTime();
    globalObj.appendSecureForm(id, secureUrl, requestData);
    if (page === 'register') {
        globalObj.bindGaqToSecureForm('#' + id);
    }
    jQuery('#' + id).submit();
    return false;
};

globalObj.setMoveSecure = function(selector) {
    if (!globalObj.b || !globalObj.s || !globalObj.h || !selector) {
        return false;
    }
    jQuery(selector).each(function (i, elem) {
        var page = jQuery(elem).data('page');
        if (globalObj.isSecurePage(page)) {
            jQuery(elem).click(function(e) {
                var $targetElem = jQuery(e.currentTarget);
                return globalObj.moveSecure($targetElem.data('page'), $targetElem.data('parameter'));
            });
        }
    });
    return true;
};

globalObj.createLoginMemberLink = function () {
    // for custom secure link
    // [Sample Html]
    // <span class="custom_secure_link" data-page="member-login" data-html="Sign in" data-class=""></span>
    // <span class="custom_secure_link" data-page="register" data-html="Register" data-class=""></span>
    // <span class="custom_secure_link" data-page="member" data-html="My page" data-class=""></span>
    // <span class="custom_secure_link" data-page="logout" data-html="Sign out" data-class=""></span>
    if (!globalObj.b) {
        return false;
    }
    var isMember = jQuery('body').data('membership'); // * XHTML template is added data attribute to body element.
    var nowPath = location.pathname.replace(/^\/phone/, '').replace(/^\/index.php/, '').replace(/^\//, '').replace(/\/$/, '');
    var createPlace = function (to, nowPath) {
        var place;
        if (to === '/') {
            place = '';
        } else if (to) {
            place = to
        } else {
            place = nowPath;
        }
        return place;
    };
    jQuery('.custom_secure_link').each(function (index, elem) {
        var $elem = jQuery(elem);
        var href = '';
        var query = '';
        var page = $elem.data('page');
        var html = $elem.data('html');
        var additionLinkClassName = $elem.data('class');
        var shown = false;
        var to;
        var $linkElem;
        var place = page;
        if (html) {
            if (isMember) {
                if (page === 'member' || page === 'logout') {
                    shown = true;
                    if (page === 'logout') {
                        to = $elem.data('to'); // for only logout
                        query = '?mode=memberlogout';
                        place = createPlace(to, nowPath);
                    }
                }
            } else {
                if (page === 'register' || page === 'member-login') {
                    shown = true;
                }
            }
        }
        if (shown) {
            href = globalObj.b + '/' + place + query;
            $linkElem = jQuery('<a>').attr({href: href}).html(html);
            if (additionLinkClassName) {
                $linkElem.addClass(additionLinkClassName);
            }
            if (globalObj.s || globalObj.h) {
                $linkElem.addClass('secure_link').data({page: page}).click(function (e) {
                    return globalObj.moveSecure(jQuery(e.currentTarget).data('page'), null);
                });
            }
            $elem.append($linkElem);
        }
    });
    return true;
};

globalObj.setCustomToggle = function (wrapSelector, btnSelector, boxSelector) {
    jQuery(wrapSelector).each(function (i, elem) {
        var $wrapElem = jQuery(elem);
        var $btnElem = $wrapElem.find(btnSelector);
        var $boxElem = $wrapElem.find(boxSelector);
        var dataSpeed = $wrapElem.data('speed');
        var speed = 0;
        if (0 < $btnElem.length && 0 < $boxElem.length) {
            if (dataSpeed !== undefined && (dataSpeed.toString(10).match(/^[0-9]+$/) || _.contains(['fast', 'normal', 'slow'], dataSpeed))) {
                speed = dataSpeed;
            }
            $btnElem.click(function () {
                if ($boxElem.is(':visible')) {
                    $boxElem.slideUp(speed);
                } else {
                    $boxElem.slideDown(speed);
                }
            });
        }
    });
};

globalObj.setToTopScrollBtn = function (btnSelector) {
    var defaults = {
        speed: 500,
        pos: 300,
        style: 'on',
        right: '15px',
        left: '',
        bottom: '20px',
        top: '',
        zIndex: 1000,
        selector: '',
        space: 0
    };
    var calculatePos = function ($topBtnElem, options) {
        var toPos = 0;
        var $toElem = [];
        var anchor = $topBtnElem.attr('href');
        if (anchor && anchor.match(/#.+/)) {
            anchor = anchor.replace(/^.*#/, '#');
            $toElem = jQuery(anchor);
        } else if (options.selector) {
            $toElem = jQuery(options.selector);
        }
        if (0 < $toElem.length) {
            toPos = $toElem.offset().top - options.space;
        }
        return toPos;
    };
    jQuery(btnSelector).each(function (index, elem) {
        var $topBtnElem = jQuery(elem);
        var options = jQuery.extend({}, defaults, $topBtnElem.data());
        $topBtnElem.hide();
        if (options.style === 'on') {
            $topBtnElem.css({
                position: 'fixed',
                zIndex: options.zIndex
            });
            if (options.top) {
                $topBtnElem.css({top: options.top});
            } else {
                $topBtnElem.css({bottom: options.bottom});
            }
            if (options.left) {
                $topBtnElem.css({left: options.left});
            } else {
                $topBtnElem.css({right: options.right});
            }
        }
        jQuery(window).scroll(function () {
            if (options.pos < jQuery(this).scrollTop()) {
                $topBtnElem.fadeIn();
            } else {
                $topBtnElem.fadeOut();
            }
        });
        $topBtnElem.click(function (e) {
            var toPos = calculatePos($topBtnElem, options);
            e.preventDefault();
            jQuery('body,html').animate({
                scrollTop: toPos
            }, options.speed);
            return false;
        });
    });
};

globalObj.calendarCacheNamePrefix = 'xhtml_';
globalObj.loadingClassName = 'ajax_request_loading';
globalObj.setAjaxCalendar = function (selector) {
    if (!window.xmlUrl || !window.CURPLACE || !window.sharedTool) {
        return;
    }
    var useCache = true;
    if (globalObj.getCookie('forceAjaxNoCache')) {
        useCache = false;
    }
    if (selector.match(/ajax_calendar_form/)) {
        useCache = false;
    }
    var config = {
        calendarCacheNamePrefix: globalObj.calendarCacheNamePrefix,
        calendarLastUpdate: globalObj.calendarLastUpdate,
        currentPlace: CURPLACE,
        requestUrl: xmlUrl + '?go=calendar-slide',
        useCache: useCache,
        loadingClassName: globalObj.loadingClassName
    };
    return sharedTool.ajaxCalendar(selector, config);
};

globalObj.setFancyImage = function () {
    if (window.CURPLACE && CURPLACE == 'bbs') {
        jQuery(".bbs_image_link").fancybox();
    }
};

globalObj.setReadMore = function (selector) {
    if (!window.sharedTool) {
        return;
    }
    sharedTool.setReadMore(selector);
};

globalObj.setTabDisplay = function (selector, config) {
    if (!window.sharedTool) {
        return;
    }
    sharedTool.setTabDisplay(selector, config);
};

globalObj.productCategoryNames = [];
globalObj.subCategorySelectDefaultLabel = '';
globalObj.setCategorySearchSelection = function (selector) {
    if (!window.sharedTool) {
        return;
    }
    new sharedTool.CategorySearchSelection({
        wrapSelector: selector,
        productCategoryNames: globalObj.productCategoryNames,
        subCategorySelectDefaultLabel: globalObj.subCategorySelectDefaultLabel,
        clearLinkSelector: '.item_search_clear',
        itemSortFormSelector: '.item_sort_form',
        baseUrl: globalObj.home
    });
};

globalObj.fetchSimilarityList = function (selector, config) {
    var $elem = jQuery(selector);
    if ($elem.length === 0) {
        return false;
    }
    if (!window.xmlUrl) {
        return;
    }
    var defaults = {
        id: null,
        cnt: null,
        img: 160,
        type: 'photo',
        disp: 'html',
        mode: 'similarity',
        go: 'product-list-reading'
    };
    var options = jQuery.extend({}, defaults, config);
    //convert option values
    options.random = (options.random === 'on') ? 1 : null;
    options.img = (options.img === 80 || options.img === 120 || options.img === 160 || options.img === 200) ? options.img : 160;
    //ajax request
    jQuery.ajax({
        dataType: 'text',
        url: globalObj.getRequestUrl(),
        type: 'get',
        data: options,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        success: function(responseText) {
            if (responseText) {
                $elem.html(responseText);
            }
        },
        error: function() {
            //error
            console.error('ERROR :: fetchSimilarityList response.');
        }
    });
};

globalObj.getRequestUrl = function() {
    if (!window.xmlUrl) {
        return false;
    }
    var requestUrl = xmlUrl;
    if (location.protocol !== 'https:') {
        requestUrl = requestUrl.replace(/^https:/, 'http:');
    }
    return requestUrl;
};

jQuery(function () {
    // for custom secure link
    globalObj.createLoginMemberLink();
    // set slide show
    globalObj.setSwipeList = function () {
        if (jQuery.fn.swipeList) {
            jQuery('.swipe_list').swipeList({
                num : 3,
                flipsnapSelector : '.list_item_row',
                itemSelector : '.list_item_cell',
                viewportSelector: '.list_item_table',
                pointerSelector: '.pointer span',
                pointerWrapSelector: '.pointer',
                pointerWrapBoxSelector: '.pointer_box',
                nextSelector: '.pointer_next',
                prevSelector: '.pointer_prev',
                nextWrapBoxClassName: 'pointer_next_box',
                prevWrapBoxClassName: 'pointer_prev_box',
                buttonBothSidesPosition: 'on',
                useDisabledNexPrev: true,
                hideNexPrev: true,
                useResizeEvent : true,
                hasDifferenceImageSize: true,
                useMinimumHeightAdjustment: false,
                swipeOnlyTouchDevice: true,
                imageWrapSelector: '.item_image_box',
                dataAttributesColumnNum: 'cols',
                dataAttributesMovementNum : 'movement',
                dataAttributesAdjustment: 'adjustment',
                dataAttributesFixedItemWidth: 'width',
                dataAttributesAutoPlay: 'autoplay',
                dataAttributesInterval: 'interval',
                dataAttributesDuration: 'duration',
                dataAttributesPointer: 'pointer',
                dataAttributesPointerEvent: 'event',
                dataAttributesBothSides: 'position',
                dataAttributesItemPadding: 'padding'
            });
        }
    };
    globalObj.setSwipeList();
    globalObj.setFavoriteAddButton();
    globalObj.setCategorySearchSelection('.category_search');
    globalObj.setTabDisplay('.item_tab_area', {});
    globalObj.setAjaxCalendar('.ajax_calendar');
    globalObj.setFancyImage();
    globalObj.setToTopScrollBtn('.back_to_top');
    globalObj.setReadMore('.read_more_block');
    globalObj.setCustomToggle('.custom_toggle_box', '.custom_toggle_button', '.custom_toggle_area');
});

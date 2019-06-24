;
var formOnloadStatus = false;

// start : for pc site -----------------------------------------------------
var NG_icon2 = NG_icon;
var loadingDisplay1 = loadingDisplay;
var loadingDisplay2 = loadingDisplay;

function addErrorClassName(msgElem) {}

function cutErrorClassName(msgElem) {}

function cutRowStatus(msgElem) {}

function addOKInputClassName(msgElem) {}

function cutOKInputClassName (msgElem) {}

// エラー表示OFF
function hideErrorDisplay(msgElem, strict) {
    if (!formOnloadStatus || !globalObj.formErrorStatus) {
        return;
    }
    var name = msgElem.replace(/_status/, '');
    var errorBox = jQuery('.form_error_box');
    var blockElem = jQuery('#' + name + '_block');
    if (blockElem) {
        var borderElem = jQuery('#' + name + '_border')[0];
        var noticeElem = jQuery('#' + name + '_notice')[0];
        if (!strict) {
            if (blockElem.hasClass('form_alpha')) {
                blockElem.removeClass('form_alpha');
            }
        }
        if (blockElem.hasClass(ERROR_CLASS)) {
            blockElem.removeClass(ERROR_CLASS);
            if (borderElem) {
                borderElem.style.display = 'none';
            }
            if (noticeElem) {
                noticeElem.style.display = 'none';
            }
        }
    }
    if (errorBox[0] && errorBox[0].style.display !== 'none' && jQuery('.' + ERROR_CLASS).length === 0) {
        errorBox.css('display', 'none');
    }
}

// 透過表示OFF
function hideDiaphanousDisplay(msgElem) {
    if (!formOnloadStatus || !globalObj.formErrorStatus) {
        return;
    }
    var name = msgElem.replace(/_status/, '');
    var blockElem = jQuery('#' + name + '_block');
    if (blockElem && blockElem.hasClass('form_alpha')) {
        blockElem.removeClass('form_alpha');
    }
}

// 区切り線の表示切り替え
function toggleFormLine(msgElem, value) {
    var name = msgElem.replace(/_status/, '');
    var borderElem = jQuery('#' + name + '_border')[0];
    if (borderElem) {
        borderElem.style.display = value;
    }
}

function loginCheck(emailElem, passwordElem) {
    if (jQuery('#' + emailElem).val() && jQuery('#' + passwordElem).val()) {
        hideErrorDisplay(emailElem);
        hideErrorDisplay(passwordElem);
    }
}

function disableEnterSubmit(elem) {
    elem.keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            return false;
        }
    });
}

function setBeforeunloadEvent(pageState, submitFlag, obj, formObj) {
    if (pageState == 'edit') {
        if (submitFlag && !checkAllEnpty(obj)) {
            window.onbeforeunload = function () {return MSG_UNLOAD;};
        }
        obj.change(function (e) {
            if (jQuery(e.target).val() == '' && checkAllEnpty(obj)) {
                if (window.onbeforeunload != null) {
                    window.onbeforeunload = null;
                }
            } else {
                if (window.onbeforeunload == null) {
                    window.onbeforeunload = function () {return MSG_UNLOAD;};
                }
            }
        });
    } else {
        window.onbeforeunload = function () {return MSG_UNLOAD;};
    }
    formObj.submit(function () {window.onbeforeunload = null;});
}

function checkAllEnpty(obj) {
    var empty = true;
    obj.each(function (index, elem) {
        if (jQuery(elem)[0] && jQuery(elem).val()) {
            empty = false;
            return false;
        }
    });
    return empty;
}

// ！(必須)をセット
function setRequired(msgElem, required) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    if (msgElemObj) {
        if (required) {
            msgElemObj.innerHTML = LBL_REQUIRED;
        } else {
            msgElemObj.innerHTML = "&nbsp;";
        }
    }
}
// end : for pc site -----------------------------------------------------

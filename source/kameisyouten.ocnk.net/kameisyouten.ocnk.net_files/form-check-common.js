// 簡単な入力チェック
function checkEasyInput(elem, msgElem, required, strict) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    var tmpBr = (elem == 'content') ? messageBr : '';

    if (jQuery('#' + elem).val().length == 0) {
        if (required) {
            msgElemObj.innerHTML = errorStatusPrefix + tmpBr + NG_icon + MSG_INPUT + errorStatusSuffix;
            addErrorClassName(msgElem);
            hideDiaphanousDisplay(msgElem);
            return false;
        }
        else {
            msgElemObj.innerHTML = "";
            hideErrorDisplay(msgElem, strict);
            cutRowStatus(msgElem);
        }
    }
    else {
        msgElemObj.innerHTML = tmpBr + OK_icon;
        cutErrorClassName(msgElem);
        hideErrorDisplay(msgElem, strict);
    }
    return true;
}

// 簡単な選択チェック
function checkEasySelect(elem, msgElem, required) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    if (jQuery('#' + elem).val() == "") {
        if (required) {
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_SELECT + errorStatusSuffix;
            addErrorClassName(msgElem);
            hideDiaphanousDisplay(msgElem);
        }
        else {
            msgElemObj.innerHTML = "";
            hideErrorDisplay(msgElem);
            cutRowStatus(msgElem);
        }
    } else {
        msgElemObj.innerHTML = OK_icon;
        cutErrorClassName(msgElem);
        hideErrorDisplay(msgElem);
    }
}

// 郵便番号チェック
var latestPostal;
var postErr = false;
function checkPostalInput(elemjp, msgElem, required, target_pref, target_address1, target_address2, language) {
    var msgElemObj = jQuery('#' + msgElem)[0];

    // 郵便番号から住所をセット
    function addressSet(result) {
        if (result.error) {
            postErr = true;
            msgElemObj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_NOPOST + errorStatusSuffix;
            addErrorClassName(msgElem);
            // フォームリセット
            jQuery('#' + target_address1 + ', #' + target_address2).val('');
            jQuery('#' + target_pref+'_status, #' + target_address1+'_status, #' + target_address2+'_status').html('');
        } else {
            postErr = false;
            msgElemObj.innerHTML = OK_icon;
            cutErrorClassName(msgElem);
            if (result['pref_no']) {
                jQuery('#' + target_pref)[0].value = result['pref_no'];
                jQuery('#' + target_pref+'_status')[0].innerHTML = OK_icon;
                hideErrorDisplay(msgElem);
                hideErrorDisplay(target_pref+'_status');
            } else {
                jQuery('#' + target_pref+'_status')[0].innerHTML = "";
                cutRowStatus(target_pref+'_status');
            }

            if (result['address1']) {
                jQuery('#' + target_address1)[0].value = result['address1'];
                jQuery('#' + target_address1+'_status')[0].innerHTML = OK_icon;
                cutErrorClassName(target_address1);
                hideErrorDisplay(target_address1+'_status');

                jQuery('#' + target_address2)[0].value = result['address2'];

                if (result['address2']) {
                    jQuery('#' + target_address2+'_status')[0].innerHTML = errorStatusPrefix + NG_icon + MSG_BANCHI + errorStatusSuffix;
                    addErrorClassName(target_address2);
                } else {
                    jQuery('#' + target_address2+'_status')[0].innerHTML = "";
                    cutRowStatus(target_address2+'_status');
                }
                hideDiaphanousDisplay(target_address2+'_status');
            } else {
                jQuery('#' + target_address1+'_status')[0].innerHTML = "";
                hideErrorDisplay(target_address1+'_status');
                hideDiaphanousDisplay(target_address1+'_status');
                cutRowStatus(target_address1+'_status');
            }
        }
    }

    var newPost = convertCharacter(jQuery('#' + elemjp).val(), false);
    if (newPost.length==0) {
        jQuery('#' + elemjp).attr({'maxlength': '20'});
        msgElemObj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_INPUT + errorStatusSuffix;
        addErrorClassName(msgElem);
    } else if (jQuery('#address_pref').val() == '48') {
        jQuery('#' + elemjp).attr({'maxlength': '20'});
        msgElemObj.innerHTML = OK_icon;
        cutErrorClassName(msgElem);
        hideErrorDisplay(msgElem);
    } else {
        if (!newPost.match(/^[0-9]{3}-?[0-9]{4}$/)) {
            jQuery('#' + elemjp).attr({'maxlength': '20'});
            msgElemObj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_NUMERIC1 + errorStatusSuffix;
            addErrorClassName(msgElem);
            hideDiaphanousDisplay('address_postaljp');
        } else {
            if (newPost.match(/^[0-9]{7}$/)) {
                jQuery('#' + elemjp).attr({'maxlength': '7'});
            } else {
                jQuery('#' + elemjp).attr({'maxlength': '8'});
            }

            newPost = newPost.replace('-', '');
            // タブとか→とかを押した場合はチェックしないようにする
            if (newPost == latestPostal) {
                if (!postErr) {
                    msgElemObj.innerHTML = OK_icon;
                    cutErrorClassName(msgElem);
                    hideErrorDisplay(msgElem);
                }
            } else if (newPost == '0000000') {
                msgElemObj.innerHTML = OK_icon;
                cutErrorClassName(msgElem);
                hideErrorDisplay(msgElem);
                latestPostal = newPost;
                postErr = false;
                // 日本国外
                jQuery('#' + target_pref+'_status')[0].innerHTML = OK_icon;
                cutErrorClassName(msgElem);
                hideErrorDisplay(target_pref+'_status');
                jQuery('#' + target_pref)[0].value = '48';
                jQuery('#' + target_address1+'_status')[0].innerHTML = "";
                jQuery('#' + target_address2+'_status')[0].innerHTML = "";
                checkCountry(language, false);
                hideDiaphanousDisplay("address_country_status");
                cutRowStatus(target_address1+'_status');
                cutRowStatus(target_address2+'_status');
            } else if (newPost != latestPostal) {
                msgElemObj.innerHTML = loadingDisplay1;
                latestPostal = newPost;
                // メッセージ表示
                jQuery('#' + target_pref+'_status')[0].innerHTML = loadingDisplay1;
                jQuery('#' + target_address1+'_status')[0].innerHTML = loadingDisplay2;
                jQuery('#' + target_address2+'_status')[0].innerHTML = loadingDisplay2;
                // parsは他にも必要な情報があれば入れる
                var pars = "go=address-search&post_number=" + newPost;
                jQuery.ajax({
                    type: 'GET',
                    url: xmlUrl,
                    data: pars,
                    dataType : 'json',
                    headers: {'X-Requested-With': 'XMLHttpRequest'}
                }).done(function (data, status) {
                    addressSet(data);
                });
            }
            checkOverSeaTel(language);
        }
    }
}

// メールアドレスチェック
var latestEmail;
function checkEmailInput(elem, msgElem, required, overlap) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    var elemVal = convertCharacter(jQuery('#' + elem).val(), false);
    if (elemVal.length==0) {
        if (required) {
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_INPUT + errorStatusSuffix;
            addErrorClassName(msgElem);
            cutOKInputClassName(elem);
        }
        else {
            msgElemObj.innerHTML = "";
            cutRowStatus(msgElem);
        }
        latestEmail = "";
    } else if (!elemVal.match(/^[\/0-9A-Za-z_-][+?\/0-9A-Za-z.._-]*@[0-9A-Za-z_-]+[\.]+[0-9A-Za-z_..-]+[A-Za-z]$/)) {
        msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_INPUT2 + errorStatusSuffix;
        addErrorClassName(msgElem);
        cutOKInputClassName(elem);
        latestEmail = "";
    } else {
        if (overlap) {
            checkOverlapEmail(elem, msgElem, 1);
        } else {
            msgElemObj.innerHTML = OK_icon;
            cutErrorClassName(msgElem);
            hideErrorDisplay(msgElem);
        }
    }
}

var latestOverlap = {email: '', error: false};
function checkOverlapEmail(elem1, msgElem, login) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    var email = convertCharacter(jQuery('#' + elem1).val(), false);
    if (!email) {
        msgElemObj.innerHTML = OK_icon;
        cutErrorClassName(msgElem);
        addOKInputClassName(msgElem);
        hideErrorDisplay(msgElem);
        return;
    } else {
        if (email === latestOverlap.email) {
            if (latestOverlap.error === true) {
                msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_OVERLAP + errorStatusSuffix;
                addErrorClassName(msgElem);
                cutOKInputClassName(msgElem);
                return;
            } else {
                msgElemObj.innerHTML = OK_icon;
                cutErrorClassName(msgElem);
                addOKInputClassName(msgElem);
                hideErrorDisplay(msgElem);
                return;
            }
        }
    }
    var pars = 'go=check-overlap-email&email=' + email;
    if (login) {
        pars += '&login=' + login;
    }
    jQuery.ajax({
        type: 'POST',
        url: xmlUrl,
        data: pars,
        dataType: 'text',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).done(function (data, status) {
        latestOverlap.email = email;
        if (data && data === '1') {
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_OVERLAP;
            latestOverlap.error = true;
            addErrorClassName(msgElem);
            cutOKInputClassName(msgElem);
        } else {
            msgElemObj.innerHTML = OK_icon;
            cutErrorClassName(msgElem);
            addOKInputClassName(msgElem);
            latestOverlap.error = false;
            hideErrorDisplay(msgElem);
        }
    });
}

//電話番号orFAXチェック
function checkTelInput(elem1, elem2, elem3, msgElem, required, strict) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    var elem1Val = convertCharacter(jQuery('#' + elem1).val(), false);
    var elem2Val = convertCharacter(jQuery('#' + elem2).val(), false);
    var elem3Val = convertCharacter(jQuery('#' + elem3).val(), false);
    var result = true;
    var useStatusDisplay = true;
    var country = jQuery('#address_country');

    if (!required && elem1Val.length==0 && elem2Val.length==0 && elem3Val.length==0) {
        msgElemObj.innerHTML = "";
        cutRowStatus(msgElem);
        useStatusDisplay = false;
    } else if (elem1Val.length==0 || elem2Val.length==0 || elem3Val.length==0) {
        msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_INPUT + errorStatusSuffix;
        addErrorClassName(msgElem);
        result = false;
    } else {
        if ((0 < country.length && country.val() != '' && country.val() != '61') || jQuery('#address_pref').val() == '48') {
            if ((!elem1Val.match(/^[0-9\+(][0-9 \.\+()]{1,9}$/) || !elem2Val.match(/^[0-9 \.\+()]{1,10}$/) || !elem3Val.match(/^[0-9 \.\+()]{1,9}[0-9]$/))) {
                msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_NUMERIC5 + errorStatusSuffix;
                addErrorClassName(msgElem);
                result = false;
            }
        } else {
            if (!elem1Val.match(/^[0-9]+$/) || !elem2Val.match(/^[0-9]+$/) || !elem3Val.match(/^[0-9]{4}$/)) {
               msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_NUMERIC1 + errorStatusSuffix;
               addErrorClassName(msgElem);
               result = false;
            }
        }
    }

    if (result) {
        if (required || elem1Val.length!=0 || elem2Val.length!=0 || elem3Val.length!=0) {
            hideErrorDisplay(msgElem, strict);
        }
        if (useStatusDisplay) {
            msgElemObj.innerHTML = OK_icon;
            cutErrorClassName(msgElem);
        }
    } else {
        if (!required || elem1Val.length!=0 || elem2Val.length!=0 || elem3Val.length!=0) {
            hideDiaphanousDisplay(msgElem);
        }
    }
}

// 海外電話番号orFAXチェック
function checkTelInputEng(elem, msgElem, required) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    var tmp_elem = convertCharacter(jQuery('#' + elem).val(), false);

    if (tmp_elem.length==0) {
        if (required) {
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_INPUT + errorStatusSuffix;
            addErrorClassName(msgElem);
        } else {
            msgElemObj.innerHTML = "";
            hideErrorDisplay(msgElem);
            cutRowStatus(msgElem);
        }
    } else if (!tmp_elem.match(/^[0-9+(][0-9 \.\-\+()]{1,28}[0-9]$/)) {
        msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_NUMERIC4 + errorStatusSuffix;
        addErrorClassName(msgElem);
    } else {
        msgElemObj.innerHTML = OK_icon;
        cutErrorClassName(msgElem);
        hideErrorDisplay(msgElem);
    }
}

// パスワードチェック
function checkPasswordInput(elem, msgElem, elem2, msgElem2, required) {
    var msgElemObj = jQuery('#' + msgElem)[0];
    var msgElem2Obj = jQuery('#' + msgElem2)[0];
    var elemVal = jQuery('#' + elem).val();
    var elem2Val = jQuery('#' + elem2).val();
    var name = msgElem2.replace('_status', '');

    if (!required && elemVal.length==0 && elem2Val.length==0) {
        msgElemObj.innerHTML = "";
        msgElem2Obj.innerHTML = "";
        hideErrorDisplay(msgElem2);
        cutRowStatus(msgElem2);
    } else {
        if (elemVal.length==0) {
            msgElemObj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_INPUT + errorStatusSuffix;
            addErrorClassName(name);
            cutOKInputClassName(msgElem);
        } else if (!elemVal.match(/^[0-9A-Za-z]{4,20}$/)) {
            msgElemObj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_NUMERIC2 + errorStatusSuffix;
            addErrorClassName(name);
            cutOKInputClassName(msgElem);
        } else {
            msgElemObj.innerHTML = OK_icon;
            hideErrorDisplay(msgElem);
            addOKInputClassName(msgElem);
        }

        if (elem2Val.length==0) {
            msgElem2Obj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_INPUT + errorStatusSuffix;
            addErrorClassName(name);
        } else if (!elem2Val.match(/^[0-9A-Za-z]{4,20}$/)) {
            msgElem2Obj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_NUMERIC2 + errorStatusSuffix;
            addErrorClassName(name);
        } else if (elemVal != elem2Val) {
            msgElem2Obj.innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_NOMATCH + errorStatusSuffix;
            addErrorClassName(name);
        } else {
            msgElem2Obj.innerHTML = OK_icon;
            cutErrorClassName(name);
            hideErrorDisplay(msgElem2);
        }
    }
}

// イベント初期化
function initEvent(division, page, mode, dm, language, country) {
    // page 1:member_register, 2:member_change, 4:cart(new), 5:contact, 6:genpassword, 3:others, 7:cart(member)
    formOnloadStatus = true;
    return;
}

// イベント定義
function setEvent(division, page, dm, language, country) {
    // page 1:member_register, 2:member_change, 4:cart(new), 5:contact, 6:genpassword, 3:others, 7:cart(member)
    if (!jQuery('#name')[0]) {
        return;
    }
    jQuery('#name').on('keyup focus blur', function () {checkEasyInput('name', 'name_status', true);});

    if (page==5) {
        // お問い合わせ
        jQuery('#email1').on('keyup focus blur', function () {checkEmailDual(false, false, 0);});
        jQuery('#email1').on('blur', function (e) {convertCharacter(jQuery(e.target).attr('id'), true);});
        jQuery('#title').on('keyup focus blur', function () {checkEasyInput('title', 'title_status', true);});
        jQuery('#content').on('keyup focus blur', function () {checkEasyInput('content', 'content_status', true);});
    } else if (page==6) {
        // パスワード忘れ
        jQuery('#email1').on('keyup focus blur', function () {checkEmail(false);});
        jQuery('#email1').on('blur', function (e) {convertCharacter(jQuery(e.target).attr('id'), true);});
    } else {
        jQuery('#address_postaljp, #address_postal, #email1, #tel, #tel1, #tel2, #tel3, #fax, #fax1, #fax2, #fax3').on('blur', function (e) {convertCharacter(jQuery(e.target).attr('id'), true);});

        if (language=='Japanese') {
            jQuery('#name_ph').on('keyup focus blur', function () {checkKana(false);});
        }
        if (division == 2 || division == 3) {
            jQuery('#company_name').on('keyup focus blur', function () {checkCompanyName(division, false);});
            jQuery('#department_name').on('keyup focus blur', function () {checkEasyInput('department_name', 'department_name_status', false);checkCompanyName(division, true);});
        }
        if (country==true) {//国が表示されていたら国のチェック
            jQuery('#address_country').on('change', function () {checkCountry(language, false);setLocalArea(language);checkOverSeaTel(language);});
            jQuery('#address_country').on('focus blur', function () {checkCountry(language, false);});
            jQuery('#address_localarea').on('change focus blur', function () {checkEasySelect('address_localarea', 'address_localarea_status', true);});
        }
        if (language=='Japanese') {
            if (jQuery('#address_postaljp_block').css('display') != 'none') {
                latestPostal = jQuery('#address_postaljp').val();
            }
            jQuery('#address_postaljp').on('keyup blur', function () {checkPostal();checkKana(true);});
            jQuery('#address_postaljp').on('focus', function () {checkPostal();});
            jQuery('#address_pref').on('focus', function () {hideDiaphanousDisplay('address_pref');});
            jQuery('#address_pref').on('change', function () {checkPrefecture(country);checkKana(true);checkOverSeaTel(language);});
            jQuery('#address_pref').on('blur', function () {checkPrefecture(country);checkKana(true);});
        }
        if (language!='Japanese' || country==true) {
            jQuery('#address_postal').on('keyup focus blur', function () {checkPostalEng();});
        }
        jQuery('#address1').on('keyup focus blur', function () {checkEasyInput('address1', 'address1_status', true);});
        jQuery('#address2').on('keyup focus blur', function () {checkEasyInput('address2', 'address2_status', false);});
        jQuery('#address3').on('keyup focus blur', function () {checkAddress3(language);});
;
        if (page==1 || page==4) {
            var registration = (page==1) ? true : false;
            jQuery('#email1, #email2').on('keyup focus blur', function () {checkEmailDual(true, registration, 0);});
        } else if (page==2) {
            jQuery('#email1').on('keyup focus blur', function () {checkEmail(true);});
        } else if (page==7) {
            jQuery('#email1, #email2').on('keyup focus blur', function () {checkEmailDual(true, true, 1);});
        }
        if (language=='Japanese') {
            jQuery('#tel1, #tel2, #tel3').on('keyup focus blur', function () {checkTelInput('tel1', 'tel2', 'tel3', 'tel_status', true, false);});
        } else {
            jQuery('#tel').on('keyup focus blur', function () {checkTelInputEng('tel', 'tel_status', true);});
        }
        if (page==1 || page==2 || page==4 || page==7) {
            if (language=='Japanese') {
                jQuery('#fax1, #fax2, #fax3').on('keyup focus blur', function () {checkTelInput('fax1', 'fax2', 'fax3', 'fax_status', false, false);});
            } else {
                jQuery('#fax').on('keyup focus blur', function () {checkTelInputEng('fax', 'fax_status', false);});
            }
            if (dm==true) {
                jQuery('#dm1, #dm2').on('click focus blur', function () {checkDm();});
            }
        }

        if (page==1 || page==2 || (page==4 && jQuery('#pswd'))) {
            var required = (page==2) ? false : true;
            jQuery('#pswd, #pswd2').on('keyup focus blur', function () {checkPasswordInput('pswd', 'pswd_status', 'pswd2', 'pswd2_status', required);});
        }

        if (page==4 || page==7) {
            jQuery('#birthdate_y, #birthdate_m, #birthdate_d').on('change focus', function () {checkBirthdate();});
        }
    }
}

function checkCompanyName(division, strict) {
    var required = (division == 2 || (division == 3 && (jQuery('#company_name').val() || jQuery('#department_name').val()))) ? true : false;
    checkEasyInput('company_name', 'company_name_status', required, strict);
}

function checkKana(strict) {
    var country = jQuery('#address_country')[0];
    if ((country && country.value != '' && country.value != '61') || jQuery('#address_pref').val() == '48') {
        var required = false;
    } else {
        var required = true;
    }

    var namePhVal = jQuery('#name_ph').val();
    var msgElemObj = jQuery('#name_ph_status')[0];
    var err = false;
    if (namePhVal.length==0) {
        if (required) {
            err = true;
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_INPUT + errorStatusSuffix;
            addErrorClassName('name_ph');
            hideDiaphanousDisplay('name_ph_status');
        } else {
            msgElemObj.innerHTML = "";
            cutRowStatus('name_ph_status');
        }
    } else {
        var res = checkKanaCharacterCode(namePhVal);
        if (res) {
            msgElemObj.innerHTML = OK_icon;
            cutErrorClassName('name_ph');
            hideErrorDisplay('name_ph_status', strict);
        } else {
            err = true;
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_KATAKANA + errorStatusSuffix;
            addErrorClassName('name_ph');
            if (!strict) {
                hideDiaphanousDisplay('name_ph_status');
            }
        }
    }

    if (!required && !err) {
        hideErrorDisplay('name_ph_status', true);
    }
    setRequired('name_ph_required', required);
}

function checkPostal() {
    checkPostalInput('address_postaljp', 'address_postaljp_status', true, 'address_pref', 'address1', 'address2', 'Japanese');
}

function checkPostalEng() {//英語の時
    var country = jQuery('#address_country')[0];
    if (country.value == '58') {// Hong Kong
        checkEasyInput('address_postal', 'address_postal_status', false);
    } else {
        checkEasyInput('address_postal', 'address_postal_status', true);
    }
}
function checkCountry(language, strict) {
    var msgElem = 'address_country_status';
    var msgElemObj = jQuery('#' + msgElem)[0];
    var country = jQuery('#address_country')[0];
    var required = false;
    if (!country) {
        return false;
    }
    if (language=='Japanese' && 1 < jQuery('#address_pref').find('option').length) {
        if (country.value == "" || country.value == '61') {
            if (jQuery('#address_postaljp_block').css('display') == 'none') {
                jQuery('#address_postaljp_block, #address_pref_block, #address1_title, #address2_title, #address3_city').css('display', '');
                jQuery('#address_postaljp').val(jQuery('#address_postal').val());
                jQuery('#address_postal_block').css('display', 'none');
                if (jQuery('#address_pref').val() == '48') {
                    jQuery('#address_pref').val('1');
                }
                toggleFormLine('address_postaljp_status', 'block');
                toggleFormLine('address_postal_status', 'none');
                toggleFormLine('address_pref_status', 'block');
                checkPostal();
            }
        } else {
            if (jQuery('#address_postal_block').css('display') == 'none') {
                jQuery('#address_postaljp_block, #address_pref_block, #address1_title, #address2_title, #address3_city').css('display', 'none');
                jQuery('#address_postal_block').css('display', '');
                jQuery('#address_postal').val(jQuery('#address_postaljp').val());
                toggleFormLine('address_postaljp_status', 'none');
                toggleFormLine('address_postal_status', 'block');
                toggleFormLine('address_pref_status', 'none');
                checkPostalEng();
            }
        }
        checkKana(true);
    }

    if (language=='English' || jQuery('#address_pref')[0].value == '48') {
        required = true;
    }
    if (country.value == "") {
        if (required) {
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + MSG_SELECT + errorStatusSuffix;
            addErrorClassName(msgElem);
            hideDiaphanousDisplay(msgElem);
        }
        else {
            msgElemObj.innerHTML = "";
            hideErrorDisplay(msgElem, strict);
            cutRowStatus(msgElem);
        }
    } else {
        var pref = jQuery('#address_pref')[0];
        if (pref && pref.value == '48' && country.value == '61') {
            jQuery('#address_country_status')[0].innerHTML = errorStatusPrefix + messageBr + NG_icon + MSG_PREF + errorStatusSuffix;
            addErrorClassName(msgElem);
            hideDiaphanousDisplay(msgElem);
        } else {
            msgElemObj.innerHTML = OK_icon;
            cutErrorClassName(msgElem);
            hideErrorDisplay(msgElem, strict);
        }
    }

    if (language!='English') {
        if ((country && country.value != '' && country.value != '61') || (country && country.value == '' && jQuery('#address_pref').val() == '48')) {
            setRequired('country_required', true);
        } else {
            setRequired('country_required', false);
        }
    }
}

function checkPrefecture(country, language) {
    checkEasySelect('address_pref', 'address_pref_status', true);
    if (country) {
        checkCountry(language, true);
    }
}
function checkOverSeaTel(language) {
    if (language=='English') {
        return;
    }
    var en = false;
    var strict = true;
    var country = jQuery('#address_country')[0];
    if ((country && country.value != '' && country.value != '61') || (!country && jQuery('#address_pref').val() == '48')) {
        en = true;
    }
    if (jQuery('#tel1').val() || jQuery('#tel2').val() || jQuery('#tel3').val()) {
        checkTelInput('tel1', 'tel2', 'tel3', 'tel_status', true, strict);
    }
    if (jQuery('#fax1')[0]){
        if (jQuery('#fax1').val() || jQuery('#fax2').val() || jQuery('#fax3').val()) {
            checkTelInput('fax1', 'fax2', 'fax3', 'fax_status', false, strict);
        }
    }
}

function checkAddress3(language) {
    var required = (language=='English') ? true : false;
    checkEasyInput('address3', 'address3_status', required);
}

function checkEmail(overlap) {
    checkEmailInput('email1', 'email1_status', true, overlap);
}

function checkEmailDual(overlap, registration, login) {
    var email1Val = convertCharacter(jQuery('#email1').val(), false);
    copyConfirmEmail();
    var email1Error = false;
    if (email1Val.length==0) {
        jQuery('#email1_status')[0].innerHTML = errorStatusPrefix + NG_icon + MSG_INPUT + errorStatusSuffix;
        addErrorClassName('email1');
        cutOKInputClassName('email1');
        email1Error = true;
    } else if (!email1Val.match(/^[\/0-9A-Za-z_-][+?\/0-9A-Za-z.._-]*@[0-9A-Za-z_-]+[\.]+[0-9A-Za-z_..-]+[A-Za-z]$/)) {
        jQuery('#email1_status')[0].innerHTML = errorStatusPrefix + NG_icon + MSG_INPUT2 + errorStatusSuffix;
        addErrorClassName('email1');
        cutOKInputClassName('email1');
        email1Error = true;
    } else {
        var needOverlapCheck = false;
        if (overlap) {
            if (registration) {
                needOverlapCheck = true;
            } else {
                if (jQuery('#pswd')[0]) {
                    needOverlapCheck = true;
                }
            }
        }
        if (needOverlapCheck) {
            checkOverlapEmail('email1', 'email1_status', login);
            return;
        } else {
            jQuery('#email1_status')[0].innerHTML = OK_icon;
            addOKInputClassName('email1');
        }
    }
    if (!email1Error) {
        cutErrorClassName('email1');
        hideErrorDisplay('email1_status');
    }
}

function copyConfirmEmail() {
    if (jQuery('#email1_block').length) {
        var $confirmElem = jQuery('#email1_block').find('.confirm_email');
    } else {
        var $confirmElem = jQuery('#email1_data').find('.confirm_email');
    }
    if (0 < $confirmElem.length) {
        var email1Val = jQuery('#email1').val();
        $confirmElem.text(email1Val);
        if (email1Val.length==0) {
            $confirmElem.css("display", "none");
        } else {
            $confirmElem.css("display", "block");
        }
    }
}

function checkDm() {
    if (!jQuery('#dm1')[0].checked && !jQuery('#dm2')[0].checked) {
        jQuery('#dm_status')[0].innerHTML = errorStatusPrefix + NG_icon + MSG_SELECT + errorStatusSuffix;
        addErrorClassName('dm');
    } else {
        jQuery('#dm_status')[0].innerHTML = errorStatusPrefix + OK_icon;
        cutErrorClassName('dm');
        hideErrorDisplay('dm_status');
    }
}

function checkQuestion(page, name, required, onloadFlag, type) {
    // page 1:member_register, 4:cart, 5:contact
    var baseName = 'question_' + name;
    var baseName2;
    var q_msgElem;
    var status;
    var errMsg;
    var ngIcon;

    if (page==4) {
        baseName2 = 'customer_' + baseName;
        q_msgElem="customer_question_status_" + name;
    } else {
        baseName2 = baseName;
        q_msgElem="question_status_" + name;
    }

    if (type == 'checkbox' || type == 'radio') {
        status = false;
        jQuery('.'+baseName).each(function (i, elem) {
            var flag = jQuery(elem).prop('checked');
            if (flag) {
                status = true;
            }
        });
    } else {
        q_length = document.getElementById(baseName).value.length;
        if (q_length==0) {
            status = false;
        } else {
            status = true;
        }
    }

    if (status == false) {
        if (required) {
            if (type == 'checkbox' || type == 'radio' || type == 'select') {
                errMsg = MSG_SELECT;
            } else {
                errMsg = MSG_INPUT;
            }
            if (type == 'checkbox' || type == 'radio') {
                ngIcon = NG_icon2;
            } else {
                ngIcon = NG_icon;
            }
            jQuery('#' + q_msgElem)[0].innerHTML = errorStatusPrefix + ngIcon + errMsg + errorStatusSuffix;
            addErrorClassName(baseName2);
            hideDiaphanousDisplay(q_msgElem);
        } else {
            jQuery('#' + q_msgElem)[0].innerHTML = "";
            cutRowStatus(q_msgElem);
        }
    } else {
        jQuery('#' + q_msgElem)[0].innerHTML = OK_icon;
        cutErrorClassName(baseName2);
        if (onloadFlag !== 1) {
            hideErrorDisplay(q_msgElem);
        }
    }
}

function checkVerification(page, name) {
    // page 4:cart
    if (page==4) {
        var msgElem = name + '_status';
        var msgElemObj = jQuery('#' + msgElem)[0];
        if (jQuery('input[name=' + name + ']:checked').val()) {
            msgElemObj.innerHTML = OK_icon;
            cutErrorClassName(name);
            hideErrorDisplay(msgElem);
        } else {
            msgElemObj.innerHTML = messageBr + errorStatusPrefix + NG_icon + MSG_CONFIRM + errorStatusSuffix;
            addErrorClassName(name);
            hideDiaphanousDisplay(msgElem);
        }
    }
}

function checkBirthdate() {
    var name = 'birthdate';
    var msgElem = name + '_status';
    var msgElemObj = jQuery('#' + msgElem)[0];
    var age = limitAge;
    var year = jQuery('#' + name + '_y').val();
    var month = jQuery('#' + name + '_m').val();
    var day = jQuery('#' + name + '_d').val();

    if (year == '' || month == '' || day == '') {
        msgElemObj.innerHTML = errorStatusPrefix + NG_icon + ageMsg1 + errorStatusSuffix;
        addErrorClassName(name);
        hideDiaphanousDisplay(msgElem);
    } else {
        year = parseInt(year);
        month = parseInt(month) - 1;
        day = parseInt(day);
        age = parseInt(age);
        var birthdate = new Date(year, month, day);

        if (year != birthdate.getFullYear() || month != birthdate.getMonth() || day != birthdate.getDate()) {
            msgElemObj.innerHTML = errorStatusPrefix + NG_icon + ageMsg2 + errorStatusSuffix;
            addErrorClassName(name);
            hideDiaphanousDisplay(msgElem);
        } else {
            var today = (new Date()).getTime();
            var bd = (new Date((year + age), month, day)).getTime();
            if (today < bd) {
                msgElemObj.innerHTML = errorStatusPrefix + NG_icon + ageMsg3 + errorStatusSuffix;
                addErrorClassName(name);
                hideDiaphanousDisplay(msgElem);
            } else {
                msgElemObj.innerHTML = OK_icon;
                cutErrorClassName(name);
                hideErrorDisplay(msgElem);
            }
        }
    }
}

function mailCheck(elem) {
    var msgElem = elem + '_status';
    checkEmailInput(elem, msgElem, true, '');
}

function setLocalArea(language) {
    var val = jQuery('#address_country')[0].value;
    var addressCityElem = jQuery('#address3_city')[0];
    var listobj = jQuery('#address_localarea')[0];
    listobj.length = 0;
    listobj[0] = new Option('----', '');
    if (val && (val == 202 || val == 222 || val == 238)) {
        var pars = "go=address-local-search&countryid=" + val;
        jQuery.ajax({
            type: 'GET',
            url: xmlUrl,
            data: pars,
            dataType: 'json',
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).done(function (data, status) {
            if (data) {
                jQuery('#address_localarea_block')[0].style.display = '';
                if (language=='English' && addressCityElem) {
                    addressCityElem.innerHTML = "(City)";
                }
                for (var i=0;i<data.local.length;i++) {
                    listobj[i+1] = new Option(data.local[i].name, data.local[i].id);
                }
                hideDiaphanousDisplay('address_localarea_status');
                toggleFormLine('address_localarea_status', 'block');
            }
        });
    } else {
        toggleFormLine('address_localarea_status', 'none');
        jQuery('#address_localarea_block')[0].style.display = 'none';
        if (language=='English' && addressCityElem) {
            addressCityElem.innerHTML = "(City, State/Province)";
        }
    }
}

function convertCharacter(name, elemFlag) {
    if (elemFlag == true) {
        var inputElem = jQuery('#' + name);
        if (!inputElem || !inputElem.val()) {
            return;
        }
        var str = inputElem.val();
    } else {
        var str = name;
    }

    var list = {
        'ａ':'a','ｂ':'b','ｃ':'c','ｄ':'d','ｅ':'e','ｆ':'f','ｇ':'g','ｈ':'h','ｉ':'i','ｊ':'j','ｋ':'k','ｌ':'l','ｍ':'m','ｎ':'n','ｏ':'o','ｐ':'p','ｑ':'q','ｒ':'r','ｓ':'s','ｔ':'t','ｕ':'u','ｖ':'v','ｗ':'w','ｘ':'x','ｙ':'y','ｚ':'z',
        'Ａ':'A','Ｂ':'B','Ｃ':'C','Ｄ':'D','Ｅ':'E','Ｆ':'F','Ｇ':'G','Ｈ':'H','Ｉ':'I','Ｊ':'J','Ｋ':'K','Ｌ':'L','Ｍ':'M','Ｎ':'N','Ｏ':'O','Ｐ':'P','Ｑ':'Q','Ｒ':'R','Ｓ':'S','Ｔ':'T','Ｕ':'U','Ｖ':'V','Ｗ':'W','Ｘ':'X','Ｙ':'Y','Ｚ':'Z',
        '０':'0','１':'1','２':'2','３':'3','４':'4','５':'5','６':'6','７':'7','８':'8','９':'9',
        '　':' ','！':'!','＃':'#','＄':'$','％':'%','＆':'&','（':'(','）':')','＊':'*','＋':'+','，':',','－':'-','ー':'-','．':'.','／':'/','：':':','；':';','＜':'<','＝':'=','＞':'>','？':'?','＠':'@','［':'[','］':']','＾':'^','＿':'_','｛':'{','｜':'|','｝':'}'
    };

    var re = /[ａ-ｚＡ-Ｚ０-９　！＃＄％＆（）＊＋，－ー．／：；＜＝＞？＠［］＾＿｛｜｝]/g;
    str = str.replace(re, function(m){return list[m];});

    if (elemFlag == true) {
        inputElem.val(str);
    } else {
        return str;
    }
}

function checkKanaCharacterCode(str) {
    var testChar = 'あ';
    if (testChar.charCodeAt(0) != 0x3042) {
        return true;//not javascript check
    }
    str = convertCharacter(str);//convert for check
    if (str=='' || str.match(/^[&+?\/0-9A-Za-z@.._\-\s]+$/)) {
       return true;
    }
    var cnt = str.length;
    for (i=0; i<cnt; i++) {
        if (str[i].match(/^[&+?\/0-9A-Za-z@.._\-\s]+$/)) {
            continue;
        }
        var code = str.charCodeAt(i);
        if (0x3040 <= code && code <= 0x309f) {//hiragana
            continue;
        }
        if (0x30a0 <= code && code <= 0x30ff) {//katakana
            continue;
        }
        if (0xff61 <= code && code <= 0xff9f) {//half-size katakana
            continue;
        }
        return false;
    }
    return true;
}

function setDisableOnSubmit(formSelector, timeoutSpeed) {
    var formObj = jQuery(formSelector)[0];
    if (!formObj) {
        return false;
    }
    var formButtons = jQuery(':submit, :image');
    var diableForm = function () {
        return false;
    };
    var timerID;
    var resetAttr = function (elem) {
        jQuery(elem).css({'cursor': '', 'opacity': '', 'filter': ''});
        jQuery(elem).off('click', diableForm);
        clearTimeout(timerID);
    };
    var escPress = function (e) {
        if (e.keyCode === 27) { // ESC key
            resetAttr(formButtons);
            jQuery(document).off('keyup', escPress);
        }
        return true;
    };
    var timeoutSec;
    if (timeoutSpeed === 'fast') {
        timeoutSec = 5;
    } else if (timeoutSpeed === 'slow') {
        timeoutSec = 15;
    } else {
        if (String(timeoutSpeed).match(/^[0-9]+$/)) {
            timeoutSec = timeoutSpeed;
        } else {
            timeoutSec = 10;
        }
    }
    var timeout = timeoutSec * 1000;
    jQuery(formObj).on('submit', function (event) {
        formButtons.css({'cursor': 'progress', 'opacity': '0.7', 'filter': 'alpha(opacity=70)'});
        jQuery(formButtons).on('click', diableForm);
        timerID = setTimeout(function(){
            resetAttr(formButtons);
        }, timeout);
        jQuery(window).on('unload', function () {
            resetAttr(formButtons);
        });
        if (timeoutSec < 15) {
            jQuery(document).on('keyup', escPress);
        }
    });
}
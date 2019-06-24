$(function() {

    var ckUser = function(obj){
        obj.user = {
            login: function () {
                var _this = this;

                var curUser = jqm_webTools.cookieTools.cookieUser();
                if (curUser){
                    if (curUser.type != 0){
                        jqm_template.user.nav.success(curUser);
                    }
                    jqm_api.user.get(curUser.uid, curUser.sid, _this.getUserCallBack);
                }else{
                    jqm_template.user.nav.login();
                }
            },
            getUserCallBack: function (error, status, data) {
                var _this = this;

                if (error){
                    return false;
                }

                if (data.success){
                    var userObj = data.data;
                    if (userObj.type != 0){
                        jqm_webTools.cookieTools.setCookie('userInfo', JSON.stringify(userObj), 7);
                    }
                }

            },
            registerSubmit: function (formData) {
                var _this = this;

                $.ajax({
                    url: '/user/register/submit',
                    type: "post",
                    timeout : 15000,
                    data: formData,
                    dataType : "json",
                    beforeSend: function() {
                        $('.error-tips').text('')
                        $('.error-tips').hide()
                    },
                    error: function(xhr, errorType, error) {
                    },
                    success: function(data, status, xhr){
                        if (data.success){
                            alert('注册成功，请重新登录')
                            location.href = '/user/login/index'
                        }else {
                            $('.error-tips').text(data.msg)
                            $('.error-tips').show();
                        }
                    },
                    complete: function(xhr, status){
                    }
                });
            },
            loginSubmit: function (formData) {
                var _this = this;

                $.ajax({
                    url: '/user/login/submit',
                    type: "post",
                    timeout : 15000,
                    data: formData,
                    dataType : "json",
                    beforeSend: function() {
                        $('.error-tips').text('')
                        $('.error-tips').hide()
                    },
                    error: function(xhr, errorType, error) {
                    },
                    success: function(data, status, xhr){
                        if (data.success){
                            alert('登录成功，跳转至首页')
                            location.href = '/'
                        }else {
                            $('.error-tips').text(data.msg)
                            $('.error-tips').show();
                        }
                    },
                    complete: function(xhr, status){
                    }
                });
            },
            sign: function () {
                var _this = this;

                var curUser = jqm_webTools.cookieTools.cookieUser();
                if (curUser){
                    _this.signSubmit(curUser.uid, curUser.sid)
                }
            },
            signSubmit: function (uid, sid) {
                var _this = this;

                $.ajax({
                    url: wServer + '/task/sign',
                    type: "get",
                    timeout : 15000,
                    data: {uid: uid, sid: sid},
                    dataType : "jsonp",
                    jsonp: "jsonpcallback",
                    jsonpCallback: "jiqimao_jsoncallback" + new Date().getTime(),
                    beforeSend: function() {
                    },
                    error: function(xhr, errorType, error) {
                    },
                    success: function(data, status, xhr){
                        if (data.success){
                            alert('签到成功')
                            location.reload()
                        }else {
                            alert(data.msg)
                        }
                    },
                    complete: function(xhr, status){
                    }
                });
            },
            infoSubmit: function (formData) {
                var _this = this;

                $.ajax({
                    url: '/user/info/submit',
                    type: "post",
                    timeout : 15000,
                    data: formData,
                    dataType : "json",
                    beforeSend: function() {
                    },
                    error: function(xhr, errorType, error) {
                    },
                    success: function(data, status, xhr){
                        if (data.success){
                            alert('保存成功')
                            location.reload()
                        }else {
                            alert(data.msg)
                        }
                    },
                    complete: function(xhr, status){
                    }
                });
            },
            addEvent: function () {
                var _this = this;

                $(document).on('click', '.reg-forward-button', function () {
                    location.href = '/user/register/index'
                })

                $(document).on('click', '.captcha-icon', function () {
                    $(this).attr('src', '/tools/captcha/get?v=' + new Date().getTime());
                })

                $(document).on('click', '.reg-submit-button', function () {
                    var val = $('input[name="email"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('邮箱地址不能为空')
                        return false;
                    }
                    val = $('input[name="password"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('密码不能为空')
                        return false;
                    }
                    val = $('input[name="rePassword"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('重复密码不能为空')
                        return false;
                    }
                    val = $('input[name="nickname"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('昵称不能为空')
                        return false;
                    }
                    val = $('input[name="captcha"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('验证码不能为空')
                        return false;
                    }

                    _this.registerSubmit($('#reg-form').serialize());
                })

                $(document).on('click', '.login-submit-button', function () {
                    var val = $('input[name="email"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('邮箱地址不能为空')
                        return false;
                    }
                    val = $('input[name="password"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('密码不能为空')
                        return false;
                    }
                    val = $('input[name="captcha"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('验证码不能为空')
                        return false;
                    }

                    _this.loginSubmit($('#login-form').serialize());
                })

                $(document).on('click', '.sign-bt', function () {
                    if ($(this).hasClass('signed')){
                        return false;
                    }
                    _this.sign();
                })

                $(document).on('click', '.info-submit-button', function () {
                    var val = $('input[name="nickname"]').val();
                    if (val == '' || !val){
                        $('.error-tips').text('昵称不能为空')
                        return false;
                    }
                    val = $('input[name="sex"]:checked').val();
                    if (val == '' || !val){
                        $('.error-tips').text('性别不能为空')
                        return false;
                    }

                    _this.infoSubmit($('#info-form').serialize());
                })

            },
            init: function() {
                var _this = this;
                _this.login();
                _this.addEvent();
            }
        }

        return obj;
    }(ckUser || {});
    ckUser.user.init();
})

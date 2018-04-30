var $ = require('jquery');
var URLBase = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://192.168.43.36:8080',
    'devURLBase': 'http://192.168.43.36:8080',
    'prodURLBase': ''
}
/**
 * @require './index.scss'
 */
var data = {
    logOrReg: 'log'
};
var emailRep = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

var index = {
    init: function() {
        this.listener();
        console.log(document.cookie.JSESSIONID, document.cookie.rememberMe, document.cookie.status)
    },
    listener: function() {
        $('.tab:first-child').on('click', this.tab1Clk);
        $('.tab:last-child').on('click', this.tab2Clk);
        $('#btn-login').on('click', this.login);
        $('#btn-register').on('click', this.register);
    },
    // 切换登录
    tab1Clk: function(e) {
        data.logOrReg = 'log';

        $('.tab:last-child').addClass('transparent');
        index.toggleFormCtn('log', 'reg');
        index.deleteTransparent(this);
    },
    // 切换注册
    tab2Clk: function(e) {
        data.logOrReg = 'reg';

        $('.tab:first-child').addClass('transparent');
        index.toggleFormCtn('reg', 'log');
        index.deleteTransparent(this);
    },
    toggleFormCtn: function(showPre, hidePre) {
        $('.' + showPre + '-form-ctn').removeClass('hide');
        $('.' + hidePre + '-form-ctn').addClass('hide');
    },
    deleteTransparent: function(dom) {
        $(dom).removeClass('transparent');
    },
    // 登录
    login: function(e) {
        var email = $('#log-email').val(),
            password = $('#log-password').val();

        $('.error-tips').addClass('hide'); 

        if (!emailRep.test(email)) {
            $('.error-tips').text('请输入正确格式的邮箱').removeClass('hide');
            return;
        }
        if (password.length === 0) {
            $('.error-tips').text('请输入密码').removeClass('hide');
            return;
        }
        $.ajax(URLBase.localURLBase + '/loginController/login', {
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                console.log(res)
                if (res.status === 200) {
                    // location.href = '/#/home';
                    // $.ajax(apiBase + '/loginController/logout', {
                    //     xhrFields: {
                    //         withCredentials: true
                    //     },
                    // })
                }
            },
            error: function(err) {
                console.log(err);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },
    // 注册
    register: function(e) {
        var email = $('#reg-email').val(),
            password = $('#reg-password').val(),
            username = $('#reg-username').val(),
            phone = $('#reg-phone').val();

        $('.error-tips').addClass('hide'); 

        if (!emailRep.test(email)) {
            $('.error-tips').text('请输入正确格式的邮箱').removeClass('hide');
            return;
        }
        if (password.length < 6 || password.length > 16) {
            $('.error-tips').text('请输入6-16个字符的密码').removeClass('hide');
            return;
        }
        if (username.length < 2 || username.length > 8) {
            $('.error-tips').text('请输入2-8个字符的用户名').removeClass('hide');
            return;
        }

        var ajaxData = {
            email: email,
            password: password,
            username: username
        };

        if (!(phone.length === 0 || /^1\d{10}$/.test(phone))) {
            $('.error-tips').text('输入的手机号码格式错误').removeClass('hide');
            return;
        }
        if (!(phone.length === 0)) ajaxData.phone = phone;
        
        $.ajax(URLBase.localURLBase + '/registerController/register', {
            type: 'POST',
            data: ajaxData,
            success: function(data) {
                $.ajax(URLBase.localURLBase + '/loginController/login', {
                    type: 'POST',
                    data: {
                        email: email,
                        password: password
                    },
                    success: function(res) {
                        if (res.status === 200) {
                            location.href = '/#/home';
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                });
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
};

module.exports = index;
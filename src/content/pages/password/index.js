var $ = require('jquery');
var baseURL = {
    'contentURL': '/graduation-design/dist/sp/pages/',
    'localURLBase': 'http://localhost:8080',
    'devURLBase': 'http://localhost:8080',
    'prodURLBase': ''
};
/**
 * @require './index.scss'
 */
var data = {
    timer: null
}
var emailRep = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var index = {
    init: function() {
        this.listener();
    },
    listener: function() {
        $('#save').on('click', this.save);
    },
    setToast: function(txt) {
        $('.toast-txt').text(txt);
        $('.toast-ctn').addClass('show');
        if (data.timer) {
            clearTimeout(data.timer);
        }
        data.timer = setTimeout(function() {
            $('.toast-ctn').removeClass('show');
        }, 2000);
    },
    save: function(e) {
        if (!emailRep.test($('#email').val())) {
            index.setToast('请输入正确格式的邮箱');
            return;
        }
        if ($('#password').val().length < 6 || $('#password').val().length > 16) {
            index.setToast('请输入6-16个字符的密码');
            return;
        }
        $.ajax(baseURL.localURLBase + '/registerController/changePassword', {
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(res) {
                if (res.status === 200) {
                    location.href = '/graduation-design/dist/sp/pages/account/index.html';
                } else {
                    alert('更改失败，code:' + res.status);
                }
            },
            error: function() {
                console.log('err');
            }
        })
    }
};

module.exports = index;
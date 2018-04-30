var $ = require('jquery');
var baseURL = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://localhost:4000',
    'localURLBase2': 'http://192.168.43.36:8080',
    'prodURLBase': ''
};
/**
 * @require './index.scss'
 */

var index = {
    init: function() {
        this.listener();
    },
    listener: function() {
        $('#save').on('click', this.save);
    },
    save: function(e) {
        $.ajax(baseURL.localURLBase + '/registerController/changePassword', {
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(res) {
                if (res.status === 200) {
                    location.href = '/sp/pages/account';
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
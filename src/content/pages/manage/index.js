var $ = require('jquery');

var URLBase = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://localhost:4000',
    'devURLBase': 'http://192.168.199.195:8080',
    'prodURLBase': ''
}
/**
 * @require './index.scss'
 */
var data = {
    logOrReg: 'log',
    powerList: [],
    timer: null
};
var index = {
    init: function() {
        this.getPowerList();
    },
    getPowerList: function() {
        
        $.ajax({
            url: URLBase.devURLBase + '/functionController/findMenu',
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status !== 200) {
                    index.setToast(res.msg);
                    return;
                }
                data.powerList = index.arrangePowerList(res.data);
            }
        });
    },
    arrangePowerList: function(rawList) {
        return rawList;
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
    }
};

module.exports = index;
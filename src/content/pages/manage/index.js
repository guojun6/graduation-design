var $ = require('jquery');
require('fetch');
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
        var url = URLBase.devURLBase + '/functionController/findMenu';
        fetch(url).then(function(RES) {
            return RES.json();
        }).then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        });
        // $.ajax({
        //     url: URLBase.devURLBase + '/functionController/findMenu',
        //     crossDomain: true,
        //     success: function(res) {
        //         if (res.status !== 200) {
        //             index.setToast(res.msg);
        //             return;
        //         }
        //         powerList = res.data;
        //     }
        // });
    },
    setToast: function(txt) {
        $('.toast-txt').text(txt).addClass('show');
        if (data.timer) {
            clearTimeout(data.timer);
        }
        data.timer = setTimeout(function() {
            $('.toast-txt').removeClass('show');
        }, 2000);
    }
};

module.exports = index;
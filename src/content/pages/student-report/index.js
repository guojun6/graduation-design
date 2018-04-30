var $ = require('jquery');
var utils = require('utils');

/**
 * @require './index.scss'
 * @require '../../libs/kindeditor/themes/default/default.css'
 */
var baseURL = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://localhost:8080',
    'devURLBase': 'http://localhost:8080',
    'prodURLBase': ''
};
var data = {
    timer: null,
};
var index = {
    init: function() {
        this.listener();
    },
    listener: function() {
        $('#btn-save').on('click', function() {
            
        });
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
    findIndexByKey: function(arr, key, value) {
        var i = arr.length;
        while(i--) {
            if (arr[i][key] === value) {
                return i;
            }
        }
        return -1;
    },
    
};

module.exports = index;
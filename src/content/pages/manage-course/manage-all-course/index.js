var $ = require('jquery');

/**
 * @require './index.scss'
 */
var baseURL = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://localhost:4000',
    'devURLBase': 'http://192.168.199.195:8080',
    'prodURLBase': ''
};

var data = {
    nowPage: 1,
    allPage: 4
};

var index = {
    init: function() {
        this.getTestList();
        this.listener();
    },
    listener: function() {
        // 页码
        $('#btn-page-index').on('click', function(e) {
            console.log(data.nowPage)
            if (data.nowPage === 1) {
                index.setToast('已经是首页了哦');
                return;
            }
            index.setNowPage(1);

        });
        $('#btn-page-prev').on('click', function(e) {
            if (data.nowPage === 1) {
                index.setToast('已经是首页了哦');
                return;
            }
            index.setNowPage(data.nowPage - 1);

        });
        $('#btn-page-next').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.nowPage + 1);
        });
        $('#btn-page-tail').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.allPage);
        });
        $('#btn-go-page').on('click', function(e) {
            var pageNum = $('#num-of-page').val();

            if (
                !Number(pageNum) ||
                pageNum > data.allPage || pageNum < 1
            ) {
                index.setToast('请输入数字1到' + data.allPage + '');
                return;
            }
            index.setNowPage(Number(pageNum));
        });
    },
    getTestList: function() {
        $.ajax(baseURL.devURLBase + '/itemController/listByTeacher', {

        });
        data.allPage = 4;
        $('#page-count').text(data.allPage);
    },
    setNowPage: function(num) {
        data.nowPage = num;
        $('#now-page').text(num);
    },
    setToast: function(txt) {
        $('.toast-ctn').addClass('show')
        $('.toast-txt').text(txt);
        if (data.timer) {
            clearTimeout(data.timer);
        }
        data.timer = setTimeout(function() {
            $('.toast-ctn').removeClass('show');
        }, 2000);
    }
};

module.exports = index;
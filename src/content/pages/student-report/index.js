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
    studentId: null,
    courseId: null,
    reportId: null,
    report: '',
    review: ''
};
var index = {
    init: function() {
        var queryArr = location.search.slice(1).split('&'), 
            temp;
        for (var i = 0; i < queryArr.length; i++) {
            temp = queryArr[i].split('=');
            if (temp[0] === 'studentId') {
                data.studentId = temp[1];
            }else if (temp[0] === 'courseId') {
                data.courseId = temp[1];
            }
        }

        this.listener();
        this.getReports();
    },
    listener: function() {
        $('#btn-save').on('click', function() {
            var url, data;
            if (data.reportId) {
                url = '/reportController/updateByStudent';
                data = {
                    id: data.reportId,
                    desc: editor.html()
                };
            } else {
                url = '/reportController/add';
                data = {
                    studentId: data.studentId,
                    itemId: data.courseId,
                    desc: editor.html()
                };
            }
            $.ajax(baseURL.localURLBase + url, {
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                success: function(res) {
                    if (res.status === 200) {
                        index.setToast('保存成功');
                    } else{
                        index.setToast('保存失败');
                    }
                }
            })
        });
        $('#btn-preshow').on('click', function() {

        });
    },
    getReports: function() {
        $.ajax(baseURL.localURLBase + '/reportController/listByStudent', {
            data: {
                page: 1
            },
            success: function(res) {
                if (res.status !== 200) {
                    index.setToast('获取实验报告失败，尝试刷新或重新编辑');
                    return;
                }
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].itemId == data.courseId) {
                        data.report = res.data[i].desc;
                        data.reportId = res.data[i].id;
                        data.review = res.data[i].review;
                        editor.html(data.report);
                        break;
                    }
                }
            },
            xhrFields: {
                withCredentials: true
            }
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
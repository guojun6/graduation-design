var $ = require('jquery');
var utils = require('utils');

/**
 * @require './index.scss'
 * @require '../../libs/kindeditor/themes/default/default.css'
 */
var baseURL = {
    'contentURL': '/graduation-design/dist/sp/pages/',
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
var editorReady = false;

KindEditor.ready(function(K) {
    window.editor = K.create('#editor_id', {
        basePath: '/sp/libs/kindeditor/',
        //指定上传文件参数名称
        filePostName  : "uploadFile",
        //指定上传文件请求的url。
        uploadJson : '/reportController/pic/upload',
        //上传类型，分别为image、flash、media、file
        dir : "image"
    });
    
    editorReady = true;
    $('.full-screen').addClass('hide');
});
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
        this.getCourseInfo();

        this.setToast('加载中，请稍候')
    },
    listener: function() {
        $('#btn-save').on('click', function() {
            var url, ajaxdata;
            if (data.reportId) {
                url = '/reportController/updateByStudent';
                ajaxdata = {
                    id: data.reportId,
                    desc: editor.html()
                };
            } else {
                url = '/reportController/add';
                ajaxdata = {
                    studentId: data.studentId,
                    itemId: data.courseId,
                    desc: editor.html()
                };
            }
            $.ajax(baseURL.localURLBase + url, {
                data: ajaxdata,
                xhrFields: {
                    withCredentials: true
                },
                success: function(res) {
                    if (res.status === 200) {
                        index.setToast('保存成功');
                        if (!data.reportId) {
                            data.reportId = res.data;
                        }
                    } else{
                        index.setToast('保存失败');
                    }
                }
            })
        });
        $('#btn-preshow').on('click', function() {
            $('#preshow').html(editor.html());
            $('.preshow-box').removeClass('hide');
        });
        $('.preshow-box').on('click', function(e) {
            if (e.target === this) {
                $(this).addClass('hide');
            }
        })
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


                        if (editorReady) {
                            editor.html(data.report);
                        } else {
                            var timer = setInterval(function() {
                                if (editorReady) {
                                    editor.html(data.report);
                                    clearInterval(timer);
                                }
                            }, 1000);
                        }
                        
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
    getCourseInfo: function() {
        $.ajax(baseURL.localURLBase + '/itemController/listById', {
            xhrFields: {
                withCredentials: true
            },
            data: {
                id: data.courseId
            },
            success: function(res) {
                $('.title').text('实验《'+ res.data.name +'》的报告');
            }
        })
    }
};

module.exports = index;
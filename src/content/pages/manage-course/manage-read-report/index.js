var $ = require('jquery');

/**
 * @require './index.scss'
 * @require '../../../libs/kindeditor/themes/default/default.css'
 */
var baseURL = {
    'contentURL': '/graduation-design/dist/sp/pages/',
    'localURLBase': 'http://120.79.52.130',
    'devURLBase': 'http://120.79.52.130',
    'prodURLBase': ''
};

var data = {
    nowPage: 1,
    allPage: 0,
    courseList: [],
    selectCourseId: [],
    alertSignal: 'del',
    courseId: null
};
editorReady = false;
// KindEditor.ready(function(K) {
//     window.editor = K.create('#editor_id', {
//         basePath: '/sp/libs/kindeditor/',
//         //指定上传文件参数名称
//         filePostName  : "uploadFile",
//         //指定上传文件请求的url。
//         uploadJson : '/pic/upload',
//         //上传类型，分别为image、flash、media、file
//         dir : "image"
//     });
//     editorReady = true;
// });
var index = {
    init: function() {
        var queryArr = location.search.slice(1).split('&'), 
            temp;
        for (var i = 0; i < queryArr.length; i++) {
            temp = queryArr[i].split('=');
            if (temp[0] === 'courseId') {
                data.courseId = temp[1];
            }
        }
        console.log(data.courseId)
        this.getTestList(1);
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
            index.getTestList(Number(1));
        });
        $('#btn-page-prev').on('click', function(e) {
            if (data.nowPage === 1) {
                index.setToast('已经是首页了哦');
                return;
            }
            index.setNowPage(data.nowPage - 1);
            index.getTestList(Number(data.nowPage));
        });
        $('#btn-page-next').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.nowPage + 1);
            index.getTestList(Number(data.nowPage));
        });
        $('#btn-page-tail').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.allPage);
            index.getTestList(Number(data.allPage));
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
            index.getTestList(Number(pageNum));
            index.setNowPage(Number(pageNum));
        });
        $('#btn-page-refresh').on('click', function(e) {
            location.reload();
        })
        // 
        // 选择全部
        $('#select-all').on('click', function(e) {
            data.selectCourseId = [];

            if ($(this).prop('checked')) {
                for (var i = 0, l = data.courseList.length; i < l; i++) {
                    data.selectCourseId.push(data.courseList[i].id);
                }
            }
            $('.course-check').prop('checked',  $(this).get(0).checked);
        });
        // 选择单项
        $(document).on('click', '#course-list > tr ', function(e) {
            var $check = $(this).find('.course-check').get(0);
            
            if (e.target === $check) {
                $check.checked = !$check.checked;
            }
            
            var id = data.courseList[$(this).index()].id;
            if ($check.checked) {
                var index = data.selectCourseId.indexOf(id);
                data.selectCourseId.splice(index, 1);
            } else {
                data.selectCourseId.push(id);
            }
            $check.checked = !$check.checked;
            
            console.log(data.selectCourseId)
        });
        // alert
        $('.barrier').on('click', function(e) {
            if (e.target === this) {
                $(this).addClass('hide');
            }
        });
        $('#btn-check').on('click', index.checkReport);
        $('.preshow-box').on('click', function(e) {
            if (e.target === this) {
                $(this).addClass('hide');
            }
        });
        $('#btn-edit').on('click', index.reviewReport);
        $('#btn-save-review').on('click', index.saveReview);
    },
    getTestList: function(page) {
        $.ajax(baseURL.localURLBase + '/itemController/listById', {
            data: {
                id: data.courseId
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                $('.course-name').text(res.data.name)
            }
        })
        $.ajax(baseURL.localURLBase + '/reportController/listByItemId', {
            data: {
                itemId: data.courseId,
                page: page,
                // pageCount: 10
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 200) {
                    if (res.data) {
                        data.courseList = res.data;
                    } else {
                        data.courseList = [];
                    }
                    
                    
                    data.selectCourseId = [];
                    $('#course-list').empty();
                    for (var i = 0, l = data.courseList.length; i < l; i++) {
                        $('#course-list').append(
                            $('<tr></tr>')
                                .append($('<td><input class="course-check" type="checkbox"></td>'))
                                .append($('<td>' + res.data[i].id + '</td>'))
                                .append($('<td id="student'+ i +'">' + '</td>'))
                        );
                        (function(i) {
                            $.ajax(baseURL.localURLBase + '/userController/getUserInfo' + '?l=1', {
                                data: {
                                    id: res.data[i].studentId
                                },
                                xhrFields: {
                                    withCredentials: true
                                },
                                success: function(res) {
                                    if (res.status === 200) {
                                        $('#student' + i).text(res.data.username);
                                    }
                                }
                            })
                        })(i);
                    }
                }
                data.allPage = res.pageCount;

                $('#page-count').text(data.allPage);
            }
        });
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
    },
    checkReport: function() {
        if (data.selectCourseId.length !== 1) {
            index.setToast('请选择一个权限功能进行查看');
            return;
        }
        $('.preshow-box').removeClass('hide');
        var i = index.findIndexByKey(data.courseList, 'id', data.selectCourseId[0])

        $('#preshow').html(data.courseList[i].desc);
        $('.review').html(data.courseList[i].review);
    },
    reviewReport: function() {
        if (data.selectCourseId.length !== 1) {
            index.setToast('请选择一个权限功能进行查看');
            return;
        }
        if (typeof editor === 'undefined') {
            index.setToast('文本编辑器加载中，请稍候');
            return;
        }
        $('.textarea-box').closest('.barrier').removeClass('hide');
        var i = index.findIndexByKey(data.courseList, 'id', data.selectCourseId[0]);

        editor.html(data.courseList[i].review);
    },
    saveReview: function() {
        $.ajax(baseURL.localURLBase + '/reportController/reviewReportByTeacher', {
            data: {
                id: data.selectCourseId[0],
                review: editor.html()
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status !== 200) {
                    index.setToast('保存失败 code：' + res.status);
                } else {
                    index.setToast('保存成功');
                    $('.textarea-box').closest('.barrier').addClass('hide');
                    location.reload();
                }
            }
        })
    },
    findIndexByKey: function(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return -1;
    }
};

module.exports = index;
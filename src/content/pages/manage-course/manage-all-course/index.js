var $ = require('jquery');

/**
 * @require './index.scss'
 */
var baseURL = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://localhost:8080',
    'devURLBase': 'http://192.168.43.36:8080',
    'prodURLBase': ''
};

var data = {
    nowPage: 1,
    allPage: 0,
    courseList: [],
    selectCourseId: [],
    alertSignal: 'del',
    allPage: 0,
    nowPage: 1
};

var index = {
    init: function() {
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
        $(document).on('click', '#course-list > tr', function(e) {
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
        // 删除权限
        $('#btn-del').on('click', function(e) {
            if (data.selectCourseId.length === 0) {
                index.setToast('请选择至少一个权限功能进行删除');
                return;
            }
            $('#alert')
                .closest('.barrier')
                .removeClass('hide')
                .find('.body')
                .text('编号为' + data.selectCourseId[0] + '的权限功能吗？');
        });
        // 编辑权限
        $('#btn-edit').on('click', function(e) {
            index.openDialog();
        });
        // alert
        $('.barrier').on('click', function() {
            console.log(this, e)
        });
        $('#alert .btn-ensure').on('click', index.clkEnsure);
        $('#alert .btn-cancel').on('click', index.clkCancel);
    },
    getTestList: function(page) {
        $.ajax(baseURL.localURLBase + '/itemController/listByTeacher', {
            data: {
                page: page,
                // pageCount: 10
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 200) {
                    data.courseList = res.data;
                    data.selectCourseId = [];
                    $('#course-list').empty();
                    for (var i = 0, l = res.data.length; i < l; i++) {
                        $('#course-list').append(
                            $('<tr></tr>')
                                .append($('<td><input class="course-check" type="checkbox"></td>'))
                                .append($('<td>' + res.data[i].id + '</td>'))
                                .append($('<td>' + res.data[i].name + '</td>'))
                                .append($('<td>' + res.data[i].teacherId + '</td>'))
                                .append($('<td>' + res.data[i].teacherName + '</td>'))
                                .append($('<td>' + res.data[i].cid + '</td>'))
                                .append($('<td>' + res.data[i].status + '</td>'))
                                .append($('<td>' + res.data[i].visitorAllow + '</td>'))
                        )
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
    // alert
    clkEnsure(e) {
        e.stopPropagation();
        e.preventDefault();

        // do something
        if (data.alertSignal === 'del') {
            $.ajax(baseURL.localURLBase + '/itemController/deleteItem', {
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    ids: data.selectCourseId.join('-')
                },
                success: function(res) {
                    if (res.status !== 200) {
                        index.setToast('删除失败 code：' + res.status);
                        index.closeAlert();
                    } else {
                        location.reload();
                    }
                }
            })
        }
    },
    clkCancel(e) {
        e.stopPropagation();
        e.preventDefault();
        
        // do something

        index.closeAlert();
    },
    closeAlert() {
        $('#alert').closest('.barrier').addClass('hide');
    },
    openDialog: function() {
        if (data.selectCourseId.length !== 1) {
            index.setToast('请选择一个权限功能进行编辑');
            return;
        }
        location.href = '/sp/pages/manage-course/manage-edit-course?id=' + data.selectCourseId[0];
    }
    
};

module.exports = index;
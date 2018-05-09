var $ = require('jquery');

/**
 * @require './index.scss'
 */
var baseURL = {
    'contentURL': '/graduation-design/dist/sp/pages/',
    'localURLBase': 'http://192.168.43.36:8080',
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
    nowPage: 1,
    userInfo: null,
    classList: null,
    readyToGetCourseList: 0, // 2即可
    courseStatus: null
};

var index = {
    init: function() {
        // this.getTestList(1);
        this.getUerInfo();
        this.getTestClassList();
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
                .text('编号为' + data.selectCourseId.join(', ') + '的权限功能吗？');
        });
        // 编辑权限
        $('#btn-edit').on('click', function(e) {
            index.openDialog();
        });
        // alert
        $('.barrier').on('click', function(e) {
            // console.log(this, e)
            if (e.target === this) {
                $(this).addClass('hide');
            }
        });
        $('#alert .btn-ensure').on('click', index.clkEnsure);
        $('#alert .btn-cancel').on('click', index.clkCancel);
        $('#btn-report').on('click', index.readReport);
        // 关闭dialog
        $('.btn-normal-close').on('click', function() {
            $(this).closest('.barrier').addClass('hide');
        });
        $('#save-power').on('click', index.saveStatus);
    },
    getUerInfo: function() {
        $.ajax(baseURL.localURLBase + '/userController/getUserInfo'/* + '?l=1'*/, {
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 200) {
                    data.userInfo = res.data;
                    $.ajax(baseURL.localURLBase + '/roleController/getRoleById', {
                        xhrFields: {
                            withCredentials: true
                        },
                        data: {
                            id: res.data.role
                        },
                        success: function(res) {
                            if (++data.readyToGetCourseList === 2) {
                                data.userInfo.roleName = res.data.name;
                                index.getTestList(1);
                            }
                        }
                    });
                } else if (res.status === 300) {
                    index.setToast('请登录')
                }
            }
        });
    },
    // 获取实验类目
    getTestClassList: function(cb) {
        $.ajax(baseURL.localURLBase + '/itemCatController/list', {
            data: {
                page: 1,
            },
            success: function(res) {
                if (res.status === 200) {
                    cb && cb();
                    if (++data.readyToGetCourseList === 2) {
                        index.getTestList(1);
                    }
                    var classList = {};
                    for (var i = 0; i < res.data.length; i++) {
                        classList[res.data[i].id] = res.data[i].name;
                    }
                    data.classList = classList;
                }
            },
            xhrFields: {
                withCredentials: true
            }
        })
    },
    getTestList: function(page) {
        var api;
        if (data.userInfo.roleName === '老师') {
            
            api = '/itemController/listByTeacher';
        } else {
            $('#btn-report').addClass('hide');
            $('#btn-edit').text('查看/审核');
            api = '/itemController/list';
        }
        $.ajax(baseURL.localURLBase + api, {
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
                                .append($('<td>' + res.data[i].imgUrl + '</td>'))
                                .append($('<td>' + res.data[i].courseUrl + '</td>'))
                                .append($('<td>' + data.classList[res.data[i].cid] + '</td>'))
                                .append($('<td>' + 
                                (res.data[i].status === 1 ? '正常' : (res.data[i].status === 2 ? '未上线' : (res.data[i].status === 4 ? '待审核' : '删除'))) + 
                                '</td>'))
                                .append($('<td>' + 
                                (res.data[i].visitorAllow == 1 ? '允许' : '不允许') +
                                '</td>'))
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
    clkEnsure: function(e) {
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
    clkCancel: function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        // do something

        index.closeAlert();
    },
    closeAlert: function() {
        $('#alert').closest('.barrier').addClass('hide');
    },
    findIndexByKey: function(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return -1;
    },
    openDialog: function() {
        if (data.selectCourseId.length !== 1) {
            index.setToast('请选择一个实验进行编辑');
            return;
        }
        if (data.userInfo.roleName.indexOf('老师') > -1) {
            location.href = '/graduation-design/dist/sp/pages/manage-course/manage-edit-course/index.html?id=' + data.selectCourseId[0];
        } else {
            // console.log(data.courseList[index.findIndexByKey(data.courseList, 'id', data.selectCourseId[0])].status)
            $('#power-status').val(data.courseList[index.findIndexByKey(data.courseList, 'id', data.selectCourseId[0])].status);
            $.ajax(baseURL.localURLBase + '/itemDescController/listByItemId', {
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    id: data.selectCourseId[0]
                },
                success: function(res) {
                    if (res.status === 200) {
                        $('#preshow').html(res.data.itemDesc)
                    }
                }
            })
            $('#dialog-edit').closest('.barrier').removeClass('hide');
        }
        
    },
    readReport: function() {
        if (data.selectCourseId.length !== 1) {
            index.setToast('请选择一个权限功能进行编辑');
            return;
        }
        location.href = '/graduation-design/dist/sp/pages/manage-course/manage-read-report/index.html?courseId=' + data.selectCourseId[0];
    },
    saveStatus: function() {
        var course = data.courseList[index.findIndexByKey(data.courseList, 'id', data.selectCourseId[0])];
        delete course.created;
        delete course.updated;
        course.status = $('#power-status').val();
        $.ajax(baseURL.localURLBase + '/itemController/updateItem', {
            xhrFields: {
                withCredentials: true
            },
            data: course,
            success: function(res) {
                if (res.status === 200) {
                    $('#dialog-edit').closest('.barrier').addClass('hide');
                    location.reload();
                } else {
                    index.setToast('保存失败，请重试');
                }
            }
        })
    }
    
};

module.exports = index;
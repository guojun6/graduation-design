var $ = require('jquery');
var utils = require('utils');

/**
 * @require './index.scss'
 */
var baseURL = {
    'contentURL': '/graduation-design/dist/sp/pages/',
    'localURLBase': 'http://localhost:8080',
    'devURLBase': 'http://localhost:8080',
    'prodURLBase': ''
};
var data = {
    timer: null,
    openDialogType: null, // 'add' or 'edit'
    selectPowerListId: [],
    powerList: [],
    alertSignal: 'del',
    allPage: 0,
    nowPage: 1,
    roleList: {}
};
var index = {
    init: function() {
        this.listener();
        this.getRoleList(1);
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
            index.getRoleList(1);
        });
        $('#btn-page-prev').on('click', function(e) {
            if (data.nowPage === 1) {
                index.setToast('已经是首页了哦');
                return;
            }
            index.setNowPage(data.nowPage - 1);
            index.getRoleList(Number(data.nowPage));
        });
        $('#btn-page-next').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.nowPage + 1);
            index.getRoleList(Number(data.nowPage));
        });
        $('#btn-page-tail').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.allPage);
            index.getRoleList(Number(data.allPage));
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
            index.getRoleList(Number(pageNum));
            index.setNowPage(Number(pageNum));
        });
        $('#btn-page-refresh').on('click', function(e) {
            location.reload();
        });
        // 选择全部
        $('#select-all').on('click', function(e) {
            data.selectPowerListId = [];

            if ($(this).prop('checked')) {
                for (var i = 0, l = data.powerList.length; i < l; i++) {
                    data.selectPowerListId.push(data.powerList[i].id);
                }
            }
            $('.power-check').prop('checked',  $(this).get(0).checked);
        });
        // 选择单项
        $(document).on('click', '#power-list > tr', function(e) {
            var $check = $(this).find('.power-check').get(0);

            if (e.target === $check) {
                $check.checked = !$check.checked;
            }

            var id = data.powerList[$(this).index()].id;
            if ($check.checked) {
                var index = data.selectPowerListId.indexOf(id);
                data.selectPowerListId.splice(index, 1);
            } else {
                data.selectPowerListId.push(id);
            }
            $check.checked = !$check.checked;
            
            console.log(data.selectPowerListId)
        });
        // 编辑权限
        $('#btn-edit').on('click', function(e) {
            data.openDialogType = 'edit';
            index.openDialog();
        });
        // 关闭dialog
        $('.btn-normal-close').on('click', function() {
            $(this).closest('.barrier').addClass('hide');
        });
        // 保存添加或编辑
        $('#save-power').on('click', function(e) {
            console.log('sad')
            var ajaxData = {
                roleIds: $('#power-role').val(),
            },
            url = baseURL.localURLBase + '/userController/editRole';
            if (data.openDialogType === 'edit') {
                ajaxData.userId = data.selectPowerListId[0];
            }
            console.log(url)
            $.ajax(url, {
                data: ajaxData,
                xhrFields: {
                    withCredentials: true
                }, 
                success: function(res) {
                    index.setToast('成功！');
                    $('#dialog-edit').closest('.barrier').addClass('hide');
                    location.reload();
                },
                error: function(err,a,b) {
                    console.log(err,a,b)
                }
            });
        });
        // alert
        $('.barrier').on('click', function() {
            console.log(this)
        });
        $('#alert .btn-ensure').on('click', index.clkEnsure);
        $('#alert .btn-cancel').on('click', index.clkCancel);
    },
    setNowPage: function(num) {
        data.nowPage = num;
        $('#now-page').text(num);
    },
    getRoleList: function(page) {
        var roleList = {};
        var page = 1;
        (function getRole(p) {
            $.ajax(baseURL.localURLBase + '/roleController/listAll', {
                data: {
                    page: p
                },
                success: function(res) {
                    if (res.status === 200) {
                        for (var i = 0, l = res.data.length; i < l; i++) {
                            roleList[res.data[i].id] = res.data[i].name;
                        }
                        if (res.pageCount <= p) {
                            data.roleList = roleList;
                            for (var key in data.roleList) {
                                $('#power-role').append(
                                    $('<option value="' + key + '">' + data.roleList[key] + '</option>')
                                )
                            }
                            
                            console.log(data.roleList)
                            getList();
                        } else {
                            getRole(++p);
                        }
                    }
                },
                xhrFields: {
                    withCredentials: true
                }
            });
        })(page);
        function getList() {
            $.ajax(baseURL.localURLBase + '/userController/listAll', {
                data: {
                    // pageCount: 2,
                    page: page
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function(res) {
                    if (res.status === 200) {
                        data.powerList = res.data;
                        $('#power-list').empty();

                        for (var i = 0, l = res.data.length; i < l; i++) {
                            $('#power-list').append(
                                $('<tr></tr>')
                                    .append($('<td><input class="power-check" type="checkbox"></td>'))
                                    .append($('<td>' + res.data[i].id + '</td>'))
                                    .append($('<td>' + res.data[i].username + '</td>'))
                                    .append($('<td>' + res.data[i].email + '</td>'))
                                    .append($('<td>' + roleList[res.data[i].role] + '</td>'))
                                    .append($('<td>' + res.data[i].phone + '</td>'))
                                    .append($('<td>' + res.data[i].profilehead + '</td>'))
                            );
                        }
                        data.allPage = res.pageCount;

                        $('#page-count').text(data.allPage);
                    }
                }
            });
        }
    },
    openDialog: function() {
        if (data.openDialogType === 'add') {

        } else if (data.openDialogType === 'edit') {
            if (data.selectPowerListId.length !== 1) {
                index.setToast('请选择一个权限功能进行编辑');
                return;
            }
            var powerObjIndex = index.findIndexByKey(data.powerList, 'id', data.selectPowerListId[0]);
            $('#power-role').val(data.powerList[powerObjIndex]['role']);
        }
        $('#dialog-edit').closest('.barrier').removeClass('hide');
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
    // alert
    clkEnsure: function(e) {
        e.stopPropagation();
        e.preventDefault();

        // do something
        if (data.alertSignal === 'del') {
            if (data.selectPowerListId.length !== 1) {
                index.setToast('请选择一个权限功能进行删除');
                return;
            }
            $.ajax(baseURL.localURLBase + '/roleController/delete', {
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    id: data.selectPowerListId[0]
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
    }
};

module.exports = index;
var $ = require('jquery');
var utils = require('utils');

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
    timer: null,
    openDialogType: null, // 'add' or 'edit'
    selectPowerListId: [],
    powerList: [],
    alertSignal: 'del',
    allPage: 0,
    nowPage: 1,
    nowPowerPage: 1
};
var index = {
    init: function() {
        this.listener();
        this.getRoleList(1);
        this.getPowerList(data.nowPowerPage);
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
        // 添加权限
        $('#btn-add').on('click', function(e) {
            data.openDialogType = 'add';
            index.openDialog();
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
            var ajaxData = {
                name: $('#power-name').val(),
                description: $('#power-description').val(),
                functionIds: $('#power-ids').val().join('-')
            },
            url = baseURL.localURLBase + '/roleController/' + data.openDialogType;
            if (data.openDialogType === 'edit') {
                ajaxData.id = data.selectPowerListId[0];
            }
            
            $.ajax(url, {
                data: ajaxData,
                xhrFields: {
                    withCredentials: true
                }, 
                success: function(res) {
                    index.setToast('成功！');
                    $('#dialog-edit').closest('.barrier').addClass('hide');
                    location.reload();
                }
            });
        });
        // 删除权限
        $('#btn-del').on('click', function(e) {
            if (data.selectPowerListId.length === 0) {
                index.setToast('请选择至少一个权限功能进行删除');
                return;
            }
            $('#alert')
                .closest('.barrier')
                .removeClass('hide')
                .find('.body')
                .text('编号为' + data.selectPowerListId.join(', ') + '的权限功能吗？');
        });
        // alert
        $('.barrier').on('click', function() {
            console.log(this)
        });
        $('#alert .btn-ensure').on('click', index.clkEnsure);
        $('#alert .btn-cancel').on('click', index.clkCancel);
        $('#more-power').on('click', function() {
            index.getPowerList(data.nowPowerPage);
        });
    },
    setNowPage: function(num) {
        data.nowPage = num;
        $('#now-page').text(num);
    },
    getRoleList: function(page) {
        $.ajax(baseURL.localURLBase + '/roleController/listAll', {
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
                                .append($('<td>' + res.data[i].name + '</td>'))
                                .append($('<td id="litem'+ i +'">' + '</td>'))
                                .append($('<td>' + res.data[i].description + '</td>'))
                        );
                        (function(j) {
                            $.ajax(baseURL.localURLBase + '/functionController/getByRoleId', {
                                data: {
                                    id: res.data[j].id
                                },
                                xhrFields: {
                                    withCredentials: true
                                },
                                success: function(res) {
                                    console.log(data.powerList, j )
                                    data.powerList[j].functionIds = '';

                                    for (var i = 0, l = res.data.length; i < l; i++) {
                                        $('#litem' + j).append(/*'[id: ' + res.data[i].id + ', name: ' + */res.data[i].name /*+ ']'*/).append('<br/>');
                                        data.powerList[j].functionIds += res.data[i].id + '-';
                                        console.log(res.data[i].id)
                                    }

                                    data.powerList[j].functionIds = data.powerList[j].functionIds.slice(0, -1);
                                    console.log(data.powerList[j].functionIds)
                                }
                            });
                        })(i);
                    }
                    data.allPage = res.pageCount;

                    $('#page-count').text(data.allPage);
                }
            }
        });
    },
    openDialog: function() {
        if (data.openDialogType === 'add') {
            $('#power-name').val('');
            $('#power-description').val('');
            $('#power-ids').val('');
        } else if (data.openDialogType === 'edit') {
            if (data.selectPowerListId.length !== 1) {
                index.setToast('请选择一个权限功能进行编辑');
                return;
            }
            var powerObjIndex = index.findIndexByKey(data.powerList, 'id', data.selectPowerListId[0]);
            $('#power-name').val(data.powerList[powerObjIndex]['name']);
            $('#power-description').val(data.powerList[powerObjIndex]['description']);
            $('#power-ids').val(data.powerList[powerObjIndex]['functionIds'] ? data.powerList[powerObjIndex]['functionIds'].split('-') : '');
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
    },
    getPowerList: function(page) {
        $('#more-power').addClass('hide');
        $.ajax(baseURL.localURLBase + '/functionController/listAll', {
            data: {
                page: page
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status !== 200) {
                    index.setToast('获取权限列表失败，请刷新');
                    return;
                }
                data.nowPowerPage++;
                if (data.nowPowerPage > res.pageCount) {
                    $('#more-power').addClass('hide');
                    index.setToast('无更多的权限了');
                } else {
                    $('#more-power').removeClass('hide');
                }
                for (var i = 0; i < res.data.length; i++) {
                    $('#power-ids').append(
                        $('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>')
                    );
                }                
            }
        })
    },
};

module.exports = index;
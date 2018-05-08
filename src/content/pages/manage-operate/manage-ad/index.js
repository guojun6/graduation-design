var $ = require('jquery');
var utils = require('utils');
require('fetch');

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
    openDialogType: null, // 'addImage' or 'updateImage'
    selectPowerListId: [],
    powerList: [],
    alertSignal: 'del',
    filePath: '',
    oldFilePath: '',
    uploading: false,
    nowPage: 1,
    allPage: 0
};
var index = {
    init: function() {
        this.listener();
        this.getPowerList(1, 1);
        this.getPowerList(2, 1);
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
            index.getPowerList(1, Number(1));
            index.getPowerList(2, Number(1));
            $('#power-list').empty();
            data.powerList = [];
        });
        $('#btn-page-prev').on('click', function(e) {
            if (data.nowPage === 1) {
                index.setToast('已经是首页了哦');
                return;
            }
            index.setNowPage(data.nowPage - 1);
            index.getPowerList(1, Number(data.nowPage));
            index.getPowerList(2, Number(data.nowPage));
            $('#power-list').empty();
            data.powerList = [];
        });
        $('#btn-page-next').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.nowPage + 1);
            index.getPowerList(1, Number(data.nowPage));
            index.getPowerList(2, Number(data.nowPage));
            $('#power-list').empty();
            data.powerList = [];
        });
        $('#btn-page-tail').on('click', function(e) {
            if (data.nowPage === data.allPage) {
                index.setToast('已经是最后一页了哦');
                return;
            }
            index.setNowPage(data.allPage);
            index.getPowerList(1, Number(data.nowPage));
            index.getPowerList(2, Number(data.allPage));
            $('#power-list').empty();
            data.powerList = [];
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
            index.getPowerList(1, Number(pageNum));
            index.getPowerList(2, Number(pageNum));
            index.setNowPage(Number(pageNum));
            $('#power-list').empty();
            data.powerList = [];
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
            data.openDialogType = 'addImage';
            index.openDialog();
        });
        // 编辑权限
        $('#btn-edit').on('click', function(e) {
            data.openDialogType = 'updateImage';
            index.openDialog();
        });
        // 关闭dialog
        $('.btn-normal-close').on('click', function() {
            $(this).closest('.barrier').addClass('hide');
        });
        // 保存添加或编辑
        $('#save-power').on('click', function(e) {
            if (data.uploading) {
                index.setToast('图片上传中，请稍后再保存');
                return;
            }
            console.log(data.filePath)
            var ajaxData = {
                name: $('#power-name').val(),
                desc: $('#power-desc').val(),
                path: data.filePath,
                url: $('#power-url').val(),
                type: Number($('#power-type').val())
            },
            url = baseURL.localURLBase + '/imageController/' + data.openDialogType;
            if (data.openDialogType === 'updateImage') {
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
            if (data.selectPowerListId.length !== 1) {
                index.setToast('请选择一个权限功能进行删除');
                return;
            }
            $('#alert')
                .closest('.barrier')
                .removeClass('hide')
                .find('.body')
                .text('编号为' + data.selectPowerListId[0] + '的权限功能吗？');
        });
        // alert
        $('.barrier').on('click', function(e) {
            console.log(this, e)
        });
        $('#alert .btn-ensure').on('click', index.clkEnsure);
        $('#alert .btn-cancel').on('click', index.clkCancel);

        // 上传文件
        $('#power-path').on('change', index.uploadFile);
        $('#power-path-show').on('click', function() {
            $('#power-path').click();
        });
    },
    setNowPage: function(num) {
        data.nowPage = num;
        $('#now-page').text(num);
    },
    getPowerList: function(type, page) {
        $.ajax(baseURL.localURLBase + '/imageController/getImagesInfoByType', {
            xhrFields: {
                withCredentials: true
            },
            data: {
                type: type,
                page: page,
                // pageCount: 10
            },
            success: function(res) {
                if (res.status === 200) {
                    // data.powerList = res.data;
                    for (var i = 0, l = res.data.length; i < l; i++) {
                        data.powerList.push(res.data[i]);
                    }
                    
                    // data.powerList.splice(data.powerList.length, 0, res.data);
                    for (var i = 0, l = res.data.length; i < l; i++) {
                        $('#power-list').append(
                            $('<tr></tr>')
                                .append($('<td><input class="power-check" type="checkbox"></td>'))
                                .append($('<td>' + res.data[i].id + '</td>'))
                                .append($('<td>' + res.data[i].name + '</td>'))
                                .append($('<td>' + res.data[i].type + '</td>'))
                                .append($('<td>' + res.data[i].description + '</td>'))
                                .append($('<td>' + res.data[i].path + '</td>'))
                                .append($('<td>' + res.data[i].url + '</td>'))
                        )
                    }
                }
                if (data.allPage < res.pageCount) {
                    data.allPage = res.pageCount;
                    $('#page-count').text(res.pageCount);
                }
            }
        });
    },
    openDialog: function() {
        if (data.openDialogType === 'addImage') {
            $('#power-name').val('');
            $('#power-desc').val('');
            $('#power-type').val('');
            $('#power-path-show').text('');
            $('#power-url').val('');
        } else if (data.openDialogType === 'updateImage') {
            if (data.selectPowerListId.length !== 1) {
                index.setToast('请选择一个权限功能进行编辑');
                return;
            }
            var powerObjIndex = index.findIndexByKey(data.powerList, 'id', data.selectPowerListId[0]);

            data.filePath = data.powerList[powerObjIndex]['path'];
            data.oldFilePath = data.filePath;

            $('#power-name').val(data.powerList[powerObjIndex]['name']);
            $('#power-desc').val(data.powerList[powerObjIndex]['description']);
            $('#power-type').val(data.powerList[powerObjIndex]['type']);
            // $('#power-path').val(data.powerList[powerObjIndex]['path']);
            $('#power-path-show').text(data.filePath);
            $('#power-url').val(data.powerList[powerObjIndex]['url']);
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
            $.ajax(baseURL.localURLBase + '/imageController/deleteImage', {
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
    uploadFile: function() {
        data.uploading = true;
        var files = $('#power-path').get(0).files;
		if ($('#power-path').get(0).value.length < 1 || !files) {
			return false;
		}
		if (files.length > 1) {
			index.setToast('只能上传一张照片');
			return false;
		}
        $('#power-path-show').text($('#power-path').get(0).value);
        if (typeof FormData === 'undefined') {
            index.setToast('请换成版本较高的浏览器进行上传');
            return;
        }
		var formData = new FormData();
		var avatar = files[0];

        formData.append('file', avatar);
        if (data.oldFilePath) {
            formData.append('path', data.oldFilePath);
        }
		fetch(baseURL.localURLBase + '/fileController/upload', {
            body: formData,
            method: 'POST',
            credentials: 'include',
            mode: 'cors'
			// headers: {
			// 	'Content-Type': 'multipart/form-data'
			// }
		}).then(function(RES) {
            return RES.json();
        }).then(function(res) {
            data.uploading = false;
			if (res.status !== 200) {
				index.setToast(res.msg);
			} else {
				// this.getAvatar();
                data.filePath = res.data;
			}
		}).catch(function(err) {
            index.setToast(err);
        });
    }
    
};

module.exports = index;
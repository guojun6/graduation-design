var $ = require('jquery');
var utils = require('utils');

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
    timer: null,
    openDialogType: null, // 'add' or 'edit'
    selectPowerListId: [],
    powerList: []
};
var index = {
    init: function() {
        this.listener();
        this.getPowerList();
    },
    listener: function() {
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
                name: $('#power-name'),
                description: $('#power-description'),
                page: $('#power-page'),
                pid: $('#power-pid')
            },
            url = '/functionController/' + data.openDialogType;
            if (data.openDialogType === 'edit') {
                ajaxData.id = DataCuea.selectPowerListId[0]
            }
            $.ajax(url, {
                data: ajaxData,
                success: function(res) {
                    index.setToast('成功！');
                    $('#dialog-edit').closest('.barrier').addClass('hide');
                }
            });
        });
    },
    getPowerList: function() {
        $.ajax(baseURL.devURLBase + '/functionController/listAll', {
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 200) {
                    data.powerList = res.data;

                    for (var i = 0, l = res.data.length; i < l; i++) {
                        $('#power-list').append(
                            $('<tr></tr>')
                                .append($('<td><input class="power-check" type="checkbox"></td>'))
                                .append($('<td>' + res.data[i].name + '</td>'))
                                .append($('<td>' + res.data[i].page + '</td>'))
                                .append($('<td>' + res.data[i].id + '</td>'))
                                .append($('<td>' + res.data[i].pid + '</td>'))
                                .append($('<td>' + res.data[i].description + '</td>'))
                        )
                    }
                }
            }
        });
    },
    openDialog: function() {
        if (data.openDialogType === 'add') {

        } else if (data.openDialogType === 'edit') {
            console.log('111',data.selectPowerListId.length)
            if (data.selectPowerListId.length !== 1) {
                console.log('fs')
                index.setToast('请选择一个权限功能进行编辑');
                return;
            }
            var powerObjIndex = index.findIndexByKey(data.powerList, 'id', data.selectPowerListId[0]);
            $('#power-name').val(data.powerList[powerObjIndex]['name']);
            $('#power-description').val(data.powerList[powerObjIndex]['description']);
            $('#power-page').val(data.powerList[powerObjIndex]['page']);
            $('#power-pid').val(data.powerList[powerObjIndex]['pid']);
        }
        $('#dialog-edit').closest('.barrier').removeClass('hide');
    },
    setToast: function(txt) {
        console.log('dds')
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
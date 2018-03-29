var $ = require('jquery');
var arrangeLevelList = require('utils').arrangeLevelList;
console.log(arrangeLevelList)
// require('../../../libs/kindeditor/kindeditor-all.js');
// require('../../../libs/kindeditor/lang/zh-CN.js');

/**
 * @require './index.scss'
 * @require '../../../libs/kindeditor/themes/default/default.css'
 */

var baseURL = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://localhost:4000',
    'devURLBase': 'http://192.168.199.195:8080',
    'prodURLBase': ''
};
var data = {
    courseId: null,
    classList: [],
    timer: null
};

var index = {
    init: function() {
        data.courseId = index.formatQuery(location.search).courseId;
        this.listener();
        this.getTestClassList();
        // index.getDocContent();
    },
    listener: function() {
        // 保存编辑
        $('#save').on('click', function(e) {
            var api = data.courseId ? '/itemController/updateItem' : '/itemController/addItem';
            var ajaxData = {
                name: $('#test-name').val(),
                status: Number($('#test-status').val()),
                cid: Number($('#class-type2').val()),
                visitorAllow: Number($('#allow-visitor').val()),
                desc: editor.html(),
                teacherName: $('#test-teacher').val()
            };
            if (data.courseId) {
                ajaxData.id = data.courseId;
            }
            $.ajax(baseURL.devURLBase + api, {
                data: ajaxData,
                success: function(res) {
                    if (res.status === 200) {
                        index.setToast('保存成功');
                    } else {
                        index.setToast('保存失败，code: ' + res.status);
                    }
                },
                xhrFields: {
                    withCredentials: true
                }
            });
        });
        // 切换一级实验类目
        $('#class-type1').on('change', function(e) {
            var selectedPid = Number($(this).val());
            var len = data.classList.length;

            $('#class-type2').empty();

            while(len--) {
                if (data.classList[len].id == selectedPid) {
                    var arr = data.classList[len].child;
                    for (var i = 0, l = arr.length; i < l; i++) {
                        $('#class-type2').append(
                            $(
                                '<option value=' +
                                arr[i].id +
                                '>' +
                                arr[i].name +
                                '</option>'
                            )
                        )
                    }
                    $('#class-type2').removeClass('hide');
                    break;
                }
            }
        });
    },
    formatQuery: function(query) {
        var res = {},
            arr, temp;
        query = query[0] === '?' ? query.slice(1) : query;
        
        arr = query.split('&');
        var len = arr.length;

        while(len--) {
            temp = arr[len].split('=');
            res[temp[0]] = temp[1];
        }
        return res;
    },
    getDocContent: function() {
        $.ajax(baseURL.devURLBase + '', {
            data: {
                courseId: data.courseId
            },
            success: function(res) {

            },
            error: function(err) {}
        })
    },
    // 获取实验类目
    getTestClassList: function() {
        $.ajax(baseURL.devURLBase + '/itemCatController/list', {
            success: function(res) {
                if (res.status === 200) {
                    data.classList = arrangeLevelList(res.data);
                    for (var i = 0, l = data.classList.length; i < l; i++) {
                        $('#class-type1').append(
                            $(
                                '<option value=' +
                                data.classList[i].id +
                                '>' +
                                data.classList[i].name +
                                '</option>'
                            )
                        )
                    }
                    for (var i = 0, l = data.classList[0].child.length; i < l; i++) {
                        $('#class-type2').append(
                            $(
                                '<option value=' +
                                data.classList[0].child[i].id +
                                '>' +
                                data.classList[0].child[i].name +
                                '</option>'
                            )
                        )
                    }
                    $('#class-type1').removeClass('hide');
                    $('#class-type2').removeClass('hide');
                }
            },
            xhrFields: {
                withCredentials: true
            }
        })
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
    }
};

module.exports = index;
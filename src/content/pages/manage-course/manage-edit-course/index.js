var $ = require('jquery');
var arrangeLevelList = require('utils').arrangeLevelList;

// require('../../../libs/kindeditor/kindeditor-all.js');
// require('../../../libs/kindeditor/lang/zh-CN.js');

/**
 * @require './index.scss'
 * @require '../../../libs/kindeditor/themes/default/default.css'
 */

var baseURL = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://localhost:8080',
    'devURLBase': 'http://192.168.43.36:8080',
    'prodURLBase': ''
};
var data = {
    courseId: null,
    classList: [],
    timer: null,
    selectedPid: null,
    uploading: false,
    filePath: ''
};

var index = {
    init: function() {
        data.courseId = index.formatQuery(location.search).id;
        console.log(data)
        this.listener();
        this.getTestClassList(index.getDocContent);
        
    },
    listener: function() {
        // 保存编辑
        $('#save').on('click', function(e) {
            var api = data.courseId ? '/itemController/updateItem' : '/itemController/addItem';
            console.log(data.filePath)
            var ajaxData = {
                name: $('#test-name').val(),
                status: Number($('#test-status').val()),
                cid: Number($('#class-type2').val()),
                visitorAllow: Number($('#allow-visitor').val()),
                // desc: editor.html(),
                // teacherName: $('#test-teacher').val(),
                courseUrl: $('#test-webgl').val(),
                imgUrl: data.filePath,
            };
            if (data.courseId) {
                ajaxData.id = data.courseId;
            }
            $.ajax(baseURL.localURLBase + api, {
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
        $('#class-type1').on('change', function() {
            data.selectedPid = Number($(this).val());
            index.toggleClassOne();
        });
        // 上传文件
        $('#power-path').on('change', index.uploadFile);
        $('#power-path-show').on('click', function() {
            $('#power-path').click();
        });
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
            mode: 'cors',
            credentials: 'include',
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
                data.filePath = res.data;
			}
		}).catch(function(err) {
            index.setToast(err);
        });
    },
    toggleClassOne: function() {
        console.log('ddddddd');
        
        var len = data.classList.length;

        $('#class-type2').empty();

        while(len--) {
            if (data.classList[len].id == data.selectedPid) {
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
        console.log(data.courseId)
        if (data.courseId === null || data.courseId === undefined) {
            return;
        }
        
        $.ajax(baseURL.localURLBase + '/itemController/listById', {
            data: {
                id: data.courseId
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 200) {
                    var cid = res.data.cid,
                        pcid;
                    for (var i = 0, l = data.classList.length; i < l; i++) {
                        if (data.classList[i].child) {
                            for (var j = 0, ll = data.classList[i].child.length; j < ll; j++) {
                                if (data.classList[i].child[j].id === cid) {
                                    pcid = data.classList[i].child[j].parentId;
                                    break;
                                }
                            }
                        }
                    }
                    data.selectedPid = pcid;
                    data.filePath = res.data.imgUrl;
                    data.oldFilePath = data.filePath;
                    index.toggleClassOne();
                    $('#class-type1').val(pcid);
                    $('#class-type2').val(cid);
                    $('#test-name').val(res.data.name);
                    $('#test-status').val(res.data.status);
                    // $('#test-teacher').val(res.data.teacherName);
                    $('#allow-visitor').val(res.data.visitorAllow);
                    $('#power-path-show').text(res.data.imgUrl);
                    $('#test-webgl').val(res.data.courseUrl);
                    $.ajax(baseURL.localURLBase + '/itemDescController/listByItemId', {
                        xhrFields: {
                            withCredentials: true
                        }, 
                        data: {
                            id :res.data.id
                        },
                        success: function(res) {
                            console.log(res.data)
                            if (editorReady) {
                                editor.html(res.data.itemDesc);
                            } else {
                                var timer = setInterval(function() {
                                    console.log(res.data)
                                    if (editorReady) {
                                        editor.html(res.data.itemDesc);
                                        clearInterval(timer);
                                    }
                                }, 1000);
                            }
                        }
                    });
                }
            },
            error: function(err) {}
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
                    cb();

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
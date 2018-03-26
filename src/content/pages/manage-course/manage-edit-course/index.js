var $ = require('jquery');

// require('../../../libs/kindeditor/kindeditor-all.js');
// require('../../../libs/kindeditor/lang/zh-CN.js');

/**
 * @require './index.scss'
 * @require '../../../libs/kindeditor/themes/default/default.css'
 */
var data = {
    courseId: null
};

var index = {
    init: function() {
        console.log(location.search);
        console.log(index.formatQuery(location.search))
        data.courseId = index.formatQuery(location.search).courseId;
        // index.getDocContent();
    },
    listener: function() {
        $('#save').on('click', function(e) {
            // $.ajax(devURLBase + '', {
            //     data: {
            //         content: editor.html(),
            //         type: 
            //     }
            // })
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
        $.ajax(devURLBase + '', {
            data: {
                courseId: data.courseId
            },
            success: function(res) {

            },
            error: function(err) {}
        })
    }
};

module.exports = index;
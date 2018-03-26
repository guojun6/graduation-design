var Router = require('express').Router();
var fetch = require('node-fetch');

Router.get('/managePower', function(req, res, next) {
    res.send({
        info: {
            code: 0,
            msg: 'OK'
        },
        data: [
            {
                name: '课程设置',
                child: [
                    {
                        name: '所有课程',
                        url: '/sp/pages/manage-all-course'
                    }, {
                        name: '添加课程',
                        url: '/yy'
                    }
                ]
            }
        ]
    });
});


module.exports = exports = Router;
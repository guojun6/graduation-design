var Router = require('express').Router();
var fetch = require('node-fetch');
// 权限
Router.get('/functionController/delete', function(req, res, next) {
    res.send({
        status: 200,
        msg: 'OK',
        data: null
    });
});
Router.get('/functionController/add', function(req, res, next) {
    res.send({
        status: 200,
        msg: 'OK',
        data: null
    });
});
Router.get('/functionController/edit', function(req, res, next) {
    res.send({
        status: 200,
        msg: 'OK',
        data: null
    });
});
Router.get('/functionController/listAll', function(req, res, next) {
    var {pageCount} = req.query;
    res.send({
        status: 200,
        msg: 'OK',
        
        pageCount: pageCount || 1,
        
        data: [
            {
                id: '1',
                name: '权限1',
                description: '111',
                page: '1.1',
                pid: '0'
            }, {
                id: '2',
                name: '权限2',
                description: '222',
                page: '2.2',
                pid: '0'
            }, {
                id: '3',
                name: '权限3',
                description: '333',
                page: '3.3',
                pid: '1'
            }
        ]
    });
});
// 用户
Router.get('/userController/getUserInfo', function(req, res, next) {
    var {l} = req.query;

    setTimeout(function() {
        var a = {
            status: 200,
            msg: 'OK',
            data: {
                username: '帅哥来了',
                id: '22',
                phone: '11',
                profilehead: 'ads',
                email: '1@qq.com'
            }
        },
        b = {
            status: 300,
            data: null,
            msg: '未登录'
        }
        res.send(l == 1 ? a : b);
    }, 400);
});
Router.get('/functionController/findMenu', function(req, res, next) {
    res.send({
        status: 200,
        msg: 'OK',
        data: [
            {
                id: '1',
                name: '用户/权限管理',
                description: '',
                page: '',
                pid: '0'
            }, {
                id: '2',
                name: '实验管理',
                description: '',
                page: '',
                pid: '0'
            }, {
                id: '3',
                name: '运营管理',
                description: '',
                page: '',
                pid: '0'
            }, {
                id: '4',
                name: '权限功能管理',
                description: '',
                page: '/sp/pages/manage-user/manage-power',
                pid: '1'
            }, {
                id: '5',
                name: '所有实验',
                description: '',
                page: '/sp/pages/manage-course/manage-all-course',
                pid: '2'
            }, {
                id: '6',
                name: '添加实验',
                description: '',
                page: '/sp/pages/manage-course/manage-edit-course',
                pid: '2'
            }, {
                id: '7',
                name: '宣传/广告',
                description: '',
                page: '/sp/pages/manage-operate/manage-ad',
                pid: '3'
            }, {
                id: '8',
                name: '角色管理',
                description: '',
                page: '/sp/pages/manage-user/manage-role',
                pid: '1'
            }, {
                id: '9',
                name: '所有用户管理',
                description: '',
                page: '/sp/pages/manage-user/manage-all-user',
                pid: '1'
            }
        ]
    });
});
Router.get('/itemController/listByTeacher', function(req, res, next) {
    var page = req.query.page;
    var {pageCount} = req.query;

    res.send({
        msg: page,
        status: 200,
        data: [
            {
                id: 1,
                name: '化学',
                teacherId: 1,
                teacherName: '好好',
                cid: 1,
                status: 1,
                visitorAllow: 1
            }, {
                id: 2,
                name: '化学2',
                teacherId: 12,
                teacherName: '好好2',
                cid: 5,
                status: 1,
                visitorAllow: 2
            }
        ],
        pageCount: pageCount || 1
        
    });
});

Router.get('/userController/listAll', function(req, res, next) {
    var page = req.query.page;
    var {pageCount} = req.query;

    res.send({
        msg: page,
        status: 200,
        data: [
            {
                username: '帅哥来了',
                id: '22',
                phone: '11',
                profilehead: 'ads',
                email: '1@qq.com',
                role: '2'
            }, {
                username: '帅哥来了2',
                id: '223',
                phone: '112',
                profilehead: 'ddddddd',
                email: '3@qq.com',
                role: '1'
            }
        ],
        pageCount: pageCount || 1
        
    });
});
// 课程
Router.get('/itemController/addItem', function(req, res, next) {
    res.send({
        status: 200,
        msg: 'OK',
        data: null
    });
});
Router.get('/itemController/updateItem', function(req, res, next) {
    res.send({
        status: 200,
        msg: 'OK',
        data: null
    });
});
Router.get('/itemController/deleteItem', function(req, res, next) {
    res.send({
        status: 200,
        msg: 'OK',
        data: null
    });
});

Router.get('/itemController/list', function(req, res, next) {
    var {pageCount} = req.query;
    res.send({
        status: 200,
        msg: 'OK',
        pageCount: pageCount || 1,
        data: [
            {
                id: 1,
                name: 'aa',
                teacherName: 'xx',
                cid: 2,
                status: 1,
                visitorAllow: 1,
                courseUrl: '/exps/first_exp/',
                imgUrl: 'ab'
            }, {
                id: 2,
                name: 'bb',
                teacherName: 'xx',
                cid: 2,
                status: 1,
                visitorAllow: 1,
                courseUrl: '/exps/first_exp/',
                imgUrl: 'dd'
            }, {
                id: 3,
                name: 'bb',
                teacherName: 'xx',
                cid: 2,
                status: 1,
                visitorAllow: 2,
                courseUrl: '/exps/first_exp/',
                imgUrl: 'dd'
            }
        ]
    });
});
Router.get('/itemCatController/list', function(req, res, next) {
    
    res.send({
        status: 200,
        msg: 'OK',
        data: [
            {
                id: 1,
                parentId: 0,
                name: '物理',
                status: 1,
                isParent: true,
                visitorAllow: 1,
            }, {
                id: 2,
                parentId: 1,
                name: '物理电学',
                status: 1,
                isParent: false,
                visitorAllow: 1,
            }, {
                id: 3,
                parentId: 0,
                name: '化学',
                status: 1,
                isParent: true,
                visitorAllow: 1,
            }, {
                id: 5,
                parentId: 3,
                name: '有机化学',
                status: 1,
                isParent: false,
                visitorAllow: 1,
            }
        ]
    });
});
Router.get('/itemController/listById', function(req, res, next) {
    
    res.send({
        status: 200,
        msg: 'OK',
        data: 
            {
                id: 1,
                cid: 5,
                name: '化学11',
                teacherName: 'xvbh',
                status: 1,
                visitorAllow: 1,
                courseUrl: '/exps/first_exp/',
                imgUrl: 'ddd',
                desc: 'xixihahaha'
            }
        
    });
});
Router.get('/itemDescController/listByItemId', function(req, res, next) {
    
    res.send({
        status: 200,
        msg: 'OK',
        data: 
            {
                itemId: 1,
                itemDesc: '<strong>xixihahaha</strong>'
            }
        
    });
});
//上传文件
Router.post('/fileController/upload', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: 
            {
                path: 'a/b/c'
            }
        
    });
});

// 运营
Router.get('/imageController/addImage', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
});
Router.get('/imageController/deleteImage', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
});
Router.get('/imageController/updateImage', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
});
Router.get('/imageController/getImageInfoById', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: {
            id: 1,
            name: '广告1',
            desc: '',
            path: 'da',
            url: 'a/a',
            type: 1
        }
        
    });
});
Router.get('/imageController/getImagesInfoByType', function(req, res, next) { 
    var {type, pageCount} = req.query;

    res.send({
        status: 200,
        msg: 'OK',
        
        pageCount: pageCount || 1,
        
        data: [
            {
                id: 1 + Number(type) * 10,
                name: '广告1' + type,
                desc: '',
                path: 'da',
                url: 'a/a',
                type: type
            }, {
                id: 2 + Number(type) * 10,
                name: '广告2' + type,
                desc: '',
                path: 'daa',
                url: 'a/aa',
                type: type
            }
        ]
        
    });
});

// 帐号
Router.get('/registerController/register', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
});
Router.get('/loginController/login', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
});
Router.get('/loginController/logout', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
}); 
Router.get('/registerController/checkEmail', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
});
Router.get('/registerController/changePassword', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
}); 
Router.get('/loginController/visitor/login', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
}); 

// 实验报告
Router.get('/reportController/add', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
}); 
Router.get('/reportController/listByStudent', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: [
            {
                id: 1,
                itemId: 1,
                studentId: 22,
                desc: '<strong>dsa</strong>',
                review: '<strong>aa</strong>'
            }, {
                id: 2,
                itemId: 1,
                studentId: 223,
                desc: '<strong>dsass</strong>',
                review: '<strong>aad </strong>'
            }
        ]
        
    });
}); 
Router.get('/reportController/listByItemId', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: [{
            id: 1,
            itemId: 1,
            studentId: 22,
            desc: 'dsa',
            review: '<strong>aa</strong>'
        }]
        
    });
}); 
Router.get('/loginController/visitor/login', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
}); 
Router.get('/loginController/visitor/login', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
}); 


// 角色
Router.get('/roleController/listAll', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        pageCount: 1,
        data: [
            {
                id: 1,
                name: '学生',
                description: 'ss'
            }, {
                id: 2,
                name: '老师',
                description: 'dd'
            }
        ]
        
    });
}); 

Router.get('/functionController/getByRoleId', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: [
            {
                id: '1',
                name: '权限1',
                description: '111',
                page: '1.1',
                pid: '0'
            }, {
                id: '2',
                name: '权限2',
                description: '222',
                page: '2.2',
                pid: '0'
            }, {
                id: '3',
                name: '权限3',
                description: '333',
                page: '3.3',
                pid: '1'
            }
        ]
        
    });
}); 




Router.all('*', function(req, res, next) { 
    res.send({
        status: 200,
        msg: 'OK',
        data: null
        
    });
}); 


module.exports = exports = Router;
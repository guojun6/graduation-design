// //////////////////////////目录设置-设置站点发布目录//////////////////////////
// 定义发布目录路径
fis.config.set('wwwPath', '../../dist');

fis.set('project.ignore', ['node_modules/**', 'output/**', 'fis-conf.js', '**/_*.scss']);

// 拷贝favicon
// fis.util.copy('../favicon.ico', fis.config.get('wwwPath') + '/favicon.ico', null);

// 默认部署方式-前端资源发布目录设置
fis.match('*', {
    deploy: fis.plugin('local-deliver', {
        to: fis.config.get('wwwPath'),
    }),
});

fis.match('*', {
    release: '/sp/$0',
});

// 使用cdn时开发调试部署-前端资源发布目录设置
fis.media('cdn_dev')
    .match('*.{js,css,jpg,png,jpeg,gif,ttf,eot,svg,woff}', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://dev.receiver.qlchat.com/receiver',
            to: '/data/res/frontend/rs',
        }),
    })
    .match('*.{js,css,jpg,png,jpeg,gif,ttf,eot,svg,woff}', {
        domain: '//dev.res.qlchat.com/frontend/rs',
    });

// 测试环境cdn配置
fis.media('cdn_test')
    .match('*.{js,css,jpg,png,jpeg,gif,ttf,eot,svg,woff}', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://test.receiver.qlchat.com/receiver',
            to: '/data/res/frontend/rs',
        }),
    })
    .match('*.{js,css,jpg,png,jpeg,gif,ttf,eot,svg,woff}', {
        domain: '//test.res.qlchat.com/frontend/rs',
    });

// 使用cdn线上部署-前端资源发布目录设置
fis.media('cdn_prod')
    // .match('*.{js,css,jpg,png,jpeg,gif,ttf,eot,svg,woff}', {
    //     deploy: fis.plugin('http-push', {
    //         receiver: 'http://127.0.0.1:5001/receiver',
    //         to: '/data/res/frontend/rs',
    //     }),
    // })
    .match('*.{js,css,jpg,png,jpeg,gif,ttf,eot,svg,woff}', {
        domain: '//static.qianliaowang.com/frontend/rs',
    });


// ///////////////////////////资源处理配置///////////////////////////////////////

// npm install -g fis-parser-node-sass
fis.match('*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        // fis-parser-sass option
    }),
});

// 加md5
fis.match('*.{js,css,png,scss}', {
    useHash: true,
});
fis.match('refresh.png', {
    useHash: false,
});
// 开启js压缩
fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    // optimizer: fis.plugin('uglify-js', {
    //     compress: {
    //         // drop_console: true
    //     },
    // }),
});

// 已压缩的文件不启用压缩
fis.match('**min*.{css,js}', {
    optimizer: null
});

fis.match('::package', {
    // fis-spriter-csssprites 插件 开启雪碧图合并
    spriter: fis.plugin('csssprites'),
});
//打包后做处理，fis3-hook-module只是包裹amd外层，不会正确反应在html文件中，也就是没有require.config
//fis-postpackager-loader设置useInlineMap将设置require.config.path并修改require的依赖为config.path相应的项目
// 插件配置
fis.match('::packager', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        allInOne: {
            js: '${filepath}_aio.js',
            css: '${filepath}_aio.css',
            includeAsyncs: false, // 包含异步加载的模块
            ignore: [
                // 稍微偏大的文件、常用的不合并，增加缓存利用率
                '/libs/jquery-1.11.0/jquery.js'
            ],
        },
        scriptPlaceHolder: '<!--SCRIPT_PLACEHOLDER-->',
        useInlineMap: true, // 资源映射表内嵌
    }),
});


/* 自动给 css 属性添加前缀，让标准的 css3 支持更多的浏览器.*/
fis.match('*.{css,less,scss}', {
  preprocessor: fis.plugin('autoprefixer', {
    'browsers': ['Android >= 2.1', 'iOS >= 4', 'ie >= 8', 'firefox >= 15'],
    'cascade': true,
  }),
});

// 开启对css中的图片合并
fis.match('*.{css, scss}', {
    useSprite: true,
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css', {
        baseDpr: 2,             // base device pixel ratio (default: 2)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 75,            // rem unit value (default: 75)
        remPrecision: 6,         // rem precision (default: 6)
    }),
});

/* 自动px转rem*/
// fis.match('*css', {
//     postprocessor: fis.plugin('px2rem'),
// });
fis.match('**/sharecard/*.css', {
    postprocessor: false,
});

// 雪碧图合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 5);

// 雪碧图拼合方式为矩形
fis.config.set('settings.spriter.csssprites.layout', 'matrix');

// 开启图片压缩
fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor'),
});

// 如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
// 否则png图片透明部分在ie下会显示灰色背景
// 使用spmx release命令时，添加--optimize或-o参数即可生效
fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

// npm install -g fis-parser-handlebars-3.x
// 模板引擎配置
fis.match('**.handlebars', {
    rExt: '.js', // from .handlebars to .js 虽然源文件不需要编译，但是还是要转换为 .js 后缀
    parser: fis.plugin('handlebars-3.x', {
        // fis-parser-handlebars-3.x option
    }),
    release: false, // handlebars 源文件不需要编译
});


// ////////////////////////////模块化配置///////////////////////////////////////////
// 开启模块化开发
fis.hook('module', {
    mode: 'amd',
    // 把 factory 中的依赖，前置到 define 的第二个参数中来。
    forwardDeclaration: true,
    paths: {
        // 声明公用组件
        jquery: '/libs/jquery-1.11.0/jquery.js',
        fetch: '/libs/fetch.js'

    },
});

// 模块化文件配置
fis.match('*.js', {
    isMod: true,
});

// require.js本身不需要模块化，否则报错
fis.match('/libs/require/2.1.18/require.js', {
    isMod: false,
    useHash: false,
});
fis.match('/libs/kindeditor/kindeditor-all.js', {
    isMod: false,
    useHash: false,
});
fis.match('/libs/kindeditor/lang/zh-CN.js', {
    isMod: false,
    useHash: false,
});

// /////////////////////////////开发、生产、调试环境区分配置/////////////////////////////////////////////////
fis.media('debug')
    .match('*.{js,css,png,scss}', {
        useHash: true,
        useSprite: false,
        optimizer: null,
    });

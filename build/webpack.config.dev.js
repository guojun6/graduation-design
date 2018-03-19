var merge = require('webpack-merge');
var HtmlPlugin = require('html-webpack-plugin');
var baseConfig = require('./webpack.config.base');
var webpack = require('webpack');
var path = require('path');

var exp = merge(baseConfig, {
    entry: {
        'hot': 'webpack-hot-middleware/client'
    },
    output: {
        filename: 'js/[name]-[hash].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),

        // 根据模块路径替代原本数字的Id
        new webpack.HashedModuleIdsPlugin(),
        // 提取公共包
        new webpack.optimize.CommonsChunkPlugin({
            name: ['public', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            // children: true,
            async: 'child-async'
        }),
        
        // 转移html模板
        new HtmlPlugin({
            template: path.resolve(__dirname, '../src/client/index.html'),
            fimename: 'index.html',
            inject: 'body'
        })
    ],
    // module: {
    //     loaders: [{
    //             enforce: 'pre',
    //             test: /\.(vue|js|jsx)$/,
    //             exclude: /node_modules/,
    //             loader: 'eslint-loader'
    //     }]
    // },
    devtool: 'cheap-module-eval-source-map'
});

module.exports = exp;
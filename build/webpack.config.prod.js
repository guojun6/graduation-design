var merge = require('webpack-merge');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var path = require('path');
var baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    output: {
        filename: 'js/[name]-[chunkhash].js',
        publicPath: './'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     // comments: /\/\*.*\*\//
        // }),

        // 根据模块路径替代原本数字的Id
        new webpack.HashedModuleIdsPlugin(),
        // 提取公共包
        new webpack.optimize.CommonsChunkPlugin({
            // mani提取webpack运行时代码
            name: ['public', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            // children: true,
            async: 'child-async'
        }),
        // 提取webpack运行时代码
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['public']
        // }),

        // 转移html模板
        new HtmlPlugin({
            template: path.resolve(__dirname, '../src/client/index.html'),
            fimename: 'index.html',
            inject: 'body'
        })
    ],
    module: {
        // loaders: [{
        //         enforce: 'pre',
        //         test: /\.(vue|js|jsx)$/,
        //         exclude: /node_modules/,
        //         loader: 'eslint-loader'
        // }]
    },
    devtool: 'cheap-module-source-map'
});
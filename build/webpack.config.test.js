var merge = require('webpack-merge');
var webpack = require('webpack');
var path = require('path');
var baseConfig = require('./webpack.config.base');

var config = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('test')
            }
        }),
    ],
    devtool: 'inline-source-map'
});

delete config.entry;
// delete config.plugin;

// config['plugins'] = [
//     new webpack.DefinePlugin({
//         'process.env': JSON.stringify('test')
//     }),
// ];

module.exports = config;
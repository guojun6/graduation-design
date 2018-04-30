/**
 * 当CommonChunkPlugin有options.children: true
 * ExtractTextPlugin就会把多处的重复css提取
 * 当CommonChunkPlugin有options.async时
 * CommonChunkPlugin会把多处重复的css提取到js文件里
 * async的优先级大于children
 */

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');


var ExtractVueStyle = new ExtractTextPlugin('css/[name]-[chunkhash].css'),
    ExtractStyle = new ExtractTextPlugin('css/normal-[chunkhash].css');

module.exports = {
    entry: {
        'public': ['vue', 'vuex', 'vue-router'],
        'app': path.resolve(__dirname, '../src/client/index.js'), 
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        // publicPath: '/client/',
        chunkFilename: 'js/[name]/[chunkhash].js'
    },
    plugins: [
        // 提取css内容
        ExtractVueStyle,
        ExtractStyle,
        new webpack.DefinePlugin({
            'contentURL': JSON.stringify('/sp/pages/'),
            'localURLBase': JSON.stringify('http://localhost:8080'),
            'devURLBase': JSON.stringify('http://localhost:8080'),
            'prodURLBase': JSON.stringify(''),
            'expURL': JSON.stringify('')
        })
    ],
    module: {
        loaders: [{
            test: /\.vue$/,
            include: path.resolve(__dirname, '../src/client'),
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: getStyleLoader(),
                    scss: getStyleLoader([{
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }])
                }
            }
        }, {
            test: /\.js$/,
            include: path.resolve(__dirname, '../src/client'),
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg|gif|ico|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: 'static/imgs/[name].[hash].[ext]'
            }
        }, {
            test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
            loader: 'file-loader',
            query: {
                name: 'static/fonts/[name].[ext]'
            }
        }, {
            test: /\.(s)?css$/,
            loader: ExtractStyle.extract({
                fallback: {
                    loader: 'style-loader',
                    options: {
                        convertToAbsoluteUrls: true
                    }
                },
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        // modules: true,
                        // localIdentName:'[local]'
                    }
                }, {
                    loader: 'postcss-loader',
                    options: { 
                        config: {
                            path: path.resolve(__dirname, './postcss.config.js')
                        },
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src/client')
        }
    }
};

function getStyleLoader(loaders) {
    var preLoaders = [{
        loader: 'css-loader',
        options: {
            sourceMap: true,
            // modules: true,
            // localIdentName:'[local]'
        }
    }, {
        loader: 'postcss-loader',
        options: { 
            config: {
                path: path.resolve(__dirname,'./postcss.config.js')
            },
            sourceMap: true
        }
    }];
    if (loaders instanceof Array) {
        preLoaders = preLoaders.concat(loaders);
    }
    return ExtractVueStyle.extract({
        fallback: 'vue-style-loader',
        use: preLoaders
    });
    // return ExtractTextPlugin.extract('style-loader', preLoaders);
}
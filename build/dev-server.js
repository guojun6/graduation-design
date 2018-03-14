var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('./webpack.config.dev')
var express = require('express')
var path = require('path')
// var fetch = require('node-fetch')
var compiler = webpack(webpackConfig)

var app = new express()

var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/'
})
var hotMiddleware = webpackHotMiddleware(compiler)
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.use(express.static(path.resolve(__dirname, '../dist')))

app.listen(4000, () => {
    console.log('listening in port 4000')
})
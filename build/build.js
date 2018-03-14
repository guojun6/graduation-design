var webpack = require('webpack');
var webpackConfig = require('./webpack.config.prod');


webpack(webpackConfig, function(err, stat) {
    if (err) throw err;
    process.stdout.write(stat.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
    console.log('build complete!')
});
// module.exports = ({file, options, env}) => ({
//     plugins: {
//         autoprefixer: options.autoprefixer
//     }
// })
var autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['> 1%', 'Android >= 2.1', 'ios 7', 'firefox >= 15', 'IE 9'],
        })
    ]
}
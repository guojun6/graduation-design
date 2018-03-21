var $ = require('jquery');

/**
 * @require './index.scss'
 */
var data = {
    logOrReg: 'log'
};
var index = {
    init: function() {
        console.log($);
        this.listener();
    },
    listener: function() {
        $('.tab').on('click', this.toggleTab);
    },
    toggleTab: function(e) {
        console.log(e);
        if (data.logOrReg === 'log') {

        }
    }
};

module.exports = index;
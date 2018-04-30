var $ = require('jquery');
var utils = require('utils');

var URLBase = {
    'contentURL': '/sp/pages/',
    'localURLBase': 'http://192.168.43.36:8080',
    'devURLBase': 'http://192.168.43.36:8080',
    'prodURLBase': ''
}
/**
 * @require './index.scss'
 */
var data = {
    logOrReg: 'log',
    powerList: [],
    timer: null,
    userInfo: null
};
var index = {
    init: function() {
        this.getPowerList();
        this.getUerInfo();
        this.listener();
    },
    listener: function() {
        $(document).on('click', '.first-level', this.handler.toggleCat);
        $(document).on('click', '.second-level', this.handler.changePage);
        $('#logout').on('click', this.handler.logout);
    },
    getPowerList: function() {
        
        $.ajax({
            url: URLBase.localURLBase + '/functionController/findMenu',
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status !== 200) {
                    index.setToast(res.msg);
                    return;
                }
                data.powerList = index.arrangePowerList(res.data);
                for (var i = 0, l = data.powerList.length; i < l; i++) {
                    $('#catalog-list').append(
                        $('<li class="first-level"></li>').append(
                            $('<div class="cat-title"></div>').append(
                                $('<div class="triangle"></div>')
                            ).append(
                                $('<div></div>').text(data.powerList[i].name)
                            )
                        ).append(
                            $('<ul class="second-list hide"></ul>')
                        )
                    );
                    if (!data.powerList[i].child) return;
                    for (var j = 0, ll = data.powerList[i].child.length; j < ll; j++) {
                        $('#catalog-list .first-level:last-child ul').append(
                            $('<li class="second-level" data-url="' + data.powerList[i].child[j].page + '">' + data.powerList[i].child[j].name + '</li>')
                        )
                    }
                }
            }
        });
    },
    getUerInfo: function() {
        $.ajax(URLBase.localURLBase + '/userController/getUserInfo'/* + '?l=1'*/, {
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 200) {
                    data.userInfo = res.data;
                    $('.btn-account').addClass('hide');
                    $('.user-info').removeClass('hide').find('img').attr('src', res.data.profilehead);
                    $('#user-name').text(res.data.username);
                } else if (res.status === 300) {
                    location.href = '/graduation-design/dist/sp/pages/account';
                }
            }
        });
    },
    arrangePowerList: function(rawList) {
        return utils.arrangeLevelList(rawList, 1);
    },
    setToast: function(txt) {
        $('.toast-txt').text(txt);
        $('.toast-ctn').addClass('show');
        if (data.timer) {
            clearTimeout(data.timer);
        }
        data.timer = setTimeout(function() {
            $('.toast-ctn').removeClass('show');
        }, 2000);
    },
    handler: {
        toggleCat: function(e) {
            $(this).find('.second-list').toggleClass('hide');
            $(this).find('.triangle').toggleClass('active');
        },
        changePage: function(e) {
            e.stopPropagation();
            
            var url = $(this).attr('data-url');
            $('#iframe')
            .attr('src', url)
            .removeClass('hide')
            .prev()
            .addClass('hide');
        },
        logout: function(e) {
            $.ajax('/loginController/logout', {
                success: function(res) {
                    if (res.status === 200) {
                        location.href = '/graduation-design/dist/sp/pages/account';
                    }
                }
            });
        }
    }
};

module.exports = index;
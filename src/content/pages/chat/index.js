var $ = require('jquery');
var baseURL = {
    'contentURL': '/graduation-design/dist/sp/pages/',
    'localURLBase': 'http://120.79.52.130',
    'devURLBase': 'http://120.79.52.130',
    'prodURLBase': ''
};
/**
 * @require './index.scss'
 */

var socket;

var data = {
    msgList: [],
    userInfo: null
};

var index = {
    init: function() {
        this.listener();
        this.getUserInfo();
    },
    listener: function() {
        $('#text').on('keyup', index.handle.enterSendMsg);
        $('#send-btn').on('click', index.handle.sendMsg);
    },
    getUserInfo: function() {
        $.ajax(baseURL.localURLBase + '/userController/getUserInfo'/* + '?l=1'*/, {
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 200) {
                    data.userInfo = res.data;
                    $.ajax(baseURL.localURLBase + '/roleController/getRoleById', {
                        xhrFields: {
                            withCredentials: true
                        },
                        data: {
                            id: res.data.role
                        },
                        success: function(res) {
                            if (res.status === 200) {
                                data.userInfo.roleName = res.data.name;
                                index.initWebSocket();
                            } else {
                                index.setToast('请登录');
                                $('#text').get(0).disabled = true;
                            }
                        }
                    });
                }
            }
        });
    },
    initWebSocket() {
        socket = new WebSocket('ws://120.79.52.130/chatServer');
        socket.onopen = function(e) {
            socket.send(JSON.stringify({
                message: '',
                first: true,
                item: this.courseId
            }));
        };
        socket.onmessage = function(e) {
            var msg = JSON.parse(e.data);
            console.log(e);
            data.msgList.push(msg);

            if (msg.first) {
                /**
                 * <div class="come-tip">
                        {{name}}进入了聊天室
                    </div>
                 */
                $('#chat-ctn').append(
                    $('<div class="come-tip"></div>').text(msg.from + '进入了聊天室')
                );
            } else {
                /**
                 * <div class="msg">
                        <div
                            class="right"
                            v-if="self">
                            <div class="message">
                                <p>{{message}}</p>
                            </div>
                            <div class="avatar">
                                <img :src="avatarPath">
                            </div>
                        </div>
                        <div
                            class="left"
                            v-else>
                            <div class="avatar">
                                <img :src="avatarPath">
                            </div>
                            <div class="message">
                                <p>{{message}}</p>
                            </div>
                        </div>
                    </div>
                 */
                var temp;
                if (msg.fromId == data.userInfo.id) {
                    temp = 
                    $('<div class="msg"></div>').append(
                        $('<div class="right"></div>').append(
                            $('<div class="message"></div>').append(
                                $('<p></p>').text(msg.message)
                            )
                        ).append(
                            $('<div class="avatar"></div>').append(
                                $('<img src="' + msg.url + '"/>')
                            )
                        )
                    );
                } else {
                    temp = $('<div class="msg"></div>').append(
                        $('<div class="left"></div>').append(
                            $('<div class="avatar"></div>').append(
                                $('<img src="' + msg.url + '"/>')
                            )
                        ).append(
                            $('<div class="message"></div>').append(
                                $('<p></p>').text(msg.message)
                            )
                        )
                    );
                }
                $('#chat-ctn').append(
                    temp
                );
            }

            setTimeout(function() {
                // console.log('$('#chat-ctn'):' ,$('#chat-ctn'))
                $('#chat-ctn').get(0).scrollTop = $('#chat-ctn').get(0).scrollHeight - $('#chat-ctn').get(0).offsetHeight + 40;
            }, 100);
        };
        socket.onclose = function(e) {
            console.log('close:  ');
            console.log(e);
            $('#text').get(0).disabled = true;
            $('#send-btn').get(0).disabled = true;
            index.setToast({
                showTime: Date.now(),
                txt: '会话已结束'
            });
        };
        socket.onerror = function(a,b,c) {
            console.log(a,b,c);
        };
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
    handle: {
        sendMsg: function() {
            if ($('#text').get(0).value.length === 0) {
                index.setToast({
                    showTime: Date.now(),
                    txt: '您还未输入内容哦~'
                });
                return;
            }
            socket.send(JSON.stringify({
                message: $('#text').get(0).value,
                first: false,
                item: this.courseId
            }));
            $('#text').get(0).value = '';
        },
        enterSendMsg: function(e) {
            // console.log($('#text').get(0).value);
            if (e.shiftKey && (e.key === 'Enter' || e.keyCode === 13)) {
                if ($('#text').get(0).value.length === 0) {
                    index.setToast({
                        showTime: Date.now(),
                        txt: '您还未输入内容哦~'
                    });
                    return;
                }
                
                socket.send(JSON.stringify({
                    message: $('#text').get(0).value,
                    first: false,
                    item: this.courseId
                }));
                $('#text').get(0).value = '';
            }
        }
    }
};

module.exports = index;
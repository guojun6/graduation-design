<template>
    <div class="course">
        <!--<link rel="stylesheet" :href="expURL + '/exps/first_exp/TemplateData/style.css'">
        <script :src="expURL + '/exps/first_exp/TemplateData/UnityProgress.js'"></script>
        <script :src="expURL + '/exps/first_exp/Build/UnityLoader.js'"></script>-->
        <div class="header">
            <div
                class="title"
                v-if="course">{{course.name}}</div>
            <el-button >
                <a
                    v-if="userInfo"
                    :href="'/graduation-design/dist/sp/pages/student-report/index.html?studentId='+ this.userInfo.id + '&courseId=' + courseId"
                    target="_blank">
                    写报告
                </a>
                <a
                    v-else
                    :href="'/graduation-design/dist/sp/pages/account?url=' + location.hash.slice(2)">
                    去登录
                </a>
            </el-button>
        </div>
        <div class="canvas-ctn">
            <div class="" id="webgl"></div>
            <div class="control">
                <el-button
                    class="btn-full"
                    @click="fullScreen">
                    全屏
                </el-button>
            </div>
        </div>
        <!--<div class="chat-ctn" ref="chatCtn">
            <template v-for="(msg, index) in msgList">
                <msg 
                    v-if="!msg.first"
                    :key="index"
                    :avatarPath="msg.url"
                    :self="msg.fromId == userInfo.id"
                    :message="msg.message" />
                <come-tip
                    v-else
                    :key="index"
                    :name="msg.from"/>
            </template>
        </div>-->
        <!--<div class="input-msg">
            <textarea
                :disabled="!isLogin"
                ref="text"
                @keyup="enterSendMsg"></textarea>
        </div>
        <div class="btns">
            <el-button
                ref="sendBtn"
                :disabled="!isLogin"
                @click="sendMsg">
                发送
            </el-button>
            <span class="shift">提示：按住shift+enter也可以发送</span>
        </div>-->
        <iframe src="/graduation-design/dist/sp/pages/chat/index.html"/>
        <bottom-footer/>
    </div>
</template>

<script>
import {
    Button
} from 'element-ui';
import {
    mapState,
    mapActions
} from 'vuex';
import {object2Query} from '../../../utils/common';
import BottomFooter from '../../components/bottom-footer';
import Msg from './components/msg';
import ComeTip from './components/come-tip';

var gameInstance;
var webglReady = 0;

// var socket;

export default {
    data() {
        return {
            // expURL: expURL
            gameInstance: gameInstance,
            course: null,
            isShowReport: false,
            courseId: '',
            location: location,
            msgList: []
        };
    },
    computed: {
        ...mapState([
            'isLogin',
            'userInfo'
        ])
    },
    components: {
        [Button.name]: Button,
        [BottomFooter.name]: BottomFooter,
        [Msg.name]: Msg,
        [ComeTip.name]: ComeTip
    },
    created() {
        // console.log(this.userInfo);
        // console.log(this.$route)
        // if (!this.userInfo) {
        //     this.setToast({
        //         showTime: Date.now(),
        //         txt: '请先登录哦'
        //     });
        //     setTimeout(function() {
        //         location.href = '/graduation-design/dist/sp/pages/account';
        //     }, 600);
        // }
        this.courseId = this.$route.params.courseId;
        this.initWebgl();
        // this.initWebSocket();
        if (!this.isLogin) {
            this.setToast({
                txt: '登录后才能和大家一起聊天哦',
                showTime: Date.now()
            });
        }
    },
    
    methods: {
        async initWebgl() {
            var s1 = document.createElement('script'),
                s2 = document.createElement('script');

            await this.getCourse();

            if (!this.isLogin && this.course.visitorAllow === 2) {
                this.setToast({
                    showTime: Date.now(),
                    txt: '该课程需要登录才能访问，5秒后自动跳转登录页面'
                });
                setTimeout(function() {
                    location.href = '/graduation-design/dist/sp/pages/account/index.html';
                }, 5000);
            } 
            
            s1.src = expURL + this.course.courseUrl + 'TemplateData/UnityProgress.js';
            s2.src = expURL + this.course.courseUrl + 'Build/UnityLoader.js';
            document.body.appendChild(s1);
            document.body.appendChild(s2);
            s1.addEventListener('load', function() {
                webglReady++;
                if (webglReady === 2) {
                    initCourse();
                }
            }, false);
            s2.addEventListener('load', function() {
                webglReady++;
                if (webglReady === 2) {
                    initCourse();
                }
            }, false);
        },
        fullScreen() {
            gameInstance.SetFullscreen(1);
        },
        async getCourse() {
            await fetch(localURLBase + '/itemController/listById' + object2Query({id: this.$route.params.courseId}), {
                mode: 'cors',
                credentials: 'include'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status === 200) {
                    this.course = res.data;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        // initWebSocket() {
        //     socket = new WebSocket('ws://120.79.52.130/chatServer');
        //     socket.onopen = (e) => {
        //         socket.send(JSON.stringify({
        //             message: '',
        //             first: true,
        //             item: this.courseId
        //         }));
        //     };
        //     socket.onmessage = (e) => {
        //         console.log(e);
        //         this.msgList.push(JSON.parse(e.data));
        //         setTimeout(()=> {
        //             console.log('this.$refs.chatCtn:' ,this.$refs.chatCtn)
        //             this.$refs.chatCtn.scrollTop = this.$refs.chatCtn.scrollHeight - this.$refs.chatCtn.offsetHeight + 40;
        //         }, 100);
        //     };
        //     socket.onclose = (e) => {
        //         console.log('close:  ');
        //         console.log(e)
        //         this.$refs.chatCtn.disabled = true;
        //         this.$refs.sendBtn.disabled = true;
        //         this.setToast({
        //             showTime: Date.now(),
        //             txt: '会话已结束'
        //         });
        //     };
        //     socket.onerror = function(a,b,c) {
        //         console.log(a,b,c);
        //     };
        // },
        // sendMsg() {
        //     if (this.$refs.text.value.length === 0) {
        //         this.setToast({
        //             showTime: Date.now(),
        //             txt: '您还未输入内容哦~'
        //         });
        //         return;
        //     }
        //     socket.send(JSON.stringify({
        //         message: this.$refs.text.value,
        //         first: false,
        //         item: this.courseId
        //     }));
        //     this.$refs.text.value = '';
        // },
        // enterSendMsg(e) {
        //     console.log(this.$refs.text.value);
        //     if (e.shiftKey && (e.key === 'Enter' || e.keyCode === 13)) {
        //         console.log('zfdsfd')
        //         if (this.$refs.text.value.length === 0) {
        //             this.setToast({
        //                 showTime: Date.now(),
        //                 txt: '您还未输入内容哦~'
        //             });
        //             return;
        //         }
        //         console.log('sad')
        //         socket.send(JSON.stringify({
        //             message: this.$refs.text.value,
        //             first: false,
        //             item: this.courseId
        //         }));
        //         this.$refs.text.value = '';
        //     }
        // },
        ...mapActions([
            'setToast'
        ])
    }
};

function initCourse() {
   gameInstance = UnityLoader.instantiate("webgl", expURL + "/exps/first_exp/Build/lessons.json", {onProgress: UnityProgress});
}
</script>

<style lang="scss" scoped>
a {
    color: inherit;
}
.course {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    // height: 100%;
    background: #232323;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
    color: #fff;
    .title {
        font-size: 16px;
        font-weight: bold;
    }
}
// .canvas-ctn {
//     // display: inline-block;
//     // width: 70%;
// }
.control {
    border: 1px solid #666;
    border-top: 0;
    padding: 5px;
    overflow: hidden;
    .btn-full {
        float: right;
    }
}
// .chat-ctn {
//     // float: right;
//     // display: inline-block;
//     // width: 28%;
//     margin-top: 16px;
//     min-width: 800px;
//     height: 300px;
//     padding: 0 20px;
//     background: #eee;
//     overflow: auto;
// }
// .input-msg {
//     box-sizing: border-box;
//     border: 1px solid #ccc;
//     min-width: 800px;
//     height: 160px;
//     padding: 10px 0;
//     background: #fff;
//     textarea {
//         width: 94%;
//         padding: 0 3%;
//         height: 100%;
//         border: 0 none;
//         resize: none;
//         background: #fff;
//     }
// }
.btns {
    margin: 10px 0;
}
// .shift {
//     padding: 30px;
//     color: #fff;
// }

iframe {
    width: 100%;
    height: 600px;
}
</style>


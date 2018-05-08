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
                    :href="'/graduation-design/dist/sp/pages/student-report/index.html?studentId='+ this.userInfo.id + '&courseId=' + courseId"
                    target="_blank">
                    写报告
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
        <div class="chat-ctn"></div>
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

var gameInstance;
var webglReady = 0;

export default {
    data() {
        return {
            // expURL: expURL
            gameInstance: gameInstance,
            course: null,
            isShowReport: false,
            courseId: ''
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
        [BottomFooter.name]: BottomFooter
    },
    created() {
        console.log(this.$route.params);
        this.courseId = this.$route.params.courseId;
        this.initWebgl();
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
.canvas-ctn {
    // display: inline-block;
    // width: 70%;
}
.control {
    border: 1px solid #666;
    border-top: 0;
    padding: 5px;
    overflow: hidden;
    .btn-full {
        float: right;
    }
}
.chat-ctn {
    // float: right;
    // display: inline-block;
    // width: 28%;
    margin-top: 16px;
    height: 300px;
    background: #fff;
}
</style>

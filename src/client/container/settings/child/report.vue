<template>
    <div class="report">
        <div class="report-title">
            <div class="td"></div>
            <div class="report-id">报告ID</div>
            <div class="report-name">报告课程名称</div>
        </div>
        
        <ul>
            <li
                class="report-item"
                v-for="(report, index) in reportList"
                :key="index">
                <div
                    :class="{'report-line': true}"
                    @click="toggleReportContent(index)">
                    <div :class="{
                        'triangle': true,
                        'active': report.isShow
                    }">
                    </div>
                    <div class="report-id">{{report.id}}</div>
                    <div class="report-name">{{report.courseName}}</div>
                </div>
                <div v-if="report.isShow">
                    <el-button>
                        <a
                            :href="'/sp/pages/student-report?courseId=' + report.itemId + '&studentId=' + userInfo.id"
                            target="_blank">编辑</a>
                    </el-button>
                </div>
                <transition name="fade">
                    <div
                        class="content"
                        v-if="report.isShow"
                        v-html="report.desc"></div>
                </transition>
            </li>
        </ul>
    </div>
</template>
<script>
import {object2Query} from '../../../../utils/common';
import {Button} from 'element-ui';
import {mapState} from 'vuex';

export default {
    data() {
        return {
            reportList: []
        }
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    created() {
        this.getReportList(1);
    },
    components: {
        [Button.name]: Button
    },
    methods: {
        getReportList(page) {
            fetch(localURLBase + '/reportController/listByStudent' + object2Query({
                page
            })).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status === 200) {
                    this.reportList = res.data;
                    for (let i = 0, l = this.reportList.length; i < l; i++) {
                        this.$set(this.reportList[i], 'isShow', false);

                        fetch(localURLBase + '/itemController/listById' + object2Query({
                            id: this.reportList[i].itemId
                        })).then((RES) => {
                            return RES.json();
                        }).then((res) => {
                            if (res.status === 200) {
                                this.$set(this.reportList[i], 'courseName', res.data.name);
                            }
                        });
                    }
                }
            });
        },
        toggleReportContent(index) {
            this.reportList[index].isShow = !this.reportList[index].isShow;
        }
    }
}
</script>


<style lang="scss" scoped>
.triangle {
    border-left: 10px solid #333;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    margin-right: 10px;
    &.active {
        transform: rotate(90deg);
    }
}
.report-title {
    display: flex;
    font-size: 16px;
    font-weight: bold;
}
.report-item {
    font-size: 16px;
}
.td {
    width: 20px;
}
.report-id {
    width: 250px;
}
.report-line {
    display: flex;
    align-items: center;
    padding: 6px;
    width: 100%;
    border-top: 1px solid #ccc;
    cursor: pointer;
    &:hover{
        background: #eee;
    }
}
.content {
    padding: 10px;
    margin: 10px 0;
    min-height: 200px;
    border-radius: 6px;
    background: #FFE4B5;
}
.fade-enter-active {
    transition: all .5s;
    transform: translate(0,0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
    transform: translate(0,-100%);
}
</style>

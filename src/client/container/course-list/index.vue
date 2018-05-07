<template>
    <div class="course-list">
        <top-header/>
        <div class="main">
            <div class="cat">
               <el-select
                    v-model="nowFirstCatId"
                    placeholder="筛选课程"
                    @change="firstCatChange">
                    <el-option
                        label="全部"
                        :value="-1"/>
                    <el-option
                        v-for="(item, index) of catList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
                <el-select 
                    v-model="nowSecondCatId" 
                    v-if="nowFirstCatId !== null && nowFirstCatId !== -1"
                    placeholder="筛选课程"
                    @change="secondCatChange">
                    <el-option
                        label="全部"
                        :value="-1"/>
                    <el-option
                        v-for="(item, index) of secondCatList"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <ul class="list">
                <li
                    class="list-item"
                    v-for="(item, index) in courseList"
                    v-if="item.status === 1"
                    :key="index"
                    @click="linkToCourse('/course/' + item.id, item.visitorAllow)">
                    <div class="img-box">
                        <img :src="item.imgUrl">
                    </div>    
                    <div class="info">
                        <span class="course-name">{{item.name}}</span>
                        <span class="teacher-name">指导老师：{{item.teacherName}}</span>
                    </div>
                </li>
            </ul>
            <div class="page-box">
                <el-pagination
                    v-if="coursePageCount"
                    :style="{display: 'inline-block'}"
                    layout="prev, pager, next"
                    :pageSize="20"
                    :page-count="coursePageCount"
                    @current-change="pageChange">
                </el-pagination>
            </div>
        </div>
        <bottom-footer/>
    </div>
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';
import TopHeader from '../../components/top-header';
import BottomFooter from '../../components/bottom-footer';
import {
    object2Query,
    arrangeLevelList
} from '../../../utils/common';
import {
    Select,
    Option,
    Pagination
} from 'element-ui';

export default {
    data() {
        return {
            courseList: [],
            catList: [],
            secondCatList: [],
            nowFirstCatId: null,
            nowSecondCatId: null,
            coursePageCount: null
        };
    },
    computed: {
        ...mapState([
            'isLogin'
        ])
    },
    components: {
        [TopHeader.name]: TopHeader,
        [BottomFooter.name]: BottomFooter,
        [Select.name]: Select,
        [Option.name]: Option,
        [Pagination.name]: Pagination
    },
    created() {
        this.getCatList(object2Query({
            page: 1,
            rows: 100
        }));
        this.getCourseList(object2Query({
            page: 1,
            status: 1
        }));
        console.log(this.$route.params)
    },
    methods: {
        getCourseList(query) {
            fetch(localURLBase + '/itemController/list' + query, {
                mode: 'cors',
                credentials: 'include'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status === 200) {
                    this.courseList = res.data;
                    this.coursePageCount = Number(res.pageCount);
                } else {
                    setToast({
                        showTime: Date.now(),
                        txt: '请求列表失败'
                    });
                }
            });
        },
        getCatList(query) {
            fetch(localURLBase + '/itemCatController/list' + query, {
                mode: 'cors',
                credentials: 'include'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status === 200) {
                    this.catList = arrangeLevelList(res.data);
                } else {
                    this.setToast({
                        showTime: Date.now(),
                        txt: '请求课程列表失败'
                    });
                }
            })
        },
        firstCatChange(val) {
            this.nowFirstCatId = val;
            if (val === -1) {
                this.getCourseList(object2Query({
                    page: 1,
                    status: 1,
                    // pageCount: 5
                }));
                this.coursePageCount = null;
                return;
            };
            for (let i = 0, l = this.catList.length; i < l; i++) {
                if (this.catList[i].id === val) {
                    this.secondCatList = this.catList[i].child;
                }
            }
        },
        secondCatChange(val) {
            this.coursePageCount = null;
            var cid = val;
            this.nowSecondCatId = val;
            if (val === -1) {
                cid = this.nowFirstCatId;
            }
            this.getCourseList(object2Query({
                page: 1,
                cid: cid,
                status: 1,
                // pageCount: 10
            }));
        },
        pageChange(currentPage) {
            console.log(currentPage)
            var cid;
            if (this.nowSecondCatId !== -1 || this.nowSecondCatId !== null) {
                cid = this.nowSecondCatId;
            } else if (this.nowFirstCatId !== -1 || this.nowFirstCatId !== null) {
                cid = this.nowFirstCatId;
            }
            var data = {
                page: currentPage,
                status: 1,
                // pageCount: this.coursePageCount
            };
            if (cid !== undefined && cid !== null) {
                data.cid = cid;
            }
            this.getCourseList(object2Query(data));
        },
        linkToCourse(url, visitorAllow) {
            console.log(url, visitorAllow)
            if (visitorAllow === 1 || this.isLogin) {
                this.$router.push(url);
            } else {
                this.setToast({
                    showTime: Date.now(),
                    txt: '该实验需要登录后才可进行哦'
                });
            }
            
        },
        ...mapActions([
            'setToast'
        ])
    }
};
</script>


<style lang="scss" scoped>
.main {
    padding: 10px;
    background: #f6f9fb;
}
.cat {
    .el-select {
        margin-right: 15px;
    }
}
.list {
    padding: 20px 0;
    .list-item {
        display: inline-block;
        width: 220px;
        margin: 16px;
        border: 1px solid #ccc;
        cursor: pointer;        
        background: #fff;
        &:hover {
            box-shadow: 0 0 10px 1px #ccc;
        }
    }
    .img-box {
        height: 220px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .info {
        padding: 10px;
        .course-name {
            padding: 20px;
            font-size: 16px;
        }
        .teacher-name {
            float: right;
            padding-right: 10px;
            font-size: 12px;
            color: #aaa;
        }
    }
}
.page-box {
    text-align: center;
}
</style>

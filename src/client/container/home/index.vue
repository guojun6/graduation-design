<template>
    <div class="home">
        <top-header></top-header>
        <div class="slider-ctn">
            <!--<slider
                :pages="sliderPages"
                :sliderinit="sliderinit"
                @slide=""></slider>-->
            <el-carousel
                :interval="4000"
                trigger="click"
                height="300px">
                <el-carousel-item
                    v-for="(item, index) in bannerInfo"
                    :key="index">
                    <a class="banner-img-box" :href="item.url">
                        <img
                        class="banner-img"
                        :src="item.path">
                    </a>
                </el-carousel-item>
            </el-carousel>    
        </div>
        <div class="entry-box">
             <div
                class="course-entry"
                @click="() => {this.$router.push('/course-description/physical');}">
                <div class="img-box">
                    <img src="./img/physical.jpg">
                </div>
                <div class="txt-box">
                    <p>物理实验</p>
                </div>
            </div>   
            <div
                class="course-entry"
                @click="() => {this.$router.push('/course-description/chemistry');}">
                <div class="img-box">
                    <img src="./img/chemistry.jpg">
                </div>
                <div class="txt-box">
                    <p>化学实验</p>
                </div>
            </div>
            <div
                class="course-entry"
                @click="() => {this.$router.push('/course-description/information');}">
                <div class="img-box">
                    <img src="./img/information.jpg">
                </div>
                <div class="txt-box">
                    <p>信息科学实验</p>
                </div>
            </div>
        </div>
        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import TopHeader from '../../components/top-header';
import BottomFooter from '../../components/bottom-footer';
import CourseEntry from './components/course-entry';
// import conciseSlider from 'vue-concise-slider';
import {
    Carousel,
    CarouselItem
} from 'element-ui';
import {object2Query} from '../../../utils/common';

export default {
    data() {
        return {
            // sliderPages: [{
            //     title: 'aa',
            //     style: {
            //         background: 'red'
            //     }
            // }, {
            //     title: 'aa',
            //     style: {
            //         background: 'blue'
            //     }
            // }, {
            //     title: 'aa',
            //     style: {
            //         background: 'yellow'
            //     }
            // }],
            //滑动配置[obj]
            // sliderinit: {
            //     currentPage: 0,//当前页码
            //     thresholdDistance: 500,//滑动判定距离
            //     thresholdTime: 100,//滑动判定时间
            //     autoplay:4000,//自动滚动[ms]
            //     loop:true,//循环滚动
            //     infinite:1,//无限滚动前后遍历数
            //     slidesToScroll:1,//每次滑动项数
            // }
            bannerInfo: []
        };
    },
    components: {
        [TopHeader.name]: TopHeader,
        [BottomFooter.name]: BottomFooter,
        // 'slider': conciseSlider,
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem,
        [CourseEntry.name]: CourseEntry
    },
    methods: {
        bannerSlide(pageNum) {

        },
        getBanner() {
            fetch('/imageController/getImagesInfoByType' + object2Query({
                type: 1
            })).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status === 200) this.bannerInfo = res.data;
            })
        }
    },
    created() {
        this.getBanner();
    }
};
</script>

<style lang="scss" scoped>
.home {
    font-size: 16px;
}
.slider-ctn {
    width: 100%;
    height: 300px;
}
.entry-box {
    padding: 30px 0 50px;
    text-align: center;
}


.course-entry {
    position: relative;
    display: inline-block;
    width: 22%;
    margin: 0 18px;
    padding-top: 22%; 
    cursor: pointer;
    &:hover {
        .txt-box {
            font-weight: bold;
        }
    }
    .img-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ccc;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .txt-box {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-width: 300px;
        padding: 10px 0;
        color: #fff;
        background: #d75f1d;
    }
}


.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.banner-img-box {
    display: block;
    height: 100%;
}
.banner-img {
    width: 100%;
    height: 100%;
}
</style>


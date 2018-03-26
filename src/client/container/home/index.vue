<template>
    <div class="home">
        <top-header></top-header>
        <div class="slider-ctn">
            <slider
                :pages="sliderPages"
                :sliderinit="sliderinit"
                @slide=""></slider>
        </div>
        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import TopHeader from '../../components/top-header';
import BottomFooter from '../../components/bottom-footer';
import conciseSlider from 'vue-concise-slider';

export default {
    data() {
        return {
            sliderPages: [{
                title: 'aa',
                style: {
                    background: 'red'
                }
            }, {
                title: 'aa',
                style: {
                    background: 'blue'
                }
            }, {
                title: 'aa',
                style: {
                    background: 'yellow'
                }
            }],
            //滑动配置[obj]
            sliderinit: {
                currentPage: 0,//当前页码
                thresholdDistance: 500,//滑动判定距离
                thresholdTime: 100,//滑动判定时间
                autoplay:4000,//自动滚动[ms]
                loop:true,//循环滚动
                infinite:1,//无限滚动前后遍历数
                slidesToScroll:1,//每次滑动项数
            }
        };
    },
    components: {
        [TopHeader.name]: TopHeader,
        [BottomFooter.name]: BottomFooter,
        'slider': conciseSlider
    },
    methods: {
        bannerSlide(pageNum) {

        }
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
</style>


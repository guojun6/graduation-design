<template>
    <div class="about-us">
        <top-header/>
        <div class="main">
            虚拟实验室是一种基于Web技术、VR虚拟现实技术构建的开放式网络化的虚拟实验教学系统， 是现有各种教学实验室的数字化和虚拟化。虚拟实验室由虚拟实验台、虚拟器材库和开放式实 验室管理系统组成。虚拟实验室为开设各种虚拟实验课程提供了全新的教学环境。虚拟实验台 与真实实验台类似，可供学生自己动手配置、连接、调节和使用实验仪器设备。教师利用虚拟 器材库中的器材自由搭建任意合理的典型实验，或实验案例，这一点是虚拟实验室有别于一般 实验教学课件的重要特征。新用户先通过页面右边进行注册，再登录系统，便可以浏览并进行各种虚拟实验。
        </div>
        <bottom-footer/>
    </div>
</template>

<script>
import TopHeader from '../../components/top-header';
import BottomFooter from '../../components/bottom-footer';

export default {
    components: {
        [TopHeader.name]: TopHeader,
        [BottomFooter.name]: BottomFooter
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.main {
    padding: 16px;
    font-size: 14px;
    line-height: 1.8;
    text-indent: 28px;
}
</style>

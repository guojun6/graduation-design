<template>
    <section class="top-header">
        <div class="title">
            <div class="logo">
                <img src="./img/logo.jpg" alt="第一虚拟课堂">
            </div>
            <div class="site-name">第一虚拟课堂</div>
        </div>
        <ul class="nav">
            <li>
                <router-link to="/home">首页</router-link>
            </li>
            <li>
                <router-link to="/home">测试</router-link>
            </li>
        </ul>
        <div class="account">
            <el-button class="btn-account">
                <a href="#">登录/注册</a>
            </el-button>
        </div>
    </section>
</template>

<script>
import {
    Button
} from 'element-ui';
export default {
    name: 'top-header',
    components: {
        [Button.name]:Button
    }
};
</script>

<style lang="scss" scoped>
a {
    color: #fff;
}
.top-header {
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    background: #d75f1d;
}
.title {
    display: flex;
    align-items: center;
}
.logo {
    height: 80px;
    margin-right: 20px;
    > img {
        height: 100%;
    }
}
.site-name {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
}
.nav {
    display: flex;
    > li {
        margin: 4px;
        > a {
            display: block;
            padding: 10px 20px;
            border-bottom: 1px solid transparent;
            color: #fff;
            &:hover {
                border-bottom-color: #eaad32;
            }
        }
    }
}
.account {
    margin-right: 16px;
}
.btn-account {
    border: 0 none;
    background: #FFA500;
}
</style>

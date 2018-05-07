<template>
    <div class="settings">
        <top-header/>
        <div class="main">
            <aside class="nav">
                <ul>
                    <li class="nav-item">
                        <router-link to="/settings/password">修改密码</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/settings/info-settings">修改用户信息</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/settings/report">我的实验报告</router-link>
                    </li>
                </ul>
            </aside>
            <div class="content">
                <router-view></router-view>
            </div>
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
    }
};
</script>

<style lang="scss" scoped>
.settings {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.main {
    display: flex;
    height: 100%;
    height: calc(100% - 128px);
}
.nav {
    // display: inline-block;
    width: 240px;
    flex: 0 0 240px;
    height: 100%;
    border-right: 1px solid #ccc;
    .nav-item {
        height: 40px;
        background: #FFA500;
        font-size: 16px;
        text-align: center;
        color: #fff;
        line-height: 40px;
        &:hover {
            background: #fff;
            color: #FFA500;
        }
        a {
            display: block;
            color: inherit;
        }

    }
}
.content {
    // display: inline-block;
    box-sizing: border-box;
    height: 100%;
    padding: 10px 16px;
    flex-grow: 1;
    overflow-y: auto;
}
</style>

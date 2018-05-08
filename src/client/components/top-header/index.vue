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
                <router-link
                    class="nav-item" 
                    to="/home">
                    首页
                </router-link>
            </li>
            <li>
                <el-dropdown class="nav-item">
                    <span class="el-dropdown-link">
                        课程<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu class="dropdown" slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/course-description/physical">物理实验</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/course-description/chemistry">化学实验</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/course-description/information">信息科学实验</router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li>
                <router-link
                    class="nav-item" 
                    to="/about-us">
                    关于我们
                </router-link>
            </li>
        </ul>
        <div class="account">
            <el-button
                class="btn-account"
                v-if="!isLogin"
                @click="linkToLogin">
                <span>登录/注册</span>
            </el-button>
            <div
                class="user-info"
                v-else>
                <span>{{userInfo.username}}，欢迎您</span>
                <img
                    class="user-avatar"
                    :src="userInfo.profilehead">
                <ul class="user-operate">
                    <li>
                        <router-link to="settings">个人中心</router-link>
                    </li>
                    <li @click="logout">退出</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu
} from 'element-ui';

export default {
    name: 'top-header',
    computed: {
        ...mapState({
            userInfo: 'userInfo',
            isLogin: 'isLogin'
        })
    },
    components: {
        [Button.name]: Button,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem,
        [DropdownMenu.name]: DropdownMenu
    },
    methods: {
        logout() {
            fetch(localURLBase + '/loginController/logout', {
                credentials: 'include',
                mode: 'cors'
            }).then((RES)=> {
                return RES.json();
            }).then((res) => {
                if (res.status === 200) {
                    this.setUserInfo({
                        isLogin: false,
                        info: null
                    });
                    fetch(localURLBase + '/loginController/visitor/login').then((RES) => {
                        return RES.json();
                    }).then((res) => {
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        linkToLogin() {
            location.href = '/graduation-design/dist/sp/pages/account/index.html?url=' + location.hash.slice(2);
        },
        ...mapActions([
            'setUserInfo',
            'setIsLogin'
        ])
    },
    created() {
        console.log(this.userInfo, this.isLogin)
        // this.setUserInfo();
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
        > .nav-item {
            display: block;
            padding: 10px 20px;
            border-bottom: 1px solid transparent;
            color: #fff;
            font-size: 16px;
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
    color: #fff;
}
.dropdown {
    a {
        color:inherit;
    }
}
.user-info {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 14px;
    &:hover {
        .user-operate {
            display: block;
        }
    }
    .user-avatar {
        margin-left: 10px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
    > span {
        vertical-align: middle;
    }
}
.user-operate {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;
    z-index: 100;
    > li {
        padding: 6px 10px;
        text-align: center;
        cursor: pointer;
        > a {
            color: inherit;
        }
        &:hover {
            background: #92b4f7;
            color: #fff;
        }
    }
}
</style>

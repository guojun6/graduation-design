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
                        <el-dropdown-item class="course-item">
                            <router-link :to="'/course-description/physical/' + physicalCatId">物理实验</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item class="course-item">
                            <router-link :to="'/course-description/chemistry/' + chemistryCatId">化学实验</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item class="course-item">
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
                        <router-link to="/settings">个人中心</router-link>
                    </li>
                    <li v-if="isManager">
                        <a href="/graduation-design/dist/sp/pages/manage/index.html">管理后台</a>
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
import {object2Query} from '../../../utils/common';

export default {
    name: 'top-header',
    data() {
        return {
            isManager: false,
            physicalCatId: null,
            chemistryCatId: null
        };
    },
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
        getCatList() {
            fetch(localURLBase + '/itemCatController/list' + object2Query({
                page: 1
            }), {
                mode: 'cors',
                credentials: 'include'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status === 200) {
                    for (let i = 0, l = res.data.length; i < l; i++) {
                        if (res.data[i].name === '物理实验') {
                            this.physicalCatId = res.data[i].id;
                        } else if (res.data[i].name === '化学实验') {
                            this.chemistryCatId = res.data[i].id;
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        ...mapActions([
            'setUserInfo',
            'setIsLogin'
        ])
    },
    created() {
        console.log(this.userInfo, this.isLogin)
        // this.setUserInfo();
        if ( this.userInfo) {
            console.log('sa')
            fetch(localURLBase + '/roleController/getRoleById' + object2Query({
                id: this.userInfo.role
            }), {
                mode: 'cors',
                credentials: 'include'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (
                    res.status === 200 &&
                    (res.data.name.indexOf('管理员') > -1 || res.data.name.indexOf('老师') > -1)
                ) {
                    this.isManager = true;
                }
            });
        }
        this.getCatList();
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
        
        text-align: center;
        cursor: pointer;
        > a {
            color: inherit;
            padding: 6px 10px;
            display: block;
            height: 100%;
            
        }
        &:hover {
            background: #92b4f7;
            color: #fff;
        }
        &:last-child {
            padding: 6px 10px;
        }
    }
}
.course-item {
    a {
        display: block;
        height: 100%;
    }
}
</style>

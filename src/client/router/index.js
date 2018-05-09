import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
// import commonAction from '../store/actions/common.js';

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ '../container/home');
const CourseDescription = () => import(/* webpackChunkName: "CourseDescription" */ '../container/course-description');
const CourseDescriptionPhysical = () => import(/* webpackChunkName: "CourseDescriptionPhysical" */ '../container/course-description/child/physical');
const CourseDescriptionChemistry = () => import(/* webpackChunkName: "CourseDescriptionChemistry" */ '../container/course-description/child/chemistry');
const CourseDescriptionInformation = () => import(/* webpackChunkName: "CourseDescriptionInformation" */ '../container/course-description/child/information');
const AboutUs = () => import(/* webpackChunkName: "AboutUs" */ '../container/about-us');
const CourseList = () => import(/* webpackChunkName: "CourseList" */ '../container/course-list');
const Course = () => import(/* webpackChunkName: "Course" */ '../container/course');
const Settings = () => import(/* webpackChunkName: "Settings" */ '../container/settings');
const SettingsPassword = () => import(/* webpackChunkName: "SettingsPassword" */ '../container/settings/child/password');
const SettingsAvatar = () => import(/* webpackChunkName: "SettingsAvatar" */ '../container/settings/child/info-settings');
const SettingsReport = () => import(/* webpackChunkName: "SettingsReport" */ '../container/settings/child/report');
const Report = () => import(/* webpackChunkName: "Report" */ '../container/report');

var router = new VueRouter({
    routes: [{
        path: '/',
        alias: '/home',
        component: Home
    }, {
        path: '/course-description',
        component: CourseDescription,
        children: [
            {
                path: 'physical',
                component: CourseDescriptionPhysical
            }, {
                path: 'chemistry',
                component: CourseDescriptionChemistry
            }, {
                path: 'information',
                component: CourseDescriptionInformation
            }
        ]
    }, {
        path: '/about-us',
        component: AboutUs
    }, {
        path: '/course-list',
        component: CourseList
    }, {
        path: '/course/:courseId',
        component: Course
    }, {
        path: '/settings',
        component: Settings,
        children: [
            {
                path: 'info-settings',
                component: SettingsAvatar
            }, {
                path: 'password',
                component: SettingsPassword
            }, {
                path: 'report',
                component: SettingsReport
            }
        ]
    }, {
        path: '/report/',
        component: Report
    }, {
        path: '/password',
        component: SettingsPassword
    }, ]
});

router.beforeEach(async function(to, from, next) {
    // console.log(store.state.isLogin);

    if (store.state.isLogin === null) {
        await store.dispatch('setUserInfo');
        
        console.log(store.state.isLogin)
        console.log(store.state.userInfo)
        if (store.state.isLogin === false) {
            await fetch(localURLBase + '/loginController/visitor/login', {
                mode: 'cors',
                credentials: 'include'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                // if (res.status === 200) {
                //     store.dispatch('setIsLogin', undefined);
                // }
            });
        }
    }

    // console.log(store.state.isLogin);

    
    next();
});

export default router;
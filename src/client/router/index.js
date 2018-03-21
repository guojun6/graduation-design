import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ '../container/home');
const Manager = () => import(/* webpackChunkName: "home" */ '../container/manager');

export default new VueRouter({
    routes: [{
        path: '/',
        alias: '/home',
        component: Home
    }, {
        path: '/manager',
        component: Manager
    }]
});
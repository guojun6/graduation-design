import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ '../container/home');

export default new VueRouter({
    routes: [{
        path: '/home',
        component: Home
    }]
});
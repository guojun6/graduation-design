import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';

import 'whatwg-fetch';

import '../assets/style/_base.scss';
import '../assets/style/_index.scss';

export default new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
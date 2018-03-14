import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';

export default new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
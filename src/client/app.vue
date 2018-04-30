<template>
    <div class="app">
        <router-view></router-view>
        <toast 
            :showTime="toast.showTime"
            :txt="toast.txt"/>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import Toast from './components/toast';

export default {
    computed: {
        ...mapState({
            toast: 'toast'
        })
    },
    components: {
        [Toast.name]: Toast
    }
};
</script>

<style lang="scss" scoped>
.app {
    min-width: 800px;
    height: 100%;
}
</style>

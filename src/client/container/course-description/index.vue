<template>
    <div class="cd">
        <top-header></top-header>
        <router-view></router-view>
        <bottom-footer></bottom-footer>
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
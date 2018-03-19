<template>
    <div class="home">
        <top-header></top-header>
    </div>
</template>

<script>
import TopHeader from '../../components/top-header';

export default {
    components: {
        [TopHeader.name]: TopHeader
    }
};
</script>

<style lang="scss" scoped>
.home {
    font-size: 16px;
}
</style>

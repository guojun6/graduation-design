<template>
    <div class="entry">
        <div class="btn">
            <router-link :to="'/course-list/' + $route.params.catId">进入实验</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'entry',
    created() {
        // console.log(this.$route.params.catId);
    }
}
</script>

<style lang="scss" scoped>
.entry {
    position: relative;
    height: 300px;
    background: url(./img/bg.jpg) no-repeat;
    background-size: 100%;
    .btn {
        position: absolute;
        right: 100px;
        top: 50%;
        margin-top: 20px;
        height: 40px;
        width: 160px;
        border-radius: 6px;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        background: #FFA500;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 10px 1px #FFA500;
        }
        a {
            display: block;
            height: 100%;
            color: #fff;
        }
    }
}
</style>

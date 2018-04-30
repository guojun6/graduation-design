<template>
    <div
        class="course-entry"
        @click="linkTo">
        <div class="img-box"
            :style="{background: 'url(' + imgurl + ')'}">
            <img :src="imgurl">
        </div>
        <div class="txt-box">
            <p>{{courseName}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'course-entry',
    props: {
        imgurl: String,
        courseName: String,
        url: String
    },
    methods: {
        linkTo() {
            this.$router.push(this.url);
        }
    }
};
</script>

<style lang="scss" scoped>
.course-entry {
    position: relative;
    display: inline-block;
    width: 22%;
    margin: 0 18px;
    padding-top: 22%; 
    cursor: pointer;
    &:hover {
        .txt-box {
            font-weight: bold;
        }
    }
    .img-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ccc;
    }
    .txt-box {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-width: 300px;
        padding: 10px 0;
        background: #aaa;
    }
}
</style>

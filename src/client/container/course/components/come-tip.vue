<template>
    <div class="come-tip">
        {{name}}进入了聊天室
    </div>
</template>

<script>
export default {
    name: 'come-tip',
    props: {
        name: String
    }
};
</script>

<style lang="scss" scoped>
.come-tip {
    margin: 8px auto;
    width: 16em;
    padding: 2px;
    font-size: 12px;
    color: #fff;
    background: #aaa;
    text-align: center;
}
</style>

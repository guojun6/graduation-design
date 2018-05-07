<template>
    <div class="bottom-footer">
        <p>刘东峰团队研制</p>
        <p>
            <span>
                <router-link to="/about-us">关于我们</router-link>
            </span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'bottom-footer'
};
</script>

<style lang="scss" scoped>
.bottom-footer {
    padding: 6px;
    font-size: 12px;
    color: #999;
    text-align: center;
    a {
        color: inherit;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>


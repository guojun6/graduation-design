<template>
    <div class="msg">
        <div
            class="right"
            v-if="self">
            <div class="message">
                <p>{{message}}</p>
            </div>
            <div class="avatar">
                <img :src="avatarPath">
            </div>
        </div>
        <div
            class="left"
            v-else>
            <div class="avatar">
                <img :src="avatarPath">
            </div>
            <div class="message">
                <p>{{message}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'msg',
    data() {
        return {}
    },
    props: {
        avatarPath: String,
        message: String,
        self: Boolean
    }
}
</script>

<style lang="scss" scoped>
.msg {
    .left, .right {
        display: flex;
        align-items: center;
    }
    .left {
        justify-content: flex-start;
        .avatar {
            margin-right: 10px;
        }
    }
    .right {
        justify-content: flex-end;
        .avatar {
            margin-left: 10px;
        }
        .message {
            background: #7CFC00;
        }
    }
    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 18px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .message {
        width: 20%;
        min-width: 200px;
        padding: 8px;
        margin: 8px 0;
        border-radius: 6px;
        white-space: pre;
        background: #fff; //#00BFFF;
    }
}
</style>

<template>
    <div class="password">
        <div>
            <div class="input-control">
                <el-input v-model="email" placeholder="请输入邮箱"></el-input>
            </div>
            <div class="input-control">
                <el-button
                    :disabled="isSubmited"
                    @click="submit">提交</el-button>
            </div>
            <p class="tips">tips:提交后登录邮箱查看邮件进行下一步操作</p>
        </div>
    </div>
</template>
<script>
import {
    Button,
    Input
} from 'element-ui';
import {mapActions} from 'vuex';
import {object2Query} from '../../../../utils/common';

export default {
    data() {
        return {
            isSubmited: false,
            email: ''
        };
    },
    components: {
        [Button.name]: Button,
        [Input.name]: Input
    },
    methods: {
        submit() {
            this.isSubmited = true;
            fetch(localURLBase + '/registerController/checkEmail' + object2Query({
                email: this.email
            }), {
                credentials: 'include',
                mode: 'cors'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status !== 200) {
                    this.setToast({
                        showTime: Date.now(),
                        txt: '提交失败，code:' + res.status
                    });
                    this.isSubmited = false;
                }
            })
        },
        ...mapActions([
            'setToast'
        ])
    }
};
</script>

<style lang="scss" scoped>
.input-control {
    margin: 10px;
    width: 260px;
}
.tips {
    margin: 10px;
    color: #ccc;
}
</style>

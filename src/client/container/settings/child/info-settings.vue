<template>
    <div class="info-settings">
        <div
            class="avatar"
            @click="changeAvatar">
            <img :src="avatarPath" alt="">
        </div>
        <el-input
            v-model="username">
            <label
                class="label"
                slot="prepend">用户名</label>
        </el-input>
        <el-input
            v-model="phone">
            <label
                class="label"
                slot="prepend">电话</label>
        </el-input>
        <div>
            <el-button
                class="btn-save"
                @click="save">保存</el-button>
        </div>
        
        <input
            class="input-file"
            type="file"
            ref="file"
            @change="uploadAvatar">
    </div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex';
import {
    FormItem,
    Input,
    Button
} from 'element-ui';
import {object2Query} from '../../../../utils/common';

export default {
    data() {
        return {
            avatarPath: '',
            username: '',
            phone: '',
            email: ''
        };
    },
    computed: {
        ...mapState([
            'userInfo',
            'isLogin'
        ])
    },
    components: {
        [FormItem.name]: FormItem,
        [Input.name]: Input,
        [Button.name]: Button
    },
    created() {
        if (!this.isLogin) {
            location.href = '/sp/pages/account';
        }
        this.avatarPath = this.userInfo.profilehead;
        this.username = this.userInfo.username;
        this.phone = this.userInfo.phone;
        this.email = this.userInfo.email;
    },
    methods: {
        changeAvatar() {
            this.$refs.file.click();
        },
        uploadAvatar(e) {
            var files = e.target.files;
            if (e.target.value.length < 1 || !files) {
                return false;
            }
            if (files.length > 1) {
                this.setToast('只能上传一张照片');
                return false;
            }
            
            if (typeof FormData === 'undefined') {
                this.setToast('请换成版本较高的浏览器进行上传');
                return;
            }
            var formData = new FormData();
            var avatar = files[0];

            formData.append('file', avatar);
            if (this.userInfo.profilehead) {
                formData.append('path', this.userInfo.profilehead);
            }
            fetch(localURLBase + '/fileController/upload', {
                body: formData,
                method: 'POST',
                headers: {
                    'Content-Type': 'multiple/form-data'
                }
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status !== 200) {
                    this.setToast(res.msg);
                } else {
                    // this.getAvatar();
                    this.avatarPath = res.data.path;
                }
            }).catch((err) => {
                this.setToast(err);
            });
        },
        save() {
            console.log(this.username)
            var data = {
                id: this.userInfo.id,
                username: this.username,
                // phone: this.phone,
                // profilehead: this.avatarPath,
                email: this.email
            };
            if (this.phone) data.phone = this.phone;
            if (this.avatarPath) data.profilehead = this.avatarPath;
            
            fetch(localURLBase + '/userController/editUser' + object2Query(data), {
                mode: 'cors',
                credentials: 'include'
            }).then((RES) => {
                return RES.json();
            }).then((res) => {
                if (res.status !== 200) {
                    this.setToast({
                        showTime: Date.now(),
                        txt: '保存失败'
                    });
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
.input-file {
    position: absolute;
    left: -10000px;
}
.avatar {
    width: 50px;
    height: 50px;
    margin: 20px auto;
    border-radius: 25px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 5px #ccc;
    }
    img {
        width: 100%;
        height: 100%;
    }
}
.el-input {
    width: 360px;
    margin: 10px 0;
}
.label {
    display: inline-block;
    width: 3em;
    text-align: right;
}
.btn-save {
    background: #FFA500;
    color: #fff;
    &:hover {
        color: #000;
        background: #fff;
    }
}
</style>

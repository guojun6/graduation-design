<template>
    <article class="manager">
        <header>
            <div>第一虚拟课堂管理后台</div>
            
        </header>
        <aside class="catalog">
            <ul>
                <li
                    class="fist-level"
                    v-for="(item, index) in powerList"
                    :key="index">
                    <div>{{item.name}}</div>
                    <ul v-if="item.child">
                        <li 
                            class="second-level"
                            v-for="(childItem, index) in item.child"
                            :key="index"
                            @click="setManagePage(childItem.url)">
                            {{childItem.name}}
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
        <main>
            <div v-if="!iframeURL">欢迎来到第一虚拟课堂管理后台</div>
            <iframe :src="iframeURL" frameborder="0"></iframe>
        </main>
        <!--
        <alert
            :title="alertTxt"
            :show="isShowAlert"
            btn="cancel"
            :showTitle="true"
            :showBody="false"
            :onCancel="alertOnCancel"
            @onClosing="alertOnClosing">
        </alert>
        -->
    </article>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            powerList: [],
            iframeURL: ''
        };
    },
    methods: {
        getPowerList() {
            // fetch(localURLBase + '/api/managePower')
            fetch(localURLBase + '/functionController/findMenu').then(function(RES) {
                return RES.json();
            }).then((res) => {
                if (res.status !== 200) {
                    this.setToast({
                        showTime: Date.now(),
                        txt: res.msg
                    });
                }
                this.powerList = res.data;
            }).catch((err) => {
                console.error(err);
            });
        },
        setManagePage(url) {
            this.iframeURL = url;
        },
        
        ...mapActions([
            'setToast'
        ])
    },
    created() {
        this.getPowerList();
    }
};
</script>
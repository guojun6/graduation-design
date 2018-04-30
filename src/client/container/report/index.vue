<template>
    <div class="report">
        <quill-editor ref="myTextEditor"  
            :content="content"
            :options = "editorOption"  
            @change="onEditorChange($event)">
        </quill-editor>  
        <!--<div class="textarea-box">
            <textarea
                id="editor_id"
                style="width:100%;height:400px;">
                
            </textarea>
        </div>-->
    </div>
</template>
<script>
// import '../../libs/kindeditor/kindeditor-all';
// import '../../libs/kindeditor/lang/zh-CN';
var editorReady = false;
export default {
    mounted() {
        // console.log('sd')
        // KindEditor.ready(function(K) {
        //     window.editor = K.create('#editor_id', {
        //         basePath: '/graduation-design/dist/sp/libs/kindeditor/',
        //         //指定上传文件参数名称
        //         filePostName  : "uploadFile",
        //         //指定上传文件请求的url。
        //         uploadJson : 'http://192.168.43.36/pic/upload',
        //         //上传类型，分别为image、flash、media、file
        //         dir : "image"
        //     });
        //     alert('sd');
        //     editorReady = true;
        // });
    },
    methods: {
        onEditorChange() {

        }
    }
};
</script>
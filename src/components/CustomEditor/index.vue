<template>
  <div class="custom-editor" :style="`height: ${height}px`">
    <div :style="`height: ${height}px`" v-show="mode==='edit'&&!pass">
      <el-button type="text" @click="edit" size="default">编辑</el-button>
      <div class="htmlBox" v-html="value"></div>
    </div>
    <textarea :id="`custom-editor-${editorKey}`" v-show="mode==='add'||pass"></textarea>
  </div>
</template>

<script>
  import tinymce from "tinymce/tinymce.min";
  import "tinymce/themes/silver/theme.min";
  import 'tinymce/icons/default/icons.min';

  import "tinymce/plugins/image"; // 插入上传图片插件
  import "tinymce/plugins/table"; // 插入表格插件
  import "tinymce/plugins/lists"; // 列表插件
  import "tinymce/plugins/contextmenu"; //右键菜单插件
  import "tinymce/plugins/wordcount"; // 字数统计插件
  import "tinymce/plugins/colorpicker"; //选择颜色插件
  import "tinymce/plugins/textcolor"; //文本颜色插件
  import "tinymce/plugins/fullscreen"; //全屏
  import "tinymce/plugins/help"; // 帮助
  import "tinymce/plugins/searchreplace"; // 全屏
  import "tinymce/plugins/insertdatetime"; // 插入时间
  import "tinymce/plugins/toc"; // 内容列表
  import "tinymce/plugins/codesample"; // 插入代码

  import {uploadFilePlusApi} from '@/api/file'

  export default {
    name: "CustomEditor",
    props: {
      value: {
        type: String,
        default: ''
      },
      editorKey: { // 同一页面多个富文本要传唯一值
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 500
      },
      mode: {
        type: String,
        default: 'add'
      }
    },
    data() {
      return {
        flag: true,
        pass: false,
        editor: null,
        DefaultInit: {
          language_url: "/assets/tinymce/langs/zh_CN.js", //导入语言文件
          skin_url: "/assets/tinymce/skins/ui/oxide", //主题样式
          language: "zh_CN", //语言设置
          height: this.height, //高度
          menubar: false, // 最上方menu菜单
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          statusbar: false, // 隐藏编辑器底部的状态栏
          elementpath: false, // 禁用下角的当前标签路径
          powerpaste_allow_local_images: true,
          powerpaste_word_import: 'prompt',
          powerpaste_html_import: 'prompt',
          relative_urls: false, // 绝对路径
          remove_script_host: true, // 禁止加上http
          toolbar: [
            "bold italic underline | formatselect | fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | codeformat blockformats | removeformat undo redo",
            "bullist numlist toc pastetext | image table | searchreplace fullscreen"
          ],
          plugins: "lists image table wordcount fullscreen help codesample toc searchreplace",
          external_plugins: {'powerpaste': '/assets/tinymce/plugins/powerpaste/plugin.min.js'}
        }
      }
    },
    mounted() {
      if (this.mode === 'add') this.init();
    },
    watch: {
      value(val, old) {
        if (val && !old) { // 第一次输入执行
          if (this.flag === false) return
          this.set(val)
        }
        if (!val) { // 清空执行
          this.flag = true;
          this.set();
        }
      }
    },
    methods: {
      init() {
        tinymce.init({
          // 挂载的DOM对象
          selector: `#custom-editor-${this.editorKey}`,
          // 默认配置
          ...this.DefaultInit,
          // 图片上传
          images_upload_handler: (blobInfo, success) => {
            let data = {};
            data.file = blobInfo.blob();
            uploadFilePlusApi(data)
              .then(result => {
                let url = process.env.VUE_APP_BASE_API + result.data['accessPath'];
                success(url)
              })
          },
          // 监听富文本内容
          setup: (editor) => {
            this.editor = editor;
            editor.on('init', () => {
              this.set(this.value)
            })
            editor.on('input change undo redo', () => {
              this.flag = false;
              this.$emit('input', editor.getContent());
              this.$parent.$emit('el.form.change')
            })
          }
        });
      },
      // 开启编辑
      edit() {
        this.pass = true;
        this.$nextTick(() => {
          this.init();
        })
      },
      // 设置富文本内容
      set(value = "") {
        if (this.mode === 'edit' && this.pass === false) return;
        this.editor.setContent(value);
      }
    },
    // 退出销毁
    beforeDestroy() {
      if (!this.editor) return;
      this.editor.destroy();
      let element = document.getElementById(`custom-editor-${this.editorKey}`);
      element.style.visibility = 'hidden'
    }
  };
</script>

<style lang="scss">
  .custom-editor {
    & > div:first-child {
      position: relative;
      overflow: auto;
      box-sizing: border-box;
      border: 1px solid #EBEEF5;

      .el-button {
        position: absolute;
        right: 10px;
      }
    }
  }
</style>

<template>
  <el-dialog
      title="编辑站外跳转"
      width="700px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <el-form-item label="logo" prop="logo">
        <image-uploader v-model="form.logo"></image-uploader>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editFooterOuterApi} from '@/api/footer';
  import {resetForm} from "@/utils/common";

  export default {
    name: "EditOuter",
    data() {
      return {
        visible: false,
        form: {
          id: null,
          logo: '',
          link: ""
        },
        rules: {
          logo: {required: true, message: '请上传logo', trigger: 'change'},
          link: {required: true, message: '请输入跳转链接', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editFooterOuterApi(data).then(() => {
            this.$refs.Submit.stop();
            this.$emit('update');
            this.cancel()
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        });
      },
      cancel() {
        resetForm(this)
      }
    }
  }
</script>

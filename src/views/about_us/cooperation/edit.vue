<template>
  <el-dialog
      title="编辑合作成员"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="中文名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" prop="nameEn">
        <el-input v-model="form.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="logo" prop="logo">
        <image-uploader-plus v-model="form.logo" :width="200" :height="66"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editPartnerApi} from '@/api/aboutUs/cooperation';
  import {resetForm} from "@/utils/common";

  export default {
    name: "EditCooperation",
    data() {
      return {
        visible: false,
        form: {
          id: null,
          name: '',
          nameEn: '',
          link: '',
          logo: ''
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          link: {required: true, message: '请输入链接', trigger: 'blur'},
          logo: {required: true, message: '请上传logo', trigger: 'change'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editPartnerApi(data).then(() => {
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

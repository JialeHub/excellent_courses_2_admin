<template>
  <el-dialog
      title="编辑移民类型"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <el-form-item label="移民类型(中文)" prop="type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="移民类型(英文)" prop="typeEn">
        <el-input v-model="form.typeEn"></el-input>
      </el-form-item>
      <el-form-item label="移民类型封面" prop="cover">
        <image-uploader-plus v-model="form.cover" :width="204" :height="132"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editImmigrantTypeApi} from '@/api/immigration';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Edit",
    props: {
      classify: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        form: {
          id: null,
          type: '',
          typeEn: "",
          cover: ''
        },
        rules: {
          type: {required: true, message: '请输入移民类型', trigger: 'blur'},
          typeEn: {required: true, message: '请输入移民类型', trigger: 'blur'},
          cover: {required: true, message: '请上传移民类型封面', trigger: 'change'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          data.classify = this.classify;
          this.$refs.Submit.start();
          editImmigrantTypeApi(data).then(() => {
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

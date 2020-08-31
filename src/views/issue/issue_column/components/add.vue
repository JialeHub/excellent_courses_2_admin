<template>
  <el-dialog
      title="新增问题类型"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <el-form-item label="问题类型(中文)" prop="quesType">
        <el-input v-model="form.quesType"></el-input>
      </el-form-item>
      <el-form-item label="问题类型(英文)" prop="quesTypeEn">
        <el-input v-model="form.quesTypeEn"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addQuestionTagApi} from '@/api/issue';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    props: {
      questionPage: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        form: {
          quesType: '',
          quesTypeEn: ""
        },
        rules: {
          quesType: {required: true, message: '请输入问题类型', trigger: 'blur'},
          quesTypeEn: {required: true, message: '请输入问题类型', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          data.quesPage = this.questionPage;
          this.$refs.Submit.start();
          addQuestionTagApi(data).then(() => {
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

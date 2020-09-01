<template>
  <el-dialog
      z-index="10"
      title="新增主观题"
      width="800px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="4rem">
      <el-form-item label="题号" prop="sbIndex">
        <el-input-number v-model="form.sbIndex" :min="0" label="题号" />
      </el-form-item>
      <el-form-item label="题目" prop="sbQues">
        <custom-editor :editor-key="2" v-model="form.sbQues"/>
      </el-form-item>
      <el-form-item label="答案" prop="sbAnsw">
        <custom-editor :editor-key="3" v-model="form.sbAnsw"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {resetForm} from "@/utils/common";
  import {updateSubjectApi} from "@/api/examination";

  export default {
    name: "SubjectEdit",
    data() {
      return {
        visible: false,
        form: {
          "sbAnsw": "",
          "sbIndex": 0,
          "sbQues": "",
          "sbSection": 0,
          "id": NaN,
        },
        rules:{
          sbIndex: {required: true, message: '请输入题号', trigger: 'blur'},
          sbQues: {required: true, message: '请输入题目', trigger: 'blur'},
          sbAnsw: {required: true, message: '请选择答案', trigger: 'change'},
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          updateSubjectApi(data).then(() => {
            this.$refs.Submit.stop();
            this.cancel()
            this.$emit('update')
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        });
      },
      cancel() {
        resetForm(this)
      },
    }
  }
</script>

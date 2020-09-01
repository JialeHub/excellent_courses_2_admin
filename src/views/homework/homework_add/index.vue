<template>
  <el-dialog
      z-index="10"
      title="新建作业"
      width="800px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="作业编号" prop="hwIndex">
        <el-input-number v-model="form.hwIndex" :min="0" label="作业编号" />
      </el-form-item>
      <el-form-item label="作业名称" prop="hwName">
        <el-input v-model="form.hwName" placeholder="作业名称" />
      </el-form-item>
      <el-form-item label="作业要求" prop="hwRequire">
        <el-input type="textarea" v-model="form.hwRequire" placeholder="作业要求" />
      </el-form-item>
      <el-form-item label="截止时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="截止时间" />
      </el-form-item>
      <el-form-item label="题目" prop="hwQuestion">
        <custom-editor :editor-key="0" v-model="form.hwQuestion"/>
      </el-form-item>
      <el-form-item label="答案" prop="hwAnswer">
        <custom-editor :editor-key="1" v-model="form.hwAnswer"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {formatDateTime, resetForm} from "@/utils/common";
  import {saveHomeworkApi} from "@/api/homework";
  import DateTimePicker from "@/components/DateTimePicker/index";

  export default {
    name: "HomeworkAdd",
    components: {DateTimePicker},
    data() {
      return {
        visible: false,
        form: {
          "endTime": "",
          "hwAnswer": "",
          "hwIndex": NaN,
          "hwName": "",
          "hwQuestion": "",
          "hwRequire": "",
        },
        rules:{
          hwIndex: {required: true, message: '请输入内容', trigger: 'blur'},
          hwName: {required: true, message: '请输入内容', trigger: 'blur'},
          hwRequire: {required: false, message: '请输入内容', trigger: 'blur'},
          endTime: {required: true, message: '请选择截止时间', trigger: 'change'},
          hwQuestion: {required: true, message: '请输入内容', trigger: 'change'},
          hwAnswer: {required: true, message: '请输入内容', trigger: 'change'},
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          data.endTime=formatDateTime(this.form.endTime)
          this.$refs.Submit.start();
          saveHomeworkApi(data).then(() => {
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

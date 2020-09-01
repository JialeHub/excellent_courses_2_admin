<template>
  <el-dialog
      z-index="10"
      title="已提交详情"
      width="800px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="作业编号" prop="hwIndex">
        <span>{{form.hwIndex}}</span>
      </el-form-item>
      <el-form-item label="学生姓名" prop="sname">
        <span>{{form.sname}}</span>
      </el-form-item>
      <el-form-item label="学生班级" prop="sclass">
        <span>{{form.sclass}}</span>
      </el-form-item>
      <el-form-item label="学生学号" prop="snumber">
        <span>{{form.snumber}}</span>
      </el-form-item>
      <el-form-item label="提交时间" prop="subTime">
        <span>{{form.subTime}}</span>
      </el-form-item>
      <el-form-item label="作业题目" prop="hwQuestion">
        <div class="htmlBox" v-html="form.hwQuestion" style="border: 1px solid rgba(200,200,200,0.5);width: 100%;padding: 10px"></div>
      </el-form-item>
      <el-form-item label="提交答案" prop="hwAnswer">
        <div class="htmlBox" v-html="form.subAnswer" style="border: 1px solid rgba(200,200,200,0.5);width: 100%;padding: 10px"></div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { resetForm} from "@/utils/common";

  export default {
    name: "HomeworkEdit",
    data() {
      return {
        visible: false,
        form: {
          id: NaN,
          hwQuestion: '',
          subAnswer: '',
          hwIndex: '',
          sname: '',
          sclass: '',
          snumber: '',
          subTime: '',
        }
      }
    },
    methods: {
      cancel() {
        resetForm(this)
      },
    }
  }
</script>

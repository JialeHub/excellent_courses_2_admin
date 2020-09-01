<template>
  <el-dialog
      z-index="10"
      title="新增客观题"
      width="800px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="题号" prop="chIndex">
        <el-input-number v-model="form.chIndex" :min="0" label="题号" />
      </el-form-item>
      <el-form-item label="题型" prop="chType">
        <el-select v-model="form.chType" placeholder="请选择题型" @change="changeType">
          <el-option label="单选题" :value="0" />
          <el-option label="多选题" :value="1" />
          <el-option label="判断题" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="题目" prop="chQuestion">
        <el-input type="textarea" v-model="form.chQuestion" placeholder="题目" />
      </el-form-item>
      <el-form-item label="选项" prop="chItemArr" v-if="form.chType === 0 || form.chType === 1">
        <el-input v-model="form.chItemArr[0]" placeholder="选项A" style="margin-top: 5px;"/>
        <el-input v-model="form.chItemArr[1]" placeholder="选项B" style="margin-top: 5px;"/>
        <el-input v-model="form.chItemArr[2]" placeholder="选项C" style="margin-top: 5px;"/>
        <el-input v-model="form.chItemArr[3]" placeholder="选项D" style="margin-top: 5px;"/>
      </el-form-item>
      <!--单选题答案-->
      <el-form-item label="答案" prop="chAnswerArr" v-if="form.chType === 0">
        <el-radio-group  v-model="form.chAnswerArr[0]">
          <el-radio :label="0">A</el-radio>
          <el-radio :label="1">B</el-radio>
          <el-radio :label="2">C</el-radio>
          <el-radio :label="3">D</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--多选题答案-->
      <el-form-item label="答案" prop="chAnswerArr" v-if="form.chType === 1">
        <el-checkbox-group v-model="form.chAnswerArr">
          <el-checkbox :label="0">A</el-checkbox>
          <el-checkbox :label="1">B</el-checkbox>
          <el-checkbox :label="2">C</el-checkbox>
          <el-checkbox :label="3">D</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!--判断题答案-->
      <el-form-item label="答案" prop="chAnswerArr" v-if="form.chType === 2">
        <el-radio-group  v-model="form.chAnswerArr[0]">
          <el-radio :label="0">错误</el-radio>
          <el-radio :label="1">正确</el-radio>
        </el-radio-group>
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
  import {saveChoiceApi} from "@/api/examination";

  export default {
    name: "ChoiceAdd",
    data() {
      return {
        visible: false,
        form: {
          "chAnswer": "",
          "chIndex": 0,
          "chItem": "",
          "chQuestion": "",
          "chSection": 0,
          "chType": 0,

          chItemArr: [],
          chAnswerArr: [],
        },
        rules:{
          chIndex: {required: true, message: '请输入题号', trigger: 'blur'},
          chType: {required: true, message: '请输入题型', trigger: 'change'},
          chQuestion: {required: true, message: '请输入题目', trigger: 'blur'},
          chAnswerArr: {required: true, message: '请选择答案', trigger: 'change'},
        }
      }
    },
    methods: {
      changeType(){
        this.form.chAnswerArr = [];
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          if (data.chType===2) {
            data.chItem=''
          }else{
            data.chItem=data.chItemArr.join("&")
          }
          data.chAnswer=data.chAnswerArr.join(",")

          delete data.chItemArr;
          delete data.chAnswerArr;
          this.$refs.Submit.start();
          saveChoiceApi(data).then(() => {
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

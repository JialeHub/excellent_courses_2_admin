<template>
  <el-dialog
      title="新增问题"
      width="900px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="问题类型" prop="tagId">
        <el-select v-model="form.tagId" clearable class="w-100">
          <el-option
              v-for="item in options"
              :label="item.quesType"
              :value="item.id"
              :key="item.id">
            <span style="float: left">{{item.quesType}}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{item.quesTypeEn}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <row-col>
        <el-form-item label="问题" prop="quesTitle">
          <el-input v-model="form.quesTitle" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="quesTitleEn" slot="r">
          <el-input v-model="form.quesTitleEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="回答者" prop="answer">
          <el-input v-model="form.answer" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="answerEn" slot="r">
          <el-input v-model="form.answerEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="回答" prop="answerValue">
          <el-input v-model="form.answerValue" type="textarea" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="answerValueEn" slot="r">
          <el-input v-model="form.answerValueEn" type="textarea" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addQuestionsApi} from '@/api/issue';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    props: {
      questionPage: {
        type: Number,
        required: true
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        visible: false,
        form: {
          tagId: null,
          quesTitle: '',
          quesTitleEn: '',
          answer: '',
          answerEn: '',
          answerValue: '',
          answerValueEn: ''
        },
        rules: {
          tagId: {required: true, message: '请选择问题类型', trigger: 'change'},
          quesTitle: {required: true, message: '请输入问题', trigger: 'blur'},
          quesTitleEn: {required: true, message: '请输入问题', trigger: 'blur'},
          answer: {required: true, message: '请输入回答者', trigger: 'blur'},
          answerEn: {required: true, message: '请输入回答者', trigger: 'blur'},
          answerValue: {required: true, message: '请输入回答', trigger: 'blur'},
          answerValueEn: {required: true, message: '请输入回答', trigger: 'blur'}
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
          addQuestionsApi(data).then(() => {
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

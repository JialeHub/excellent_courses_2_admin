<template>
  <card>
    <go-back :content="title + '投资指南'" @back="goBack"/>
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
      <row-col>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item slot="r" label="标题" prop="titleEn">
          <el-input v-model="form.titleEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="投资指南类型" prop="typeId">
          <el-select v-model="form.typeId" clearable class="ml-5">
            <el-option v-for="item in options" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期" prop="createTime" slot="r">
          <el-date-picker
              v-model="form.createTime"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </row-col>
      <el-form-item label="封面" prop="cover">
        <image-uploader-plus v-model="form.cover" :width="248" :height="160"/>
      </el-form-item>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="内容(中文)" name="first">
          <custom-editor :editor-key="0" v-model="form.content"/>
        </el-tab-pane>
        <el-tab-pane label="内容(英文)" name="second">
          <custom-editor :editor-key="1" v-model="form.contentEn"/>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer">
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </card>
</template>

<script>
  import {editNewsApi, addNewsApi} from '@/api/article'
  import {resetForm} from "@/utils/common";

  const formatTime = require('silly-datetime');
  export default {
    name: "Detail",
    props: {
      id: {required: true},
      options: {required: true},
      title: {type: String, required: true},
      classify: {type: Boolean, required: true},
    },
    data() {
      return {
        activeName: 'first',
        form: {
          title: "",
          titleEn: "",
          typeId: null,
          cover: "",
          content: "",
          contentEn: "",
          createTime: formatTime.format(),
        },
        rules: {
          title: {required: true, message: '请输入标题', trigger: 'blur'},
          titleEn: {required: true, message: '请输入标题', trigger: 'blur'},
          typeId: {required: true, message: '请选择类型', trigger: 'change'},
          createTime: {required: true, message: '请选择创建日期', trigger: 'change'},
          cover: {required: true, message: '请上传封面', trigger: 'change'}
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
          if (this.title === '新增') {
            addNewsApi(data).then(() => {
              this.$refs.Submit.stop();
              this.$emit('update');
              this.goBack()
            });
          } else {
            data.id = this.id;
            editNewsApi(data).then(() => {
              this.$refs.Submit.stop();
              this.$emit('update');
              this.goBack()
            });
          }
        });
      },
      goBack() {
        this.$parent.isShow = true;
        resetForm(this)
      }
    }
  }
</script>

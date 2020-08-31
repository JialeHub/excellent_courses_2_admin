<template>
  <el-dialog
      title="编辑成员"
      width="700px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <row-col>
        <!--中-->
        <el-form-item label="名称" prop="memberName">
          <el-input v-model="form.memberName" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="memberPosition">
          <el-input v-model="form.memberPosition" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="memberProfile">
          <el-input type="textarea" v-model="form.memberProfile" placeholder="中文"></el-input>
        </el-form-item>
        <!--英-->
        <el-form-item slot="r" prop="memberNameEn">
          <el-input v-model="form.memberNameEn" placeholder="英文"></el-input>
        </el-form-item>
        <el-form-item slot="r" prop="memberPositionEn">
          <el-input v-model="form.memberPositionEn" placeholder="英文"></el-input>
        </el-form-item>
        <el-form-item slot="r" prop="memberProfileEn">
          <el-input type="textarea" v-model="form.memberProfileEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <el-form-item label="照片" prop="memberImg">
        <image-uploader-plus v-model="form.memberImg"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editMemberApi} from '@/api/aboutUs/introduce';
  import {resetForm} from "@/utils/common";

  export default {
    name: "EditMember",
    data() {
      return {
        visible: false,
        form: {
          id: null,
          memberName: '',
          memberPosition: '',
          memberProfile: '',
          memberNameEn: '',
          memberPositionEn: '',
          memberProfileEn: '',
          memberImg: ''
        },
        rules: {
          memberName: {required: true, message: '请输入名称', trigger: 'blur'},
          memberNameEn: {required: true, message: '请输入名称', trigger: 'blur'},
          memberImg: {required: true, message: '请上传照片', trigger: 'change'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editMemberApi(data).then(() => {
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

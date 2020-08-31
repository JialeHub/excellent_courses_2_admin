<template>
  <el-dialog
      title="新增学生"
      width="800px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <row-col>
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="form.sname" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="snumber" slot="r">
          <el-input v-model="form.snumber" placeholder="学号"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="班级" prop="sclass">
          <el-input v-model="form.sclass" placeholder="班级"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="sphone" slot="r">
          <el-input v-model="form.sphone" placeholder="手机号"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="性别">
          <el-radio-group v-model="form.ssex">
            <el-radio :label="false">男</el-radio>
            <el-radio :label="true">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账号状态" prop="isEnable" slot="r">
          <el-switch v-model="form.isEnable"/>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="头像" prop="header">
          <image-uploader-plus v-model="form.scover"/>
        </el-form-item>
        <el-form-item label="个人介绍" prop="sprofile" slot="r">
          <el-input type="textarea" v-model="form.sprofile"></el-input>
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
  import {addUserApi} from '@/api/user';
  import {resetForm} from "@/utils/common";
  import {validatePhone,validateNumber} from "@/utils/validate";

  export default {
    name: "StudentsAdd",
    data() {
      return {
        visible: false,
        form: {
          "sclass": "",
          "scover": "",
          "sname": "",
          "snumber": "",
          "sphone": "",
          "sprofile": "",
          "ssex": true,
          "isEnable": true,
        },
        rules: {
          sname: {required: true, message: '请输入学生姓名', trigger: 'blur'},
          sclass: {required: true, message: '请输入学生所在班级', trigger: 'blur'},
          snumber: {required: true, validator: validateNumber, trigger: 'blur'},
          sphone: {required: true, validator: validatePhone, trigger: 'blur'},
          password: {required: true, message: '请输入密码', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          addUserApi(data).then(() => {
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
      }
    }
  }
</script>

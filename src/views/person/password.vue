<template>
  <el-dialog
      title="修改密码"
      width="450px"
      :visible.sync="visible"
      @close="cancel"
      :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
      <el-form-item label="用户名:" prop="username">
        <el-input type="username" v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="当前密码:" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {updatePassApi} from '@/api/person';
  import {resetForm} from "@/utils/common";

  export default {
    name: "PasswordDialog",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      };
      return {
        visible: false,
        form: {
          username: '',
          password: '',
          newPassword: '',
          checkPass: ''
        },
        rules: {
          username: {required: true, message: '请输入用户名', trigger: 'blur'},
          password: {required: true, message: '请输入当前密码', trigger: 'blur'},
          newPassword: {required: true, message: '请输入新密码', trigger: 'blur'},
          checkPass: {required: true, validator: validatePass, trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs["Form"].validate((valid) => {
          if (!valid) return;
          let data = {};
          data.username = this.form.username;
          data.password = this.form.password;
          data.newPassword = this.form.newPassword;
          this.$refs.Submit.start();
          updatePassApi(data).then(result => {
            this.$refs.Submit.stop();
            if (result.code === 200)
              this.$router.push({name: 'login'})
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        })
      },
      cancel() {
        this.visible = false;
        resetForm(this, 'form')
      }
    }
  }
</script>

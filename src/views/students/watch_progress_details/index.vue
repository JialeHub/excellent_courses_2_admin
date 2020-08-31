<template>
  <el-dialog
      title="新增管理员"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
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

  export default {
    name: "WatchProgressDetails",
    data() {
      return {
        visible: false,
        form: {
          username: '',
          password: ""
        },
        rules: {
          username: {required: true, message: '请输入用户名', trigger: 'blur'},
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

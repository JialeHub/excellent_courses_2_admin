<template>
  <el-dialog
      title="学生信息"
      width="800px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <row-col>
        <el-form-item label="姓名" prop="sname">
          <!--<el-input v-model="form.sname" placeholder="姓名"></el-input>-->
          {{form.sname}}
        </el-form-item>
        <el-form-item label="学号" prop="snumber" slot="r">
          <!--<el-input v-model="form.snumber" placeholder="学号" disabled></el-input>-->
          {{form.snumber}}
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="班级" prop="sclass">
          <!--<el-input v-model="form.sclass" placeholder="班级"></el-input>-->
          {{form.sclass}}
        </el-form-item>
        <el-form-item label="手机号" prop="sphone" slot="r">
          <!--<el-input v-model="form.sphone" placeholder="手机号"></el-input>-->
          {{form.sphone}}
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="性别">
          <!--<el-radio-group v-model="form.ssex">
            <el-radio :label="false">男</el-radio>
            <el-radio :label="true">女</el-radio>
          </el-radio-group>-->
          <span v-if="!form.ssex">男</span>
          <span v-else>女</span>
        </el-form-item>
        <el-form-item label="是否启用" slot="r">
          <!--<el-radio-group v-model="form.ssex">
            <el-radio :label="false">男</el-radio>
            <el-radio :label="true">女</el-radio>
          </el-radio-group>-->
          <span v-if="form.isEnable">是</span>
          <span v-else>否</span>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="头像" prop="header">
          <!--<image-uploader-plus v-model="form.scover"/>-->
          <img :src="$baseApi + form.scover" alt="" width="178" height="178">
        </el-form-item>
        <el-form-item label="个人介绍" prop="sprofile" slot="r">
          <!--<el-input type="textarea" v-model="form.sprofile"></el-input>-->
          {{form.sprofile}}
        </el-form-item>
      </row-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">确 定</el-button>
      <submit-button ref="Submit" @submit="submit" v-if="false"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editUserApi} from '@/api/user';
  import {resetForm} from "@/utils/common";
  import {validatePhone,validateNumber} from "@/utils/validate";

  export default {
    name: "StudentsEdit",
    data() {
      return {
        visible: false,
        form: {
          "scover": "",
          "sname": "",
          "sphone": "",
          "sprofile": "",
          "ssex": true,

          "sclass": "",
          "snumber": "",
          "isEnable": true
        },
        rules: {
          sname: { message: '请输入学生姓名', trigger: 'blur'},
          sclass: { message: '请输入学生所在班级', trigger: 'blur'},
          snumber: { validator: validateNumber, trigger: 'blur'},
          sphone: { validator: validatePhone, trigger: 'blur'},
          password: { message: '请输入密码', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          delete data.snumber
          this.$refs.Submit.start();
          editUserApi(data).then(() => {
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

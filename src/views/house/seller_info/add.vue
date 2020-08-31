<template>
  <el-dialog
      title="新增卖家"
      width="750px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <row-col>
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="form.sname" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="snameEn" slot="r">
          <el-input v-model="form.snameEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="中文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="positionEn" slot="r">
          <el-input v-model="form.positionEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="简介" prop="profile">
          <el-input v-model="form.profile" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="profileEn" slot="r">
          <el-input v-model="form.profileEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <el-form-item label="头像" prop="header">
        <image-uploader-plus v-model="form.header"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addSellerApi} from '@/api/house/sellerInfo';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    data() {
      return {
        visible: false,
        form: {
          sname: "",
          snameEn: "",
          phone: "",
          position: "",
          positionEn: "",
          profile: "",
          profileEn: "",
          header: ""
        },
        rules: {
          sname: {required: true, message: '请输入名称', trigger: 'blur'},
          snameEn: {required: true, message: '请输入名称', trigger: 'blur'},
          phone: {required: true, message: '请输入联系方式', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          addSellerApi(data).then(() => {
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

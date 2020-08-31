<template>
  <el-dialog
      title="编辑站内跳转"
      width="700px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <row-col>
        <el-form-item label="中文名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="nameEn" slot="r">
          <el-input v-model="form.nameEn"></el-input>
        </el-form-item>
      </row-col>
      <el-form-item label="跳转路径" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editFooterInnerApi} from '@/api/footer';
  import {resetForm} from "@/utils/common";

  export default {
    name: "EditInner",
    data() {
      return {
        visible: false,
        form: {
          id: null,
          name: '',
          nameEn: "",
          link: ""
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          nameEn: {required: true, message: '请输入名称', trigger: 'blur'},
          link: {required: true, message: '请输入跳转路径', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editFooterInnerApi(data).then(() => {
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

<template>
  <el-dialog
      title="修改图片"
      width="950px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="3rem">
      <el-form-item label="图片" prop="faccess">
        <image-uploader-plus v-model="form.cover" :fixed="false" :width="800"/>
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
  import {uploadImagesApi} from "@/api/images";
  export default {
    name: "ImagesEdit",
    data() {
      return {
        visible: false,
        form: {
          id: NaN,
          cover: '',
        },
        rules:{}
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {
            id: this.form.id,
            accessPath: this.form.cover ,
          };
          this.$refs.Submit.start();
          uploadImagesApi(data).then(() => {
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

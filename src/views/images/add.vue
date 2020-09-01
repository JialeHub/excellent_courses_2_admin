<template>
  <el-dialog
      title="新增图片"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="所属板块" prop="board">
        <el-input v-model="form.board" placeholder="所属板块" />
      </el-form-item>
      <el-form-item label="所属页面" prop="page">
        <el-input v-model="form.page" placeholder="所属页面" />
      </el-form-item>
      <el-form-item label="图片" prop="board">
        <image-uploader-plus v-model="form.cover" :fixed="false"/>
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
  import {saveImagesApi} from "@/api/images";

  export default {
    name: "ImagesAdd",
    data() {
      return {
        visible: false,
        form: {
          board: '',
          cover: '',
          page: '',
        },
        rules:{}
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          saveImagesApi(data).then(() => {
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

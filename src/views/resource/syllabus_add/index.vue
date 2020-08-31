<template>
  <el-dialog
      title="新增教育大纲"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="名称" prop="fName">
        <el-input v-model="form.fName" placeholder="教育大纲名称"></el-input>
      </el-form-item>
      <el-form-item label="所属章节" prop="fSection">
        <el-input v-model="form.fSection" placeholder="所属章节"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="file">
        <file-uploader :value="form.file" @getFile="getFileUrl" ref="fileUploader" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {formatSeconds, resetForm} from "@/utils/common";
  import {uploadResourceApi} from "@/api/resource";

  export default {
    name: "SyllabusAdd",
    data() {
      return {
        visible: false,
        form: {
          fType: 2,
          fName: '',
          fSection: null,
          file: '',
        },
        rules: {
          fName: {required: true, message: '请输入视频名称', trigger: 'blur'},
          fSection: {required: true, message: '请输入章节', trigger: 'blur'},
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          uploadResourceApi(data).then(() => {
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
      getFileUrl(file) {
        this.form.file = file['accessPath'];
      },
      getDuration(t) {
        this.form.vDuration = formatSeconds(t);
      }
    }
  }
</script>

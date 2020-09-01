<template>
  <el-dialog
      title="新增教学大纲"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="所属章节" prop="fSection">
        <el-input-number v-model="form.fSection" :min="0" :max="127" label="所属章节"></el-input-number>
      </el-form-item>
      <el-form-item label="名称" prop="fName">
        <el-input v-model="form.fName" placeholder="教学大纲名称"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="accessPath">
        <file-uploader :value="form.accessPath" @getFile="getFile" ref="fileUploader" />
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
          fileSize : '',
          accessPath: '',
          newName: '',
          sysPath : '',
        },
        rules: {
          fName: {required: true, message: '请输入视频名称', trigger: 'blur'},
          fSection: {required: true, message: '请输入章节', trigger: 'blur'},
          accessPath: {required: true, message: '请上传文件', trigger: 'change'},
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
      getFile(file) {
        this.form.accessPath = file['accessPath'];
        this.form.newName = file['newName'];
        this.form.sysPath = file['sysPath'];
        this.form.fileSize = file['fileSize'];
      },
      getDuration(t) {
        this.form.vDuration = formatSeconds(t);
      }
    }
  }
</script>

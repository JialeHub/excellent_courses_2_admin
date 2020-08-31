<template>
  <el-dialog
      title="新增课件"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="课件名称" prop="fname">
        <el-input v-model="form.fname" placeholder="课件名称"></el-input>
      </el-form-item>
      <el-form-item label="所属章节" prop="fsection">
        <el-input v-model="form.fsection" placeholder="所属章节"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="file">
        <file-uploader :value="form.faccess" @getFile="getFileUrl" ref="fileUploader" />
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
  import {updateResourceApi} from "@/api/resource";

  export default {
    name: "CoursewareEdit",
    data() {
      return {
        visible: false,
        form: {
          id: NaN,
          findex: NaN,
          fsection: NaN,
          fname: '',
          vduration: '',
          faccess: '',
          frename: '',
          fpath: '',
        },
        rules: {
          fname: {required: true, message: '请输入文件名称', trigger: 'blur'},
          fsection: {required: true, message: '请输入章节', trigger: 'blur'},
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {
            faccess: this.form.faccess,
            id : this.form.id,
            index : this.form.findex,
            name : this.form.fname,
            newName : this.form.frename,
            section : this.form.fsection,
            sysPath : this.form.fpath,
          };
          this.$refs.Submit.start();
          updateResourceApi(data).then(() => {
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
        this.form.faccess = file['accessPath'];
        this.form.frename = file['newName'];
        this.form.fpath = file['sysPath'];
      },
      getDuration(t) {
        this.form.vDuration = formatSeconds(t);
      }
    }
  }
</script>

<template>
  <el-dialog
      title="新增团队成员"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <el-input v-model="form.job" placeholder="职位" />
      </el-form-item>
      <el-form-item label="照片" prop="picture">
        <image-uploader-plus v-model="form.picture" :fixed="false"/>
      </el-form-item>
      <el-form-item label="文件" prop="pdf">
        <file-uploader :value="form.pdf" @getFile="getFile" ref="fileUploader" />
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
  import {saveTeamApi} from "@/api/team";

  export default {
    name: "TeamAdd",
    data() {
      return {
        visible: false,
        form: {
          job: '',
          name: '',
          picture: '',
          pdf: '',
        },
        rules:{
          job: {required: true, message: '请输入职业', trigger: 'blur'},
          name: {required: true, message: '请输入姓名', trigger: 'blur'},
          picture: {required: true, message: '请上传照片', trigger: 'change'},
          pdf: {required: true, message: '请上传文件', trigger: 'change'},
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          saveTeamApi(data).then(() => {
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
        this.form.pdf = file['accessPath'];
        // this.form.newName = file['newName'];
        // this.form.sysPath = file['sysPath'];
        // this.form.fileSize = file['fileSize'];
      },
    }
  }
</script>

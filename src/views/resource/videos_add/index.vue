<template>
  <el-dialog
      title="新增视频"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="视频序号" prop="fIndex">
        <el-input-number v-model="form.fIndex" :min="0" label="视频序号"></el-input-number>
      </el-form-item>
      <el-form-item label="所属章节" prop="fSection">
        <el-input-number v-model="form.fSection" :min="0" :max="127" label="所属章节"></el-input-number>
      </el-form-item>
      <el-form-item label="视频名称" prop="fName">
        <el-input v-model="form.fName" placeholder="视频名称"></el-input>
      </el-form-item>
      <el-form-item label="视频" prop="accessPath">
        <video-uploader ref="videoUploader" :videoUrl="form.accessPath" @getVideo="getVideo" :width="200" :height="150"
                        @getDuration="getDuration"/>
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
    name: "VideosAdd",
    data() {
      return {
        visible: false,
        form: {
          fType: 0,
          fName: '',
          fIndex: null,
          fSection: null,
          fileSize : '',
          accessPath: '',
          newName: '',
          sysPath : '',
          vDuration: '', //时间
        },
        rules: {
          fName: {required: true, message: '请输入视频名称', trigger: 'blur'},
          fIndex: {required: true, message: '请输入视频序号', trigger: 'blur'},
          fSection: {required: true, message: '请输入章节', trigger: 'blur'},
          accessPath: {required: true, message: '请上传视频', trigger: 'change'},
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
      getVideo(file) {
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

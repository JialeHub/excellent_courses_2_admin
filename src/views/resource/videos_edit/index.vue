<template>
  <el-dialog
      title="编辑视频"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="5rem">
      <el-form-item label="视频序号" prop="findex">
        <el-input-number v-model="form.findex" :min="0" label="视频序号"></el-input-number>
      </el-form-item>
      <el-form-item label="所属章节" prop="fsection">
        <el-input-number v-model="form.fsection" :min="0" :max="127" label="所属章节"></el-input-number>
      </el-form-item>
      <el-form-item label="视频名称" prop="fname">
        <el-input v-model="form.fname" placeholder="视频名称"></el-input>
      </el-form-item>
      <el-form-item label="视频" prop="faccess">
        <video-uploader ref="videoUploader" :value="form.faccess" @getVideo="getVideo" :width="200" :height="150" @getDuration="getDuration"/>
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
    name: "VideosEdit",
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
          fsize : '',
        },
        rules: {
          fname: {required: true, message: '请输入视频名称', trigger: 'blur'},
          findex: {required: true, message: '请输入视频序号', trigger: 'blur'},
          fsection: {required: true, message: '请输入章节', trigger: 'blur'},
          faccess: {required: true, message: '请上传视频', trigger: 'change'},
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {
            accessPath: this.form.faccess,
            id : this.form.id,
            index : this.form.findex,
            name : this.form.fname,
            newName : this.form.frename,
            section : this.form.fsection,
            sysPath : this.form.fpath,
            fileSize : this.form.fsize,
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
      getVideo(file) {
        this.form.faccess = file['accessPath'];
        this.form.frename = file['newName'];
        this.form.fpath = file['sysPath'];
        this.form.fsize = file['fileSize'];
      },
      getDuration(t) {
        this.form.vDuration = formatSeconds(t);
      }
    }
  }
</script>

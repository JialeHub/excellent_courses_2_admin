<template>
  <el-dialog
      title="新增图片"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="类别" prop="type">
        <el-select v-model="form.type">
          <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.key"/>
        </el-select>
      </el-form-item>
      <el-form-item label="图片" prop="link">
        <image-uploader v-model="form.link"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addPictureApi} from '@/api/website';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        visible: false,
        form: {
          type: '',
          link: ''
        },
        rules: {
          type: {required: true, message: '请选择类别', trigger: 'change'},
          link: {required: true, message: '请上传图片', trigger: 'change'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          addPictureApi(data).then(() => {
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

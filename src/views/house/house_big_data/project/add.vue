<template>
  <el-dialog
      title="新增热门项目"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <el-form-item label="项目中文名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目英文名称" prop="nameEn">
        <el-input v-model="form.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="number">
        <el-input-number
            v-model="form.number"
            controls-position="right"
            :precision="0"
            :min="0"/>
        万起
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addBigDataApi} from '@/api/house/houseBigData';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    props: {
      type: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        form: {
          name: '',
          nameEn: "",
          number: null
        },
        rules: {
          name: {required: true, message: '请输入项目中文名称', trigger: 'blur'},
          nameEn: {required: true, message: '请输入项目英文名称', trigger: 'blur'},
          number: {required: true, message: '请输入价格', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          data.type = this.type;
          this.$refs.Submit.start();
          addBigDataApi(data).then(() => {
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

<template>
  <el-dialog
      title="编辑租金涨幅"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <el-form-item label="城市中文名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="城市英文名" prop="nameEn">
        <el-input v-model="form.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="年均租金涨幅" prop="number">
        <el-input-number
            v-model="form.number"
            controls-position="right"
            :precision="0"/>
        %
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editBigDataApi} from '@/api/house/houseBigData';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Edit",
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
          id: null,
          name: '',
          nameEn: "",
          number: null
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          nameEn: {required: true, message: '请输入名称', trigger: 'blur'},
          number: {required: true, message: '请输入年均租金涨幅', trigger: 'change'}
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
          editBigDataApi(data).then(() => {
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

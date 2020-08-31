<template>
  <el-dialog
      title="新增标签"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <el-form-item label="标签名称" prop="type">
        <el-input v-model="form.type" placeholder="中文"></el-input>
      </el-form-item>
      <el-form-item label="标签名称" prop="typeEn">
        <el-input v-model="form.typeEn" placeholder="英文"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addLabelApi} from '@/api/label';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    props: {
      classify: {
        required: true
      },
      typeGroup: {
        required: true
      }
    },
    data() {
      return {
        visible: false,
        form: {
          type: '',
          typeEn: ""
        },
        rules: {
          type: {required: true, message: '请输入标签名', trigger: 'blur'},
          typeEn: {required: true, message: '请输入标签名', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          data.classify = this.classify;
          data.typeGroup = this.typeGroup;
          this.$refs.Submit.start();
          addLabelApi(data).then(() => {
            this.$refs.Submit.stop();
            switch (this.typeGroup) {
              case 0:
                this.$emit('updateOne');
                break;
              case 1:
                this.$emit('updateTwo');
                break;
              case 2:
                this.$emit('update');
                break;
              case 3:
                this.$emit('updateOne');
                break;
              case 4:
                this.$emit('updateTwo');
                break;
              case 5:
                this.$emit('updateThree');
                break;
              case 6:
                this.$emit('updateFour');
            }
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

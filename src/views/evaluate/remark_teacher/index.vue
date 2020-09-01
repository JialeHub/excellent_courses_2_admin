<template>
  <card ref="Card">
    <div slot="header">
      <span style="margin-left: 5px;line-height: 32px;">校内专家评价</span>
    </div>
    <el-form :model="form" ref="Form" label-width="5rem">
      <el-form-item label="文件" prop="erAccPath">
        <file-uploader :value="form.erAccPath" @getFile="getFile" ref="fileUploader" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="getData">刷 新</el-button>
      <submit-button ref="Submit" @submit="submit" />
    </div>
  </card>
</template>

<script>
  import {delExpertRemarkApi, getExpertRemarkApi, saveExpertRemarkApi} from "@/api/expertRemark";
  import {isEmpty} from "@/utils/common";

  export default {
    name: "EvaluateTeacher",
    data() {
      return {
        form: {
          erAccPath: '',
          id: NaN,
        },
        type: 2
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let param = {
          type: this.type,
        };
        this.$refs.Card.start();
        getExpertRemarkApi(param).then(result => {
          let response = result.data;
          this.form = {...response};
          this.$refs.Card.stop();
        })
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          data.erType = this.type
          if (isEmpty(data.erAccPath)){
            this.delData()
          }else{
            this.$refs.Submit.start();
            saveExpertRemarkApi(data).then(() => {
              this.$refs.Submit.stop();
              this.getData()
            }).catch(() => {
              this.$refs.Submit.stop();
            })
          }
        });
      },
      delData() {
        delExpertRemarkApi({type: this.type})
          .then(() => {
            this.getData();
          })
          .catch(() => {
            this.getData();
          })
      },
      getFile(file) {
        this.form.erAccPath = file['accessPath'];
      },
    }
  }
</script>

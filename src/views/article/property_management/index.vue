<template>
  <card ref="Card">
    <div slot="header">
      <span>物业管理富文本</span>
      <submit-button class="float-right" ref="Submit" @submit="submit" text="保存"/>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="中文" name="first">
        <custom-editor v-model="form.content" :editor-key="0"/>
      </el-tab-pane>
      <el-tab-pane label="英文" name="second">
        <custom-editor v-model="form.contentEn" :editor-key="1"/>
      </el-tab-pane>
    </el-tabs>
  </card>
</template>

<script>
  import {getMsgApi, editMsgApi} from '@/api/article';
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "PropertyManagement",
    data() {
      return {
        activeName: 'first',
        type: 0,
        form: {
          content: "",
          contentEn: ""
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getMsgApi({type: this.type}).then(result => {
          objectEvaluate(this.form, result.data)
          this.$refs.Card.stop();
        })
      },
      submit() {
        let data = {...this.form};
        data.typeId = this.type;
        this.$refs.Submit.start();
        editMsgApi(data).then(() => {
          this.$refs.Submit.stop();
        }).catch(() => {
          this.$refs.Submit.stop();
        })
      }
    }
  }
</script>

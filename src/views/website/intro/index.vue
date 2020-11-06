<template>
  <div id="Intro">
    <card ref="Card1">
      <div slot="header">
        <span style="margin-left: 5px;line-height: 32px;">课程简介</span>
      </div>
      <el-form :model="form1" :rules="rules" ref="Form1" label-width="4rem">
        <el-form-item label="图片" prop="img">
          <image-uploader-plus v-model="form1.img" :fixed="false"/>
        </el-form-item>
        <el-form-item label="内容" prop="text">
          <el-input type="textarea" v-model="form1.text" placeholder="内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getData(1)" >刷 新</el-button>
        <submit-button ref="Submit1" @submit="submit(1)" />
      </div>
    </card>
    <card ref="Card2" style="margin-top: 20px;">
      <div slot="header">
        <span style="margin-left: 5px;line-height: 32px;">课程负责人</span>
      </div>
      <el-form :model="form2" :rules="rules" ref="Form2" label-width="4rem">
        <el-form-item label="图片" prop="img">
          <image-uploader-plus v-model="form2.img" :fixed="false"/>
        </el-form-item>
        <el-form-item label="内容" prop="text">
          <el-input type="textarea" v-model="form2.text" placeholder="内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getData(2)">刷 新</el-button>
        <submit-button ref="Submit2" @submit="submit(2)" />
      </div>
    </card>
  </div>
</template>

<script>

  import {getIntroApi, saveIntroApi, uploadIntroApi} from "@/api/intro";

  export default {
    name: "Intro",
    data() {
      return {
        form1: {
          img: '',
          id: NaN,
          intIndex: 1,
          text: '',
        },
        form2: {
          img: '',
          id: NaN,
          intIndex: 2,
          text: '',
        },
        rules:{
          text: {required: true, message: '请输入内容', trigger: 'blur'},
          img: {required: true, message: '请上传图片', trigger: 'change'},
        }
      }
    },
    mounted() {
      (async ()=>{
        await this.getData(1);
        await this.getData(2);
      })();
    },
    methods: {
      getData(intIndex) {
        return new Promise(((resolve, reject) => {
          let param = { intIndex };
          this.$refs['Card'+intIndex].start();
          getIntroApi(param).then(result => {
            let response = result.data;
            this['form'+intIndex] = {...response};
            this.$refs['Card'+intIndex].stop();
            resolve();
          }).catch(err=>{
            reject()
          })
        }))
      },
      submit(intIndex) {
        this.$refs['Form'+intIndex].validate((valid) => {
          if (!valid) return;
          let data = {...this['form'+intIndex]};
          this.$refs['Submit'+intIndex].start();
          uploadIntroApi(data).then(() => {
            this.$refs['Submit'+intIndex].stop();
            this.getData(intIndex)
          }).catch(() => {
            this.$refs['Submit'+intIndex].stop();
          })
        });
      }
    }
  }
</script>

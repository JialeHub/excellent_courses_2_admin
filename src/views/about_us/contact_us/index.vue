<template>
  <card ref="Card">
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <row-col>
        <el-form-item label="服务时间" prop="serviceTime">
          <el-input v-model="form.serviceTime" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="serviceTimeEn" slot="r">
          <el-input v-model="form.serviceTimeEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <el-form-item label="服务热线" prop="servicePhone">
        <el-input v-model="form.servicePhone" placeholder="中文"></el-input>
      </el-form-item>
      <el-form-item label="客服邮箱" prop="servicePostbox">
        <el-input v-model="form.servicePostbox" placeholder="中文"></el-input>
      </el-form-item>
      <el-form-item label="商务邮箱" prop="busPostbox">
        <el-input v-model="form.busPostbox" placeholder="中文"></el-input>
      </el-form-item>
      <el-form-item label="商务电话" prop="busPhone">
        <el-input v-model="form.busPhone" placeholder="中文"></el-input>
      </el-form-item>
      <row-col>
        <el-form-item label="中国公司地址" prop="chAddress">
          <el-input v-model="form.chAddress" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="chAddressEn" slot="r">
          <el-input v-model="form.chAddressEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="美国公司地址" prop="usaAddress">
          <el-input v-model="form.usaAddress" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item prop="usaAddressEn" slot="r">
          <el-input v-model="form.usaAddressEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="中国公司地址地图" prop="mapUrl">
          <image-uploader v-model="form.mapUrl"/>
        </el-form-item>
        <el-form-item label="美国公司地址地图" prop="usaMapUrl" slot="r">
          <image-uploader v-model="form.usaMapUrl"/>
        </el-form-item>
      </row-col>
    </el-form>
    <div slot="footer">
      <submit-button ref="Submit" @submit="submit" text="保存"/>
    </div>
  </card>
</template>

<script>
  import {getContactApi, editContactApi} from '@/api/aboutUs/contactUs';
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "ContactUs",
    data() {
      return {
        visible: false,
        form: {
          serviceTime: '',
          servicePhone: '',
          servicePostbox: '',
          busPostbox: '',
          busPhone: '',
          serviceTimeEn: '',
          chAddress: '',
          chAddressEn: '',
          usaAddress: '',
          usaAddressEn: '',
          mapUrl: '',
          usaMapUrl: ''
        },
        rules: {}
      }
    },
    mounted() {
      this.getContact()
    },
    methods: {
      getContact() {
        this.$refs.Card.start();
        getContactApi().then(result => {
          this.$refs.Card.stop();
          objectEvaluate(this.form, result.data)
        })
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editContactApi(data).then(() => {
            this.$refs.Submit.stop();
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        });
      }
    }
  }
</script>

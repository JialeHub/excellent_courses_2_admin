<template>
  <card>
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
      <row-col>
        <el-form-item label="城市中文名称" prop="name">
          <city-select v-model="form.name" :that='this'/>
        </el-form-item>
        <el-form-item label="城市英文名称" prop="nameEn" slot="r">
          <el-input v-model="form.nameEn" readonly></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="人口数量" prop="populated">
          <el-input v-model="form.populated"></el-input>
        </el-form-item>
        <el-form-item label="宜居指数" prop="livable" slot="r">
          <el-input v-model="form.livable"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="家庭收入" prop="income">
          <el-input v-model="form.income"></el-input>
        </el-form-item>
        <el-form-item label="租售比" prop="rentSale" slot="r">
          <el-input v-model="form.rentSale"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="租房率" prop="renting">
          <el-input v-model="form.renting"></el-input>
        </el-form-item>
        <el-form-item label="住房自有" prop="haveHouse" slot="r">
          <el-input v-model="form.haveHouse"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="中文简介" prop="profile">
          <el-input type="textarea" v-model="form.profile"></el-input>
        </el-form-item>
        <el-form-item label="英文简介" prop="profileEn" slot="r">
          <el-input type="textarea" v-model="form.profileEn"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="中文自然人文" prop="nature">
          <el-input type="textarea" v-model="form.nature"></el-input>
        </el-form-item>
        <el-form-item label="英文自然人文" prop="natureEn" slot="r">
          <el-input type="textarea" v-model="form.natureEn"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="城市封面" prop="cover">
          <image-uploader v-model="form.cover"/>
        </el-form-item>
        <el-form-item label="市场热度指数" prop="hotImg" slot="r">
          <image-uploader v-model="form.hotImg"/>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="房屋价格走势" prop="priceImg">
          <image-uploader v-model="form.priceImg"/>
        </el-form-item>
        <el-form-item label="房屋租金走势" prop="rentalImg" slot="r">
          <image-uploader v-model="form.rentalImg"/>
        </el-form-item>
      </row-col>
      <el-form-item label="是否是热门城市">
        <el-radio-group v-model="form.hot">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-tabs v-model="active" type="card">
        <el-tab-pane label="市场热度(中)" name="first">
          <custom-editor v-model="form.hotText" :editor-key="0"/>
        </el-tab-pane>
        <el-tab-pane label="市场热度(英)" name="second">
          <custom-editor v-model="form.hotTextEn" :editor-key="1"/>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer">
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </card>
</template>

<script>
  import {addCityApi} from '@/api/city';
  import {resetForm} from "@/utils/common";

  export default {
    name: "AddCity",
    components: {
      CitySelect: () => import("../components/CitySelect")
    },
    data() {
      return {
        active: 'first',
        form: {
          name: "", // 城市名
          nameEn: "", // 城市名en
          cover: "", // 图片
          populated: "", // 人口数量
          livable: "", // 宜居指数
          income: "", // 家庭收入
          rentSale: "", // 租售比
          renting: "", // 租房率
          haveHouse: "", // 住房自有
          profile: "", // 中文简介
          profileEn: "", // 英文简介
          nature: "", // 自然人文
          natureEn: "", // 自然人文en
          hotImg: "", // 市场热度指数图片
          priceImg: "", // 房屋价格走势图片
          rentalImg: "", // 房屋租金走势图片
          hot: false, // 是否是热门城市
          hotText: "", // 市场热度富文本
          hotTextEn: "" // 市场热度富文本en
        },
        rules: {
          name: {required: true, message: '请选择城市', trigger: 'change'},
          cover: {required: true, message: '请上传城市封面', trigger: 'change'}
        }
      }
    },
    beforeCreate() {
      this.$startLoading('rgba(0, 0, 0, 0.6)');
    },
    mounted() {
      this.$stopLoading();
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          addCityApi(data).then(() => {
            this.$refs.Submit.stop();
            this.cancel();
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

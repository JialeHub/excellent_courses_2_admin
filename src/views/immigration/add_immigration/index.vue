<template>
  <card id="add-immigration">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
      <row-col>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="中文"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="nameEn" slot="r">
          <el-input v-model="form.nameEn" placeholder="英文"></el-input>
        </el-form-item>
      </row-col>
      <el-form-item label="项目图片" prop="cover">
        <image-uploader-batch v-model="form.cover" :limit="5"/>
      </el-form-item>
      <row-col>
        <el-form-item label="移民类型" prop="classify">
          <el-radio-group v-model="form.classify" @change="changeClassify">
            <el-radio :label="true">美国移民</el-radio>
            <el-radio :label="false">护照移民</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目类型" prop="typeId" slot="r">
          <el-select v-if="form.classify" v-model="form.typeId" clearable>
            <el-option v-for="item in optionsTrue" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
          <el-select v-else v-model="form.typeId" clearable>
            <el-option v-for="item in optionsFalse" :label="item.type" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="立即上架">
          <el-radio-group v-model="form.display">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推荐项目" slot="r">
          <el-radio-group v-model="form.recommend">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </row-col>
      <el-form-item label="项目预算" prop="budget">
        <el-input-number v-model="form.budget" controls-position="right" :min="0"/>
        <span> 万</span>
      </el-form-item>
      <el-tabs v-model="active.one" type="card">
        <el-tab-pane label="法律政策(中)" name="first">
          <custom-editor v-model="form.law" :editor-key="0"/>
        </el-tab-pane>
        <el-tab-pane label="法律政策(英)" name="second">
          <custom-editor v-model="form.lawEn" :editor-key="1"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.two" type="card">
        <el-tab-pane label="申请条件(中)" name="first">
          <custom-editor v-model="form.apply" :editor-key="2"/>
        </el-tab-pane>
        <el-tab-pane label="申请条件(英)" name="second">
          <custom-editor v-model="form.applyEn" :editor-key="3"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.three" type="card">
        <el-tab-pane label="申请流程(中)" name="first">
          <custom-editor v-model="form.process" :editor-key="4"/>
        </el-tab-pane>
        <el-tab-pane label="申请流程(英)" name="second">
          <custom-editor v-model="form.processEn" :editor-key="5"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.four" type="card">
        <el-tab-pane label="移民优势(中)" name="first">
          <custom-editor v-model="form.advantage" :editor-key="6"/>
        </el-tab-pane>
        <el-tab-pane label="移民优势(英)" name="second">
          <custom-editor v-model="form.advantageEn" :editor-key="7"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.five" type="card">
        <el-tab-pane label="投资项目介绍(中)" name="first">
          <custom-editor v-model="form.proInvest" :editor-key="8"/>
        </el-tab-pane>
        <el-tab-pane label="投资项目介绍(英)" name="second">
          <custom-editor v-model="form.proInvestEn" :editor-key="9"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.six" type="card">
        <el-tab-pane label="项目亮点(中)" name="first">
          <custom-editor v-model="form.proLightspot" :editor-key="10"/>
        </el-tab-pane>
        <el-tab-pane label="项目亮点(英)" name="second">
          <custom-editor v-model="form.proLightspotEn" :editor-key="11"/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="active.seven" type="card">
        <el-tab-pane label="区域介绍(中)" name="first">
          <custom-editor v-model="form.area" :editor-key="12"/>
        </el-tab-pane>
        <el-tab-pane label="区域介绍(英)" name="second">
          <custom-editor v-model="form.areaEn" :editor-key="13"/>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div style="display: flex;justify-content: space-between">
      <el-button type="warning" ref="Submit" @click="clear('确认重置该页面数据？')">重置</el-button>
      <submit-button ref="Submit" @submit="submit" text="提交"/>
    </div>
  </card>
</template>

<script>
  import {addImmigrantApi, getImmigrantTypeApi} from '@/api/immigration';
  import {resetForm} from "@/utils/common";

  export default {
    name: "AddImmigration",
    data() {
      const validateCover = (rule, value, callback) => {
        if (value === '' || value === undefined || value == null) {
          callback()
        } else {
          let length = value.split(',').length;
          if (length === 5) {
            callback()
          } else {
            callback(new Error('请上传五张项目图片'))
          }
        }
      }
      return {
        optionsTrue: [],
        optionsFalse: [],
        active: {
          one: 'first',
          two: 'first',
          three: 'first',
          four: 'first',
          five: 'first',
          six: 'first',
          seven: 'first'
        },
        form: {
          name: "", // 移民列表项名
          nameEn: "", // 移民列表项名en

          cover: "", // 项目图片

          budget: 0, // 移民预算单位万

          display: true, // 立即上架
          recommend: false, // 推荐项目

          classify: true, // 移民大分类
          typeId: null, // 关联移民类型

          law: "", // 法律政策富文本
          lawEn: "", // 法律政策富文本en
          apply: "", // 申请条件富文本
          applyEn: "", // 申请条件富文本en
          process: "", // 申请流程富文本
          processEn: "", // 申请流程富文本en
          advantage: "", // 移民优势富文本
          advantageEn: "", // 移民优势富文本en
          proInvest: "", // 项目投资富文本
          proInvestEn: "", // 项目投资富文本en
          proLightspot: "", // 项目亮点富文本
          proLightspotEn: "", // 项目亮点富文本en
          area: "", // 区域介绍富文本
          areaEn: "", // 区域介绍富文本en
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          nameEn: {required: true, message: '请输入名称', trigger: 'blur'},
          cover: [
            {required: true, message: '请上传项目图片', trigger: 'blur'},
            {validator: validateCover, trigger: 'change'}
          ],
          typeId: {required: true, message: '请选择项目类型', trigger: 'change'},
          budget: {required: true, message: '请输入项目预算', trigger: 'change'}
        }
      }
    },
    beforeCreate() {
      this.$startLoading('rgba(0, 0, 0, 0.6)');
    },
    created() {
      this.getImmigrantType();
    },
    mounted() {
      this.$stopLoading();
    },
    methods: {
      getImmigrantType() {
        getImmigrantTypeApi().then(result => {
          this.optionsTrue = [];
          this.optionsFalse = [];
          result.data.forEach(item => {
            if (item.classify) this.optionsTrue.push(item)
            else this.optionsFalse.push(item)
          })
        })
      },
      changeClassify() {
        this.form.typeId = null;
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return false;
          this.$msgBox('确认提交？').then(() => {
            let data = {...this.form};
            this.$refs.Submit.start();
            addImmigrantApi(data)
              .then(result => {
                this.$refs.Submit.stop();
                if (result.code === 200)
                  this.clear('提交成功，是否重置该页面数据？')
              })
              .catch(() => {
                this.$refs.Submit.stop();
              })
          })
        });
      },
      clear(text) {
        this.$msgBox(text).then(() => {
          this.cancel();
        })
      },
      cancel() {
        resetForm(this, 'active', null);
        resetForm(this, 'form');
      }
    }
  }
</script>

<style lang="scss">
  #add-immigration {
    .el-tabs--card {
      margin-bottom: 20px;
    }
  }
</style>
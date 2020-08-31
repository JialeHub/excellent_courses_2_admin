<template>
  <div>
    <card ref="CardOne" class="mb-15">
      <div slot="header">
        <span>网站底部栏信息</span>
        <submit-button class="float-right" ref="Submit" @submit="submit" text="保存"/>
      </div>
      <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
        <row-col>
          <el-form-item label="中国购房热线" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="美国购房热线" prop="phoneEn">
            <el-input v-model="form.phoneEn"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="postbox">
            <el-input v-model="form.postbox"></el-input>
          </el-form-item>
        </row-col>
      </el-form>
    </card>
    <card ref="CardTwo" class="mb-20">
      <div slot="header">
        <span>站外跳转</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="addOuter()">新增</el-button>
      </div>
      <el-table :data="outers">
        <el-table-column label="logo">
          <template slot-scope="scope">
            <el-avatar
                shape="square"
                :size="44"
                :src="$baseApi + scope.row.logo">
              <img src="../../../assets/notFound.png" alt="logo"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="跳转链接"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="editOuter(scope.row)"/>
            <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
      <add-outer ref="AddOuter" @update="getData"/>
      <edit-outer ref="EditOuter" @update="getData"/>
    </card>
    <card ref="CardThree" class="mb-20">
      <div slot="header">
        <span>站内跳转</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="addInner()">新增</el-button>
      </div>
      <el-table :data="inners">
        <el-table-column prop="name" label="中文名称"/>
        <el-table-column prop="nameEn" label="英文名称"/>
        <el-table-column prop="link" label="跳转路径"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="editInner(scope.row)"/>
            <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
      <add-inner ref="AddInner" @update="getData"/>
      <edit-inner ref="EditInner" @update="getData"/>
    </card>
  </div>
</template>

<script>
  import {getFooterApi, editFooterApi, delFooterApi} from '@/api/footer';
  import {objectEvaluate} from "@/utils/common";
  import AddInner from "./addInner";
  import EditInner from "./editInner";
  import AddOuter from "./addOuter";
  import EditOuter from "./editOuter";

  export default {
    name: "Footer",
    components: {AddInner, EditInner, AddOuter, EditOuter},
    data() {
      return {
        visible: false,
        form: {
          phone: "",
          phoneEn: "",
          postbox: "",
        },
        inners: [],
        outers: [],
        rules: {}
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.CardOne.start();
        this.$refs.CardTwo.start();
        this.$refs.CardThree.start();
        getFooterApi().then(result => {
          this.$refs.CardOne.stop();
          this.$refs.CardTwo.stop();
          this.$refs.CardThree.stop();
          objectEvaluate(this.form, result.data);
          this.inners = result.data.inners;
          this.outers = result.data.outers;
        })
      },
      addInner() {
        this.$refs.AddInner.visible = true;
      },
      editInner(obj) {
        let _this = this.$refs.EditInner;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      addOuter() {
        this.$refs.AddOuter.visible = true;
      },
      editOuter(obj) {
        let _this = this.$refs.EditOuter;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editFooterApi(data).then(() => {
            this.$refs.Submit.stop();
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        });
      },
      delData(id) {
        delFooterApi({id: id})
          .then(() => {
            this.getData();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>

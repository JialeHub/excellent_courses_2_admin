<template>
  <div>
    <card ref="Card" class="mb-15">
      <div slot="header">
        <span>公司团队成员</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </div>
      <el-table :data="formData">
        <el-table-column prop="memberName" label="名称"/>
        <el-table-column prop="memberPosition" label="职位"/>
        <el-table-column prop="memberProfile" label="介绍"/>
        <el-table-column label="照片">
          <template slot-scope="scope">
            <el-avatar
                shape="square"
                :size="50"
                :src="$baseApi + scope.row.memberImg">
              <img src="../../../assets/notFound.png" alt="logo"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
            <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
      <add ref="Add" @update="getMember"></add>
      <edit ref="Edit" @update="getMember"></edit>
    </card>
    <card>
      <div slot="header">
        <span>世帆介绍</span>
        <submit-button class="float-right" ref="Submit" @submit="submit" text="保存"/>
      </div>
      <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
        <row-col>
          <!--中-->
          <el-form-item label="公司介绍" prop="profile">
            <el-input type="textarea" v-model="form.profile" placeholder="中文"></el-input>
          </el-form-item>
          <!--英-->
          <el-form-item slot="r" prop="profileEn">
            <el-input type="textarea" v-model="form.profileEn" placeholder="英文"></el-input>
          </el-form-item>
        </row-col>
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="服务优势(中文)" name="first">
          <custom-editor v-model="form.advantage" :editor-key="0"/>
        </el-tab-pane>
        <el-tab-pane label="服务优势(英文)" name="second">
          <custom-editor v-model="form.advantageEn" :editor-key="1"/>
        </el-tab-pane>
      </el-tabs>
    </card>
  </div>
</template>

<script>
  import {getCompanyApi, getMemberApi, editCompanyApi, delMemberApi} from '@/api/aboutUs/introduce';
  import {objectEvaluate} from "@/utils/common";
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "Introduce",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: '',
        activeName: 'first',
        form: {
          advantage: "",
          advantageEn: "",
          profile: "",
          profileEn: ""
        },
        rules: {
          profile: {required: true, message: '请输入公司介绍', trigger: 'blur'},
          profileEn: {required: true, message: '请输入公司介绍', trigger: 'blur'}
        }
      }
    },
    mounted() {
      this.getMember()
      this.getCompany()
    },
    methods: {
      getMember() {
        this.$refs.Card.start();
        getMemberApi().then(result => {
          this.$refs.Card.stop();
          this.formData = result.data
        })
      },
      add() {
        this.$refs.Add.visible = true
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      delData(id) {
        delMemberApi({id})
          .then(() => {
            this.getMember();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
      getCompany() {
        getCompanyApi().then(result => {
          objectEvaluate(this.form, result.data)
        })
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (!valid) return;
          let data = {...this.form};
          this.$refs.Submit.start();
          editCompanyApi(data).then(() => {
            this.$refs.Submit.stop();
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        });
      }
    }
  }
</script>

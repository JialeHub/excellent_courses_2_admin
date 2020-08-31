<template>
  <div class="">
    <card>
      <div slot="header">
        <span>合作洽谈文章</span>
        <submit-button class="float-right" ref="Submit" @submit="submit" text="保存"/>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="合作洽谈文章(中文)" name="first">
          <custom-editor :height="800" v-model="form.partText" :editor-key="0"/>
        </el-tab-pane>
        <el-tab-pane label="合作洽谈文章(英文)" name="second">
          <custom-editor :height="800" v-model="form.partTextEn" :editor-key="1"/>
        </el-tab-pane>
      </el-tabs>
    </card>
    <card ref="Card">
      <div slot="header">
        <span>合作成员列表</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </div>
      <el-table :data="formData">
        <el-table-column prop="name" label="中文名称"/>
        <el-table-column prop="nameEn" label="英文名称"/>
        <el-table-column prop="link" label="链接"/>
        <el-table-column label="logo">
          <template slot-scope="scope">
            <el-avatar
                style="width: 100px;height: 33px"
                shape="square"
                :size="44"
                :src="$baseApi + scope.row.logo">
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
      <add ref="Add" @update="getData"></add>
      <edit ref="Edit" @update="getData"></edit>
    </card>
  </div>
</template>

<script>
  import {getPartnerApi, delPartnerApi, editPartnerTextApi, getPartnerTextApi} from '@/api/aboutUs/cooperation';
  import {objectEvaluate} from "@/utils/common";
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "Cooperation",
    components: {Edit, Add},
    data() {
      return {
        activeName: 'first',
        form: {
          partText: "",
          partTextEn: ""
        },
        formData: [],
        searchName: ''
      }
    },
    mounted() {
      this.getData()
      this.getPartnerText()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getPartnerApi().then(result => {
          this.formData = result.data;
          this.$refs.Card.stop();
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
        delPartnerApi({id: id})
          .then(() => {
            this.getData();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
      getPartnerText() {
        getPartnerTextApi().then(result => {
          objectEvaluate(this.form, result.data)
        })
      },
      submit() {
        let data = {...this.form};
        this.$refs.Submit.start();
        editPartnerTextApi(data).then(() => {
          this.$refs.Submit.stop();
        }).catch(() => {
          this.$refs.Submit.stop();
        })
      }
    }
  }
</script>

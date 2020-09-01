<template>
  <card ref="Card">
    <div slot="header">
      <el-tabs v-model="activeName" @tab-click="changeActive" >
        <el-tab-pane label="第一章" name="1"></el-tab-pane>
        <el-tab-pane label="第二章" name="2"></el-tab-pane>
        <el-tab-pane label="第三章" name="3"></el-tab-pane>
        <el-tab-pane label="第四章" name="4"></el-tab-pane>
        <el-tab-pane label="第五章" name="5"></el-tab-pane>
      </el-tabs>
      <el-input v-model="searchName" placeholder="输入题目搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add" v-if="true">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="sbIndex" label="题号" width="120" header-align="center" align="center"/>
      <el-table-column label="题目" header-align="center" align="center">
        <template slot-scope="scope">
          <div class="htmlBox" v-html="scope.row.sbQues" ></div>
        </template>
      </el-table-column>
      <el-table-column label="答案" header-align="center" align="center">
        <template slot-scope="scope">
          <div class="htmlBox" v-html="scope.row.sbAnsw" ></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <add ref="Add" @update="getData" v-if="true"/>
    <edit ref="Edit" @update="getData"/>
  </card>
</template>

<script>
  import {objectEvaluate} from "@/utils/common";
  import Edit from '../subject_edit/index';
  import Add from '../subject_add/index';
  import {delSubjectApi, getSubjectApi} from "@/api/examination";

  export default {
    name: "SubjectList",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: '',
        activeName: '1',
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          question: this.searchName,
          section: this.activeName
        };
        this.$refs.Card.start();
        getSubjectApi(param).then(result => {
          let response = result.data;
          this.formData = response['records'];
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      add() {
        this.$refs.Add.form.sbSection = this.activeName;
        this.$refs.Add.visible = true;
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        _this.form.sbSection = this.activeName;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      delData(id) {
        delSubjectApi({id: id})
        .then(() => {
          this.getData();
          this.$refs[id].close()
        })
        .catch(() => {
          this.$refs[id].stop();
        })
      },
      changeActive() {
        this.$refs.Pagination.current=1;
        this.$refs.Pagination.total=0;
        this.$refs.Pagination.size=10;
        this.getData()
      }
    }
  }
</script>

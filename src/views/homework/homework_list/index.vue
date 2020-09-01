<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchIndex" placeholder="输入作业编号搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-input v-model="searchName" placeholder="输入作业名称搜索" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add" v-if="true">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="题目">
              <div class="htmlBox" v-html="props.row.hwQuestion" style="border: 1px solid rgba(200,200,200,0.5);width: 100%;padding: 10px"></div>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="答案">
              <div class="htmlBox" v-html="props.row.hwAnswer" style="border: 1px solid rgba(200,200,200,0.5);width: 100%;padding: 10px"></div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="hwIndex" label="作业编号" width="120" header-align="center" align="center"/>
      <el-table-column prop="hwName" label="作业名称"  header-align="center" align="center"/>
      <el-table-column prop="endTime" label="截止时间"  header-align="center" align="center"/>
      <el-table-column prop="hwRequire" label="作业要求"  header-align="center" align="center"/>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData" v-if="true"/>
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
  import Edit from '../homework_edit/index';
  import Add from '../homework_add/index';
  import {delHomeworkApi, getHomeworkApi} from "@/api/homework";

  export default {
    name: "HomeworkList",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: '',
        searchIndex: '',
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
          index: this.searchIndex,
          name: this.searchName,
        };
        this.$refs.Card.start();
        getHomeworkApi(param).then(result => {
          let response = result.data;
          this.formData = response['records'];
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      add() {
        this.$refs.Add.visible = true;
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        console.log(obj);
        objectEvaluate(_this.form, obj);
        console.log(_this.form);
        _this.visible = true
      },
      delData(id) {
        delHomeworkApi({id: id})
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

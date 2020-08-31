<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="name" label="城市中文名"/>
      <el-table-column prop="nameEn" label="城市英文名"/>
      <el-table-column prop="number" label="近一年房价涨幅">
        <template slot-scope="scope">
          {{scope.row.number}}%
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <add ref="Add" @update="getData" :type="type"/>
    <edit ref="Edit" @update="getData" :type="type"/>
  </card>
</template>

<script>
  import {getBigDataApi, delBigDataApi} from '@/api/house/houseBigData';
  import {objectEvaluate} from "@/utils/common";
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "HouseBigData",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: '',
        type: 0
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
          name: this.searchName,
          type: this.type
        };
        this.$refs.Card.start();
        getBigDataApi(param).then(result => {
          let response = result.data;
          this.formData = response.records;
          pagination.total = response.total;
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
        delBigDataApi({id: id})
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

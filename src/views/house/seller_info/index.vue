<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar
              shape="square"
              :size="44"
              :src="$baseApi + scope.row.header">
            <img src="../../../assets/notFound.png" alt="logo"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="sname" label="中文名"/>
      <el-table-column prop="snameEn" label="英文名"/>
      <el-table-column prop="phone" label="联系方式"/>
      <el-table-column prop="position" label="职位"/>
      <el-table-column prop="profile" label="简介"/>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <add ref="Add" @update="getData"></add>
    <edit ref="Edit" @update="getData"></edit>
  </card>
</template>

<script>
  import {getSellersApi, delSellerApi} from '@/api/house/sellerInfo';
  import {objectEvaluate} from "@/utils/common";
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "sellerInfo",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: ''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchName
        };
        getSellersApi(param).then(result => {
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
        delSellerApi({id: id})
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

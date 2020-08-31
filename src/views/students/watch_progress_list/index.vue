<template>
  <card ref="Card" >
    <div slot="header" style="padding: 6px;">
      <el-tabs v-model="activeName" @tab-click="changeActive">
        <el-tab-pane label="已看列表" name="0"></el-tab-pane>
        <el-tab-pane label="未看列表" name="1"></el-tab-pane>
      </el-tabs>
      <el-input v-model="searchName" placeholder="输入用户名搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="sname" label="姓名"/>
      <el-table-column prop="snumber" label="学号"/>
      <el-table-column prop="" label="视频序号"/>
      <el-table-column prop="" label="视频名称"/>
      <el-table-column prop="" label="学习时间" v-if="activeName === '0'"/>
      <el-table-column prop="" label="视频"/>
      <el-table-column label="操作" fixed="right" align="center" width="120">
        <template slot-scope="scope">
          <el-button @click.stop="edit(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <edit ref="Edit" @update="getData"/>
  </card>
</template>

<script>
  import {getUserApi, updateUserApi} from '@/api/user';
  import Edit from '../watch_progress_details/index';

  export default {
    name: "WatchProgressList",
    components: {Edit},
    data() {
      return {
        formData: [],
        searchName: '',
        activeName: '0'
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
          name: this.searchName
        };
        this.$refs.Card.start();
        getUserApi(param).then(result => {
          let response = result.data;
          this.formData = response.frontUsers;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      add() {
        this.$refs.Add.visible = true;
      },
      changeActive() {
        this.pagination.current=1;
        this.pagination.total=0;
        this.pagination.size=10;
      }
    }
  }
</script>

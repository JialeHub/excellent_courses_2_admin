<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入姓名或学号搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="sname" label="姓名"/>
      <el-table-column prop="snumber" label="学号"/>
      <el-table-column prop="" label="学习时间"/>
      <el-table-column prop="" label="视频名称"/>
      <el-table-column prop="" label="视频"/>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
  </card>
</template>

<script>
  import {getUserHistoryApi} from '@/api/user';
  import {isEmpty} from "@/utils/common";

  export default {
    name: "LearningRecordList",
    data() {
      return {
        formData: [],
        searchName: '',
        uId: 6
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
          uId : this.uId,
        };
        if (/^[0-9]+$/.test(this.searchName)){
          param.number=this.searchName
        }else if (!isEmpty(this.searchName)){
          param.name=this.searchName
        }
        this.$refs.Card.start();
        getUserHistoryApi(param).then(result => {
          let response = result.data;
          this.formData = response['records'];
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
    }
  }
</script>

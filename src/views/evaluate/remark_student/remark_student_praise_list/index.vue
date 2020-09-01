<template>
  <el-dialog
      class="RemarkStudentPraiseList"
      z-index="10"
      title="赞列表"
      width="80%"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <div slot="title">
        <span>赞列表</span>
        <el-input v-model="searchStudent" placeholder="输入姓名搜索" clearable class="w-200 ml-20" @keyup.enter.native="getData"/>
        <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      </div>
      <el-table :data="formData" v-loading="loading">
        <el-table-column prop="sname" label="姓名" header-align="center" align="center"/>
        <el-table-column label="头像" align="center" header-align="center">
          <template slot-scope="scope">
            <el-avatar shape="square" :size="44" :src="$baseApi + scope.row.scover">
              <img :src="require('@/assets/notFound.png')" alt="头像"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="赞时间"  header-align="center" align="center"/>
        <el-table-column label="操作" fixed="right" align="center" header-align="center">
          <template slot-scope="scope">
            <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData" v-if="true"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @update="getData"/>
  </el-dialog>
</template>

<script>
  import {resetForm} from "@/utils/common";
  import {delPraiseByEvalApi, getPraiseByEvalApi} from "@/api/evaluate";

  export default {
    name: "RemarkStudentPraiseList",
    data() {
      return {
        formData: [],
        searchStudent: '',
        form: {
          'id': NaN
        },
        visible: false,
        loading: false
      }
    },
    methods: {
      getData() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchStudent,
          evalId: this.form.id,
        };
        this.loading=true
        getPraiseByEvalApi(param).then(result => {
          this.loading=false
          let response = result.data;
          this.formData = response['records'];
          pagination.total = response.total;
        })
      },
      delData(id) {
        delPraiseByEvalApi({praId: id})
          .then(() => {
            this.getData();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
      cancel() {
        resetForm(this,null,'Form',false)
      },
    }
  }
</script>

<style lang="scss">
  .RemarkStudentPraiseList{
    .el-dialog__body{
      padding: 10px;
    }
  }
</style>

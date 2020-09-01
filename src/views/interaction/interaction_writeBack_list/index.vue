<template>
  <el-dialog
      class="InteractionPraiseList"
      z-index="10"
      title="回复列表"
      width="80%"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <div slot="title">
        <span style="padding-right: 10px;">回复列表</span>
        <el-input v-model="searchStudent" placeholder="输入姓名搜索" clearable class="w-200" @keyup.enter.native="getData"/>
        <el-input v-model="searchDetail" placeholder="输入评论内容搜索" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
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
        <el-table-column prop="createTime" label="回复时间"  header-align="center" align="center"/>
        <el-table-column prop="content" label="回复内容"  header-align="center" align="center"/>
        <el-table-column label="赞" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click.stop="praiseOpen(scope.row)">赞列表({{scope.row['praiseNum']}})</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" header-align="center">
          <template slot-scope="scope">
            <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData" v-if="true"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @update="getData"/>
    <praise ref="Praise" @update="getData"/>
  </el-dialog>
</template>

<script>
  import {objectEvaluate, resetForm} from "@/utils/common";
  import Praise from './interaction_writeBack_praise_list/index';
  import {delWriteBackApi,  getWriteBackApi} from "@/api/evaluate";

  export default {
    name: "InteractionPraiseList",
    components: { Praise },
    data() {
      return {
        formData: [],
        searchStudent: '',
        searchDetail: '',
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
          student: this.searchStudent,
          detail: this.searchDetail,
          evalId: this.form.id,
        };
        this.loading=true
        getWriteBackApi(param).then(result => {
          this.loading=false
          let response = result.data;
          this.formData = response['records'];
          pagination.total = response.total;
        })
      },
      praiseOpen(obj) {
        let _this = this.$refs.Praise;
        objectEvaluate(_this.form, obj);
        _this.visible = true
        setTimeout(()=>{
          _this.getData()
        })
      },
      delData(id) {
        delWriteBackApi({wbId: id})
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
  .InteractionPraiseList{
    .el-dialog__body{
      padding: 10px;
    }
  }
</style>

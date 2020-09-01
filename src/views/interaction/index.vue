<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchStudent" placeholder="输入姓名搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-input v-model="searchDetail" placeholder="输入评论内容搜索" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
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
      <el-table-column prop="" label="姓名" width="120" header-align="center" align="center"/>
      <el-table-column prop="" label="头像"  header-align="center" align="center"/>
      <el-table-column prop="" label="发布时间"  header-align="center" align="center"/>
      <el-table-column prop="" label="评论内容"  header-align="center" align="center"/>
      <el-table-column label="赞" align="center" width="90">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column label="回复" align="center" width="90">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="90">
        <template slot-scope="scope">
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData" v-if="true"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
  </card>
</template>

<script>
  import {objectEvaluate} from "@/utils/common";
  import {delEvaluateApi, getEvaluateApi} from "@/api/evaluate";

  export default {
    name: "Interaction",
    data() {
      return {
        formData: [],
        searchDetail: '',
        searchStudent: '',
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
          student: this.searchStudent,
          detail: this.searchDetail,
          type: this.type
        };
        this.$refs.Card.start();
        getEvaluateApi(param).then(result => {
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
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      delData(id) {
        delEvaluateApi({id: id})
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

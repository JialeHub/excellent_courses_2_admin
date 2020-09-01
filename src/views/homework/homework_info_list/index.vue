<template>
  <card ref="Card">
    <div slot="header" style="padding: 6px;">
      <el-tabs v-model="activeName" @tab-click="changeActive" >
        <el-tab-pane label="已提交" name="0"></el-tab-pane>
        <el-tab-pane label="未提交" name="1"></el-tab-pane>
      </el-tabs>
      <el-input v-model="stuId" placeholder="输入学生ID开始搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-input v-model="searchIndex" placeholder="输入作业编号搜索" clearable class="w-150 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="作业题目">
              <div class="htmlBox" v-html="props.row.hwQuestion" style="border: 1px solid rgba(200,200,200,0.5);width: 100%;padding: 10px"></div>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline v-if="activeName === '0'">
            <el-form-item label="提交答案">
              <div class="htmlBox" v-html="props.row.subAnswer" style="border: 1px solid rgba(200,200,200,0.5);width: 100%;padding: 10px"></div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="hwIndex" label="作业编号" width="120" />
      <el-table-column prop="sname" label="姓名" />
      <el-table-column prop="sclass" label="班级" />
      <el-table-column prop="snumber" label="学号" />
      <el-table-column prop="subTime" label="提交时间" v-if="activeName === '0'"/>
      <el-table-column label="操作" fixed="right" align="center" width="200" v-if="activeName === '0'">
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
  import {objectEvaluate} from "@/utils/common";
  import Edit from '../homework_info_details/index';
  import {delHomeworkApi, getHomeworkInfoApi} from "@/api/homework";

  export default {
    name: "HomeworkInfoList",
    components: {Edit},
    data() {
      return {
        formData: [],
        searchIndex: '',
        activeName: '0',
        stuId: ''
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
          isSubmit: this.activeName === '0',
          stuId: this.stuId
        };
        this.$refs.Card.start();
        getHomeworkInfoApi(param).then(result => {
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

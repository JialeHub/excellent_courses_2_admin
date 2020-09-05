<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入姓名或学号搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增学生</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="简介">
              <span>{{ props.row.sprofile }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="sname" label="姓名"/>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span v-if="!scope.row.ssex">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar
              shape="square"
              :size="44"
              :src="$baseApi + scope.row.scover">
            <img src="../../../assets/notFound.png" alt="logo"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="sclass" label="班级"/>
      <el-table-column prop="uid" label="学生ID"/>
      <el-table-column prop="snumber" label="学号"/>
      <el-table-column prop="sphone" label="手机号"/>
      <el-table-column prop="isEnable" label="是否启用" width="90">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isEnable" @change="change(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  header-align="center" width="120">
        <template slot-scope="scope">
            <el-button @click.stop="edit(scope.row)">查看详情</el-button>
            <el-button @click.stop="record(scope.row)" style="margin-left: 0;">学习记录</el-button>
            <el-button @click.stop="progress(scope.row)" style="margin-left: 0;">观看进度</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <add ref="Add" @update="getData"/>
    <edit ref="Edit" @update="getData"/>
  </card>
</template>

<script>
  import {getUserApi, updateUserApi} from '@/api/user';
  import {isEmpty, objectEvaluate} from "@/utils/common";
  import Add from '../students_add/index';
  import Edit from '../students_edit/index';

  export default {
    name: "StudentsList",
    components: {Add, Edit},
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
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
        };
        if (/^[0-9]+$/.test(this.searchName)){
          param.number=this.searchName
        }else if (!isEmpty(this.searchName)){
          param.name=this.searchName
        }
        this.$refs.Card.start();
        getUserApi(param).then(result => {
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
      record(obj) {
        this.$router.push({path:"/students/learning_record_list?uid="+obj.uid})
      },
      progress(obj) {
        this.$router.push({path:"/students/watch_progress_list?uid="+obj.uid})
      },
      change(row) {
        let param = {
          uId : row.uid,
          isEnable : row.isEnable
        };
        updateUserApi(param).then(() => {
          this.getData()
        })
      }
    }
  }
</script>

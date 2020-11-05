<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入姓名" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add" v-if="true">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="name" label="姓名" width="100px" header-align="center" align="center"/>
      <el-table-column prop="job" label="职位" width="100px" header-align="center" align="center"/>
      <el-table-column label="图片" header-align="center" align="center">
        <template slot-scope="scope">
          <img :src="$baseApi + (scope.row.picture)" alt="" height="100px">
        </template>
      </el-table-column>
      <el-table-column label="文件">
        <template slot-scope="scope">
          <span @click="downloadFile(scope.row.pdf)" style="cursor: pointer;color: #1c6ca1">{{scope.row.pdf}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="120">
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
  import Edit from './edit';
  import Add from './add';
  import {delTeamApi, getTeamPageApi} from "@/api/team";

  export default {
    name: "Images",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: '',
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
        };
        this.$refs.Card.start();
        getTeamPageApi(param).then(result => {
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
        delTeamApi({id: id})
        .then(() => {
          this.getData();
          this.$refs[id].close()
        })
        .catch(() => {
          this.$refs[id].stop();
        })
      },
      downloadFile (pdf){
        const url = this.$baseApi + pdf
        if ('download' in document.createElement('a')) {
          const a = document.createElement('a')
          a.href = url
          a.download = ''
          a.target = '_blank'
          document.body.appendChild(a)
          a.click()
          URL.revokeObjectURL(a.href)
          document.body.removeChild(a)
        }
      },
    }
  }
</script>

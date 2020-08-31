<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入文件名搜索" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="fname" label="文件名称"/>
      <el-table-column prop="createTime" label="上传时间"/>
      <el-table-column prop="fsize" label="文件大小"/>
      <el-table-column prop="fsection" label="所属章节"/>
      <el-table-column label="文件">
        <template slot-scope="scope">
          <span @click="downloadFile(scope.row.faccess)" style="cursor: pointer;color: #1c6ca1">{{scope.row.frename}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <add ref="Add" @update="getData"/>
    <edit ref="Edit" @update="getData"/>
  </card>
</template>

<script>
  import {objectEvaluate} from "@/utils/common";
  import Add from '../courseware_add/index';
  import Edit from '../courseware_edit/index';
  import {delResourceApi, getResourceApi} from "@/api/resource";

  export default {
    name: "CoursewareList",
    components: {Add, Edit},
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
      downloadFile (faccess){
        const url = this.$baseApi + faccess
        console.log(url);
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
      getData() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchName,
          section: this.searchSection,
          type: 1
        };
        this.$refs.Card.start();
        getResourceApi(param).then(result => {
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
        delResourceApi({id: id})
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

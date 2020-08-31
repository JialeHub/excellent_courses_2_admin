<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchSection" placeholder="输入视频序号搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-input v-model="searchName" placeholder="输入视频名称搜索" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="findex" label="视频序号"/>
      <el-table-column prop="fname" label="视频名称"/>
      <el-table-column prop="fsection" label="所属章节"/>
      <el-table-column prop="vduration" label="视频时长"/>
      <el-table-column label="视频">
        <template slot-scope="scope">
          <video :src="$baseApi + (scope.row.faccess)" width="100" height="75"></video>
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
  import Add from '../videos_add/index';
  import Edit from '../videos_edit/index';
  import {delResourceApi, getResourceApi} from "@/api/resource";

  export default {
    name: "VideosList",
    components: {Add, Edit},
    data() {
      return {
        formData: [],
        searchName: '',
        searchSection: ''
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
          section: this.searchSection,
          type: 0
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
        objectEvaluate(_this.form, obj);
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

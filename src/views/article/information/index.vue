<template>
  <div>
    <card ref="Card" v-show="isShow">
      <div slot="header">
        <el-input placeholder="输入标题搜索" v-model="searchTitle" class="w-200" clearable @keyup.enter.native="getData"/>
        <el-select v-model="searchByType" clearable @change="getData" class="ml-5" placeholder="选择咨询类型搜索">
          <el-option v-for="item in options" :label="item.type" :value="item.id" :key="item.id"/>
        </el-select>
        <el-button type="success" class="ml-5" @click="getData">搜索</el-button>
        <el-button class="float-right" type="primary" @click="add">新增</el-button>
      </div>
      <el-table :data="formData">
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="type" label="分类"/>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-avatar
                style="width: 160px;height: 102px"
                shape="square"
                :src="$baseApi + scope.row.cover">
              <img src="../../../assets/notFound.png" alt="cover"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="reading" label="阅读量"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
            <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @update="getData"></pagination>
    </card>
    <detail
        v-show="!isShow"
        ref="Detail"
        @update="getData"
        :title="title"
        :id="id"
        :classify="classify"
        :options="options"/>
  </div>
</template>

<script>
  import {getNewsApi, delNewsApi} from '@/api/article'
  import {getTagApi} from '@/api/label'
  import {objectEvaluate} from "@/utils/common";
  import Detail from './detail';

  export default {
    name: 'Information',
    components: {Detail},
    data() {
      return {
        isShow: true,
        title: '',
        id: null,
        formData: [],
        options: [],
        searchTitle: '',
        searchByType: null,
        classify: true
      }
    },
    mounted() {
      this.getData();
      this.getTag();
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          title: this.searchTitle,
          typeId: this.searchByType,
          classify: this.classify
        };
        getNewsApi(param).then(result => {
          this.$refs.Card.stop();
          let response = result.data;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      getTag() {
        getTagApi({classify: this.classify}).then(result => {
          this.options = result.data;
        })
      },
      add() {
        this.title = '新增';
        this.isShow = false;
      },
      edit(obj) {
        this.title = '编辑';
        this.id = obj.id;
        let _this = this.$refs.Detail;
        objectEvaluate(_this.form, obj);
        this.isShow = false;
      },
      delData(id) {
        delNewsApi({id})
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

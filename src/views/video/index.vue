<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchTitle" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <search-select v-model="searchByCity" @get="getData" class="ml-5"/>
      <el-select v-model="searchByType" clearable @change="getData" class="ml-5" placeholder="输入视频类型搜索">
        <el-option v-for="item in options" :label="item.type" :value="item.id" :key="item.id"/>
      </el-select>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="title" label="标题"/>
      <el-table-column label="视频封面">
        <template slot-scope="scope">
          <el-avatar
              style="width: 198px;height: 124px"
              shape="square"
              :src="$baseApi + scope.row.cover">
            <img src="../../assets/notFound.png" alt="logo"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="所属城市"/>
      <el-table-column prop="type" label="视频类型"/>
      <el-table-column prop="info" label="介绍" />
      <el-table-column prop="btnText" label="按钮提示" />
      <el-table-column prop="price" label="价钱">
        <template slot-scope="scope">
          <span>{{scope.row.price}}w</span>
        </template>
      </el-table-column>
      <el-table-column prop="hot" label="是否热门">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.hot" type="success">是</el-tag>
          <el-tag v-else type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <add ref="Add" @update="getData" :options="options"></add>
    <edit ref="Edit" @update="getData" :options="options"></edit>
  </card>
</template>

<script>
  import {getVideosApi, delVideoApi} from '@/api/video';
  import {getLabelApi} from '@/api/label';
  import SearchSelect from './components/SearchSelect';
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "Video",
    components: {Edit, Add, SearchSelect},
    data() {
      return {
        formData: [],
        options: [],
        searchByType: null,
        searchByCity: null,
        searchTitle: '',
      }
    },
    mounted() {
      this.getData();
      this.getLabel();
    },
    methods: {
      getLabel() {
        let param = {
          classifyId: 1,
          groupId: 2
        };
        getLabelApi(param).then(result => {
          this.options = result.data
        })
      },
      getData() {
        this.$refs.Card.start();
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          title: this.searchTitle,
          cityTypeId: this.searchByCity,
          videoTypeId: this.searchByType
        };
        getVideosApi(param).then(result => {
          let response = result.data;
          this.formData = response.records;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      add() {
        this.$refs.Add.visible = true
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        _this.form.id = obj.id;
        _this.getData();
        _this.visible = true
      },
      delData(id) {
        delVideoApi({id: id})
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

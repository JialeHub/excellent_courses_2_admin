<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="name" label="项目名称"/>
      <el-table-column label="项目图片">
        <template slot-scope="scope">
          <el-avatar
              style="width: 117px;height: 75px"
              shape="square"
              :src="$baseApi + getCover(scope.row.cover)">
            <img src="../../../../assets/notFound.png" alt="logo"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="budget" label="房产单价">
        <template slot-scope="scope">
          ${{scope.row.budget}}万元/㎡
        </template>
      </el-table-column>
      <el-table-column prop="type" label="所属类型"/>
      <el-table-column prop="name" label="标签" width="130">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.display" @change="change(scope.row)" active-text="立刻上架"/>
          <el-switch v-model="scope.row.recommend" @change="change(scope.row)" active-text="项目推荐"/>
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
  </card>
</template>

<script>
  import {getImmigrantsApi, editImmigrantStateApi, delImmigrantApi} from '@/api/immigration';

  export default {
    name: "America",
    data() {
      return {
        formData: [],
        searchName: '',
        classify: true
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getCover(value) {
        if (!value) return ''
        else return value.split(',')[0]
      },
      getData() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchName,
          classify: this.classify
        };
        this.$refs.Card.start();
        getImmigrantsApi(param).then(result => {
          let response = result.data;
          this.formData = response.records;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      change(row) {
        let param = {
          id: row.id,
          display: row.display,
          recommend: row.recommend
        };
        editImmigrantStateApi(param)
      },
      edit(obj) {
        this.$startLoading('rgba(0, 0, 0, 0.6)');
        this.$router.push({
          name: 'edit_immigration',
          query: {id: obj.id}
        })
      },
      delData(id) {
        delImmigrantApi({id: id})
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

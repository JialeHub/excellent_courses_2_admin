<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="name" label="城市中文名称"/>
      <el-table-column prop="nameEn" label="城市英文名称"/>
      <el-table-column label="城市封面">
        <template slot-scope="scope">
          <el-avatar
              style="width: 198px;height: 124px"
              shape="square"
              :src="$baseApi + scope.row.cover">
            <img src="../../../assets/notFound.png" alt="logo"/>
          </el-avatar>
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
  import {getCityApi, delCityApi} from '@/api/city';

  export default {
    name: "CityList",
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
          name: this.searchName
        };
        this.$refs.Card.start();
        getCityApi(param).then(result => {
          let response = result.data;
          this.formData = response.records;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      edit(obj) {
        this.$router.push({
          name: 'edit_city',
          query: {id: obj.id}
        })
      },
      delData(id) {
        delCityApi({id: id})
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

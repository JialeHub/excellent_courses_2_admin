<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="title" label="房源标题"/>
      <el-table-column label="房源封面">
        <template slot-scope="scope">
          <el-avatar
              style="width: 231px;height: 150px"
              shape="square"
              :src="$baseApi + getCover(scope.row.cover)">
            <img src="../../../../assets/notFound.png" alt="cover"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="所在城市"/>
      <el-table-column prop="xmdj" label="房产单价">
        <template slot-scope="scope">
          <span>{{scope.row.xmdj}}万元/㎡</span>
        </template>
      </el-table-column>
      <el-table-column prop="xmzj" label="项目总价">
        <template slot-scope="scope">
          <span>{{scope.row.xmzj}}w</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.display" @change="change(scope.row)" active-text="立刻上架"/>
          <el-switch v-model="scope.row.hot" @change="change(scope.row)" active-text="热门推荐"/>
          <el-switch v-model="scope.row.gzjsy" @change="change(scope.row)" active-text="高租金收益楼盘"/>
          <el-switch v-model="scope.row.wjczxq" @change="change(scope.row)" active-text="稳健长租学区楼盘"/>
          <el-switch v-model="scope.row.hzjs" @change="change(scope.row)" active-text="豪宅鉴赏"/>
          <el-switch v-model="scope.row.sjzy" @change="change(scope.row)" active-text="NNN三净租约"/>
          <el-switch v-model="scope.row.dsfyz" @change="change(scope.row)" active-text="低首付优质房源"/>
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
  import {getHouseApi, updateHouseApi, delHouseApi} from '@/api/house';

  export default {
    name: "Business",
    data() {
      return {
        formData: [],
        searchName: '',
        isBusiHouse: true
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      change(row) {
        let param = {
          id: row.id,
          display: row.display,
          hot: row.hot,
          gzjsy: row.gzjsy,
          wjczxq: row.wjczxq,
          hzjs: row.hzjs,
          sjzy: row.sjzy,
          dsfyz: row.dsfyz
        }
        updateHouseApi(param)
      },
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
          isBusiHouse: this.isBusiHouse
        };
        this.$refs.Card.start();
        getHouseApi(param).then(result => {
          let response = result.data;
          this.formData = response.records;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      edit(obj) {
        this.$startLoading('rgba(0, 0, 0, 0.6)');
        this.$router.push({
          name: 'edit_house',
          query: {id: obj.id}
        })
      },
      delData(id) {
        delHouseApi({id: id})
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

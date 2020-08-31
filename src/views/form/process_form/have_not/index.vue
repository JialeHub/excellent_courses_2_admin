<template>
  <card ref="Card">
    <div slot="header">
      <el-date-picker
          v-model="searchDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-ddTHH:mm:ss"
          :default-time="['00:00:00','23:59:59']"
          @change="getData">
      </el-date-picker>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="firstName" label="姓"/>
      <el-table-column prop="lastName" label="名"/>
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="postbox" label="电子邮箱"/>
      <el-table-column prop="createTime" label="日期">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-s-check" @click.stop="dispose(scope.row.id)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
  </card>
</template>

<script>
  import {getFormApi, disposeFormApi, delFormApi} from '@/api/form';
  import {isEmpty} from "@/utils/common";

  export default {
    name: "HaveNot",
    data() {
      return {
        formData: [],
        searchDate: [],
        isDispose: true,
        page: 2
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
          isDispose: this.isDispose,
          page: this.page
        };
        if (!isEmpty(this.searchDate)) {
          param = {...param, ...{startTime: this.searchDate[0], endTime: this.searchDate[1]}}
        }
        this.$refs.Card.start();
        getFormApi(param).then(result => {
          let response = result.data;
          this.formData = response.records;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      dispose(id) {
        this.$msgBox('确认处理？').then(() => {
          disposeFormApi({id: id})
            .then(() => {
              this.getData();
            })
        })
      },
      delData(id) {
        delFormApi({id: id})
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

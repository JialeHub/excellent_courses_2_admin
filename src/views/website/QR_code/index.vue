<template>
  <card ref="Card">
    <div slot="header">
      <el-select v-model="searchType" @change="getData">
        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.key"/>
      </el-select>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-avatar
              style="width: 180px;height: 180px"
              shape="square"
              :src="$baseApi + scope.row.link">
            <img src="../../../assets/notFound.png" alt="logo"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类别">
        <template slot-scope="scope">
          <span v-if="scope.row.type===2">小程序</span>
          <span v-if="scope.row.type===3">公众号</span>
          <span v-if="scope.row.type===4">交流群</span>
          <span v-if="scope.row.type===5">佛州微信秘书</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <add ref="Add" @update="getData" :options="options"></add>
    <edit ref="Edit" @update="getData" :options="options"></edit>
  </card>
</template>

<script>
  import {getPictureApi, delPictureApi} from '@/api/website';
  import {objectEvaluate} from "@/utils/common";
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "QRCode",
    components: {Edit, Add},
    data() {
      return {
        options: [
          {key: 2, label: '小程序', value: 2},
          {key: 3, label: '公众号', value: 3},
          {key: 4, label: '交流群', value: 4},
          {key: 5, label: '佛州微信秘书', value: 5}
        ],
        formData: [],
        searchType: 2
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getPictureApi({type: this.searchType}).then(result => {
          this.formData = result.data;
          this.$refs.Card.stop();
        })
      },
      add() {
        this.$refs.Add.visible = true
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      delData(id) {
        delPictureApi({id: id})
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

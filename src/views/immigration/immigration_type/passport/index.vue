<template>
  <card ref="Card">
    <div slot="header">
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="type" label="类型名称(中文)"/>
      <el-table-column prop="typeEn" label="类型名称(英文)"/>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-avatar
              style="width: 204px;height: 132px"
              shape="square"
              :src="$baseApi + scope.row.cover">
            <img src="../../../../assets/notFound.png" alt="logo"/>
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
    <add ref="Add" @update="getData" :classify="classify"></add>
    <edit ref="Edit" @update="getData" :classify="classify"></edit>
  </card>
</template>

<script>
  import {getImmigrantTypeApi, delImmigrantTypeApi} from '@/api/immigration';
  import {objectEvaluate} from "@/utils/common";
  import Add from '../components/add';
  import Edit from '../components/edit';

  export default {
    name: "Passport",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        classify: false
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getImmigrantTypeApi({classify: this.classify}).then(result => {
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
        delImmigrantTypeApi({id: id})
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

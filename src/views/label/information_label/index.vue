<template>
  <card ref="Card">
    <div slot="header">
      <span>资讯类型</span>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="type" label="标签中文名称"/>
      <el-table-column prop="typeEn" label="标签英文名称"/>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <add ref="Add" @update="getData" :classify="classify"/>
    <edit ref="Edit" @update="getData" :classify="classify"/>
  </card>
</template>

<script>
  import {getTagApi, delTagApi} from '@/api/label';
  import {objectEvaluate} from "@/utils/common";
  import Add from '../components/add_tag';
  import Edit from '../components/edit_tag';

  export default {
    name: "InformationLabel",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        classify: true
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getTagApi({classify: this.classify}).then(result => {
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
        delTagApi({id: id})
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

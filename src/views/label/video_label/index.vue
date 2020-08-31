<template>
  <card ref="Card">
    <div slot="header">
      <span>视频类型</span>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add(2)">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="type" label="标签中文名称"/>
      <el-table-column prop="typeEn" label="标签英文名称"/>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row,2)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <add ref="Add" @update="getData" :classify="classify" :typeGroup="typeGroup"/>
    <edit ref="Edit" @update="getData" :classify="classify" :typeGroup="typeGroup"/>
  </card>
</template>

<script>
  import {getLabelApi, delLabelApi} from '@/api/label';
  import {objectEvaluate} from "@/utils/common";
  import Add from '../components/add_label';
  import Edit from '../components/edit_label';

  export default {
    name: "VideoLabel",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        classify: 1,
        typeGroup: null
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        let param = {
          classifyId: this.classify,
          groupId: 2
        };
        getLabelApi(param).then(result => {
          this.formData = result.data;
          this.$refs.Card.stop();
        })
      },
      add(value) {
        this.typeGroup = value;
        this.$refs.Add.visible = true
      },
      edit(obj, value) {
        this.typeGroup = value;
        let _this = this.$refs.Edit;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      delData(id) {
        delLabelApi({id: id})
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

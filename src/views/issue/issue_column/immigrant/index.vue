<template>
  <card ref="Card">
    <div slot="header">
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="quesType" label="问题类型(中文)"/>
      <el-table-column prop="quesTypeEn" label="问题类型(英文)"/>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <add ref="Add" @update="getData" :questionPage="questionPage"></add>
    <edit ref="Edit" @update="getData" :questionPage="questionPage"></edit>
  </card>
</template>

<script>
  import {getQuestionTagApi, delQuestionTagApi} from '@/api/issue';
  import {objectEvaluate} from "@/utils/common";
  import Add from '../components/add';
  import Edit from '../components/edit';

  export default {
    name: "Immigrant",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        questionPage: 3
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getQuestionTagApi({questionPage: this.questionPage}).then(result => {
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
        delQuestionTagApi({id: id})
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

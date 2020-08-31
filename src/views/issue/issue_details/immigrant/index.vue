<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchTitle" placeholder="输入标题搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-select v-model="searchType" placeholder="选择类型搜索" clearable @change="getData" class="w-200 ml-5">
        <el-option
            v-for="item in options"
            :label="item.quesType"
            :value="item.id"
            :key="item.id"/>
      </el-select>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <expand-table :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form class="log-table-expand">
            <el-form-item label="回答(中文):">
              <span>{{ props.row.answerValue }}</span>
            </el-form-item>
            <el-form-item label="回答(英文):">
              <span>{{ props.row.answerValueEn }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="quesTitle" label="问题(中文)"/>
      <el-table-column prop="quesTitleEn" label="问题(英文)"/>
      <el-table-column prop="answer" label="回答者(中文)"/>
      <el-table-column prop="answerEn" label="回答者(英文)"/>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </expand-table>
    <pagination ref="Pagination" @update="getData"/>
    <add ref="Add" @update="getData" :questionPage="questionPage" :options="options"></add>
    <edit ref="Edit" @update="getData" :questionPage="questionPage" :options="options"></edit>
  </card>
</template>

<script>
  import {getQuestionsApi, getQuestionTagApi, delQuestionsApi} from '@/api/issue';
  import Add from '../components/add';
  import Edit from '../components/edit';

  export default {
    name: "Immigrant",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        options: [],
        searchTitle: '',
        searchType: null,
        questionPage: 3
      }
    },
    mounted() {
      this.getData();
      this.getTags();
    },
    methods: {
      getTags() {
        getQuestionTagApi({questionPage: this.questionPage}).then(result => {
          this.options = result.data;
        })
      },
      getData() {
        this.$refs.Card.start();
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          quesTitle: this.searchTitle,
          tagId: this.searchType,
          quesPage: this.questionPage
        };
        getQuestionsApi(param).then(result => {
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
        _this.getDetail();
        _this.visible = true
      },
      delData(id) {
        delQuestionsApi({id: id})
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

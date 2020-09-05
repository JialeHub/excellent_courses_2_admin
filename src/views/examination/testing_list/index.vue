<template>
  <card ref="Card">
    <div slot="header">
      <el-tabs v-model="activeName" @tab-click="changeActive" >
        <el-tab-pane :label="`第${item+1}套`" :name="item+1" v-for="(item,index) in sections"></el-tab-pane>
      </el-tabs>
      <el-input v-model="searchName" placeholder="输入题目搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add" v-if="true">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column type="expand" >
        <template slot-scope="props" v-if="props.row.chType===0 || props.row.chType===1">
          <el-form label-position="left" inline>
            <el-form-item label="选项">
              <div v-for="(item,index) in (props.row.chItem).split('&')">
                <span v-if="index===0">A、</span>
                <span v-if="index===1">B、</span>
                <span v-if="index===2">C、</span>
                <span v-if="index===3">D、</span>
                <span>{{item}}</span>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="chIndex" label="题号" width="120" header-align="center" align="center"/>
      <el-table-column label="题目" header-align="center" align="center">
        <template slot-scope="scope">
          <div class="htmlBox" v-html="scope.row.chQuestion" v-if="scope.row.chType===3"></div>
          <span v-else>{{scope.row.chQuestion}}</span>
        </template>
      </el-table-column>

      <el-table-column label="题型" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.chType===0">单选题</span>
          <span v-if="scope.row.chType===1">多选题</span>
          <span v-if="scope.row.chType===2">判断题</span>
          <span v-if="scope.row.chType===3">主观题</span>
        </template>
      </el-table-column>
      <el-table-column label="答案" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.chType===0 || scope.row.chType===1">
            <span v-for="(item,index) in (scope.row.chAnswer).split(',')">
              <span v-if="item === '0'">A </span>
              <span v-if="item === '1'">B </span>
              <span v-if="item === '2'">C </span>
              <span v-if="item === '3'">D </span>
            </span>
          </span>
          <span v-else-if="scope.row.chType===2">
            <span v-for="(item,index) in (scope.row.chAnswer).split(',')">
              <span v-if="item === '0'">错误</span>
              <span v-if="item === '1'">正确</span>
            </span>
          </span>
          <div class="htmlBox" v-html="scope.row.chAnswer" v-else-if="scope.row.chType===3"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData(scope.row)" v-if="true"/>
        </template>
      </el-table-column>
    </el-table>
    <add ref="Add" @update="getData"/>
    <edit ref="Edit" @update="getData"/>
  </card>
</template>

<script>
  import {objectEvaluate} from "@/utils/common";
  import Edit from '../testing_edit/index';
  import Add from '../testing_add/index';
  import {
    delChoiceApi,
    delSubjectApi,
    getTestingApi,
    getTestingSectionsApi
  } from "@/api/examination";
  import {isEmpty} from "@/utils/common";

  export default {
    name: "TestingList",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: '',
        activeName: '',
        sections: [],
      }
    },
    mounted() {
      this.getSection().then(() => {
        this.activeName=this.sections[0] + 1
        this.getData()
      })
    },
    methods: {
      getData() {
        let param = {
          name: this.searchName,
          testingNum: this.activeName
        };
        this.$refs.Card.start();
        getTestingApi(param).then(result => {
          let response = result.data;
          let subjectiveQuesList = []
          if (!isEmpty(response['subjectiveQuesList'])){
            response['subjectiveQuesList'].forEach(item =>{
              subjectiveQuesList.push({
                chAnswer: item.sbAnsw,
                chIndex: item.sbIndex,
                chItem: '',
                chQuestion: item.sbQues,
                chSection: item.sbSection,
                chType: 3,
                id: item.id,
                testingNum: item.testingNum,
              })
            })
          }
          this.formData = [...response['choiceQuesList'],...subjectiveQuesList];
          this.$refs.Card.stop();
        })
      },
      getSection() {
        return new Promise((resolve)=>{
          getTestingSectionsApi({}).then(result => {
            this.sections=result.data;
            resolve()
          })
        })
      },
      add() {
        this.$refs.Add.form.testingNum = this.activeName;
        this.$refs.Add.visible = true;
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        _this.form.testingNum = this.activeName;
        objectEvaluate(_this.form, obj);
        _this.form.sbQues = obj.chQuestion;
        _this.form.sbAnsw = obj.chAnswer;
        _this.form.chItemArr = obj.chItem.split('&')
        _this.form.chAnswerArr = obj.chAnswer.split(',').map(str=>parseInt(str))
        _this.visible = true
      },
      delData(row) {
        let id = row.id;
        if (row.chType===3){
          delSubjectApi({id: id})
            .then(() => {
              this.getData();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
        }else{
          delChoiceApi({id: id})
            .then(() => {
              this.getData();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
        }
      },
      changeActive() {
        this.getData()
      }
    }
  }
</script>

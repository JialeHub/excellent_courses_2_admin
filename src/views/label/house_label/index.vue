<template>
  <div>
    <card ref="CardOne" class="mb-20">
      <div slot="header">
        <span>物业类型</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add(0)">新增</el-button>
      </div>
      <el-table :data="formDataOne">
        <el-table-column prop="type" label="标签中文名称"/>
        <el-table-column prop="typeEn" label="标签英文名称"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row,0)"/>
            <delete-button :ref="scope.row.id" :id="`${scope.row.id},0`" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <card ref="CardTwo">
      <div slot="header">
        <span>目的</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add(1)">新增</el-button>
      </div>
      <el-table :data="formDataTwo">
        <el-table-column prop="type" label="标签中文名称"/>
        <el-table-column prop="typeEn" label="标签英文名称"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row,1)"/>
            <delete-button :ref="scope.row.id" :id="`${scope.row.id},1`" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <add
        ref="Add"
        @updateOne="getDataOne"
        @updateTwo="getDataTwo"
        :classify="classify"
        :typeGroup="typeGroup"/>
    <edit
        ref="Edit"
        @updateOne="getDataOne"
        @updateTwo="getDataTwo"
        :classify="classify"
        :typeGroup="typeGroup"/>
  </div>
</template>

<script>
  import {getLabelApi, delLabelApi} from '@/api/label';
  import {objectEvaluate} from "@/utils/common";
  import Add from '../components/add_label';
  import Edit from '../components/edit_label';

  export default {
    name: "HouseLabel",
    components: {Edit, Add},
    data() {
      return {
        formDataOne: [],
        formDataTwo: [],
        classify: 0,
        typeGroup: null
      }
    },
    mounted() {
      this.getDataOne()
      this.getDataTwo()
    },
    methods: {
      getDataOne() {
        this.$refs.CardOne.start();
        let param = {
          classifyId: this.classify,
          groupId: 0
        };
        getLabelApi(param).then(result => {
          this.formDataOne = result.data
          this.$refs.CardOne.stop();
        })
      },
      getDataTwo() {
        this.$refs.CardTwo.start();
        let param = {
          classifyId: this.classify,
          groupId: 1
        };
        getLabelApi(param).then(result => {
          this.formDataTwo = result.data
          this.$refs.CardTwo.stop();
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
        let array = id.split(',');
        delLabelApi({id: array[0]})
          .then(() => {
            if (array[1] === "0") this.getDataOne()
            if (array[1] === "1") this.getDataTwo()
            this.$refs[array[0]].close()
          })
          .catch(() => {
            this.$refs[array[0]].stop();
          })
      }
    }
  }
</script>

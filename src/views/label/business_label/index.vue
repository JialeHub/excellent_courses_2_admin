<template>
  <div>
    <card ref="CardOne" class="mb-20">
      <div slot="header">
        <span>类别</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add(3)">新增</el-button>
      </div>
      <el-table :data="formDataOne">
        <el-table-column prop="type" label="标签中文名称"/>
        <el-table-column prop="typeEn" label="标签英文名称"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row,3)"/>
            <delete-button :ref="scope.row.id" :id="`${scope.row.id},3`" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <card ref="CardTwo" class="mb-20">
      <div slot="header">
        <span>区域</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add(4)">新增</el-button>
      </div>
      <el-table :data="formDataTwo">
        <el-table-column prop="type" label="标签中文名称"/>
        <el-table-column prop="typeEn" label="标签英文名称"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row,4)"/>
            <delete-button :ref="scope.row.id" :id="`${scope.row.id},4`" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <card ref="CardThree" class="mb-20">
      <div slot="header">
        <span>房型</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add(5)">新增</el-button>
      </div>
      <el-table :data="formDataThree">
        <el-table-column prop="type" label="标签中文名称"/>
        <el-table-column prop="typeEn" label="标签英文名称"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row,5)"/>
            <delete-button :ref="scope.row.id" :id="`${scope.row.id},5`" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <card ref="CardFour">
      <div slot="header">
        <span>类型</span>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add(6)">新增</el-button>
      </div>
      <el-table :data="formDataFour">
        <el-table-column prop="type" label="标签中文名称"/>
        <el-table-column prop="typeEn" label="标签英文名称"/>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row,6)"/>
            <delete-button :ref="scope.row.id" :id="`${scope.row.id},6`" @start="delData"/>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <add
        ref="Add"
        @updateOne="getDataOne"
        @updateTwo="getDataTwo"
        @updateThree="getDataThree"
        @updateFour="getDataFour"
        :classify="classify"
        :typeGroup="typeGroup"/>
    <edit
        ref="Edit"
        @updateOne="getDataOne"
        @updateTwo="getDataTwo"
        @updateThree="getDataThree"
        @updateFour="getDataFour"
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
    name: "BusinessLabel",
    components: {Edit, Add},
    data() {
      return {
        formDataOne: [],
        formDataTwo: [],
        formDataThree: [],
        formDataFour: [],
        classify: 2,
        typeGroup: null
      }
    },
    mounted() {
      this.getDataOne()
      this.getDataTwo()
      this.getDataThree()
      this.getDataFour()
    },
    methods: {
      getDataOne() {
        this.$refs.CardOne.start();
        let param = {
          classifyId: this.classify,
          groupId: 3
        };
        getLabelApi(param).then(result => {
          this.formDataOne = result.data;
          this.$refs.CardOne.stop();
        })
      },
      getDataTwo() {
        this.$refs.CardTwo.start();
        let param = {
          classifyId: this.classify,
          groupId: 4
        };
        getLabelApi(param).then(result => {
          this.formDataTwo = result.data;
          this.$refs.CardTwo.stop();
        })
      },
      getDataThree() {
        this.$refs.CardThree.start();
        let param = {
          classifyId: this.classify,
          groupId: 5
        };
        getLabelApi(param).then(result => {
          this.formDataThree = result.data;
          this.$refs.CardThree.stop();
        })
      },
      getDataFour() {
        this.$refs.CardFour.start();
        let param = {
          classifyId: this.classify,
          groupId: 6
        };
        getLabelApi(param).then(result => {
          this.formDataFour = result.data;
          this.$refs.CardFour.stop();
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
            if (array[1] === "3") this.getDataOne()
            if (array[1] === "4") this.getDataTwo()
            if (array[1] === "5") this.getDataThree()
            if (array[1] === "6") this.getDataFour()
            this.$refs[array[0]].close()
          })
          .catch(() => {
            this.$refs[array[0]].stop();
          })
      }
    }
  }
</script>

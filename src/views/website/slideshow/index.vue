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
              style="width: 198px;height: 124px"
              shape="square"
              :src="$baseApi + ((scope.row.link + '').split('?linkURL=')[0])">
            <img src="../../../assets/notFound.png" alt="logo"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类别">
        <template slot-scope="scope">
          <span v-if="scope.row.type===6">首页</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="链接">
        <template slot-scope="scope">
          <a :href="(scope.row.link + '').split('?linkURL=')[1]" v-if="scope.row.type===6">{{(scope.row.link + '').split('?linkURL=')[1]}}</a>
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
    name: "Slideshow",
    components: {Edit, Add},
    data() {
      return {
        options: [
          {key: 6, label: '首页', value: 6},
        ],
        formData: [],
        searchType: 6
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
        _this.linkURL=(_this.form.link + '').split('?linkURL=')[1]
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

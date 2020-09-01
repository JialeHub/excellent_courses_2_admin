<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchStudent" placeholder="输入姓名搜索" clearable class="w-200" @keyup.enter.native="getData"/>
      <el-input v-model="searchDetail" placeholder="输入评论内容搜索" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="平均评分" label-width="8rem">
              <span>{{props.row['average']}}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="知识量评分" label-width="8rem">
              <span>{{props.row['quantity']}}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="趣味性" label-width="8rem">
              <span>{{props.row['interest']}}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="教师参与评分" label-width="8rem">
              <span>{{props.row['participate']}}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="课程设计评分" label-width="8rem">
              <span>{{props.row['design']}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="sname" label="姓名" width="100" header-align="center" align="center"/>
      <el-table-column label="头像" width="120" align="center" header-align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="44" :src="$baseApi + scope.row.scover">
            <img :src="require('@/assets/notFound.png')" alt="头像"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发表时间"  header-align="center" align="center" width="150"/>
      <el-table-column prop="detail" label="评论内容"  header-align="center" align="center"/>
      <el-table-column label="赞" align="center" width="120">
        <template slot-scope="scope">
          <el-button @click.stop="praiseOpen(scope.row)">赞列表({{scope.row['praiseNum']}})</el-button>
        </template>
      </el-table-column>
      <el-table-column label="回复" align="center" width="120">
        <template slot-scope="scope">
          <el-button @click.stop="writeBackOpen(scope.row)">回复列表({{scope.row['wbNum']}})</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" header-align="center" width="90">
        <template slot-scope="scope">
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData" v-if="true"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <praise ref="Praise" @update="getData"/>
    <write-back ref="WriteBack" @update="getData"/>
  </card>
</template>

<script>
  import {objectEvaluate} from "@/utils/common";
  import Praise from './remark_student_praise_list/index';
  import WriteBack from './remark_student_writeBack_list/index';
  import {delEvaluateApi, getEvaluateApi} from "@/api/evaluate";

  export default {
    name: "RemarkStudent",
    components: { Praise,WriteBack },
    data() {
      return {
        formData: [],
        searchDetail: '',
        searchStudent: '',
        type: 0
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          student: this.searchStudent,
          detail: this.searchDetail,
          type: this.type
        };
        this.$refs.Card.start();
        getEvaluateApi(param).then(result => {
          let response = result.data;
          this.formData = response['records'];
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      add() {
        this.$refs.Add.visible = true;
      },
      praiseOpen(obj) {
        let _this = this.$refs.Praise;
        objectEvaluate(_this.form, obj);
        _this.visible = true
        setTimeout(()=>{
          _this.getData()
        })
      },
      writeBackOpen(obj) {
        let _this = this.$refs.WriteBack;
        objectEvaluate(_this.form, obj);
        _this.visible = true
        setTimeout(()=>{
          _this.getData()
        })
      },
      delData(id) {
        delEvaluateApi({evalId: id})
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

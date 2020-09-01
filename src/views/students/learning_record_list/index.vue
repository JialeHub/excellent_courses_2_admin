<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入姓名或学号搜索" clearable class="w-150" @keyup.enter.native="getData" v-if="false"/>
      <el-input v-model="searchUId" placeholder="输入学生ID开始搜索" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="sname" label="姓名"/>
      <el-table-column prop="snumber" label="学号"/>
      <el-table-column prop="vduration" label="学习时间"/>
      <el-table-column prop="findex" label="视频序号"/>
      <el-table-column prop="fname" label="视频名称"/>
      <el-table-column prop="fsection" label="所属章节"/>
      <el-table-column label="视频预览">
        <template slot-scope="scope">
          <video style="cursor: pointer" :src="$baseApi + (scope.row.faccess)" width="100" height="75" @click="openVideo($baseApi + (scope.row.faccess))"></video>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getData"/>
    <el-dialog title="视频预览" width="800px" :close-on-click-modal="false" :visible.sync="visibleVideo" @close="closeVideo">
      <video :src="videoUrl" width="100%" controls></video>
    </el-dialog>
  </card>
</template>

<script>
  import {getUserHistoryApi} from '@/api/user';
  import {isEmpty} from "@/utils/common";

  export default {
    name: "LearningRecordList",
    data() {
      return {
        formData: [],
        searchName: '',
        searchUId: '',
        videoUrl: '',
        visibleVideo: false
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      closeVideo(){
        this.videoUrl = '';
        this.visibleVideo = false
      },
      openVideo(url){
        this.videoUrl = url;
        this.visibleVideo = true
      },
      getData() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          uId : this.searchUId,
        };
        if (/^[0-9]+$/.test(this.searchName)){
          param.number=this.searchName
        }else if (!isEmpty(this.searchName)){
          param.name=this.searchName
        }
        this.$refs.Card.start();
        getUserHistoryApi(param).then(result => {
          let response = result.data;
          this.formData = response['records'];
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
    }
  }
</script>

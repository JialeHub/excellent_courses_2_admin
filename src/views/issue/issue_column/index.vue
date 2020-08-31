<template>
  <card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="城市介绍" name="first">
        <introduce v-if="activeName==='first'"/>
      </el-tab-pane>
      <el-tab-pane label="购房指南" name="second">
        <guide v-if="activeName==='second'"/>
      </el-tab-pane>
      <el-tab-pane label="委托售房服务" name="third">
        <serve v-if="activeName==='third'"/>
      </el-tab-pane>
      <el-tab-pane label="移民" name="forth">
        <immigrant v-if="activeName==='forth'"/>
      </el-tab-pane>
    </el-tabs>
  </card>
</template>

<script>
  import guide from './guide'
  import immigrant from './immigrant'
  import introduce from './introduce'
  import serve from './serve'

  export default {
    name: "IssueColumn",
    components: {guide, immigrant, introduce, serve},
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

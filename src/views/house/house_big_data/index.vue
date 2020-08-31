<template>
  <card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="房价涨幅" name="first">
        <price v-if="activeName==='first'"></price>
      </el-tab-pane>
      <el-tab-pane label="租金涨幅" name="second">
        <rental v-if="activeName==='second'"></rental>
      </el-tab-pane>
      <el-tab-pane label="热门项目" name="third">
        <project v-if="activeName==='third'"></project>
      </el-tab-pane>
    </el-tabs>
  </card>
</template>

<script>
  import price from './price'
  import project from './project'
  import rental from './rental'

  export default {
    name: "houseBigData",
    components: {price, project, rental},
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

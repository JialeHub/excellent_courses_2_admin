<template>
  <card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="新盘优选" name="first">
        <uptown v-if="activeName==='first'"/>
      </el-tab-pane>
      <el-tab-pane label="商业地产" name="second">
        <business v-if="activeName==='second'"/>
      </el-tab-pane>
    </el-tabs>
  </card>
</template>

<script>
  import uptown from './uptown'
  import business from './business'

  export default {
    name: "HouseList",
    components: {uptown, business},
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

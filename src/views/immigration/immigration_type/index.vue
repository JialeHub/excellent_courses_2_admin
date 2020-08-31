<template>
  <card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="美国移民" name="first">
        <america v-if="activeName==='first'"/>
      </el-tab-pane>
      <el-tab-pane label="护照移民" name="second">
        <passport v-if="activeName==='second'"/>
      </el-tab-pane>
    </el-tabs>
  </card>
</template>

<script>
  import america from './america'
  import passport from './passport'

  export default {
    name: "ImmigrationType",
    components: {america, passport},
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

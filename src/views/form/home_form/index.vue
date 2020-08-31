<template>
  <card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="未处理" name="first">
        <have-not v-if="activeName==='first'"/>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="second">
        <had v-if="activeName==='second'"/>
      </el-tab-pane>
    </el-tabs>
  </card>
</template>

<script>
  import HaveNot from './have_not'
  import Had from './had'

  export default {
    name: "HomeForm",
    components: {HaveNot, Had},
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

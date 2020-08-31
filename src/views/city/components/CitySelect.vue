<template>
  <el-cascader
      v-model="val"
      ref="CitySelect"
      popper-class="city-select"
      clearable
      placeholder="选择城市"
      @change="change"
      filterable
      :props="{ checkStrictly: true, value: 'name',label: 'name'}"
      :options="options">
  </el-cascader>
</template>

<script>
  import {options} from '@/utils/cityOptions'

  export default {
    name: "CitySelect",
    props: {
      value: {
        type: String
      },
      that: {
        type: Object
      }
    },
    data() {
      return {
        val: [],
        options: options
      }
    },
    watch: {
      value(val) {
        if (!val && this.val) { // 只有外边重置才执行
          this.val = []
        }
      }
    },
    methods: {
      change() {
        this.$nextTick(() => {
          let nodes = this.$refs.CitySelect.getCheckedNodes()
          if (nodes.length === 0) {
            this.$emit('input', '');
            this.that.form.nameEn = '';
            this.$parent.$emit('el.form.change');
          } else {
            this.$emit('input', nodes[0].data.name);
            this.that.form.nameEn = nodes[0].data.nameEn;
            this.$parent.$emit('el.form.change');
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .city-select {
    .el-cascader-panel {
      height: 300px;
    }
  }
</style>

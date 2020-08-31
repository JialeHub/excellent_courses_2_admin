<template>
  <el-select
      v-model="val"
      placeholder="输入城市搜索"
      clearable
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="searchLoading"
      @change="change">
    <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
  import {getCityApi, getCityDetailApi} from '@/api/city'

  export default {
    name: "SearchSelect",
    props: {
      value: {
        type: [String, Number]
      }
    },
    data() {
      return {
        val: null,
        searchLoading: false,
        selectOptions: []
      }
    },
    watch: {
      value(val) {
        if (!val && this.val) { // 只有外边重置才执行
          this.selectOptions = [];
          this.val = null
        }
      }
    },
    methods: {
      set(id) {
        getCityDetailApi({id}).then(result => {
          this.val = id;
          this.selectOptions = [result.data];
        })
      },
      change(val) {
        let selectItem = null;
        if (val) {
          this.selectOptions.some(item => {
            if (item.id === val) {
              selectItem = item;
              return true
            }
          })
        }
        this.$emit('input', val);
        this.$emit('get', selectItem);
      },
      remoteMethod(query) {
        if (query) {
          this.searchLoading = true;
          let param = {
            name: query,
            current: 1,
            size: 99
          };
          getCityApi(param)
            .then(result => {
              this.searchLoading = false;
              this.selectOptions = result.data.records
            })
            .catch(() => {
              this.searchLoading = false;
            })
        } else {
          this.selectOptions = [];
        }
      }
    }
  }
</script>

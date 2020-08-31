<template>
  <el-select
      v-model="val"
      placeholder="输入卖家名称搜索"
      clearable
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="searchLoading"
      @change="change">
    <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.sname"
        :value="item.id"
    >
      <span style="float: left">{{item.sname}}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{item.phone}}</span>
    </el-option>
  </el-select>
</template>

<script>
  import {getSellersApi, getSellerApi} from '@/api/house/sellerInfo'

  export default {
    name: "SearchSelectSeller",
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
        getSellerApi({id}).then(result => {
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
          getSellersApi(param)
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

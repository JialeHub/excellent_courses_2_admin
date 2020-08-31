<template>
  <div class="person">
    <card style="width: 70%;margin: 0 auto">
      <div slot="header">
        <span>个人信息</span>
      </div>
      <div style="text-align: center; margin-bottom: 20px">
        <el-avatar :size="120">
          <img src="../../assets/admin.jpg" alt="">
        </el-avatar>
      </div>
      <ul class="personInfo">
        <li>
          <span>安全设置</span>
          <span>
            <a style="color: #317ef3; cursor: pointer" @click="changePassword">修改密码</a>
          </span>
        </li>
      </ul>
    </card>
    <password-dialog ref="PasswordDialog"></password-dialog>
  </div>
</template>

<script>
  import PasswordDialog from './password'

  export default {
    components: {PasswordDialog},
    name: 'person',
    computed: {
      user() {
        return this.$storeGet.user
      }
    },
    methods: {
      // 修改密码
      changePassword() {
        const _this = this.$refs.PasswordDialog;
        _this.visible = true
      }
    }
  }
</script>

<style lang="scss">
  .person {
    .personInfo li {
      border-bottom: 1px solid #f0f3f4;
      border-top: 1px solid #f0f3f4;
      padding: 11px 0;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }

    .el-avatar > img {
      width: 100%;
    }
  }
</style>

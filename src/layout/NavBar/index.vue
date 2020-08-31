<template>
  <div id="nav-bar">
    <div class="search-menu" v-show="!isSmall">
      <search-menu/>
    </div>
    <div class="screen-full-button" v-show="!isSmall">
      <screen-full/>
    </div>
    <div class="language-tab-radio">
      <el-radio-group v-model="language" size="small">
        <el-radio-button label="zh">中文</el-radio-button>
        <el-radio-button label="en">English</el-radio-button>
      </el-radio-group>
    </div>
    <el-dropdown trigger="click">
      <div class="el-dropdown-link">
        <el-avatar shape="square" :size="44">
          <img src="../../assets/admin.jpg" alt="头像"/>
        </el-avatar>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-s-custom" @click.native='goPerson'>
          <word zh="个人中心" en="Your profile"/>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-tools" @click.native="drawer = true">
          <word zh="系统设置" en="Settings"></word>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-promotion" divided @click.native='logout'>
          <word zh="退出登录" en="Sign out"/>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        :destroy-on-close="true">
      <drawer-setting/>
    </el-drawer>
  </div>
</template>

<script>
  import ScreenFull from './ScreenFull'
  import SearchMenu from './SearchMenu'
  import DrawerSetting from './DrawerSetting'

  export default {
    name: "NavBar",
    components: {ScreenFull, SearchMenu, DrawerSetting},
    data() {
      return {
        drawer: false
      }
    },
    computed: {
      isSmall() {
        return this.$storeGet.isSmall
      },
      language: {
        get() {
          return this.$storeGet.setting.language;
        },
        set(value) {
          this.$storeSet('changeSetting', {
            key: 'language',
            value: value
          })
        }
      }
    },
    methods: {
      // 进入个人中心
      goPerson() {
        if (this.$route.name === 'person') return;
        this.$storeSet('setBreadcrumb', ['个人中心']);
        this.$storeSet('addTags', {title: '个人中心', name: 'person', indexPath: ['个人中心']});
        this.$storeSet('setActive', '个人中心');
        this.$router.push({name: 'person'})
      },
      // 退出登录
      logout() {
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/index';

  #nav-bar {
    display: flex;

    .search-menu,
    .screen-full-button,
    .language-tab-radio {
      padding-right: 15px;
    }

    .language-tab-radio {
      user-select: none;
      line-height: $header-height;
    }

    .el-dropdown {
      height: $header-height;
    }

    .el-dropdown-link {
      display: flex;
      justify-items: center;
      margin-top: ($header-height - 44px) /2;
      cursor: pointer;
    }

    .el-drawer__body {
      height: 0;
    }

    .el-drawer {
      width: 350px !important;
    }
  }
</style>

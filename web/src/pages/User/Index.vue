<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-header>
            <el-menu @select="headerSelect" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/">
                    云签签
                </el-menu-item>
                <div style="float: right">
                    <el-submenu index="2">
                        <template slot="title">{{user.name||user.account||user.email}}</template>
                        <el-menu-item index="/login">注销</el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </el-header>

        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-active="path" router >
                    <el-menu-item index="/user/dashboard">
                        我的签到
                    </el-menu-item>
                    <el-menu-item index="/user/start">
                        新建签到
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {};
  },
  methods: {
    headerSelect(key) {
      if (key.startsWith("/")) {
        this.$router.push(key);
      }
    }
  },
  computed:{
      ...mapGetters(["user"]),
      path: function() {
          return this.$router.currentRoute.path
      }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  margin: -1px;
  margin-bottom: 0;
  background: #545c64;
  font-size: 12px;
}
</style>


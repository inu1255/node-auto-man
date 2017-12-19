<template>
  <div class="home-pg">
    <div class="header">
      <nav>
        <router-link to="/">云签签</router-link>
        <div v-if="logined" class="right">
          <LoginLink to="/login">注销</LoginLink>
        </div>
        <div v-else class="right">
          <LoginLink>登录</LoginLink>
          <LoginLink to="/register">注册</LoginLink>
        </div>
      </nav>
      <div class="content-centor">
        <router-view></router-view>
      </div>
    </div>
    <Notice></Notice>
  </div>
</template>

<script>
import Notice from "./Notice";
import {mapGetters} from 'vuex'

export default {
  name: "Home",
  components: {
    Notice
  },
  computed:{
    ...mapGetters(["logined"])
  }
};
</script>

<style lang="less" scoped>
.home-pg {
  > .header {
    height: 100vh;
    position: relative;
    margin: 0 auto;
    background-size: cover;
    background-position: center center;
    background-image: url(../../assets/header.jpg);
    > nav {
      padding: 20px 85px 10px;
      min-height: 53px;
      line-height: 53px;
      margin-bottom: 20px;
      font-size: 13px;
      color: #fff;
      a {
        color: #fff;
        margin-right: 1rem;
      }
      .right {
        float: right;
      }
    }
    > .content-centor {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #ffffff;
      width: 100%;
    }
  }
  > .md {
    padding: 4rem;
  }
}
</style>

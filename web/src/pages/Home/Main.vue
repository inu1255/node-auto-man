<template>
  <div class="main">
    <h1>{{ name||"云签签" }}</h1>
    <h4>{{notice||"交流群: 661969149"}}</h4>
    <router-link v-if="logined" class="btn home" to="/user/dashboard">控制面板</router-link>
    <router-link v-else class="btn home" to="/login">登录</router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Main",
  props: ["name", "notice"],
  computed:{
    ...mapGetters(["logined"])
  }
};
</script>

<style lang="less" scoped>
.main {
  h1 {
    font-weight: 700;
    font-size: 3.5em;
    line-height: 1.15;
    margin-bottom: 30px;
  }
  h4 {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
    font-size: 1.714em;
    margin-top: 30px;
    margin-bottom: 15px;
  }
}
</style>


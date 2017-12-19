<template>
    <div class="form">
        <div class="header">
            <h6>回家咯~~~</h6>
        </div>
        <el-form ref="form" :model="body" :rules="rule" size="small">
          <el-form-item prop="title">
              <el-input type="text" v-model="body.title" prefix-icon="ion-ios-person-outline" placeholder="用户名/邮箱">
              </el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input @keypress.enter.native="login('form')" type="password" v-model="body.password" prefix-icon="ion-ios-locked-outline" placeholder="密码">
              </el-input>
          </el-form-item>
          <el-form-item>
              <el-button class="login" type="primary" @click="login('form')">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data() {
    return {
      body: {
        title: "",
        pass: ""
      },
      rule: {
        title: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码不少于6位", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    this.$store.dispatch("logout")
  },
  methods: {
    login(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.$store.dispatch("login", this.body);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 350px;
  display: inline-block;
  .header {
    padding: 30px 0;
  }
  .login {
    width: 100%;
  }
}
</style>

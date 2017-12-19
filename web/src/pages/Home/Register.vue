<template>
  <div class="form">
    <div class="header">
      <h6>注册，然后变成一只猫</h6>
    </div>
    <el-form ref="form" :model="body" :rules="rule">
      <el-form-item prop="account">
        <el-input size="mini" prefix-icon="ion-ios-person-outline" type="text" v-model="body.account" placeholder="用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="title">
        <el-input size="mini" prefix-icon="ion-ios-email-outline" type="text" v-model="body.title" placeholder="邮箱">
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input size="mini" type="text" v-model="body.code" placeholder="验证码">
          <el-button :disabled="!!seconds" @click="sendCode" slot="append">{{seconds?seconds+"秒":"获取验证码"}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="mini" prefix-icon="ion-ios-locked-outline" type="password" v-model="body.password" placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="repass">
        <el-input size="mini" prefix-icon="ion-ios-locked-outline" type="password" v-model="body.repass" placeholder="重复密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="invite">
        <el-input size="mini" prefix-icon="ion-happy" v-model="body.invite" placeholder="输入邀请码，各得100豆">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login" type="primary" @click="register('form')" size="small">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Register",
  data() {
    return {
      body: {
        account: "",
        title: "",
        code: "",
        password: "",
        repass: "",
        invite: ""
      },
      seconds: 0,
      rule: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        title: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /[^@]+@([^\.]+\.)+[^\.]+/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码不少于6位", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        repass: [
          { required: true, message: "请重复密码", trigger: "blur" },
          {
            validator: (r, v, cb) => cb(this.body.password == v && undefined),
            message: "密码不一致",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    register(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.$store.dispatch("register", this.body);
        }
      });
    },
    sendCode: _.debounce(async function() {
      await request("/user/send-code?title=" + this.body.title);
      this.$message.success("发送成功");
      this.seconds = 60;
      this.codeTimer();
      // TODO: time
    }),
    codeTimer() {
      if (this.seconds > 0) {
        this.seconds--;
        setTimeout(() => {
          this.codeTimer();
        }, 1000);
      }
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

<template>
  <div class="content-center">
    <div class="card card-signup card-plain">
        <div class="header header-primary text-center">
            <h6 class="title title-up">注册，然后变成一只猫</h6>
        </div>
        <div class="content">
            <div class="input-group form-group-no-border"><span class="input-group-addon"><i class="now-ui-icons users_circle-08"></i></span> <input type="text" placeholder="用户名" class="form-control"></div>
            <div class="input-group form-group-no-border"><span class="input-group-addon"><i class="now-ui-icons ui-1_email-85"></i></span> <input type="text" placeholder="邮箱" class="form-control"></div>
            <div class="input-group form-group-no-border"><span class="input-group-addon"><i class="now-ui-icons ui-1_lock-circle-open"></i></span> <input type="password" placeholder="密码" class="form-control"></div>
            <div class="input-group form-group-no-border"><span class="input-group-addon"><i class="now-ui-icons ui-1_lock-circle-open"></i></span> <input type="password" placeholder="重复密码" class="form-control"></div>
            <div class="input-group form-group-no-border"><span class="input-group-addon"><i class="now-ui-icons ui-1_lock-circle-open"></i></span> <input type="text" placeholder="邀请码" class="form-control"></div>
        </div>
        <div class="footer text-center"><a href="#pablo" class="btn btn-neutral btn-round btn-lg">创建账户</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      child: {
        msg: "123"
      }
    };
  }
};
</script>


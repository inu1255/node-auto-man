<template>
  <router-link :to="to_"><slot></slot></router-link>
</template>

<script>
export default {
  name: "LoginLink",
  props: {
    to: {
      default: "/login"
    }
  },
  computed: {
    to_() {
      let route = this.$router.currentRoute;
      let redirect = route.fullPath;
      if (/(login)|(register)/.test(route.fullPath)) {
        redirect = undefined;
      }
      return { path: this.to, query: { redirect } };
    }
  }
};
</script>

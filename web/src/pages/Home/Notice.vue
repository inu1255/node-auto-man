<template>
  <Markdown class="md" :value="notice"></Markdown>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Notice",
  data() {
    return {
      notice: ""
    };
  },
  async created() {
    this.notice = await request("/notice/home");
  }
};
</script>


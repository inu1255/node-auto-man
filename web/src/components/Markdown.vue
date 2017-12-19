<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
export default {
  name: "Markdown",
  props: ["value"],
  computed: {
    compiledMarkdown: function() {
      return marked(this.value, { sanitize: true });
    }
  }
};
</script>

<template>
  <double-snake :size="doubleSize" />
</template>

<script>
import doubleSnake from "../components/double.vue";
export default {
  name: "single",
  components: {
    doubleSnake,
  },
  data() {
    return {
      doubleSize: 60,
    };
  },
};
</script>
<style scoped>
</style>
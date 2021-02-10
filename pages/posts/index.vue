<template>
  <div class="posts-page">
    <PostList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostList from "@/components/Posts/PostList.vue";

export default Vue.extend({
  components: {
    PostList,
  },
});
</script>

<style scoped>
.post-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

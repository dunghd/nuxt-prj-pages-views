<template>
  <section class="posts-list">
    <PostPreview
      id="1"
      thumbnail="/Shutter.Island.jpg"
      title="Hello there!"
      previewText="This is my first post!"
    />
    <PostPreview
      id="2"
      thumbnail="/Shutter.Island.jpg"
      title="Hello there - the second time!"
      previewText="This is my second post!"
    />
    <PostPreview
      id="3"
      thumbnail="/Shutter.Island.jpg"
      title="Hello there - the third time!"
      previewText="This is my third post!"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import PostPreview from "@/components/Posts/PostPreview.vue";

export default Vue.extend({
  components: {
    PostPreview,
  },
});
</script>

<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

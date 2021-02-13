<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";

export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  asyncData(context) {
    return axios
      .get(
        `https://nuxt-blog-57595-default-rtdb.firebaseio.com/posts/${context.params.postId}.json`
      )
      .then((res) => {
        return {
          loadedPost: res.data,
        };
      })
      .catch((err) => context.error(err));
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>

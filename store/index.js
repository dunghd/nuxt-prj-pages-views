import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get(`/posts.json`)
          .then(data => {
            const postsArray = [];
            for (const key in data) {
              postsArray.push({ ...data[key], id: key });
            }
            vuexContext.commit('setPosts', postsArray);
          })
          .catch(err => context.error(err));
      },
      addPost(vuexContext, postData) {
        const createdPosts = {
          ...postData,
          updatedDate: new Date()
        };
        return this.$axios
          .$post(
            `/posts.json`,
            createdPosts
          )
          .then(data => {
            vuexContext.commit('addPost', { ...createdPosts, id: data.name })
          })
          .catch((err) => console.log(err));
      },
      editPost(vuexContext, editedPost) {
        const updatedPost = {
          ...editedPost,
          updatedDate: new Date()
        };
        return this.$axios
          .$put(
            `/posts/${editedPost.id}.json`,
            updatedPost
          )
          .then(data => {
            vuexContext.commit('editPost', updatedPost);
          })
          .catch((err) => console.log(err));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;

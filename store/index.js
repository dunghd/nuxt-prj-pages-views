import Vuex from 'vuex';
import axios from 'axios';

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
        return axios.get(`${process.env.baseUrl}/posts.json`)
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
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
        return axios
          .post(
            `${process.env.baseUrl}com/posts.json`,
            createdPosts
          )
          .then(res => {
            vuexContext.commit('addPost', { ...createdPosts, id: res.data.name })
          })
          .catch((err) => console.log(err));
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            `${process.env.baseUrl}/posts/${editedPost.id}.json`,
            editedPost
          )
          .then(res => {
            vuexContext.commit('editPost', editedPost);
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

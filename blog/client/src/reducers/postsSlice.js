export const POSTS_LOADED = "posts/allLoaded";
export const READ_POST = "posts/readPost";

const INITIAL_STATE = {
  byId: {},
  allIds: [],
};

export const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS_LOADED: {
      const posts = action.payload;
      let byId = {};
      posts.forEach((post) => {
        byId[post.id] = post;
      });
      return {
        ...state,
        byId,
        allIds: posts.map((post) => post.id),
      };
    }
    case READ_POST: {
      const postId = action.payload;
      const post = state.byId[postId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId]: { ...post, read: true },
        },
      };
    }
    default:
      return state;
  }
};

export const selectPostsIds = (state) => state.posts.allIds;

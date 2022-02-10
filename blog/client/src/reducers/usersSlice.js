import { getAllUsers } from "../api";
const USERS_LOADED = "users/allLoaded";

const INITIAL_STATE = {
  byId: {},
  allIds: [],
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_LOADED: {
      const users = action.payload;
      let byId = {};
      users.forEach((post) => {
        byId[post.id] = post;
      });
      return {
        ...state,
        byId,
        allIds: users.map((post) => post.id),
      };
    }
    default:
      return state;
  }
};

export const loadAllUsers = () => async (dispatch) => {
  const { users = [] } = await getAllUsers();
  dispatch({ type: USERS_LOADED, payload: users });
};

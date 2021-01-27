import { SUBMIT_POST_SUCCESS, DATA_RESPONSE } from "./actions";

const initialState = {
  postsFromFeed: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_POST_SUCCESS: {
      console.log(`SUBMIT_POST_SUCCESS ${action.payload}`);
      const postsFromFeed = [...state.postsFromFeed, action.payload];
      console.log(postsFromFeed);
      return {
        ...state,
        postsFromFeed: postsFromFeed,
      };
    }
    case DATA_RESPONSE:
      console.log("DATA_RESPONSE", action.payload);
      return {
        ...state,
        postsFromFeed: [...state.postsFromFeed, ...action.payload],
      };

    default:
      return state;
  }
};

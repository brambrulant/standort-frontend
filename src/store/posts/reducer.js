import SUBMIT_POST_SUCCESS from "./actions";
const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_POST_SUCCESS: {
      return { ...state, all: [...state.all, action.payload] };
    }

    default:
      return state;
  }
};

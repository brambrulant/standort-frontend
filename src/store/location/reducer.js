import { SET_MY_LOCATION, LOCATION_FOUND } from "./actions";

const initialState = { status: false, location: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_LOCATION:
      return { ...state, location: action.payload };
    case LOCATION_FOUND:
      return { ...state, status: true };
    default:
      return state;
  }
};

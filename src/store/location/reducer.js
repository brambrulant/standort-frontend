import { SET_MY_LOCATION, LOCATION_FOUND, NEW_LOCATION_STATUS } from "./actions";

const initialState = { status: null, location: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_LOCATION:
      return { ...state, location: action.payload };
    case NEW_LOCATION_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

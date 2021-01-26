import {SET_MY_LOCATION} from "./actions";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_LOCATION :
            return action.payload;

        default:
            return state;
    }
};
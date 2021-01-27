import {ADD_COMMENT, GET_COMMENTS} from "./actions";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT : {
            return state
        }

        case GET_COMMENTS : {
            return action.payload
        }

        default:
            return state;
    }
};
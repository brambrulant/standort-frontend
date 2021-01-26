import {DATA_RESPONSE} from "./actions";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case DATA_RESPONSE:
            console.log("DATA_RESPONSE", action.payload)
            return action.payload
        default:
            return state;
    }
};
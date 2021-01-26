import  {SUBMIT_POST_SUCCESS, DATA_RESPONSE} from "./actions";

const initialState = {
    all: [],
    postFromFeed: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_POST_SUCCESS: {
            return {
                ...state,
                all: [...state.all, action.payload]
            };
        }
        case DATA_RESPONSE:
            console.log("DATA_RESPONSE", action.payload)
            return {
                ...state,
                postFromFeed: [...state.all, action.payload]
            };

        default:
            return state;
    }
};

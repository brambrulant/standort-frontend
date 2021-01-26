import axios from "axios";
import {apiUrl} from "../../config/constants";

export const DATA_RESPONSE = "DATA_RESPONSE";

function setPostsWithData(data) {
    return {
        type:DATA_RESPONSE,
        payload: data,
    };
}

export const fetchPostsWithMyLocation = (location) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${apiUrl}/posts/${location}`);
            dispatch(setPostsWithData(response.data));

        } catch (error) {
            console.log(error.message);
        }
    };
}
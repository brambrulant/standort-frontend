import axios from "axios";
import {apiUrl} from "../../config/constants";

export const ADD_COMMENT = "ADD_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";

function addComment(data) {
    return {
        type: ADD_COMMENT,
        payload: data
    };
}

export const addCommentAction = (token, commentMessage, postId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${apiUrl}/addComment`,
                {
                    commentMessage: commentMessage,
                    postId: postId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            dispatch(addComment(response.data));

        } catch (e) {
            console.log(e);
        }
    }
}

function getCommentsForPost(data) {
    return {
        type: GET_COMMENTS,
        payload: data
    };
}

export const getComments = (postId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${apiUrl}/comments/${postId}`);
            dispatch(getCommentsForPost(response.data));
        } catch (e) {
            console.log(e);
        }
    }
}
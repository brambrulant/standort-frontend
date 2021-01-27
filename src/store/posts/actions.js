import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
export const SUBMIT_POST_SUCCESS = "SUBMIT_POST_SUCCESS";
export const DATA_RESPONSE = "DATA_RESPONSE";

export const submittedPost = (post) => ({
  type: SUBMIT_POST_SUCCESS,
  payload: post,
});

export const submitPost = (post) => async (dispatch, getState) => {
  // Validate Input here?

  const userToken = getState.user?.token;
  try {
    dispatch(setMessage("primary", true, "submitting post"));
    const response = await axios.post(`${apiUrl}/posts`, post);
    dispatch(submittedPost(response.data));
    dispatch(showMessageWithTimeout("success", true, "post submitted", 2500));
  } catch (e) {
    if (e.response && e.response.data.message) {
      console.log(`error submitting post: ${e.response.data.message}`);
      dispatch(showMessageWithTimeout("warning", true, `error: ${e.response.data.message}`));
    } else {
      console.log(`error submitting post: ${e}`);
      dispatch(showMessageWithTimeout("warning", true, `error: Unable to submit post`));
    }
  }
};

function setPostsWithData(data) {
  return {
    type: DATA_RESPONSE,
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
};

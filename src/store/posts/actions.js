import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
export const SUBMIT_POST_SUCCESS = "SUBMIT_POST_SUCCESS";
export const submittedPost = (post) => ({
  type: SUBMIT_POST_SUCCESS,
  payload: post,
});

export const submitPost = (post) => async (dispatch, getState) => {
  const userToken = getState.user?.token;

  try {
    dispatch(setMessage("primary", true, "submitting post"));
    await axios.post(apiUrl, post);

    dispatch(showMessageWithTimeout("success", true, "post submitted", 2500));
  } catch (e) {
    if (e.response && e.response.data.message) {
      console.log(`error submitting post: ${e.response.data.message}`);
      dispatch(showMessageWithTimeout("warning", true, `error: ${e.response.data.message}`));
    } else {
      console.log(`error submitting post: ${e.message}`);
      dispatch(showMessageWithTimeout("warning", true, `error: Unable to submit post`));
    }
  }
};

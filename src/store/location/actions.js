import axios from "axios";
import { ACCESS_KEY } from "../../config/constants";

export const SET_MY_LOCATION = "SET_MY_LOCATION";
export const LOCATION_FOUND = "LOCATION_FOUND";
export const LOCATION_NOT_FOUND = "LOCATION_NOT_FOUND";

function setMyLocality(data) {
  let locality;
  if (data.locality !== null) {
    locality = data.locality;
  } else if (data.region !== null) {
    locality = data.region;
  } else if (data.country !== null) {
    locality = data.country;
  } else
    return {
      type: LOCATION_NOT_FOUND,
    };
  return {
    type: SET_MY_LOCATION,
    payload: locality,
  };
}

export const getMyLocationName = (latitude, longitude) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://api.positionstack.com/v1/reverse?access_key=${ACCESS_KEY}&query=${latitude},${longitude}`
      );
      dispatch(setMyLocality(response.data.data[0]));
      setTimeout(() => dispatch({ type: LOCATION_FOUND }), 2000);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getLocationByString = (string) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${ACCESS_KEY}&query=${string}`
    );
    dispatch(setMyLocality(response.data.data[0]));
    setTimeout(() => dispatch({ type: LOCATION_FOUND }), 2000);
  } catch (e) {
    console.log(e.message);
  }
};

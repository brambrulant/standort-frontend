import axios from "axios";
import {ACCESS_KEY} from "../../config/constants";

export const SET_MY_LOCATION = "SET_MY_LOCATION";

function setMyLocality(data) {
    let locality;
    if (data.locality !== null) {
        locality = data.locality;
    } else if (data.region !== null) {
        locality = data.region;
    } else if (data.country !== null) {
        locality = data.country;
    }

    return {
        type: SET_MY_LOCATION,
        payload: locality
    };
}

export const getMyLocationName = (latitude, longitude) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://api.positionstack.com/v1/reverse?access_key=${ACCESS_KEY}&query=${latitude},${longitude}`);
            dispatch(setMyLocality(response.data.data[0]))

        } catch (error) {
            console.log(error.message);
        }
    };
};

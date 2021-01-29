import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";
// redux stuff
import {
  getMyLocationName,
  getLocationByString,
} from "../../store/location/actions";
import {
  selectLocationStatus,
  selectMyLocation,
} from "../../store/location/selector";
import gif from "../../cairns-loading.gif";

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "fixed",
    backgroundColor: "white",
  },
}));
const randomLoadingStatuses = [
  "Finding your location",
  "Tracking your location",
  "retasking national surveillance agents to current location",
  "Executing order 66",
];

export default function GetLocation() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [locationState, setLocationState] = useState({
    status: "idle",
    message: "",
  });
  // const locationStatus = useSelector(selectLocationStatus);
  const location = useSelector(selectMyLocation);

  function showMyLocation() {
    if (!navigator.geolocation) {
      setLocationState({
        status: "unsupported",
        message: "Sorry, Geolocation is not supported by your browser",
      });
    } else {
      setLocationState({ status: "loading", message: "Finding your location" });
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }

  useEffect(() => {
    // if (locationStatus === "Not Found")
    //   setLocationState({ status: "Not Found", message: "location not found" });
    if (!location) showMyLocation();
    else
      setLocationState({
        status: "success",
        message: `Welcome to ${location}`,
      });
  }, [location]);
  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`
        LOCATION FIND SUCCESSFULLY;
            latitude  : ${latitude},
            longitude : ${longitude}  
        `);

    dispatch(getMyLocationName(latitude, longitude));
  }

  function errorCallback(error) {
    setLocationState({
      status: "blocked",
      message: "Unable to retrieve your location",
    });
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }
  const SubmitOnEnter = (e) => {
    if (e.key === "Enter") {
      const city = e.target.value;
      setLocationState({ status: "loading", message: "Locating..." });
      dispatch(getLocationByString(city));
    }
  };

  return (
    <div className={classes.container}>
      <h1>{locationState.message}</h1>
      {locationState.status === "loading" && (
        <img src={gif} width="400px" height="400px" alt="Logo" />
      )}
      {(locationState.status === "blocked" ||
        locationState.status === "unsupported") && (
        <>
          <h3>allow location access in your website settings</h3>
          <h4>...Or search for your city</h4>
          <div>
            <LocationOnIcon />
            <TextField
              placeholder="Amsterdam"
              onKeyPress={SubmitOnEnter}
            ></TextField>
          </div>
        </>
      )}
    </div>
  );
}

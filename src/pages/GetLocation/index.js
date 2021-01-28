import { makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// redux stuff
import { getMyLocationName, getLocationByString } from "../../store/location/actions";

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

export default function GetLocation() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [locationState, setLocationState] = useState({ status: "idle", message: "" });

  function showMyLocation() {
    if (!navigator.geolocation) {
      setLocationState({
        status: "unsupported",
        message: "Sorry, Geolocation is not supported by your browser",
      });
    } else {
      setLocationState({ status: "loading", message: "Locating..." });
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }

  useEffect(() => {
    showMyLocation();
  }, []);
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
    setLocationState({ status: "blocked", message: "Unable to retrieve your location" });
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
      {(locationState.status === "blocked" || locationState.status === "unsupported") && (
        <>
          <h3>Please allow access to your location</h3>
          <h4>...Or search for your city</h4>
          <TextField placeholder="Amsterdam" onKeyPress={SubmitOnEnter}></TextField>
        </>
      )}
    </div>
  );
}

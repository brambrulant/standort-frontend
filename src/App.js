import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { selectLocationStatus } from "./store/location/selector";
import { getUserWithStoredToken } from "./store/user/actions";
import MainPage from "./pages/MainPage";

import GetLocation from "./pages/GetLocation";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const locationStatus = useSelector(selectLocationStatus);
  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  console.log("location status:", locationStatus);
  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      {!locationStatus && <GetLocation />}
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

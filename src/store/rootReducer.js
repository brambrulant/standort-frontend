import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import location from "./location/reducer";
import postByLocation from "./posts/reducer";

export default combineReducers({
  appState,
  user,
  location,
  postByLocation
});

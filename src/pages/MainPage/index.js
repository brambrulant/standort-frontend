import CreatePost from "../../components/CreatePost/CreatePost";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Paper } from "@material-ui/core";
import { getMyLocationName } from "../../store/location/actions";
import { selectMyLocation } from "../../store/location/selector";
import { fetchPostsWithMyLocation } from "../../store/posts/actions";
import { selectPosts } from "../../store/posts/selectors";
import Post from "./Post";

export default function MainPage() {
  const dispatch = useDispatch();

  // states
  const [buttonName, setButtonName] = useState("Show my location");
  const [CPVisibility, setCPVisibility] = useState(false); // CP = create post

  // redux selectors
  const location = useSelector(selectMyLocation);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    console.log("RENDER");
    if (location) {
      setButtonName(location);
      dispatch(fetchPostsWithMyLocation(location));
      console.log("POSTS", posts);
    }
  }, [location, dispatch]);

  function showMyLocation() {
    if (!navigator.geolocation) {
      setButtonName("Geolocation is not supported by your browser");
    } else {
      setButtonName("Locating...");
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }

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
    setButtonName("Unable to retrieve your location");
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }
  return (
    <div>
      <Button onClick={showMyLocation}>{buttonName}</Button>
      <div className="posts">
        {posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
      <Button onClick={() => setCPVisibility(true)}>Create Post</Button>
      <Modal open={CPVisibility} onClose={() => setCPVisibility(false)}>
        <CreatePost location={location} closeModal={() => setCPVisibility(false)} />
      </Modal>
    </div>
  );
}

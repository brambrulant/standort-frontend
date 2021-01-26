import CreatePost from "../../components/CreatePost";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button} from "@material-ui/core";
import {getMyLocationName} from "../../store/location/actions";
import {selectMyLocation} from "../../store/location/selector";
import {fetchPostsWithMyLocation} from "../../store/posts/actions";
import {selectPosts} from "../../store/posts/selecor";

export default function MainPage() {
  const dispatch = useDispatch();
  const [buttonName, setButtonName] = useState("Show my location");
  const location = useSelector(selectMyLocation);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    console.log("RENDER");
    if (location !== null) {
      setButtonName(location);
      dispatch(fetchPostsWithMyLocation(location));
      console.log("POSTS", posts);
    }
  },[location, dispatch, posts.length])

  function showMyLocation() {
    if (!navigator.geolocation) {
      setButtonName('Geolocation is not supported by your browser');
    } else {
      setButtonName('Locating...');
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
    setButtonName('Unable to retrieve your location');
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  return (
    <div>
      <Button onClick={showMyLocation}>{buttonName}</Button>
      {posts.map((post, index) =>
          <div key={index}>
            <h1>date: {post.post.createdAt}</h1>
            <h2>location: {post.post.location}</h2>
            <p>message {post.post.message}</p>
            <p>created by {post.post.user.name}</p>
            <p>{post.comments.length} comment: {post.comments.map((comment, index)=> <span key={index}>{comment.text}</span>)}</p>
          </div>)}
      <h4>Create Post</h4>
      <CreatePost />
    </div>
  );
}

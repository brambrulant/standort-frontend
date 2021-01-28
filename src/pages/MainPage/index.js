import CreatePost from "../../components/CreatePost/CreatePost";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, Paper } from "@material-ui/core";
import { getMyLocationName } from "../../store/location/actions";
import { selectMyLocation } from "../../store/location/selector";
import { fetchPostsWithMyLocation } from "../../store/posts/actions";
import { selectPosts } from "../../store/posts/selectors";
import Post from "./Post";
import "./index.css";

export default function MainPage() {
  const dispatch = useDispatch();

  // states
  const [CPVisibility, setCPVisibility] = useState(false); // CP = create post

  // redux selectors
  const location = useSelector(selectMyLocation);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    if (location) dispatch(fetchPostsWithMyLocation(location));
  }, [location, dispatch]);

  return (
    <div className="container">
      <h2>{location}</h2>
          <Button onClick={() => setCPVisibility(true)}>Create Post</Button>

      <div className="posts">
        <Grid container spacing={3}>
          {posts.length > 0 &&
            posts.map((post) => <Post key={post.id} post={post} />)}
        </Grid>
      </div>
      <div className="create-post">
        <h4>Create Post</h4>
        <CreatePost location={location} />
      </div>

      <Modal open={CPVisibility} onClose={() => setCPVisibility(false)}>
        <CreatePost location={location} closeModal={() => setCPVisibility(false)} />
      </Modal>
    </div>
  );
}

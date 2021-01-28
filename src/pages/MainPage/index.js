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
  const [CPVisibility, setCPVisibility] = useState(false); // CP = create post

  // redux selectors
  const location = useSelector(selectMyLocation);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPostsWithMyLocation(location));
  }, [location, dispatch]);

  return (
    <div>
      <h2>{location}</h2>
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

import CreatePost from "../../components/CreatePost/CreatePost";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, GridList, makeStyles, Modal } from "@material-ui/core";
import { selectMyLocation } from "../../store/location/selector";
import { fetchPostsWithMyLocation } from "../../store/posts/actions";
import { selectPosts } from "../../store/posts/selectors";
import Post from "./Post";
import "./index.css";
import { selectToken } from "../../store/user/selector";
import EditLocationIcon from "@material-ui/icons/EditLocation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "auto",
    height: "auto",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function MainPage() {
  const dispatch = useDispatch();

  // states
  const [CPVisibility, setCPVisibility] = useState(false); // CP = create post

  // redux selectors
  const location = useSelector(selectMyLocation);
  const posts = useSelector(selectPosts);
  const userToken = useSelector(selectToken);

  const classes = useStyles();

  useEffect(() => {
    if (location) dispatch(fetchPostsWithMyLocation(location));
  }, [location, dispatch]);

  return (
    <>
      <div className="container">
        <Button
          onClick={() => setCPVisibility(true)}
          disabled={!userToken}
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<EditLocationIcon />}
          style={{ width: "fit-content", margin: "20px auto 20px auto" }}
        >
          Leave your Mark
        </Button>
        <div className="posts">
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {posts.length > 0 &&
              posts.map((post) => <Post key={post.id} post={post} />)}
          </GridList>
        </div>
      </div>
      <Modal open={CPVisibility} onClose={() => setCPVisibility(false)}>
        <div>
          <CreatePost
            location={location}
            closeModal={() => setCPVisibility(false)}
          />
        </div>
      </Modal>
    </>
  );
}

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
import FilterByTag from "./FilterByTag";

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
  const [filterTags, setFilterTags] = useState([]);
  // redux selectors
  const location = useSelector(selectMyLocation);
  const posts = useSelector(selectPosts);
  const userToken = useSelector(selectToken);

  const classes = useStyles();

  useEffect(() => {
    if (posts.length < 1 && location) dispatch(fetchPostsWithMyLocation(location));
  }, [location, dispatch]);

  const filteredPostList =
    filterTags.length < 1
      ? posts
      : posts.filter((post) =>
          post.tags.reduce(
            (prevCheck, currentTag) => prevCheck || filterTags.includes(currentTag),
            false
          )
        );
  return (
    <>
      <div className="container">
        <div style={{ margin: "0 auto" }}>
          <FilterByTag {...{ filterTags, setFilterTags }} />
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
        </div>
        <div className="posts">
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {posts.length > 0 && filteredPostList.map((post) => <Post key={post.id} post={post} />)}
          </GridList>
        </div>
      </div>
      <Modal open={CPVisibility} onClose={() => setCPVisibility(false)}>
        <div>
          <CreatePost location={location} closeModal={() => setCPVisibility(false)} />
        </div>
      </Modal>
    </>
  );
}

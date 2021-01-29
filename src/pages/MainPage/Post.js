import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Grid,
  GridListTile,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ReadMoreReact from "read-more-react";
import React from "react";
import CommentSection from "./CommentSection";
import "./Post.css";
import tagList from "../../config/tags";
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

export default function Post({ post }) {
  const { comments, id, tags, createdAt } = post;
  const classes = useStyles();
  const cardStyle = {
    // display: "block",
    width: "350px",
    margin: "10px",
    // // height: "30vw",
    // overflow: "auto",
  };

  const tagChips = tags.map((tagName, i) => {
    const Icon = tagList.find((tag) => tag.name === tagName)?.Icon;
    return (
      <Chip
        color="primary"
        style={{ marginTop: "10px", marginBottom: "10px", marginRight: "10px" }}
        key={i}
        label={tagName}
        variant="default"
        icon={<Icon />}
        abcd="3px"
      ></Chip>
    );
  });

  return (
    <Card style={cardStyle}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" className="post-user-name">
            {post.title}
          </Typography>
          <div className="post-title">
            <Avatar className={classes.avatar} alt={post.user.name} src={post.user.profilePic} />
            <Typography gutterBottom variant="body2" component="p">
              {post.user.name}, {formatDistance(new Date(createdAt), new Date())} ago
            </Typography>
          </div>
          <Typography variant="body1" color="default" component="div">
            <ReadMoreReact text={post.message} readMoreText="read more..." />
          </Typography>
          {post.picture ? (
            <img
              src={post.picture}
              alt={`${post.name}`}
              style={{
                maxHeight: "200px",
                maxWidth: "200px",
                display: "block",
                borderRadius: "10px",
              }}
            />
          ) : null}
          {tagChips}
          <CardActions>
            <Grid>
              <CommentSection postId={id} comments={comments} alignSelf="flex-end" />
            </Grid>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

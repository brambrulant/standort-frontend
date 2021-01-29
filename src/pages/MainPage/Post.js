import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import CommentSection from "./CommentSection";
import ReactMarkdown from "react-markdown";
import tagList from "../../config/tags";

export default function Post({ post }) {
  const { comments, id, tags } = post;

  const cardStyle = {
    display: "block",
    width: "20vw",
    height: "30vw",
  };

  const tagChips = tags.map((tagName, i) => {
    const Icon = tagList.find((tag) => tag.name === tagName).Icon;
    return (
      <Chip
        color="primary"
        key={i}
        label={tagName}
        variant="default"
        // className={classes.chip}
        icon={<Icon />}
        abcd="3px"
      ></Chip>
    );
  });

  return (
    <Grid item xs>
      <Card style={cardStyle}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.user.name}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
              {post.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              <ReactMarkdown>{post.message}</ReactMarkdown>
            </Typography>
            {post.picture ? (
              <img
                src={post.picture}
                alt={`image of ${post.name}`}
                style={{
                  height: "200px",
                  width: "200px",
                }}
              />
            ) : null}
            {tagChips}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <CommentSection postId={id} comments={comments} />
        </CardActions>
      </Card>
    </Grid>
  );
}

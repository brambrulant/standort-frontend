import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import Comment from "./Comment";
import ReactMarkdown from "react-markdown";

export default function Post({ post }) {
  const { comments, id } = post;

  const cardStyle = {
    display: "block",
    width: "20vw",
    height: "30vw",
  };
  return (
    <Grid item xs>
      <Card style={cardStyle}>
        <CardActionArea>
          {post.image ? (
            <CardMedia image={post.image} title={`image of ${post.name}`} />
          ) : null}
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Comment id={id} comment={comments} />
        </CardActions>
      </Card>
    </Grid>
  );
}

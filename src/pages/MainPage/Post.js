import {Card, CardActionArea, CardActions, CardContent, Typography,} from "@material-ui/core";
import React from "react";
import Comment from "./Comment";
import ReactMarkdown from "react-markdown";

export default function Post({ post }) {
  const { comments, id } = post;
  return (
    <Card>
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
          {post.picture ? <img src={post.picture} alt={`image of ${post.name}`} style={{
            height: "200px",
            width: "200px"
          }}/> : null}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Comment id={id} comment={comments} />
      </CardActions>
    </Card>
  );
}

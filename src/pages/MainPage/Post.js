import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import Comment from "./Comment";
import ReactMarkdown from "react-markdown";

export default function Post({ post }) {
  // return (
  //   <div>
  //     <h1>date: {post.createdAt}</h1>
  //     <h2>location: {post.location}</h2>
  //     <p>message {post.message}</p>
  //     <p>created by {post.user}</p>
  //     {post.comments &&
  //       post.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
  //   </div>
  // );
  return (
    <Card>
      <CardActionArea>
        {post.image ? (
          <CardMedia image={post.image} title={`image of ${post.name}`} />
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.user}
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
        {/* <Button size="small" color="primary">
          {post.comments.length}
        </Button> */}
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}

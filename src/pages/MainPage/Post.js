import React from "react";
import Comment from "./Comment";

export default function Post({ post }) {
  return (
    <div>
      <h1>date: {post.createdAt}</h1>
      <h2>location: {post.location}</h2>
      <p>message {post.message}</p>
      <p>created by {post.user}</p>
      {post.comments &&
        post.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}

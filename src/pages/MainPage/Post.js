import React from "react";
import Comment from "./Comment";

export default function Post({ post }) {
    console.log("POST from POst component", post);
  return (
    <div>
      <h1>date: {post.post.createdAt}</h1>
      <h2>location: {post.post.location}</h2>
      <p>message {post.post.message}</p>
      <p>created by {post.post.user.name}</p>
      <Comment comment={post.comments} id={post.post.id}/>
    </div>
  );
}

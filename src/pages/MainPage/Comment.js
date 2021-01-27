import { Avatar, Button, ButtonGroup, Divider, Grid, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selector";
import { addCommentAction, getComments } from "../../store/comments/actions";
import { selectMyComment } from "../../store/comments/selector";

export default function Comment(props) {
  const defaultAvatarPicUrl =
    "data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTU1OGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBjMGZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjI1NiIgeDI9IjI1NiIgeTE9IjQ1MiIgeTI9IjkxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNhZGRjZmYiLz48c3RvcCBvZmZzZXQ9Ii41MDI4IiBzdG9wLWNvbG9yPSIjZWFmNmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWFmNmZmIi8+PC9saW5lYXJHcmFkaWVudD48Zz48Zz48Zz48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIGZpbGw9InVybCgjU1ZHSURfMV8pIiByPSIyNTYiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zMzEgMTY2YzAtNDEuMzU1LTMzLjY0NS03NS03NS03NXMtNzUgMzMuNjQ1LTc1IDc1IDMzLjY0NSA3NSA3NSA3NSA3NS0zMy42NDUgNzUtNzV6bS03NSA3NWMtNzQuNDM5IDAtMTM1IDYwLjU2MS0xMzUgMTM1djE0LjA1OGMwIDQuMjY0IDEuODE0IDguMzI2IDQuOTkgMTEuMTcxIDM2LjUzOCAzMi43NCA4Mi43MSA1MC43NzEgMTMwLjAxIDUwLjc3MSA0Ny4zMDEgMCA5My40NzMtMTguMDMxIDEzMC4wMS01MC43NzEgMy4xNzYtMi44NDUgNC45OS02LjkwOCA0Ljk5LTExLjE3MXYtMTQuMDU4YzAtNzQuNDM5LTYwLjU2MS0xMzUtMTM1LTEzNXoiIGZpbGw9InVybCgjU1ZHSURfMl8pIi8+PC9nPjwvZz48L2c+PC9zdmc+";
  const [openComments, setCommentsToOpen] = useState(false);
  const [openAddComment, setAddCommentsToOpen] = useState(false);
  const [newCommentValue, setNewCommentValue] = useState(" ");
  const [newCommentsLength, setNewCommentsLength] = useState(-1);
  const comments = props.comment;
  const postId = props.id;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const commentsForPost = useSelector(selectMyComment);

  const length = comments && comments.length;
  if (!comments || comments.length === 0) return <p>no comments</p>;

  function openListOfComments() {
    setCommentsToOpen(!openComments);
    setAddCommentsToOpen(false);
    dispatch(getComments(postId));
    console.log("commentsForPost", commentsForPost);
  }

  function addComment() {
    setAddCommentsToOpen(!openAddComment);
    setCommentsToOpen(false);
  }

  function handleSubmitNewComment(postId) {
    dispatch(addCommentAction(user.token, newCommentValue.trim(), postId));
    setNewCommentValue(" ");
    setAddCommentsToOpen(false);

    if (newCommentsLength === -1) {
      setNewCommentsLength(length + 1);
    } else {
      setNewCommentsLength(newCommentsLength + 1);
    }
  }

  return (
    <>
      <p>{length > newCommentsLength ? length : newCommentsLength} comment</p>
      <ButtonGroup disableElevation variant="outlined" color="primary">
        <Button onClick={() => openListOfComments(postId)} disabled={length === 0}>
          see comments
        </Button>
        <Button onClick={addComment} disabled={user.token === null}>
          Add comment
        </Button>
      </ButtonGroup>
      {openComments ? (
        <Paper style={{ padding: "40px 20px" }}>
          {commentsForPost?.map((comment, index) => (
            <div key={index}>
              {index !== 0 ? <Divider variant="fullWidth" style={{ margin: "30px 0" }} /> : null}
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      comment.user.profilePic === null
                        ? defaultAvatarPicUrl
                        : comment.user.profilePic
                    }
                  />
                </Grid>
                <Grid justifycontent="left" item xs zeroMinWidth>
                  <h4
                    style={{
                      margin: 0,
                      textAlign: "left",
                    }}
                  >
                    {comment.text}
                  </h4>
                  <p
                    style={{
                      textAlign: "left",
                      color: "gray",
                    }}
                  >
                    posted: {comment.createdAt.split("T", 1)}
                    <br />
                    created by: {comment.user.name}
                  </p>
                </Grid>
              </Grid>
            </div>
          ))}
        </Paper>
      ) : null}
      {openAddComment ? (
        <div>
          <h1>Add comment to post</h1>
          <TextField
            id="outlined-multiline-static"
            label="Place your comment here and press Submit! button"
            error={newCommentValue.length === 0}
            helperText={newCommentValue.length === 0 ? "You comment could not be empty." : ""}
            multiline
            required
            rows={4}
            fullWidth
            value={newCommentValue}
            variant="outlined"
            onChange={(event) => setNewCommentValue(event.target.value)}
          />
          <div>
            <Button
              onClick={() => handleSubmitNewComment(postId)}
              variant="contained"
              color="primary"
            >
              Submit!
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

import { Button, ButtonGroup, Grid, Card, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selector";
import { addCommentAction, getComments } from "../../store/comments/actions";
import { selectMyComment } from "../../store/comments/selector";
import Comment from "./Comment";

export default function CommentSection({ comments, postId }) {
  const [openComments, setCommentsToOpen] = useState(false);
  const [openAddComment, setAddCommentsToOpen] = useState(false);
  const [newCommentValue, setNewCommentValue] = useState(" ");
  const [newCommentsLength, setNewCommentsLength] = useState(-1);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const commentsForPost = useSelector(selectMyComment);

  const length = comments ? comments.length : 0;

  function openListOfComments() {
    setCommentsToOpen(!openComments);
    setAddCommentsToOpen(false);
    dispatch(getComments(postId));
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

  const cardStyle = {
    display: "block",
    width: "20vw",
    height: "3vw",
    color: "grey",
  };

  return (
    <div className="comments">
      <ButtonGroup disableElevation variant="outlined" color="primary">
        <Button
          onClick={() => openListOfComments(postId)}
          disabled={length === 0 && newCommentsLength === -1}
        >
          {length > newCommentsLength ? length : newCommentsLength} comments
        </Button>
        <Button onClick={addComment} disabled={user.token === null}>
          Add comment
        </Button>
      </ButtonGroup>
      {openComments ? (
        <Card style={cardStyle}>
          {commentsForPost?.map((comment, index) => (
            <Comment comment={comment} index={index} />
          ))}
        </Card>
      ) : null}
      {openAddComment ? (
        <div className="comment">
          <Grid>
            <TextField
              id="outlined-multiline-static"
              label="Place your comment here and press Submit! button"
              error={newCommentValue.length === 0}
              helperText={newCommentValue.length === 0 ? "You comment could not be empty." : ""}
              multiline
              required
              rows={4}
              width="1vw"
              value={newCommentValue}
              variant="outlined"
              onChange={(event) => setNewCommentValue(event.target.value)}
            />
            <div>
              <Button fullWidth="true" onClick={() => handleSubmitNewComment(postId)}>
                Submit!
              </Button>
            </div>
          </Grid>
        </div>
      ) : null}
    </div>
  );
}

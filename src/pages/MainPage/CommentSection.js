import {Button, ButtonGroup, Grid, Paper, TextField} from "@material-ui/core";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/user/selector";
import {addCommentAction, getComments} from "../../store/comments/actions";
import {selectMyComment} from "../../store/comments/selector";
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
    setNewCommentValue(" ");
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

  const SubmitOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmitNewComment(postId);
    }
  };

  return (
    <div className="comment">
      {openComments ? (
        <Paper style={{ maxHeight: 200, overflow: "auto" }}>
          {commentsForPost?.map((comment, index) => (
            <Comment comment={comment} index={index} />
          ))}
        </Paper>
      ) : null}
      {openAddComment ? (
        <div className="comment">
          <Grid container justify="center" margin="20px" spacing={1}>
            <TextField
              id="outlined-multiline-static"
              label="My comment"
              margin="normal"
              error={newCommentValue.length === 0}
              helperText={newCommentValue.length === 0 ? "Your comment cannot be empty." : ""}
              multiline
              required
              rows={1}
              width="1vw"
              value={newCommentValue}
              variant="outlined"
              onChange={(event) => setNewCommentValue(event.target.value)}
              onKeyPress={SubmitOnEnter}
            />
            <Button onClick={() => handleSubmitNewComment(postId)} color="primary" style={{
              height: 'fit-content',
              marginLeft: '5px',
              alignSelf: 'center'
            }}>submit</Button>
          </Grid>
        </div>
      ) : null}
      <ButtonGroup disableElevation variant="outlined" color="default" size="small" style={{marginLeft: "-7px"}}>
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
    </div>
  );
}

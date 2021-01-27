import {Avatar, Button, Divider, Grid, Paper} from "@material-ui/core";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/user/selector";

export default function Comment(props) {
    const defaultAvatarPicUrl = "data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTU1OGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBjMGZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjI1NiIgeDI9IjI1NiIgeTE9IjQ1MiIgeTI9IjkxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNhZGRjZmYiLz48c3RvcCBvZmZzZXQ9Ii41MDI4IiBzdG9wLWNvbG9yPSIjZWFmNmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWFmNmZmIi8+PC9saW5lYXJHcmFkaWVudD48Zz48Zz48Zz48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIGZpbGw9InVybCgjU1ZHSURfMV8pIiByPSIyNTYiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zMzEgMTY2YzAtNDEuMzU1LTMzLjY0NS03NS03NS03NXMtNzUgMzMuNjQ1LTc1IDc1IDMzLjY0NSA3NSA3NSA3NSA3NS0zMy42NDUgNzUtNzV6bS03NSA3NWMtNzQuNDM5IDAtMTM1IDYwLjU2MS0xMzUgMTM1djE0LjA1OGMwIDQuMjY0IDEuODE0IDguMzI2IDQuOTkgMTEuMTcxIDM2LjUzOCAzMi43NCA4Mi43MSA1MC43NzEgMTMwLjAxIDUwLjc3MSA0Ny4zMDEgMCA5My40NzMtMTguMDMxIDEzMC4wMS01MC43NzEgMy4xNzYtMi44NDUgNC45OS02LjkwOCA0Ljk5LTExLjE3MXYtMTQuMDU4YzAtNzQuNDM5LTYwLjU2MS0xMzUtMTM1LTEzNXoiIGZpbGw9InVybCgjU1ZHSURfMl8pIi8+PC9nPjwvZz48L2c+PC9zdmc+"
    const [openComment, setCommentsToOpen] = useState(false);
    const comments = props.comment;
    const postId = props.id;
    const user = useSelector(selectUser);
    console.log("comments from Comment component", comments);

    const length = comments && comments.length;
    if (!comments || comments.length === 0) return <p>no comments</p>;

    function openComments() {
        setCommentsToOpen(!openComment);
    }

    function addComment(postId) {
        console.log("USER WANT TO COMMENT! USER:", user);
        console.log("USER WANT TO COMMENT! POST ID:", postId);

    }

    return (
        <>
            <p>{length} comment</p>
            <Button onClick={openComments} disabled={length === 0}>see comments</Button>
            {openComment
             ? <Paper style={{ padding: "40px 20px" }}>
                 {comments.map((comment, index) => (
                     <Grid key={index} container wrap="nowrap" spacing={2}>
                         <Grid item>
                             <Avatar alt="Remy Sharp" src={comment.user.profilePic === null ? defaultAvatarPicUrl : comment.user.profilePic} />
                         </Grid>
                         <Grid justifycontent="left" item xs zeroMinWidth>
                             <h4 style={{ margin: 0, textAlign: "left" }}>{comment.text}</h4>
                             <p style={{ textAlign: "left", color: "gray" }}>
                                 posted: {comment.createdAt.split("T", 1)}
                                 <br/>
                                 created by: {comment.user.name}
                             </p>
                         </Grid>
                         {index > 0
                          ? <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                          : null}
                     </Grid>
                 ))}
             </Paper>
             : null
            }
            <Button onClick={() => addComment(postId)}>Add comment</Button>
        </>
    );
}

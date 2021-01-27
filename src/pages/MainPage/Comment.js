import {Avatar, Button, Divider, Grid, Paper} from "@material-ui/core";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/user/selector";

export default function Comment(props) {
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
                             <Avatar alt="Remy Sharp" src={comment.user.profilePic} />
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

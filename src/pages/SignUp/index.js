import React, {useEffect, useState} from "react";
import {signUp} from "../../store/user/actions";
import {selectToken} from "../../store/user/selector";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Avatar, Button, Container, Fab, Grid, TextField, Typography,} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "../../components/Loading";
import AddPhoto from "../../components/AddPhoto";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const history = useHistory();

    useEffect(() => {
        if (token !== null) {
            history.push("/");
        }
    }, [token, history]);

    function submitForm(event) {
        event.preventDefault();

        console.log("PROFILE PIC", profilePic)

        dispatch(signUp(name, email, password, profilePic));

        setEmail("");
        setPassword("");
        setName("");
    }

    const handleProfilePicture = (profilePictureUrl) => {
        setProfilePic(profilePictureUrl);
    }

    return (
        <Container>
            <form
                md={{
                    span: 6,
                    offset: 3
                }}
                className="mt-5"
                noValidate
                autoComplete="off"
            >
                <Typography variant="h2" gutterBottom>
                    signup
                </Typography>
                <Grid>
                    <Typography variant="body1" gutterBottom>
                        name
                    </Typography>
                    <TextField
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        placeholder="Enter name"
                        required
                    />
                </Grid>
                <Grid>
                    <Typography variant="body1" gutterBottom>
                        email
                    </Typography>
                    <TextField
                        id="standard-basic-email"
                        placeholder="Enter password"
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        value={email}
                    />
                </Grid>
                <Grid>
                    <Typography variant="body1" gutterBottom>
                        password
                    </Typography>
                    <TextField
                        id="standard-basic-password"
                        placeholder="Enter password"
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        value={password}
                    />
                </Grid>

                <AddPhoto onProfilePictureUpd={handleProfilePicture} buttonName="add profile picture" rounded={true}/>

                <Grid>
                    <Button type="submit" onClick={submitForm}>
                        sign up
                    </Button>
                    <Button>
                        <Link to="/login">log in</Link>
                    </Button>
                </Grid>
                <Grid></Grid>
            </form>
        </Container>
    );
}

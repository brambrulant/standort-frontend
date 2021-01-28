import React, {useEffect, useState} from "react";
import {signUp} from "../../store/user/actions";
import {selectToken} from "../../store/user/selector";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Avatar, Button, Container, Fab, Grid, TextField, Typography,} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "../../components/Loading";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const APIBaseURL = "https://api.cloudinary.com/v1_1/ddqvaheia";
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [loadingProfilePicture, setLoadingProfilePicture] = useState(false);

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

        dispatch(signUp(name, email, password, profilePictureUrl));

        setEmail("");
        setPassword("");
        setName("");
    }

    async function uploadImage(e) {
        const file = e.target.files;
        const data = new FormData()
        data.append("file", file[0])
        data.append('upload_preset', "standort");
        setLoadingProfilePicture(true)

        fetch(`${APIBaseURL}/image/upload`, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then((data) => {
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;
                    console.log(uploadedFileUrl);
                    setProfilePictureUrl(uploadedFileUrl)
                }
            }).then(() => setLoadingProfilePicture(false))
            .catch(err => console.error(err));
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
                <Grid style={{
                    marginTop: "30px",
                    marginBottom: "30px"
                }}>
                    <label htmlFor="upload-photo">
                        <input
                            style={{display: "none"}}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={uploadImage}
                        />
                        <Fab
                            color="primary"
                            size="small"
                            component="span"
                            aria-label="add"
                            variant="extended"
                            style={{padding: '10px'}}
                        >
                            <AddIcon style={{marginRight: '10px'}}/> Upload photo
                        </Fab>
                    </label>

                    <Typography variant="body1" gutterBottom>
                        add profile picture
                    </Typography>

                    {loadingProfilePicture
                     ? <Loading/>
                     : profilePictureUrl !== ""
                       ? <div style={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}>
                           <Avatar style={{
                               width: '150px',
                               height: '150px'
                           }}
                                   alt={name}
                                   src={profilePictureUrl}
                           />
                       </div>
                       : null
                    }
                </Grid>
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

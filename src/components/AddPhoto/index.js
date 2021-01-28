import {Avatar, Fab, Grid, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "../Loading";
import React, {useState} from "react";

export default function AddPhoto(props) {
    const APIBaseURL = "https://api.cloudinary.com/v1_1/ddqvaheia";
    const folderName = "standort"
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [loadingProfilePicture, setLoadingProfilePicture] = useState(false);

    const buttonName = props.buttonName;
    const rounded = props.rounded;

    async function uploadImage(e) {
        const file = e.target.files;
        const data = new FormData()
        data.append("file", file[0])
        data.append('upload_preset', folderName);
        setLoadingProfilePicture(true);

        fetch(`${APIBaseURL}/image/upload`, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then((data) => {
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;
                    setProfilePictureUrl(uploadedFileUrl);
                    props.onProfilePictureUpd(uploadedFileUrl);

                    console.log(`UPLOAD_TO_CLOUDINARY_SUCCESSFULLY. URL:${uploadedFileUrl}`);
                }
            }).then(() => setLoadingProfilePicture(false))
            .catch(err => console.error(err));
    }

    return (
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
                    <AddIcon style={{marginRight: '10px'}}/>
                    {buttonName}
                </Fab>
            </label>

            {loadingProfilePicture
             ? <Loading/>
             : profilePictureUrl !== ""
               ? <div style={{
                        marginTop: "30px",
                        marginBottom: "30px"
                    }}>
                   {rounded
                    ? <Avatar style={{
                       width: '150px',
                       height: '150px'
                   }}
                           alt="photo"
                           src={profilePictureUrl}
                   />
                   : <img src={profilePictureUrl} alt="photo" style={{
                           width: '150px',
                           height: '150px'
                       }}/>}
               </div>
               : null
            }
        </Grid>
    )
}
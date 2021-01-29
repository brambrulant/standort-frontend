import React, { useState } from "react";
import { convertToRaw } from "draft-js";
import {
  TextField,
  Button,
  createMuiTheme,
  MuiThemeProvider,
  Chip,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { submitPost } from "../../store/posts/actions";
import MUIRichTextEditor from "mui-rte";
import tags from "../../config/tags";
import TagDropdown from "./TagDropdown";
import { draftToMarkdown } from "markdown-draft-js";
import AddPhoto from "../AddPhoto";
const theme = createMuiTheme();

// root, container, editor, and editorContainer
Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        minHeight: "150px",
        width: "100%",
        border: "1px solid grey",
        borderRadius: "8px",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "10%",
    left: "30%",
  },
  tagRow: {},
  chip: {
    marginLeft: "5px",
  },
}));

export default function CreatePost({ location = "The-Abysss", closeModal }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    tags: [],
  });
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  // input listeners
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const handleContentChange = (EditorState) => {
    setContent(EditorState.getCurrentContent());
  };

  const toggleTag = (tag) => {
    const tagNames = state.tags.map((tag) => tag.name);

    if (tagNames.includes(tag.name))
      return setState({
        ...state,
        tags: state.tags.filter((anotherTag) => tag.name !== anotherTag.name),
      });
    if (tagNames.length > 2) return;
    setState({ ...state, tags: [...state.tags, tag] });
  };
  const submit = () => {
    // Convert from Draft.js ContentState object into a markdown string
    const RawContentObject = convertToRaw(content);
    const markdownString = draftToMarkdown(RawContentObject);
    dispatch(
      submitPost({
        title: state.title,
        tags: state.tags.map((tag) => tag.name),
        message: markdownString,
        location,
        picture: picture,
      })
    );
    closeModal();
  };
  const remaningTags = tags.filter((tag) => !state.tags.map((tag) => tag.name).includes(tag.name));
  const selectedTags = state.tags.map((tag, i) => {
    const { Icon, name } = tag;
    return (
      <Chip
        color="primary"
        key={i}
        label={name}
        onDelete={() => toggleTag(tag)}
        variant="default"
        className={classes.chip}
        icon={<Icon />} // create
        abcd="3px"
      ></Chip>
    );
  });
  //  https://www.npmjs.com/package/mui-rte
  //  decide on toolbar controls
  // values are: "title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear", "save".

  const handleProfilePicture = (profilePictureUrl) => {
    console.log(profilePictureUrl);
    setPicture(profilePictureUrl);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">Create a post</Typography>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-Title"
          label="title"
          name="title"
          value={state.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <MuiThemeProvider theme={theme}>
          <MUIRichTextEditor
            label="Start typing..."
            toolbarButtonSize="small" // | "medium"
            controls={["link", "title", "italic", "bold"]}
            onChange={handleContentChange}
          />
        </MuiThemeProvider>
        <div className={classes.tagRow}>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              {tags && <TagDropdown tags={remaningTags} addTag={toggleTag} />}
            </div>
            <div>{selectedTags}</div>
          </div>
          <AddPhoto
            onProfilePictureUpd={handleProfilePicture}
            buttonName="add photo the post"
            rounded={false}
          />

          <Button onClick={submit} variant="contained">
            Post
          </Button>
        </div>
      </form>
    </Paper>
  );
}

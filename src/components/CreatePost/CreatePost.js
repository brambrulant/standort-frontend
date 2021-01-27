import React, { useState } from "react";
import { convertToRaw } from "draft-js";
import {
  TextField,
  Button,
  createMuiTheme,
  MuiThemeProvider,
  Chip,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { submitPost } from "../../store/posts/actions";
import MUIRichTextEditor from "mui-rte";
import { tags } from "../../config/constants";
import TagDropdown from "./TagDropdown";
import { draftToMarkdown } from "markdown-draft-js";
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

export default function CreateAPost({ location = "The-Abysss" }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    tags: [],
    location: location,
  });
  const [content, setContent] = useState("");
  // input listeners
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const handleContentChange = (EditorState) => {
    setContent(EditorState.getCurrentContent());
  };

  const toggleTag = (tag) => {
    state.tags.includes(tag)
      ? setState({ ...state, tags: state.tags.filter((atag) => tag !== atag) })
      : setState({ ...state, tags: [...state.tags, tag] });
  };
  const submit = () => {
    // Convert from Draft.js ContentState object into a markdown string
    const RawContentObject = convertToRaw(content);
    const markdownString = draftToMarkdown(RawContentObject);
    dispatch(submitPost({ ...state, message: markdownString }));
    console.log(markdownString);
  };
  const remaningTags = tags.filter((tag) => !state.tags.includes(tag));
  const selectedTags = state.tags.map((tag, i) => (
    <Chip
      color="primary"
      key={i}
      label={tag}
      onDelete={() => toggleTag(tag)}
      variant="default"
      className="tagChip"
      icon={null} // create
      size="small"
    ></Chip>
  ));
  //  https://www.npmjs.com/package/mui-rte
  //  decide on toolbar controls
  // values are: "title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear", "save".
  return (
    <form
      style={styles.form}
      className={"post-form"}
      noValidate
      autoComplete="off"
    >
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
      <div style={styles.addTagsRow}>
        {tags && <TagDropdown tags={remaningTags} addTag={toggleTag} />}
        {selectedTags}
        <Button onClick={submit} variant="contained" style={styles.post}>
          Post
        </Button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "30vw",
    height: "10vh",
  },
  textField: {
    marginLeft: "0px",
  },
  addTagsRow: {},
  post: {},
};

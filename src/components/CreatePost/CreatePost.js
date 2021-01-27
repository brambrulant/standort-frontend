import React, { useState } from "react";
import { TextField, Button, createMuiTheme, MuiThemeProvider, Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { submitPost } from "../../store/posts/actions";
import MUIRichTextEditor from "mui-rte";
import { tags } from "../../config/constants";
import TagDropdown from "./TagDropdown";
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
    message: "",
    tags: [],
    location: location,
  });

  // input listeners
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const toggleTag = (tag) => {
    state.tags.includes(tag)
      ? setState({ ...state, tags: state.tags.filter((atag) => tag !== atag) })
      : setState({ ...state, tags: [...state.tags, tag] });
  };
  const submit = () => dispatch(submitPost(state));
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
      size="small" // || "medium"
    ></Chip>
  ));
  //  https://www.npmjs.com/package/mui-rte
  //  decide on toolbar controls
  // values are: "title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear", "save".
  return (
    <form style={styles.form} className={"post-form"} noValidate autoComplete="off">
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
          // controls={string[]}
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

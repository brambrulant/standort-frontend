import React, { useState } from "react";
import { TextField, Button, createMuiTheme, MuiThemeProvider, Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { submitPost } from "../store/posts/actions";
import MUIRichTextEditor from "mui-rte";
import { tags } from "../config/constants";
const theme = createMuiTheme();

// root, container, editor, and editorContainer
Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        // width: "45%",
        minHeight: "150px",
        minWidth: "400px",
        border: "1px solid grey",
        borderRadius: "8px",
      },
    },
  },
});

export default function CreateAPost() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    message: "",
    tags: [],
    location: "",
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
  const tagButtonlist = tags.map((tag, i) => (
    <Chip
      color={state.tags.includes(tag) ? "primary" : "default"}
      key={i}
      label={tag}
      onClick={() => toggleTag(tag)}
      variant="default"
      className="tagChip"
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
        {tagButtonlist}
        <Button onClick={submit} variant="contained">
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
};

import { useState } from "react";
import { TextField, Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { submitPost } from "../../store/posts/actions";
import MUIRichTextEditor from "mui-rte";
const theme = createMuiTheme();

// root, container, editor, and editorContainer
Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: "45%",
        height: "20vh",
        border: "1px solid grey",
        borderRadius: "20px",
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
  const submit = () => dispatch(submitPost(state));
  /* when we implement tags
  const tags = useSelector((state) => state.tags)
  const tagSelectionlist = tags.map((tag) => (
    <Button variant="outlined" className={classes.tag}>
      {tag}
    </Button>
  )); 
  */
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
      {/* {tagList} */}
      <Button onClick={submit} variant="contained">
        Post
      </Button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: "0px",
  },
};

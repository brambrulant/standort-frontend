import React, { useState, useEffect } from "react";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    dispatch(signUp(name, email, password));

    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <Container>
      <form
        md={{ span: 6, offset: 3 }}
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
            id="standard-basic"
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
            id="standard-basic"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            type="email"
            value={password}
          />
        </Grid>
        <Grid>
          <Button variant="primary" type="submit" onClick={submitForm}>
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

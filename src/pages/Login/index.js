import React, { useState, useEffect } from "react";
import { login } from "../../store/user/actions";
import { selectToken } from "../../store/user/selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

export default function Login() {
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
    console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <Container>
      <form
        md={{ span: 6, offset: 3 }}
        className="mt-5"
        noValidate
        autoComplete="off"
      >
        <Typography variant="h2" component="h2" gutterBottom>
          login
        </Typography>
        <Grid>
          <TextField
            id="standard-basic"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
        </Grid>
        <Grid>
          <Button variant="primary" type="submit" onClick={submitForm}>
            Log in
          </Button>
          <Button>
            <Link to="/signup">Sign up</Link>
          </Button>
        </Grid>
        <Grid></Grid>
      </form>
    </Container>
  );
}

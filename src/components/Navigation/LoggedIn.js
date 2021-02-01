import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Nav from "react-bootstrap/Nav";
import { Button } from "@material-ui/core";
import { selectMyLocation } from "../../store/location/selector";
import locationpng from "../../iconLocation.png";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const location = useSelector(selectMyLocation);
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>
        <img src={locationpng} alt="Logo" width="24vw" height="24vw" />
        {location}
      </Nav.Item>
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}

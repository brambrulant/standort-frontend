import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selector";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { selectMyLocation } from "../../store/location/selector";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Typography } from "@material-ui/core";

export default function Navigation() {
  const token = useSelector(selectToken);
  const location = useSelector(selectMyLocation);
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        CAIRNS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <Nav.Item>
            <Typography variant="h6" component="span">
              <LocationOnIcon />
              {location}
            </Typography>
          </Nav.Item>
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

import { Button } from "@material-ui/core";
import React from "react";
import NavbarItem from "./NavbarItem";
import locationpng from "../../iconLocation.png";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectMyLocation } from "../../store/location/selector";

export default function LoggedOut() {
  const location = useSelector(selectMyLocation);

  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>
        <img src={locationpng} alt="Logo" width="24vw" height="24vw" />
        {location}
      </Nav.Item>
      <Button>
        <NavbarItem path="/login" linkText="Login" />
      </Button>
    </>
  );
}

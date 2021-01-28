import { Button } from "@material-ui/core";
import React from "react";
import NavbarItem from "./NavbarItem";

export default function LoggedOut() {
  return (
    <>
      <Button>
        <NavbarItem path="/login" linkText="Login" />
      </Button>
    </>
  );
}

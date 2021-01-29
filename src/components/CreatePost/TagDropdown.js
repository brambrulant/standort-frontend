import { Fab, ListItemText, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

export default function TagDropdown({ tags, addTag }) {
  const [anchorElement, setAnchorElement] = useState();
  const handleMenuClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleTagClick = (tag) => {
    addTag(tag);
    handleClose();
  };

  return (
    <>
      <Fab
        size="small"
        component="span"
        aria-label="add"
        variant="extended"
        style={{ padding: "10px" }}
        onClick={handleMenuClick}
      >
        <AddIcon style={{ marginRight: "10px" }} />
        add tags
      </Fab>
      <Menu
        id="customized-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {tags.map((tag, i) => (
          <MenuItem key={i} onClick={() => handleTagClick(tag)}>
            <ListItemText primary={tag.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

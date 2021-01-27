import { MenuItem, Menu, Chip, ListItemText } from "@material-ui/core";
import { useState } from "react";

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
      <Chip
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="default"
        color="default"
        label="add tags"
        onClick={handleMenuClick}
        size="small"
      ></Chip>
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
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

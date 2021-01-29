import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useState } from "react";
import tagsList from "../../config/tags";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterByTag({ filterTags, setFilterTags }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setFilterTags(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="mutiple-chip-label">Filter By Tags</InputLabel>
      <Select
        labelId="mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={filterTags}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} color="primary" className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {tagsList.map((tag, i) => (
          <MenuItem key={i} value={tag.name}>
            {tag.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

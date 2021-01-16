import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default function SearchBar() {
  const [name, setName] = useState("");
  const [tagList, setTagList] = useState("");
  const dispatch = useDispatch();
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
  ];

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
      />
    </div>
  );
}

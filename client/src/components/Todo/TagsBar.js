import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

function useLoadTags(state) {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/v1/tags`)
      .then((res) => {
        dispatch({
          type: ACTIONS.LOAD_TAGS,
          payload: {
            tags: res.data,
          },
        });
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return state.tags;
}

export default function TagsBar() {
  const tags = useSelector(useLoadTags);
  useEffect(() => {
    console.log("SERVER_EVENT: tag list changed");
  }, [tags]);

  return (
    <div>
      <ol>
        Tags
        {tags.map((tag) => (
          <li>
            <p>{tag.name}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

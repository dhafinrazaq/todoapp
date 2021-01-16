import React, { useState, useEffect } from "react";
import axios from "axios";
import { ACTIONS } from "../../redux";
import { useSelector, useDispatch } from "react-redux";

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

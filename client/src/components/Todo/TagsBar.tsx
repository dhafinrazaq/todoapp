import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/todos";
import {ITodo, ITag, IState} from "../../types/interfaces"

export default function TagsBar() {
  const tags: ITag[] = useSelector((state: IState) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTags());
    console.log("SERVER_EVENT: tag list changed");
  }, [dispatch]);

  return (
    <div>
      <ol>
        Tags
        <li>
          <p
            onClick={() => {
              dispatch(actions.getTodos());
            }}
          >
            All
          </p>
        </li>
        {tags.map((tag) => (
          <li>
            <p
              onClick={() => {
                dispatch(actions.getTodoWithTag(tag));
              }}
            >
              {tag.name}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

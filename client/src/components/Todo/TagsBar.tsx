import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/todos";
import {ITodo, ITag, IState} from "../../types/interfaces"
import { Button, Row, Col } from "reactstrap";

export default function TagsBar() {
  const tags: ITag[] = useSelector((state: IState) => state.todo.tags);
  const todos: ITodo[] = useSelector((state: IState) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTags());
    console.log("SERVER_EVENT: tag list changed");
  }, [dispatch, todos]);

  return (
    <div>
      <ul>
        Tags
        <li>
          <Button color="link"
            onClick={() => {
              dispatch(actions.getTodos());
            }}
          >
            All
          </Button>
        </li>
        {tags.map((tag) => (
          <li>
            <Button color="link"
              onClick={() => {
                dispatch(actions.getTodoWithTag(tag));
              }}
            >
              {tag.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

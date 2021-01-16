import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import TodoForm from "./TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../redux";
import qs from "qs";
import "./style.css";
import TagsBar from "./TagsBar";
import * as actions from "../../actions/todos";

const updateTodo = (todo) => {
  const updatedTodo = {
    ...todo,
    isCompleted: !todo.isCompleted,
  };

  return updatedTodo;
};

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleCheck = (e, todo) => {
    e.preventDefault();
    const updatedTodo = updateTodo(todo);
    dispatch(actions.markTodo(updatedTodo));
  };

  useEffect(() => {
    console.log("SERVER_EVENT: todo list changed");
    dispatch(actions.getTodos());
  }, [dispatch]);

  return (
    <div>
      <TagsBar></TagsBar>
      <TodoForm></TodoForm>
      <ol>
        Uncategorized
        {todos.map((todo) => (
          <li>
            <Button
              color="primary"
              size="sm"
              onClick={(e) => handleCheck(e, todo)}
            ></Button>
            <span className={todo.isCompleted ? "completed-todo" : ""}>
              {" "}
              {todo.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

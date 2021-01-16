import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import TodoForm from "./TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../redux";
import qs from "qs";
import "./style.css";
import TagsBar from "./TagsBar";
import { getTodos } from "../../actions/todos";

function useMarkDispatcher() {
  const dispatch = useDispatch();

  return (updatedTodo) => {
    console.log(updatedTodo);
    axios
      .put(
        `/api/v1/todos/${updatedTodo.id}`,
        qs.stringify({ todo: updatedTodo })
      )
      .then((res) => {
        dispatch({
          type: ACTIONS.UPDATE_TODO,
          payload: {
            todo: res.data,
          },
        });
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  };
}

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
  const markDispatcher = useMarkDispatcher();

  useEffect(() => {
    console.log("SERVER_EVENT: todo list changed");
    dispatch(getTodos());
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
              onClick={(e) => {
                e.preventDefault();
                const updatedTodo = updateTodo(todo);
                markDispatcher(updatedTodo);
              }}
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

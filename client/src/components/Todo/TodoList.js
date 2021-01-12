import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../redux";

function useLoadTodos(state) {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/v1/todos`)
      .then((res) => {
        dispatch({
          type: ACTIONS.LOAD_TODOS,
          payload: {
            todos: res.data,
          },
        });
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return state.todos;
}

export default function TodoList() {
  const todos = useSelector(useLoadTodos);

  useEffect(() => {
    console.log("SERVER_EVENT: todo list changed");
    console.log(todos);
  }, [todos]);

  return (
    <div>
      <TodoForm></TodoForm>
      <ol>
        {todos.map((todo) => (
          <li>
            <Link to={{ pathname: "/todos/" + todo.id }}>{todo.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

import React from "react";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import "./style.css";
import * as actions from "../../actions/todos";
import { Trash, Check, CheckFilled } from "../Icons/Icons";
import { ITodo } from "../../types/interfaces";
import { Link } from "react-router-dom";

const updateTodo = (todo: ITodo) => {
  const updatedTodo = {
    ...todo,
    isCompleted: !todo.isCompleted,
  };

  return updatedTodo;
};

interface Props {
  todo: ITodo;
}

export const Todo: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  const handleCheck = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: ITodo
  ) => {
    e.preventDefault();
    const updatedTodo = updateTodo(todo);
    dispatch(actions.markTodo(updatedTodo));
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: ITodo
  ) => {
    e.preventDefault();
    dispatch(actions.deleteTodo(todo));
  };

  return (
    <div className="todo-card">
      <Button
        color="link"
        style={{ color: "green" }}
        onClick={(e) => handleCheck(e, todo)}
      >
        {todo.isCompleted ? <CheckFilled></CheckFilled> : <Check></Check>}
      </Button>
      <Button
        color="link"
        style={{ color: "red" }}
        onClick={(e) => handleDelete(e, todo)}
      >
        <Trash></Trash>
      </Button>
      <Link
        to={{ pathname: `/todos/${todo.id}` }}
        className={todo.isCompleted ? "completed-todo" : ""}
      >
        {" "}
        {todo.name}{" "}
      </Link>
    </div>
  );
};

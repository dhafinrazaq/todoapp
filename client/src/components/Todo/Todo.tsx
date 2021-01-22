import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import TodoForm from "./TodoForm";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import TagsBar from "./TagsBar";
import * as actions from "../../actions/todos";
import {Trash, Check} from "../Icons/Icons"
import {ITodo, ITag, IState} from "../../types/interfaces"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

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

export const Todo: React.FC<Props> = ({todo}) => {
  const dispatch = useDispatch();

  const handleCheck = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: ITodo) => {
    e.preventDefault();
    const updatedTodo = updateTodo(todo);
    dispatch(actions.markTodo(updatedTodo));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: ITodo) => {
    e.preventDefault();
    dispatch(actions.deleteTodo(todo));
  };

  return (
    <div className="todo-card">
                <Button
                    color="primary"
                    size="sm"
                    onClick={(e) => handleCheck(e, todo)}
                ><Check></Check></Button>
                <Button
                    color="danger"
                    size="sm"
                    onClick={(e) => handleDelete(e, todo)}
                ><Trash></Trash>
                </Button>
                <span className={todo.isCompleted ? "completed-todo" : ""}>
                    {" "}
                    {todo.name}
                </span>
    </div>
        
  );
}

import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table } from "reactstrap";
import TodoForm from "./TodoForm";
import {Todo} from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import TagsBar from "./TagsBar";
import * as actions from "../../actions/todos";
import {ITodo, ITag, IState} from "../../types/interfaces"
import SearchBar from "./SearchBar"

const updateTodo = (todo: ITodo) => {
  const updatedTodo = {
    ...todo,
    isCompleted: !todo.isCompleted,
  };

  return updatedTodo;
};

export default function TodoList() {
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector((state: IState) => state.todo.todos);
  const tagName: string = useSelector((state: IState) => state.todo.tag);

  const handleCheck = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: ITodo) => {
    e.preventDefault();
    const updatedTodo = updateTodo(todo);
    dispatch(actions.markTodo(updatedTodo));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: ITodo) => {
    e.preventDefault();
    dispatch(actions.deleteTodo(todo));
  };

  useEffect(() => {
    console.log("SERVER_EVENT: todo list changed");
    dispatch(actions.getTodos());
  }, [dispatch]);

  return (
    <div>
      
      <Row>
        <Col md={2}>
          <TagsBar></TagsBar>
        </Col>
        <Col md={9}>
          <TodoForm></TodoForm>
          <h3 className="text-center">{tagName}</h3>
            {
            todos.map((todo: ITodo) => (
              <Todo todo={todo}></Todo>
            ))}
        </Col>
      </Row>
    </div>
  );
}

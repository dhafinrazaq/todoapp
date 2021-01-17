import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import TodoForm from "./TodoForm";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import TagsBar from "./TagsBar";
import * as actions from "../../actions/todos";
import {ITodo, ITag, IState} from "../../types/interfaces"

const updateTodo = (todo: ITodo) => {
  const updatedTodo = {
    ...todo,
    isCompleted: !todo.isCompleted,
  };

  return updatedTodo;
};

export default function TodoList() {
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector((state: IState) => state.todos);
  const tagName: string = useSelector((state: IState) => state.tag);

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
          {tagName}
          <ol>
            {
            todos.map((todo: ITodo) => (
              <li>
                <Button
                  color="primary"
                  size="sm"
                  onClick={(e) => handleCheck(e, todo)}
                ></Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={(e) => handleDelete(e, todo)}
                ></Button>
                <span className={todo.isCompleted ? "completed-todo" : ""}>
                  {" "}
                  {todo.name}
                </span>
              </li>
            ))}
          </ol>
        </Col>
      </Row>
    </div>
  );
}

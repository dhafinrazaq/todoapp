import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import TodoForm from "./TodoForm";
import { Todo } from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import TagsBar from "./TagsBar";
import * as actions from "../../actions/todos";
import { ITodo, IState } from "../../types/interfaces";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector((state: IState) => state.todo.todos);
  const tagName: string = useSelector((state: IState) => state.todo.tag);

  useEffect(() => {
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
          {todos.map((todo: ITodo) => (
            <Todo todo={todo} key={todo.id}></Todo>
          ))}
        </Col>
      </Row>
    </div>
  );
}

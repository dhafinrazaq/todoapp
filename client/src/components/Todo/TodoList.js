import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";

export class TodoList extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get(`/api/v1/todos`)
      .then((res) => this.setState({ todos: res.data }));
  }

  render() {
    return (
      <div>
        <TodoForm></TodoForm>
        {this.state.todos.map((todo) => (
          <Link to={{ pathname: "/todos/" + todo.id }}>{todo.name}</Link>
        ))}
      </div>
    );
  }
}

export default TodoList;

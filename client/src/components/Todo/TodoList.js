import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class TodoList extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/v1/todos`)
      .then((res) => this.setState({ todos: res.data }));
  }

  render() {
    return (
      <div>
        {this.state.todos.map((todo) => (
          <Link to={{ pathname: "/todos/" + todo.id }}>{todo.name}</Link>
        ))}
      </div>
    );
  }
}

export default TodoList;

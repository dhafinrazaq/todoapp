import React, { Component } from "react";
import axios from "axios";

export class TodoList extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    // console.log("hello");
    axios
      .get(`http://localhost:5000/api/v1/todos`)
      .then((res) => this.setState({ todos: res.data }));
  }

  render() {
    return (
      <div>
        {this.state.todos.map((todo) => (
          <div>{todo.name}</div>
        ))}
      </div>
    );
  }
}

export default TodoList;

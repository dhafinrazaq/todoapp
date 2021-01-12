import React, { Component } from "react";
import axios from "axios";

export class TodoList extends Component {
  state = {
    todo: [],
  };

  componentDidMount() {
    axios
      .get(`/api/v1/todos/${this.props.todoId}`)
      .then((res) => this.setState({ todo: res.data }));
  }

  render() {
    return <div>{this.state.todo.name}</div>;
  }
}

export default TodoList;

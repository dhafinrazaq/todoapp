import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import qs from "qs";

export class TodoForm extends Component {
  state = {
    name: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      name: this.state.name,
    };

    axios.post(`/api/v1/todos`, qs.stringify({ todo: newTodo }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Todo name"
              onChange={this.onChange}
            ></Input>
            <Button color="primary" style={{ marginTop: "2rem" }} block>
              Add todo
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default TodoForm;

import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../../redux";

export default function TodoForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      name: name,
    };

    axios.post(`/api/v1/todos`, qs.stringify({ todo: newTodo }));
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Todo name"
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Button color="primary" style={{ marginTop: "2rem" }} block>
            Add todo
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}

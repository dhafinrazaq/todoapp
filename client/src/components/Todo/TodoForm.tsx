import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import * as actions from "../../actions/todos";

export default function TodoForm() {
  const [name, setName] = useState("");
  const [tagList, setTagList] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      name: name,
      isCompleted: false,
      tag_list: tagList,
    };

    dispatch(actions.addTodo(newTodo));

    setName("");
    setTagList("");
  };

  return (
    <div>
      <Form
        className="todo-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <FormGroup>
          <Label>Name</Label>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Assignment 2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Tags</Label>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="homework, CS2040S"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTagList(e.target.value)
            }
          ></Input>
        </FormGroup>
        <Button color="primary" style={{ marginTop: "2rem" }} block>
          Add todo
        </Button>
      </Form>
    </div>
  );
}

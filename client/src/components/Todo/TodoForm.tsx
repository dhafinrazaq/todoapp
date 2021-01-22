import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {ITodo, ITag, IState} from "../../types/interfaces"
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
  };

  return (
    <div>
      <Form className="todo-form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <FormGroup>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Todo name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Tags list"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagList(e.target.value)}
          ></Input>
        </FormGroup>
        <Button color="primary" style={{ marginTop: "2rem" }} block>
          Add todo
        </Button>
      </Form>
    </div>
  );
}

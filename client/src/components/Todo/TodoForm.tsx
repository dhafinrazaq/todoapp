import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import {ITodo, ITag, IState} from "../../types/interfaces"

export default function TodoForm() {
  const [name, setName] = useState("");
  const [tagList, setTagList] = useState("");
  const dispatch = useDispatch();

  const addTodo = (newTodo: ITodo) => {
    axios
      .post(`/api/v1/todos`, qs.stringify({ todo: newTodo }), { headers: { Authorization: localStorage.token } })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ACTIONS.ADD_TODO,
          payload: {
            todo: res.data,
          },
        });
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      name: name,
      isCompleted: false,
      tag_list: tagList,
    };

    addTodo(newTodo);
  };

  return (
    <div>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
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

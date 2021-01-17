import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import {IUser} from "../../types/interfaces"

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const addUser = (newUser: IUser) => {
    axios
      .post(`/api/v1/signup`, qs.stringify({ user: newUser }))
      .then((res) => {
        localStorage.setItem("token", res.data.jwt)
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    addUser(newUser);
  };

  return (
    <div>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <FormGroup>
          <Input
            required
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Input
            required
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Input
            required
            type="text"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          ></Input>
        </FormGroup>
        <Button color="primary" style={{ marginTop: "2rem" }} block>
          Register
        </Button>
      </Form>
    </div>
  );
}

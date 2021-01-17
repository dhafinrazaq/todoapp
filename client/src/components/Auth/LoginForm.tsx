import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import {IUser} from "../../types/interfaces"

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const getJwtToken = (user: IUser) => {
    axios
      .post(`/api/v1/login`, qs.stringify({ user: user }))
      .then((res) => {
        localStorage.setItem("token", res.data.jwt)
        console.log(res.data);
        console.log(localStorage.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    getJwtToken(user);
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

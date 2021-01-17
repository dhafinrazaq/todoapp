import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {IUser} from "../../types/interfaces"
import * as actions from "../../actions/users";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    dispatch(actions.addUser(newUser));
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

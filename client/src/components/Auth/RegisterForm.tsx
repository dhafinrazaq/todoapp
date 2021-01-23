import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/users";
import { IState } from "../../types/interfaces";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerErrorMsg = useSelector((state: IState) => state.auth.registerErrorMsg);
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
      <h3 className="text-center">Register</h3>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <FormGroup>
          <Input
            required
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          ></Input>
        </FormGroup>
        <FormGroup>
          <Input
            required
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          ></Input>
        </FormGroup>

        <FormGroup>
          <Input
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          ></Input>
        </FormGroup>
        <Button color="primary" style={{ marginTop: "2rem" }} block>
          Register
        </Button>
      </Form>
      <br></br>
      <p className="text-danger">{registerErrorMsg}</p>
    </div>
  );
}

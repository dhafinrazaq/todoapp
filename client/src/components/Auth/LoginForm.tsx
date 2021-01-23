import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/users";
import { IState } from "../../types/interfaces";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginErrorMsg = useSelector((state: IState) => state.auth.loginErrorMsg);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    dispatch(actions.getJwtToken(user));
  };

  return (
    <div>
      <h3 className="text-center">Login</h3>
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
          Login
        </Button>
      </Form>
      <br></br>
      <p className="text-danger">{loginErrorMsg}</p>

    </div>
  );
}

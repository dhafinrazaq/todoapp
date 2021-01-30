import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { useEffect } from "react";
import { Container } from "reactstrap";
import TodoList from "./components/Todo/TodoList";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import AppNavbar from "./components/Home/AppNavbar";
import { useDispatch } from "react-redux";
import * as actions from "./actions/users";
import TodoUpdateForm from "./components/Todo/TodoUpdateForm";
import { isAuth } from "./utils/authUtils";
import PageNotFound from "./components/Home/PageNotFound"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("SERVER_EVENT: auth-ing");
    dispatch(actions.auth());
  }, [dispatch]);

  return (
    <Router>
      <AppNavbar></AppNavbar>
      <Container>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => (
              <React.Fragment>
                <LoginForm></LoginForm>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <React.Fragment>
                <RegisterForm></RegisterForm>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/"
            render={(props) =>
              isAuth(localStorage) ? (
                <TodoList></TodoList>
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/todos/:id"
            render={(props) =>
              isAuth(localStorage) ? (
                <TodoUpdateForm id={props.match.params.id}></TodoUpdateForm>
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />

          <Route
            component={PageNotFound}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

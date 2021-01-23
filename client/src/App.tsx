import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { Container } from "reactstrap";
import TodoList from "./components/Todo/TodoList";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import AppNavbar from "./components/Home/AppNavbar";
import { useDispatch } from "react-redux";
import * as actions from "./actions/users";
import TodoUpdateForm from "./components/Todo/TodoUpdateForm";

function App() {
  const dispatch = useDispatch();
  function isAuth(): boolean {
    const loggedIn =
      typeof localStorage.token != "undefined" &&
      localStorage.token !== null &&
      localStorage.token !== "" &&
      localStorage.token !== "undefined";
    if (loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    console.log("SERVER_EVENT: auth-ing");
    dispatch(actions.auth());
  }, [dispatch]);

  return (
    <Router>
      <AppNavbar></AppNavbar>
      <Container>
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
            isAuth() ? (
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
            isAuth() ? (
              <TodoUpdateForm id={props.match.params.id}></TodoUpdateForm>
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
      </Container>
    </Router>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import { Container } from "reactstrap";
import TodoList from "./components/Todo/TodoList";
import RegisterForm from "./components/Auth/RegisterForm";

function App() {
  return (
    <Router>
      <Container>
        <Route
          exact
          path="/"
          render={(props) => (
            <React.Fragment>
              <TodoList></TodoList>
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
      </Container>
    </Router>
  );
}

export default App;

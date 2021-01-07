import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import { Container } from "reactstrap";
import TodoList from "./components/Todo/TodoList";
import Todo from "./components/Todo/Todo";

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
          path="/todos/:todoId"
          render={(props) => (
            <React.Fragment>
              <Todo todoId={props.match.params.todoId}></Todo>
            </React.Fragment>
          )}
        />
      </Container>
    </Router>
  );
}

export default App;

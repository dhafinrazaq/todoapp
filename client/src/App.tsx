import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Component, useEffect } from "react";
import { Container } from "reactstrap";
import TodoList from "./components/Todo/TodoList";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import AppNavbar from "./components/Home/AppNavbar";
import { useSelector, useDispatch } from "react-redux";
import {IState} from "./types/interfaces"
import * as actions from "./actions/users";

function App() {
  const dispatch = useDispatch();
  const isAuth: boolean = localStorage.token !== null && localStorage.token !== "";

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
          render={(props) => isAuth ? (
              <TodoList></TodoList>
              ) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> 
          }
        /> 
        
      </Container>
    </Router>
  );
}

export default App;

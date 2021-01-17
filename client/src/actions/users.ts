import { ACTIONS as TYPES } from "../redux";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../redux";
import { ITodo, ITag } from "../types/interfaces";
import { IUser } from "../types/interfaces";

export const getJwtToken = (user: IUser) => (dispatch: Function) => {
  axios
    .post(`/api/v1/login`, qs.stringify({ user: user }))
    .then((res) => {
      localStorage.setItem("token", res.data.jwt);
      console.log(res.data);
      console.log(localStorage.token);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addUser = (newUser: IUser) => (dispatch: Function) => {
  axios
    .post(`/api/v1/signup`, qs.stringify({ user: newUser }))
    .then((res) => {
      localStorage.setItem("token", res.data.jwt);
      console.log(localStorage.token);
    })
    .catch((error) => {
      console.log(error);
    });
};

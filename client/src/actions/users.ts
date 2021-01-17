import axios from "axios";
import qs from "qs";
import { IUser } from "../types/interfaces";
import * as types from "../actions/types";

export const getJwtToken = (user: IUser) => (dispatch: Function) => {
  axios
    .post(`/api/v1/login`, qs.stringify({ user: user }))
    .then((res) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: {
          jwt: res.data.jwt,
        },
      });
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
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: {
          jwt: res.data.jwt,
        },
      });
      localStorage.setItem("token", res.data.jwt);
      console.log(localStorage.token);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => (dispatch: Function) => {
  localStorage.setItem("token", "");
};

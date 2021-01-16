import { ACTIONS as TYPES } from "../redux";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../redux";

export const getTodos = () => (dispatch) => {
  axios
    .get(`/api/v1/todos`)
    .then((res) => {
      dispatch({
        type: TYPES.LOAD_TODOS,
        payload: {
          todos: res.data,
        },
      });
    })
    .catch((err) => console.log(err));
};

export const markTodo = (updatedTodo) => (dispatch) => {
  axios
    .put(`/api/v1/todos/${updatedTodo.id}`, qs.stringify({ todo: updatedTodo }))
    .then((res) => {
      dispatch({
        type: ACTIONS.UPDATE_TODO,
        payload: {
          todo: res.data,
        },
      });
      console.log("success");
    })
    .catch((error) => {
      console.log("error");
    });
};

export const getTags = () => (dispatch) => {
  axios
    .get(`/api/v1/tags`)
    .then((res) => {
      dispatch({
        type: ACTIONS.LOAD_TAGS,
        payload: {
          tags: res.data,
        },
      });
      console.log("success");
    })
    .catch((error) => {
      console.log("error");
    });
};

export const getTodoWithTag = (tag) => (dispatch) => {
  axios
    .get(`/api/v1/todos/tag/${tag.name}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.LOAD_TODOS,
        payload: {
          todos: res.data,
        },
      });
      console.log("success");
    })
    .catch((error) => {
      console.log("error");
    });
};

import { ACTIONS as TYPES } from "../redux";
import axios from "axios";
import qs from "qs";
import { ACTIONS } from "../redux";
import { ITodo, ITag } from "../types/interfaces";

export const getTodos = () => (dispatch: Function) => {
  axios
    .get(`/api/v1/todos`, { headers: { Authorization: localStorage.token } })
    .then((res) => {
      dispatch({
        type: TYPES.LOAD_TODOS,
        payload: {
          todos: res.data,
          tag: "All",
        },
      });
    })
    .catch((err) => console.log(err));
};

export const markTodo = (updatedTodo: ITodo) => (dispatch: Function) => {
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

export const deleteTodo = (todo: ITodo) => (dispatch: Function) => {
  axios
    .delete(`/api/v1/todos/${todo.id}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.DELETE_TODO,
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

export const getTags = () => (dispatch: Function) => {
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

export const getTodoWithTag = (tag: ITag) => (dispatch: Function) => {
  axios
    .get(`/api/v1/todos/tag/${tag.name}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.LOAD_TODOS,
        payload: {
          todos: res.data,
          tag: tag.name,
        },
      });
      console.log("success");
    })
    .catch((error) => {
      console.log("error");
    });
};

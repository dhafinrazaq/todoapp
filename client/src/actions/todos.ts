import * as types from "../actions/types";
import axios from "axios";
import qs from "qs";
import { ITodo, ITag } from "../types/interfaces";

export const getTodos = () => (dispatch: Function) => {
  axios
    .get(`/api/v1/todos`, { headers: { Authorization: localStorage.token } })
    .then((res) => {
      dispatch({
        type: types.LOAD_TODOS,
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
    .put(
      `/api/v1/todos/${updatedTodo.id}`,
      qs.stringify({ todo: updatedTodo }),
      { headers: { Authorization: localStorage.token } }
    )
    .then((res) => {
      dispatch({
        type: types.UPDATE_TODO,
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
    .delete(`/api/v1/todos/${todo.id}`, {
      headers: { Authorization: localStorage.token },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_TODO,
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
    .get(`/api/v1/tags`, { headers: { Authorization: localStorage.token } })
    .then((res) => {
      dispatch({
        type: types.LOAD_TAGS,
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
    .get(`/api/v1/todos/tag/${tag.name}`, {
      headers: { Authorization: localStorage.token },
    })
    .then((res) => {
      dispatch({
        type: types.LOAD_TODOS,
        payload: {
          todos: res.data,
          tag: tag.name,
        },
      });
      console.log("success");
      console.log(res.data);
    })
    .catch((error) => {
      console.log("error");
    });
};

export const addTodo = (newTodo: ITodo) => (dispatch: Function) => {
  axios
    .post(`/api/v1/todos`, qs.stringify({ todo: newTodo }), {
      headers: { Authorization: localStorage.token },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: types.ADD_TODO,
        payload: {
          todo: res.data,
        },
      });
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTodo = (id: number) => (dispatch: Function) => {
  axios
    .get(`/api/v1/todos/${id}`, {
      headers: { Authorization: localStorage.token },
    })
    .then((res) => {
      dispatch({
        type: types.LOAD_TODO,
        payload: {
          todo: res.data,
        },
      });
    })
    .catch((err) => console.log(err));
};

export const editTodo = (id: number, newTodo: ITodo) => (
  dispatch: Function
) => {
  axios
    .put(`/api/v1/todos/${id}`, qs.stringify({ todo: newTodo }), {
      headers: { Authorization: localStorage.token },
    })
    .then((res) => {
      console.log(res.data);
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
};

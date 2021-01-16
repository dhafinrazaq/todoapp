import { ACTIONS as TYPES } from "../redux";
import axios from "axios";

export const getTodos = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/todos`);
    dispatch({
      type: TYPES.LOAD_TODOS,
      payload: {
        todos: res.data,
      },
    });
  } catch (error) {
    console.log("error");
  }
};

import { createStore } from "redux";

export const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  LOAD_TODOS: "LOAD_TODOS",
  LOAD_TODO: "LOAD_TODO",
};

const initialState = {
  todos: [],
  todo: {},
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      const { todo } = action.payload;

      return {
        ...state,
        todos: state.todos.push(todo),
      };

    case ACTIONS.LOAD_TODOS:
      const { todos } = action.payload;

      return {
        ...state,
        todos,
      };

    default:
      return state;
  }
}

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(todoReducer, enableReduxDevTools);
  return store;
}

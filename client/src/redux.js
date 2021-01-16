import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  LOAD_TODOS: "LOAD_TODOS",
  LOAD_TODO: "LOAD_TODO",
  LOAD_TAGS: "LOAD_TAGS",
  DELETE_TODO: "DELETE_TODO",
};

const initialState = {
  todos: [],
  todo: {},
  tags: [],
  tag: "All",
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      const { todo } = action.payload;

      return {
        ...state,
        todos: [...state.todos, todo],
      };
    }

    case ACTIONS.UPDATE_TODO: {
      const { todo } = action.payload;

      return {
        ...state,
        todos: [
          ...state.todos.filter((prevTodo) => prevTodo.id !== todo.id),
          todo,
        ],
      };
    }

    case ACTIONS.LOAD_TODOS: {
      const { todos, tag } = action.payload;

      return {
        ...state,
        tag,
        todos,
      };
    }

    case ACTIONS.LOAD_TAGS: {
      const { tags } = action.payload;

      return {
        ...state,
        tags,
      };
    }

    case ACTIONS.DELETE_TODO: {
      const { todo } = action.payload;

      return {
        ...state,
        todos: [...state.todos.filter((prevTodo) => prevTodo.id !== todo.id)],
      };
    }

    default:
      return state;
  }
}

const middleware = [thunk];

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(
    todoReducer,
    compose(applyMiddleware(...middleware), enableReduxDevTools)
  );
  return store;
}

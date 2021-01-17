import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {IAction, ITodo, IState} from "./types/interfaces"

export const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  LOAD_TODOS: "LOAD_TODOS",
  LOAD_TODO: "LOAD_TODO",
  LOAD_TAGS: "LOAD_TAGS",
  DELETE_TODO: "DELETE_TODO",
};

const initialState : IState = {
  todos: [],
  todo: undefined,
  tags: [],
  tag: "All",
};

function todoReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      const { todo } = action.payload;

      return {
        ...state,
        todos: [...state.todos, todo],
      };
    }

    case ACTIONS.UPDATE_TODO: {
      const { todo }: {todo: ITodo} = action.payload;

      return {
        ...state,
        todos: [
          ...state.todos.filter((prevTodo: ITodo) => prevTodo.id !== todo.id),
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

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createReduxStore() {
  const store = createStore(
    todoReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}

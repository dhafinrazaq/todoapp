import { IAction, ITodo, ITodoState } from "../types/interfaces";
import * as types from "../actions/types";

const initialState: ITodoState = {
  todos: [],
  todo: undefined,
  tags: [],
  tag: "All",
};

export default function todoReducers(state = initialState, action: IAction) {
  switch (action.type) {
    case types.ADD_TODO: {
      const { todo } = action.payload;

      if (todo.tag.name === state.tag) {
        return {
          ...state,
          todos: [...state.todos, todo],
        };
      }
      return {
        ...state,
        todos: [...state.todos],
      };
    }

    case types.UPDATE_TODO: {
      const { todo }: { todo: ITodo } = action.payload;

      return {
        ...state,
        todos: [
          ...state.todos.filter((prevTodo: ITodo) => prevTodo.id !== todo.id),
          todo,
        ],
      };
    }

    case types.LOAD_TODOS: {
      const { todos, tag } = action.payload;

      return {
        ...state,
        tag,
        todos,
      };
    }

    case types.LOAD_TAGS: {
      const { tags } = action.payload;

      return {
        ...state,
        tags,
      };
    }

    case types.DELETE_TODO: {
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

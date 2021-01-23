import { IAction, IAuthState } from "../types/interfaces";
import * as types from "../actions/types";

const initialState: IAuthState = {
  username: "",
  isAuth: false,
  token: "",
  loginErrorMsg: "",
  registerErrorMsg: "",
};

export default function authReducers(state = initialState, action: IAction) {
  switch (action.type) {
    case types.REGISTER_SUCCESS: {
      const { jwt }: { jwt: string } = action.payload;

      return {
        ...state,
        isAuth: true,
        token: jwt,
      };
    }

    case types.LOGIN_SUCCESS: {
      const { jwt }: { jwt: string } = action.payload;

      return {
        ...state,
        isAuth: true,
        token: jwt,
      };
    }

    case types.LOGIN_ERROR: {
      const { msg }: { msg: string } = action.payload;

      return {
        ...state,
        loginErrorMsg: msg,
      };
    }

    case types.REGISTER_ERROR: {
      const { msg }: { msg: string } = action.payload;

      return {
        ...state,
        registerErrorMsg: msg,
      };
    }

    default:
      return state;
  }
}

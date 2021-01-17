import { IAction, IAuthState } from "../types/interfaces";
import * as types from "../actions/types";

const initialState: IAuthState = {
  username: "",
  isAuth: false,
  token: "",
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

    default:
      return state;
  }
}

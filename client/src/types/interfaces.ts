export interface ITodo {
  id?: number;
  name: string;
  isCompleted: boolean;
  tags?: ITag[];
}

export interface ITag {
  id?: number;
  name: string;
}

export interface ITodoState {
  todos: ITodo[];
  todo: ITodo | undefined;
  tags: ITag[];
  tag: string;
}

export interface IAuthState {
  username: string;
  isAuth: boolean;
  token: string;
}

export interface IState {
  todo: ITodoState;
  auth: IAuthState;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IUser {
  username: string;
  password: string;
  email?: string;
}

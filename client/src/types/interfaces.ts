export interface ITodo {
  id?: number;
  name: string;
  isCompleted: boolean;
}

export interface ITag {
  id?: number;
  name: string;
}

export interface IState {
  todos: ITodo[];
  todo: ITodo | undefined;
  tags: ITag[];
  tag: string;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IUser {
  username: string;
  password: string;
  email: string;
}

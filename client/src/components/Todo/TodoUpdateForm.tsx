import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {ITodo, ITag, IState} from "../../types/interfaces"
import * as actions from "../../actions/todos";

interface Props {
  id: number;
}

const TodoUpdateForm: React.FC<Props> = ({id}) => {
  const todo = useSelector((state: IState) => state.todo.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("SERVER_EVENT: todo changed");
    dispatch(actions.getTodo(id));
  }, [dispatch]);

  // const [name, setName] = useState(todo.name);
  // const [tagList, setTagList] = useState(todo.);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const newTodo = {
  //     name: name,
  //     isCompleted: false,
  //     tag_list: tagList,
  //   };

  //   dispatch(actions.editTodo(newTodo));
  // };

  return (
    <div>
      {/* <Form className="todo-form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <FormGroup>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Todo name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Tags list"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagList(e.target.value)}
          ></Input>
        </FormGroup>
        <Button color="primary" style={{ marginTop: "2rem" }} block>
          Add todo
        </Button>
      </Form> */}
      {todo ? todo.name : ""}
    </div>
  );
}


export default TodoUpdateForm;
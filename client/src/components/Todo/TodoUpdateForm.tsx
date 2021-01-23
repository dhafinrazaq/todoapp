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



  const [name, setName] = useState(todo ? todo.name : "");
  const [tagList, setTagList] = useState(todo && todo.tags ? todo.tags.map(tag => tag.name).toString() : "");

  useEffect(() => {
    setName(todo ? todo.name : name);
    setTagList(todo && todo.tags ? todo.tags.map(tag => tag.name).toString() : tagList);
  }, [todo, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      name: name,
      isCompleted: false,
      tag_list: tagList,
    };

    dispatch(actions.editTodo(id, newTodo));
  };

  return (
    <div>
      <Form className="todo-form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <FormGroup>
          <Input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Todo name"
            defaultValue={name}
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
            defaultValue={tagList}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagList(e.target.value)}
          ></Input>
        </FormGroup>
        <Button color="primary" style={{ marginTop: "2rem" }} block>
          Update and Go Back To Homepage
        </Button>
      </Form>
    </div>
  );
}


export default TodoUpdateForm;
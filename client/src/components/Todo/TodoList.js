import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../redux";

async function loadTodos() {
  const response = await axios.get(`/api/v1/todos`);
  return response.data;
}

function useLoadTodos(state) {
  const dispatch = useDispatch();

  useEffect(() => {
    loadTodos()
      .then((data) => {
        console.log(data);
        dispatch({
          type: ACTIONS.LOAD_TODOS,
          payload: {
            todos: data,
          },
        });
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return state.todos;
}

export default function TodoList() {
  const todos = useSelector(useLoadTodos);

  useEffect(() => {
    console.log("SERVER_EVENT: todo list changed");
  }, [todos]);

  return (
    <div>
      <TodoForm></TodoForm>
      <ol>
        {todos.map((todo) => (
          <li>
            <Link to={{ pathname: "/todos/" + todo.id }}>{todo.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

// export class TodoList extends Component {
//   state = {
//     todos: [],
//   };

//   componentDidMount() {
//     axios
//       .get(`/api/v1/todos`)
//       .then((res) => this.setState({ todos: res.data }));
//   }

//   render() {
//     return (
//       <div>
//         <TodoForm></TodoForm>
//         {this.state.todos.map((todo) => (
//           <Link to={{ pathname: "/todos/" + todo.id }}>{todo.name}</Link>
//         ))}
//       </div>
//     );
//   }
// }

// export default TodoList;

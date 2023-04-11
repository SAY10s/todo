import { useState } from "react";
import NewTodo from "../components/NewTodo";
import Todos from "../components/Todos";
import Todo from "../models/todo";
import Classes from "./tasksLayout.module.css";

const TasksLayout: React.FC<{
  title: string;
  deleteLayoutHandler: (title: string) => void;
}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prevState) => {
      return prevState.concat(newTodo);
    });
  };

  const deleteTodoHandler = (test: string) => {
    setTodos((prevState) => {
      let newList = prevState.filter((element) => element.id !== test);
      return newList;
    });
  };

  const getTodoHandler = () => {
    let formData = new FormData();
    formData.append("tableName", props.title);
    fetch(
      "http://localhost/projectsXAMPP/todo_backend/php/files/todo/getTodo.php",
      { method: "POST", body: formData }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTodos(
          data.map(
            (element: {
              id: number;
              title: string;
              belongsToTable: string;
            }) => {
              return new Todo(element.title);
            }
          )
        );
      });
  };
  getTodoHandler();

  return (
    <div className={Classes.taskLayoutWrapper}>
      <h2>{props.title}</h2>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} onDeleteTodo={deleteTodoHandler} />
      <button
        onClick={() => {
          props.deleteLayoutHandler(props.title);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TasksLayout;

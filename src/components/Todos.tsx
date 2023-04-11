import React from "react";
import Todo from "../models/todo";
import TodoUI from "./TodoUI";
import Classes from "./CSS/Todos.module.css";

const Todos: React.FC<{
  items: Todo[];
  onDeleteTodo: (toDoId: number) => void;
}> = (props) => {
  return (
    <ul className={Classes.todos}>
      {props.items.map((item) => (
        <TodoUI
          key={item.id}
          id={item.id}
          text={item.text}
          onDeleteTodo={props.onDeleteTodo}
          // 434. bind żeby nie musieć łapać z dołu id, tylko już tutaj
        />
      ))}
    </ul>
  );
};
export default Todos;

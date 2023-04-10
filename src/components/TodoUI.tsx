import Classes from "./CSS/TodoItem.module.css";

const ToDoUI: React.FC<{
  text: string;
  id: string;
  onDeleteTodo: (test: string) => void;
}> = (props) => {
  return (
    <li
      className={Classes.item}
      onClick={() => {
        props.onDeleteTodo(props.id);
      }}
    >
      {props.text}
    </li>
  );
};

export default ToDoUI;

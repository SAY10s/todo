import TasksLayout from "./layouts/TasksLayout";
import NewLayout from "./components/NewLayout";
import "./App.css";
import { useState } from "react";

function App() {
  const [layouts, setLayouts] = useState<string[]>([]);

  const addLayoutHandler = (title: string) => {};

  const deleteLayoutHandler = (title: string) => {};

  const getLayoutData = () => {
    fetch(
      "http://localhost/projectsXAMPP/todo_backend/php/files/getTables.php",
      { method: "POST" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLayouts(
          data.map((element: { tableName: string }) => element.tableName)
        );
      });
  };

  return (
    <>
      <div className="wrapperBig">
        {layouts.map((element, index) => {
          return (
            <TasksLayout
              key={index}
              title={element}
              deleteLayoutHandler={deleteLayoutHandler}
            />
          );
        })}
      </div>
      <NewLayout onAddLayout={addLayoutHandler} />
      <button onClick={getLayoutData}>FETCH!</button>
    </>
  );
}

export default App;

import TasksLayout from "./layouts/TasksLayout";
import NewLayout from "./components/NewLayout";
import "./App.css";
import { useState } from "react";
import { log } from "console";

function App() {
  const [layouts, setLayouts] = useState<string[]>([]);

  const addLayoutHandler = (title: string) => {};

  const deleteLayoutHandler = (title: string) => {};

  return (
    <>
      <div className="wrapperBig">
        {layouts.map((element) => {
          return (
            <TasksLayout
              title={element}
              deleteLayoutHandler={deleteLayoutHandler}
            />
          );
        })}
      </div>

      <NewLayout onAddLayout={addLayoutHandler} />

      <button
        onClick={() => {
          fetch(
            "http://localhost/projectsXAMPP/todo_backend/php/files/getTables.php",
            { method: "POST" }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              return data.map(
                (element: { tableName: string }) => element.tableName
              );
            })
            .then((processedData) => {
              console.log(processedData);
              setLayouts(processedData);
            });
        }}
      >
        FETCH!
      </button>
    </>
  );
}

export default App;

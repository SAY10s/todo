import TasksLayout from "./layouts/TasksLayout";
import NewLayout from "./components/NewLayout";
import "./App.css";
import { useState } from "react";
import { log } from "console";

function App() {
  const [layouts, setLayouts] = useState<string[]>([]);

  const addLayoutHandler = (title: string) => {
    setLayouts((prevState) => {
      return prevState.concat(title);
    });
  };

  const deleteLayoutHandler = (title: string) => {
    setLayouts((prevState) => {
      return prevState.filter((element) => {
        return element !== title;
      });
    });
  };

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
            });
        }}
      >
        FETCH!
      </button>
    </>
  );
}

export default App;

import TasksLayout from "./layouts/TasksLayout";
import NewLayout from "./components/NewLayout";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [layouts, setLayouts] = useState<string[]>([]);

  const addLayoutHandler = (title: string) => {
    let formData = new FormData();
    formData.append("tableName", title);
    fetch(
      "http://localhost/projectsXAMPP/todo_backend/php/files/tables/addTable.php",
      { method: "POST", body: formData }
    ).then(() => {
      getLayoutData();
    });
  };

  const deleteLayoutHandler = (title: string) => {
    let formData = new FormData();
    formData.append("tableName", title);
    fetch(
      "http://localhost/projectsXAMPP/todo_backend/php/files/tables/deleteTable.php",
      { method: "POST", body: formData }
    ).then(() => {
      getLayoutData();
    });
  };

  const getLayoutData = () => {
    fetch(
      "http://localhost/projectsXAMPP/todo_backend/php/files/tables/getTables.php",
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
  useEffect(getLayoutData, []);

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
    </>
  );
}

export default App;

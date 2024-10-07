import { useReducer, useState } from "react";

type Task = {
  id: number;
  description: string;
};

type Action =
  | { type: "added"; id: number; description: string }
  | { type: "deleted"; id: number };

function App(): JSX.Element {
  const [task, setTask] = useState<string>("");
  const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks);

  const removeTask = (taskId: number): void => {
    dispatchTasks({
      type: "deleted",
      id: taskId,
    });
  };

  const addTask = (task: string): void => {
    dispatchTasks({
      type: "added",
      id: nextId++,
      description: task,
    });
  };

  const containerStyle = {
    padding: "20px",
    margin: "0 auto",
    maxWidth: "600px",
    fontFamily: "'Roboto', sans-serif",
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#1976d2", // MUI Primary Color (Blue)
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  };

  const taskContainerStyle = {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  };

  const taskTextStyle = {
    fontSize: "18px",
    color: "#333",
  };

  const doneButtonStyle = {
    backgroundColor: "#d32f2f", // MUI Error Color (Red)
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  };

  const headingStyle = {
    fontSize: "24px",
    color: "#1976d2", // MUI Primary Color
    marginBottom: "20px",
  };

  const noTaskStyle = {
    fontSize: "18px",
    color: "#888",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Task Manager</h1>
      <input
        type="text"
        placeholder="Add task"
        onChange={(e): void => setTask(e.target.value)}
        style={inputStyle}
      />
      <button onClick={() => addTask(task)} style={buttonStyle}>
        +
      </button>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task: Task) => {
            return (
              <div key={task.id} style={taskContainerStyle}>
                <h2 style={taskTextStyle}>{task.description}</h2>
                <button
                  onClick={(): void => removeTask(task.id)}
                  style={doneButtonStyle}
                >
                  Mark as done
                </button>
              </div>
            );
          })
        ) : (
          <h3 style={noTaskStyle}>No task yet</h3>
        )}
      </div>
    </div>
  );
}

export default App;

let nextId = 1;

const taskReducer = (tasks: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          description: action.description,
        },
      ];
    }
    case "deleted": {
      return tasks.filter((t: Task) => t.id !== action.id);
    }
    default: {
      throw new Error("Unknown action");
    }
  }
};

const initialTasks: Task[] = [];

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [newTodo, setnewTodo] = useState("");
  const [list, setlist] = useState([]);

  function addTask() {
    setlist([...list, { task: newTodo, id: uuidv4(), isDone: false }]);
    setnewTodo("");
  }
  function updateTodoValue(event) {
    setnewTodo(event.target.value);
  }
  function deleteTodo(id) {
    setlist((prevTodo) => prevTodo.filter((todo) => todo.id != id));
  }
  function updateAll() {
    setlist((prevtodo) =>
      prevtodo.map((todo) => ({ ...todo, task: todo.task.toUpperCase() }))
    );
  }
  function updateOne(id) {
    setlist((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: todo.task.toUpperCase() };
        } else {
          return todo;
        }
      })
    );
  }
  function markAsDone(id) {
    setlist((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: true };
        } else {
          return todo;
        }
      })
    );
  }
  function markAllAsDone() {
    setlist((prevTodo) => prevTodo.map((todo) => ({ ...todo, isDone: true })));
  }

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <h1 className="app-title">Todo List</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task"
            onChange={updateTodoValue}
            value={newTodo}
            className="todo-input"
          />
          <button onClick={addTask} className="btn btn-primary">
            Add Task
          </button>
        </div>

        <div className="todo-list">
          <ul className="list">
            {list.map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="todo-content">
                  {todo.isDone ? (
                    <span className="todo-text completed">{todo.task}</span>
                  ) : (
                    <span className="todo-text">{todo.task}</span>
                  )}
                </div>

                <div className="todo-actions">
                  <button
                    onClick={() => markAsDone(todo.id)}
                    className="btn btn-success"
                    disabled={todo.isDone}
                  >
                    Mark Done
                  </button>
                  <button
                    onClick={() => updateOne(todo.id)}
                    className="btn btn-warning"
                  >
                    Uppercase
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {list.length > 0 && (
          <div className="global-actions">
            <button onClick={updateAll} className="btn btn-secondary">
              Uppercase All
            </button>
            <button onClick={markAllAsDone} className="btn btn-success">
              Mark All as Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import TodoForm from "./components/TodoForm";

import classes from "./App.module.css";
import TodosList from "./components/TodosList";
import { useEffect, useReducer, useState } from "react";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  TOGGLE_TODO: "toggle-todo",
  EDIT_TODO: "edit-todo",
  FiLTER_TODO: "filter-todo",
  STORE_TODOS: "store-todos",
};

const LOCALE_STORAGE_KEY = "todoWithReact.todos";
const reducer = (todos, { type, paylod }) => {
  switch (type) {
    case ACTIONS.ADD_TODO:
      return [{ ...paylod }, ...todos];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === paylod.id) {
          return {
            ...todo,
            status: paylod.status === "Incomplete" ? "complete" : "Incomplete",
          };
        } else {
          return todo;
        }
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== paylod.id);
    case ACTIONS.STORE_TODOS:
      return [...paylod.todosStorageArray];
    case ACTIONS.EDIT_TODO:
      console.log(paylod.todo);
      return todos;
  }
};
function App() {
  let [todos, dispatch] = useReducer(reducer, []);
  const [currentTodos, setCurrentTodos] = useState(todos);

  useEffect(() => {
    const todosStorage = localStorage.getItem(LOCALE_STORAGE_KEY);
    const todosStorageArray = JSON.parse(todosStorage);
    dispatch({ type: ACTIONS.STORE_TODOS, paylod: { todosStorageArray } });
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  return (
    <div className={classes["todo-app"]}>
      <h1 className={classes["todo-app_title"]}>TODO LIST</h1>
      <div className={classes["section-1"]}>
        <TodoForm
          name='Add Task'
          className={classes["btn-primary"]}
          dispatch={dispatch}
        />
      </div>
      <TodosList todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;

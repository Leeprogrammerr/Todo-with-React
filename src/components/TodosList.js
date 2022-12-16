import classes from "./TodosList.module.css";
import Button from "../UI/Button";
import { ACTIONS } from "../App";
import TodoForm from "./TodoForm";
const TodosList = ({ todos, dispatch }) => {
  return (
    <ul className={classes["todos-list"]}>
      {todos.map((todo) => {
        return (
          <div className={classes.todo} key={todo.id}>
            <li
              className={todo.status === "complete" ? classes["toggled"] : ""}
            >
              {todo.title}
            </li>

            <div className={classes["btns-container"]}>
              <Button
                name='✔'
                onClick={() =>
                  dispatch({
                    type: ACTIONS.TOGGLE_TODO,
                    paylod: { id: todo.id, status: todo.status },
                  })
                }
              />
              <Button
                name='❌'
                onClick={() =>
                  dispatch({
                    type: ACTIONS.DELETE_TODO,
                    paylod: { id: todo.id },
                  })
                }
              />
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default TodosList;

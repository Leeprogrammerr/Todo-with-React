import classes from "./TodoForm.module.css";
import Button from "../UI/Button";
import { useRef, useState } from "react";
import { ACTIONS } from "../App";

const TodoForm = ({ name, dispatch, className }) => {
  const [valid, setValid] = useState(false);
  const titeRef = useRef();

  const selectRef = useRef();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const titeValue = titeRef.current.value;
    const selectValue = selectRef.current.value;
    if (!titeValue) {
      return;
    }
    dispatch({
      type: ACTIONS.ADD_TODO,
      paylod: {
        title: titeValue,
        status: selectValue,
        id: Math.random(),
      },
    });

    setValid(false);
  };
  return (
    <>
      <Button
        name={name}
        onClick={() => setValid(true)}
        className={className}
      />
      {valid && (
        <div className={classes.backdrop}>
          <form className={classes["todo-form"]} onSubmit={handleSubmitForm}>
            <h1 className={classes["todo-form_title"]}>Add TODO</h1>
            <div className={classes["label-container"]}>
              <label htmlFor='title' className={classes["form-label"]}>
                Title
              </label>
              <input
                type='text'
                id='title'
                className={classes["form-input"]}
                ref={titeRef}
              />
            </div>
            <div className={classes["label-container"]}>
              <label htmlFor='status' className={classes["form-label"]}>
                Status
              </label>
              <select id='status' className={classes.select} ref={selectRef}>
                <option>Incomplete</option>
                <option>complete</option>
              </select>
            </div>
            <div className={classes["form_btns-container"]}>
              <Button
                name='Add Task'
                className={classes["btn-add-task"]}
                type='submit'
              />
              <Button
                name='Cancel'
                className={classes["btn-cancel"]}
                onClick={() => setValid(false)}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TodoForm;

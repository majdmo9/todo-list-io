import React, { FunctionComponent, useState } from "react";
import styles from "../styles/Todo.module.css";
interface IProps {
  id: string;
  todo: string;
  done: boolean;
  setTodoDone: () => void;
  setTodoDeleted: () => void;
}
const Todo: FunctionComponent<IProps> = ({
  todo,
  setTodoDone,
  setTodoDeleted,
  done,
}) => {
  return (
    <div className={styles.todoDiv}>
      <ul className={styles.todo}>
        <li className={styles.todoInput}>
          <p>{todo}</p>
        </li>
        <li className={styles.todoButton}>
          {!done ? (
            <button
              onClick={() => {
                setTodoDone();
              }}
            >
              <i className={`far fa-check-circle`}></i>
            </button>
          ) : (
            <button
              className={styles.doneButton}
              onClick={() => {
                setTodoDone();
              }}
            >
              <i className={`far fa-check-circle ${styles.done}`}></i>
            </button>
          )}
        </li>
        <li className={styles.todoButton}>
          <button
            onClick={() => {
              setTodoDeleted();
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Todo;

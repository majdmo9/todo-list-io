import React, { FunctionComponent } from "react";
import styles from "../styles/Register.module.css";
interface IProps {
  handleLogIn: () => void;
  handleUserChange: (e: any) => void;
  username: string;
  password: string;
}
const Rigester: FunctionComponent<IProps> = ({
  handleLogIn,
  handleUserChange,
  username,
  password,
}) => {
  return (
    <div className={styles.login}>
      <h1>Register</h1>
      <div className={styles.inputContainer}>
        <div className={styles.inputDiv}>
          <label htmlFor="username" className={styles.inputLabel}>
            User Name:
          </label>
          <input
            onChange={handleUserChange}
            type="text"
            name="username"
            className={styles.loginInput}
            value={username}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password:
          </label>
          <input
            onChange={handleUserChange}
            name="password"
            type="password"
            className={styles.loginInput}
            value={password}
          />
        </div>
      </div>
      <div className={styles.buttonsDiv}>
        <button onClick={handleLogIn} className={styles.loginButton}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Rigester;

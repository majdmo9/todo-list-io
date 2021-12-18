import React, { ChangeEventHandler, FunctionComponent, useState } from "react";
import styles from "../styles/Login.module.css";
interface IProps {
  handleLogIn: () => void;
  handleRegister: () => void;
  handleUserChange: (e: any) => void;
  handleKeyPress: (e: any) => void;
  username: string;
  password: string;
}
interface IUser {
  username: string;
  password: string;
}
const Login: FunctionComponent<IProps> = ({
  handleLogIn,
  handleRegister,
  handleUserChange,
  handleKeyPress,
  username,
  password,
}) => {
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <div className={styles.inputContainer}>
        <div className={styles.inputDiv}>
          <label htmlFor="username" className={styles.inputLabel}>
            User Name:
          </label>
          <input
            value={username}
            type="text"
            name="username"
            onChange={handleUserChange}
            className={styles.loginInput}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password:
          </label>
          <input
            value={password}
            name="password"
            type="password"
            onChange={handleUserChange}
            className={styles.loginInput}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div className={styles.buttonsDiv}>
        <button onClick={handleLogIn} className={styles.loginButton}>
          Login
        </button>
        <button onClick={handleRegister} className={styles.loginButton}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;

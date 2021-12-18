import React, { FunctionComponent } from "react";

import styles from "../styles/UpdatePassword.module.css";
interface IProps {
  handleUpdate: () => void;
  setPassword: (e: any) => void;
  handleKeyPress: (e: any) => void;
  handleCancel: () => void;
}
const UpdatePassword: FunctionComponent<IProps> = ({
  handleUpdate,
  setPassword,
  handleKeyPress,
  handleCancel,
}) => {
  return (
    <div className={styles.updateContainer}>
      <h1>Update Your Password</h1>
      <div className={styles.updatePassDiv}>
        <input
          className={styles.passwordInput}
          type="password"
          onKeyPress={handleKeyPress}
          onChange={setPassword}
        />
        <div className={styles.buttonsDiv}>
          <button className={styles.updateButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.updateButton} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;

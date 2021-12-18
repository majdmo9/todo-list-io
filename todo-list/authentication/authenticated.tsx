import React from "react";
import styles from "../styles/authenticated.module.css";
const Authenticated = ({
  session,
  handleSelectChange,
  handleDateChange,
  date,
}: any) => {
  const Session = session?.substring(0, session.indexOf("@"));
  if (session) {
    return (
      <div className={styles.authenticatedDiv}>
        <div className={styles.sessionDiv}>
          <select
            name=""
            id=""
            className={styles.authH1}
            onChange={handleSelectChange}
          >
            <option value="">{Session}</option>
            <option value="logout">Log Out</option>
            <option value="updatePass">Update Password</option>
          </select>
          <input
            value={date}
            type="date"
            onChange={handleDateChange}
            className={styles.dateInput}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.loadingDiv}>
        <i className={`fas fa-spinner ${styles.loadingSpinner}`}></i>
      </div>
    );
  }
};

export default Authenticated;

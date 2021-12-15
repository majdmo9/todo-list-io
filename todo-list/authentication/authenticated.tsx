import React from "react";
// import nookies from "nookies";
// import { verifyIdToken } from "./firebaseAdmin";
import firebase from "../database/firebase";
import styles from "../styles/authenticated.module.css";
const Authenticated = ({ session }: any) => {
  const logOut = () => {
    firebase.auth().signOut();
  };
  const Session = session?.substring(0, session.indexOf("@"));
  if (session) {
    return (
      <div className={styles.authenticatedDiv}>
        <div className={styles.sessionDiv}>
          <p className={styles.authH1}>{Session}</p>
        </div>
        <button className={styles.loginButton} onClick={logOut}>
          Log Out
        </button>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};
// export const getServerSideProps = async (context: any) => {
//   try {
//     const cookies = nookies.get(context);
//     const token = await verifyIdToken(cookies.token);
//     console.log(token);

//     // const { uid, email } = token;
//     // return {
//     //   props: { session: `Your email is ${email} and your id is ${uid}` },
//     // };
//   } catch (err) {
//     context.res.end();
//     return {
//       props: {},
//     };
//   }
// };
export default Authenticated;

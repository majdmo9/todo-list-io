// const admin = require("firebase-admin/app");
import * as admin from "firebase-admin";
import firebase from "../database/firebase";
const serviceAccount = require("../todolist-96ace-firebase-adminsdk-gzr3e-cf197dc4b3.json");
require("dotenv").config();
export const verifyIdToken = (token: any) => {
  // if (!admin.apps.length) {
  //   admin.initializeApp({
  //     credential: admin.credential.cert(serviceAccount),
  //     databaseURL: process.env.databaseURL,
  //   });
  // }
  // return admin
  //   .auth()
  //   .verifyIdToken(token)
  //   .catch((err: any) => {
  //     throw err;
  //   });
};

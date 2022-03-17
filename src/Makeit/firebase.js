import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app";

import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider, getAuth,
  signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, sendPasswordResetEmail, signOut
} from "firebase/auth";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc
} from "firebase/firestore";
import { Navigate } from "react-router-dom";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyALUrUT8h6_oBFaOOMmmbPM0UVyMB7OEx4",
  authDomain: "makeit-4ee8e.firebaseapp.com",
  databaseURL: "https://makeit-4ee8e-default-rtdb.firebaseio.com",
  projectId: "makeit-4ee8e",
  storageBucket: "makeit-4ee8e.appspot.com",
  messagingSenderId: "293032715387",
  appId: "1:293032715387:web:07ba5b8a64cc7edd622ede",
  measurementId: "G-D815G8S98N"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const q = query(collection(db, "users"), where("uid", "==", res.user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: res.user.uid,
        name: res.user.displayName,
        authProvider: "google",
        email: res.user.email,
      });
    }
    const user = res.user;
    return user
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, imageLink) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      imageLink
    });
    return "Account Created!";
  } catch (err) {
    return err;
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};




export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
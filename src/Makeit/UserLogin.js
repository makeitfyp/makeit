import React, { useState } from "react";
import "./UserLogin.css";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import {
  GoogleAuthProvider, getAuth,
  signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, sendPasswordResetEmail, signOut
} from "firebase/auth";
import { db } from "./firebase";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc 
}from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  /* const logintoApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoUrl,
          })
        );
      })
      .catch((error) => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert("Name is Required");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilepic,
          })

          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilepic,
              })
            );
          });
      })
      .catch((error) => alert(error));
  }; */
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  return (

    <div className="login">
      <img src="./logo.png" alt="" />
      <h1>WELCOME TO MAKEIT</h1>
      <form>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          type="email"
        ></input>
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          type="password"
        ></input>
        <button type="button" onClick={async() =>{ 
            signInWithEmailAndPassword(auth, email, password).then((user)=>{
              db.collection("users")
              .get()
              .then(async function(querySnapshot) {
                var temp ="" 
                await querySnapshot.forEach(function(doc) {
                  if(doc.data().email==user.user.email){
                    temp=doc.id
                  }  
                      
                  });
                  localStorage.setItem('user', true);
                  navigate("/Home/"+temp)
                });
              
            }).catch (err=> {
              console.error(err);
              alert(err.message);
            })
          
          }}>
          Login
        </button>
      </form>
      <button className="button2" type="button" onClick={async ()=>{
        var user = await signInWithGoogle()
        console.log(user)
        db.collection("users")
              .get()
              .then(async function(querySnapshot) {
                var temp ="" 
                await querySnapshot.forEach(function(doc) {
                  if(doc.data().email==user.email){
                    temp=doc.id
                  }  
                      
                  });
                  localStorage.setItem('user', true);
                  navigate("/Home/"+temp)
                });
        }}>
        Login With Google
      </button>
      <span className="forgot" onClick={() => navigate("/Forgetpass")}>Forgot Password?</span>

      <p>
        Not a Member?{" "}
        <span onClick={() => navigate("/Register")} className="login_register">
          Register now
        </span>
      </p>
    </div>
  );
}
export default UserLogin;

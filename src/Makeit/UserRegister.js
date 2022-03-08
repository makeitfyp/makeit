import React, { useState } from "react";
import "./UserRegister.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";

import { registerWithEmailAndPassword } from "./firebase";
function UserRegister() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [profilepic, setprofilepic] = useState("");
  const navigate = useNavigate();

  /*   const register = () => {
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
  return (
    <div className="Register">
      <img src="./logo.png" alt="" />

      <form>
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Full Name"
          type="text"
        ></input>

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
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
        ></input>
        <input
          value={profilepic}
          onChange={(e) => setprofilepic(e.target.value)}
          placeholder="Image Link"
          type="text"
        ></input>
        <button type="button" onClick={async () => {
            var res = await registerWithEmailAndPassword(name,email,password,profilepic);
            if(res=="Account Created!"){
                alert(res)
                navigate("/")
            }else{
                alert(res)
            }
            
            }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default UserRegister;
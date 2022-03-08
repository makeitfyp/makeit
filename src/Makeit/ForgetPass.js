import React, { useState } from "react";
import "./ForgetPass.css";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
function ForgetPass() {
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login">
      <img src="./logo.png" alt="" />

      <h1>Enter Email</h1>
      <form className="resetform">
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          type="email"
        ></input>

        <button type="submit" onClick={() => {
          sendPasswordReset(email);
          navigate("/")
          }}>
          Request Reset Link        </button>
      </form>

    </div>
  );
}
export default ForgetPass;

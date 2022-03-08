import React, { useState,useEffect } from "react";
import Header from "./Header";

import './UserFeedback.css'
import Feedback from '../pages/Feedback'
import {
  useParams
} from "react-router-dom";
import { db } from "./firebase";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc 
}from "firebase/firestore";
import firebase from 'firebase/compat/app';
const Form = () => {
   
  const [uname, setName] = useState("Text");
  const [uemail, setEmail] = useState("Text");
  let {userID} = useParams();
    const [feedback, setFeedback] = useState("");
    
    useEffect(()=>{
        db.collection("users")
      .get()
      .then(async function(querySnapshot) {
        await querySnapshot.forEach(function(doc) {
          if(doc.id==userID){
            setName(doc.data().name)
            setEmail(doc.data().email)
          } 
          });
        
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });   
    },[uname,uemail])
    return (
        <div><Header id={userID}/>
            <div className="form">
                {
                    <section >
                            <div className="form-header">
                                <h1>Hey There, We Are Collectng Feedback!</h1>
                            </div>
                            <div className="form-content">
                                <div className="form-group">
                                        <label htmlFor="displayName">Name : </label>
                                        <label
                                            htmlFor="displayName"
                                            
                                        >{uname}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address : </label>
                                        <label
                                            htmlFor="email"

                                        >{uemail}</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Feedback : </label>
                                        <textarea
                                            name="message"
                                            className="form-input"
                                            type="text"
                                            value={feedback}
                                            onChange={(e) => {
                                                setFeedback(e.target.value);
                                              }}
                                            required
                                            rows="10"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={async ()=>{
                                            if(feedback.length<11){
                                                alert("Feedback must be longer than 10 characters")
                                            }else{
                                                await addDoc(collection(db, "feebacks"), { name:uname, email:uemail, 
                                                    feedback:feedback,
                                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                                  });
                                                  await addDoc(collection(db, "Notification"), {
                                                    id:userID, 
                                                    msg:"Feedback Sent.",
                                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                                  });
                                                  alert("Feedback Submitted")
                                                  setFeedback("")
                                            }
                                        }}
                                        >Submit Feedback</button>
                                    </div>
                            </div>
                        </section >
                }
            </div></div>
    )
}

export default Form;
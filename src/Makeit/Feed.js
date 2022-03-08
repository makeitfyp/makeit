import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import Inputoptions from "./Inputoptions";
import ImageIcon from "@material-ui/icons/Image";
import Post from "./Post";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { db } from "./firebase";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc 
}from "firebase/firestore";
import firebase from 'firebase/compat/app';
import Header from './Header';
import Recents from './Recents';
import Sidebar from './Sidebar';
import './App.css';
import {
  useParams
} from "react-router-dom";
import { alertClasses } from "@material-ui/core";
function Feed() {
  const [posts, setPosts] = useState([]);
  
  let {userID} = useParams();
  const [input, setInput] = useState([]);
  const [des, setDes] = useState([]);
  const [filter, setFilter] = useState("Text");
  const [uname, setName] = useState("Text");
  const [picURL, setPicURL] = useState("http://iconbug.com/data/83/512/95c5e2040458a8933ba583e5d7bd2e41.png");
  const [selected, setSelected] = useState(["selected","none","none"]);
  
  useEffect(() => {
    db.collection("posts")
      .get()
      .then(async function(querySnapshot) {
        var temp =[]  
        await querySnapshot.forEach(function(doc) {
             temp.push({
                id: doc.id,
                data: doc.data(),
              })
              
          });
          console.log(temp)
        setPosts(temp)

      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

      db.collection("users")
      .get()
      .then(async function(querySnapshot) {
        await querySnapshot.forEach(function(doc) {
          if(doc.id==userID){
            setName(doc.data().name)
            if(doc.data().imageLink)
              {setPicURL(doc.data().imageLink)}
          }   
              
          });
        
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });      
      
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      name: "abubakar",
      description: "abubakar@gmail.com",
      message: input,
      photoUrl: "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <Header id={userID}/>
      <div className="cover">
        <Sidebar className='sideBar' id={userID} />
      <div className="App_body">
        <div className="feed">
          <div className="feed_inputcontainer">
            <div className="feed_input">
              <CreateIcon />
              <form>
                <input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  type="text"
                  placeholder={"Enter "+filter}
                />
                
              </form>
            </div>
            <div className="feed_input" id="description">
              <CreateIcon />
              <form>
                <input
                  value={des}
                  onChange={(e) => {
                    setDes(e.target.value);
                  }}
                  type="text"
                  placeholder={"Enter Description"}
                />
              </form>
            </div>
            <div className="feed_inputoptions">
              
              <div onClick={()=>{
                  setSelected(["selected","none","none"]);
                  setFilter("Text")
                  
                }}  className="Inputoptions" id={selected[0]}>
                  <EventNoteIcon style={{ color:"#70B5F9" }} />
                  <p>Text</p>
                </div>

                <div onClick={()=>{
                  setSelected(["none","selected","none"]);
                  setFilter("Photo URL")
                  
                }}  className="Inputoptions" id={selected[1]}>
                  <ImageIcon style={{  color:"#70B5F9"  }} />
                  <p>Photo</p>
                </div>

                <div onClick={()=>{
                  setSelected(["none","none","selected"]);
                  setFilter("Video URL")
                  
                }}  className="Inputoptions" id={selected[2]}>
                  <SubscriptionsIcon style={{  color:"#70B5F9"  }} />
                  <p>Video</p>
                </div>
              <div onClick={async ()=>{
                if(input.length==0 || des.length==0){
                  input.length==0?alert(filter+" Required"):alert("Description Required")
                }else{
                if(filter=="Text"){
                await addDoc(collection(db, "posts"), { name:uname, description:des, message:input, photoUrl:picURL,
                postPicURL:"None",
                postVideoURL:"None",
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              });
            }else if(filter=="Photo URL"){
              await addDoc(collection(db, "posts"), { name:uname, description:des, message:"None", photoUrl:picURL,
                postPicURL:input,
                postVideoURL:"None",
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              });
            }else if(filter=="Video URL"){
              await addDoc(collection(db, "posts"), { name:uname, description:des, message:"None", photoUrl:picURL,
                postPicURL:"None",
                postVideoURL:input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              });
            }
                setInput("")
                setDes("")
                alert("Post Created!")
              }}}className="Inputoptions">
                <PostAddIcon style={{ color:"#70B5F9" }} />
                <p>Post</p>
              </div>
              
              

            </div>
          </div>
          {posts.map(({ id, data: { name, description, message, photoUrl, postPicURL, postVideoURL } }) => (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
              postPicURL={postPicURL}
              postVideoURL={postVideoURL}
            />
          ))}
        </div>
        </div>
        <Recents/>
        </div>
        </div>


  );
}

export default Feed;

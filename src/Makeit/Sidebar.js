import { Avatar } from "@material-ui/core";
import React , {useEffect,useState} from "react";
import "./Sidebar.css";
import { db } from "./firebase";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc 
}from "firebase/firestore";
function Sidebar(props) {
  const [userData,setUserData] = useState({})
  const [userPosts,setUserPosts] = useState({total:0,msg:0,pic:0,video:0})
useEffect(()=>{
  var tempUser ="" 
              
  db.collection("users")
              .get()
              .then(async function(querySnapshot) {
                await querySnapshot.forEach(function(doc) {
                  if(doc.id==props.id){
                    tempUser=doc.data()
                  }  
                      
                  });
                  setUserData(tempUser)
                });
    db.collection("posts")
    .get()
    .then(async function(querySnapshot) {
      var temp ="" 
      var tempPosts = {total:0,msg:0,pic:0,video:0}
      await querySnapshot.forEach(function(doc) {
        temp=doc.data()
        if(temp.name == tempUser.name){
          if(temp.message!="None"){
            tempPosts={...tempPosts,total:tempPosts.total+1,msg:tempPosts.msg+1}
          }else{
            if(temp.postPicURL!="None"){
              tempPosts={...tempPosts,total:tempPosts.total+1,pic:tempPosts.pic+1}
            }else{
              tempPosts={...tempPosts,total:tempPosts.total+1,video:tempPosts.video+1}
            }
          }
        }  
            
        });
        setUserData(tempUser)
        setUserPosts(tempPosts)
      });
},[])
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80"
          alt=""
        />
        <Avatar src={userData.imageLink} className="sidebar_top_Avatar"></Avatar>
        <h2>{userData.name}</h2>
        <h4>{userData.email}</h4>
      </div>
      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p> Total Posts</p>
          <p className="number"> {userPosts.total}</p>
        </div>
        <div className="sidebar_stat">
          <p> Text Posts</p>
          <p className="number"> {userPosts.msg}</p>
        </div>
        <div className="sidebar_stat">
          <p> Photo Posts</p>
          <p className="number"> {userPosts.pic}</p>
        </div>
        <div className="sidebar_stat">
          <p> Video Posts</p>
          <p className="number"> {userPosts.video}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

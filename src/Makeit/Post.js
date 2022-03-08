import { Avatar } from "@material-ui/core";
import React,{useState,useEffect} from "react";
import "./Post.css";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Inputoptions from "./Inputoptions";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReactPlayer from 'react-player'

function Post(props) {
  const [colors,setColors]= useState(["gray","gray","gray"])
  useEffect(()=>{
    
  },[colors])
  return (
    <div className="post">
      <div className="post_header">
        <Avatar src={props.photoUrl}></Avatar>
        <div className="post_info">
          <h2 >{props.name}</h2>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="post_body">
      {props.message!="None"?
        <p>{props.message}</p>:
        props.postVideoURL!="None"?
        <ReactPlayer id="player" url={props.postVideoURL} playing = {false} controls={true}/>:
        props.postPicURL!="None"?
        <img id="postImg" src={props.postPicURL} alt="Post"/>
        :<p>SAD</p>
      }
      </div>
      <div className="post_buttons">
          <div className="Inputoptions"
            onClick={()=>{
              var temp = [...colors];
              temp[0] = temp[0]=="gray"?"blue":"gray";
              setColors(temp)
            }}>
          <ThumbUpAltOutlinedIcon style={{ color: colors[0] }} />
          <h4 style={{ color: colors[0] }} >Like</h4>
        </div>

        <div className="Inputoptions"
            onClick={()=>{
              var temp = [...colors];
              temp[1] = temp[1]=="gray"?"red":"gray";
              setColors(temp)
            }}>
          <FavoriteIcon style={{ color: colors[1] }} />
          <h4 style={{ color: colors[1] }}>Love</h4>
        </div>

        <div className="Inputoptions"
            onClick={()=>{
              var temp = [...colors];
              temp[2] = temp[2]=="gray"?"orange":"gray";
              setColors(temp)
            }}>
          <SentimentVeryDissatisfiedIcon style={{ color: colors[2] }} />
          <h4 style={{ color: colors[2] }}>Sad</h4>
        </div>
      </div>
    </div>
  );
}

export default Post;

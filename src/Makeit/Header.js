import React,{useEffect,useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import Headerop from "./Headerop";
import Notifications from "react-notifications-menu";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import TodayIcon from '@material-ui/icons/Today';
import ForumIcon from '@material-ui/icons/Forum';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Logo from '../components/Logo';
import firebase from 'firebase/compat/app';

import { db } from "./firebase";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc 
}from "firebase/firestore";

function Header(props) {
  const navigate = useNavigate();
  const[data,setData] = useState()
  useEffect(()=>{
    db.collection("Notification")
              .get()
              .then(async function(querySnapshot) {
                var t=[]
                await querySnapshot.forEach(function(doc) {
                  if(doc.data().id==props.id){
                    var temp=doc.data()
                    var noti = {
                      image:
                      "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
                    message: temp.msg,
                    detailPage:"",
                    receivedTime:(temp.timestamp).toDate().toString()
                    }
                    t.push(noti)
                  }  
                      
                  });
                  setData(t)
                });
  },[])
  return (
    <div className="header">
      <div className="header_left">
        <Logo />
      </div>

      <div className="header_right">
        <Headerop
          Icon={HomeIcon}
          title="Home"
          onClick={() => navigate("/Home/"+props.id)}
        />

        <Headerop
          Icon={RestaurantIcon}
          title="Recipe"
          onClick={() => navigate("/MainRecipe/"+props.id)}
        />
        
        <Headerop
          Icon={OutdoorGrillIcon}
          title="Custom Recipe"
          onClick={() => navigate("/CustomRecipe/"+props.id)}
        />
        
        <Headerop
          Icon={ViewInArIcon}
          title="AR"
          onClick={() => navigate("/AR/"+props.id)}
        />
        <Headerop
          Icon={SupervisorAccountIcon}
          title="News Feed"
          onClick={() => navigate("/Feed/"+props.id)
          }
        />
        <Headerop
          Icon={TodayIcon}
          title="Diet Plan"
          onClick={() => navigate("/DietPlan/"+props.id)}
        />


        <Headerop
          Icon={ImageSearchIcon}
          title="Detect"
          onClick={() => navigate("/RecipeDetection/"+props.id)}
        />
        <Headerop
          Icon={ForumIcon}
          title="Feedback"
          onClick={() => navigate("/UserFeedback/"+props.id)}
        />
        {/* Notification section */}

        <div className="notification">
          <Notifications
            data={data}

          />
        </div>
        <span className="title_notification">Notifications</span>
        <Headerop
          Icon={LogoutIcon}
          title='Logout'
          onClick={() => {
            firebase.auth().signOut()
            localStorage.removeItem('user');
            navigate("/")
          }}
        />
      </div>
    </div>
  );
}
export default Header
import React, { useState,useEffect } from 'react';
import './Dietplanmodal.css';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Header from './Header';
import Modal from 'react-modal';
import { capitalize } from 'lodash';
import { db } from "./firebase";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc ,setDoc,doc
}from "firebase/firestore";
import firebase from 'firebase/compat/app';
import {
  useParams
} from "react-router-dom";
import Axios from "axios";

function DietPlanCustom() {

  let {userID} = useParams();


  const calendar = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealOrder = ['breakfast', 'lunch', 'dinner'];
  const [modalopen, setmodalopen] = useState(false);
  const [modalopenRecipe, setmodalopenRecipe] = useState(false);
  const [title,setTitle] = useState("")
  const [pic,setPic] = useState("")
  const [web,setWeb] = useState("")
  const [search,setSearch] = useState("")
  const [list,setList] = useState([])
  const [position,setPosition] = useState([-1,-1])
  const [plan,setPlan]=useState([
    ["","",""],
    ["","",""],
    ["","",""],
    ["","",""],
    ["","",""],
    ["","",""],
    ["","",""],
  ])
  function arrToObject (arr){
    //assuming header
    var keys = [0,1,2];
    
    var formatted = [],
      data = arr,
      cols = keys,
      l = cols.length;
    for (var i=0; i<data.length; i++) {
        var d = data[i],
            o = {};
        for (var j=0; j<l; j++)
            o[cols[j]] = d[j];
        formatted.push(o);
    }
    return {...formatted};
  }
  useEffect(()=>{
    db.collection("userPlan")
              .get()
              .then(async function(querySnapshot) {
                await querySnapshot.forEach(function(doc) {
                  if(doc.id==userID){
                  var temp = []
                  var got = doc.data()
                  Object.keys(got).forEach((key)=>{
                    var item = got[key];
                    var t = []
                    Object.keys(item).forEach((k)=>{
                      var i = item[k];
                      t.push(i)
                    })
                    temp.push(t)
                  })
                  setPlan(temp)
                  }
                });
              })
  },[])
  const APP_ID = "a52b4d43";
  const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";
  return (
    <div>
      <Header id={userID}/>
      <div className="Dietplan_container">
        <div className='Dietplan_nav'>
          <h1 className='Dietplan_header'>Meal Planner</h1>
          <button
          className='Dietplan_shopping-list'
          onClick={async()=>{
            var p = arrToObject(plan)
            await setDoc(doc(db, "userPlan", userID), p);
            alert("Plan Updated")
          }}
          >Update Plan</button>
          <button
            className='Dietplan_shopping-list'
            onClick={()=>{
              setmodalopenRecipe(true)
            }}
          >
            Add Custom Recipe     </button>
        </div>

        <ul className="Dietplan_meal-types">
          {
            mealOrder.map(mealType => <li key={mealType} className="Dietplan_subheader">{capitalize(mealType)}</li>)
          }
        </ul>

        <div className='Dietplan_calendar'>
          <div className='Dietplan_days'>
            {calendar.map((day => <h3 key={day} className='Dietplan_subheader'>{capitalize(day)}</h3>))}
          </div>
          <div className='Dietplan_icon-grid'>
            {calendar.map(day  =>{ 
              var index =calendar.indexOf(day);
              return(
              <ul key={day}>
                {mealOrder.map((meal,time) =>{ 
                  
                  return(
                  <li key={meal} className='Dietplan_meal'>
                    <div className='Dietplan_add-meal-btn'>
                      <button className='Dietplan_icon-btn' onClick={() => {
                        setPosition([index,time])
                        setmodalopen(true)
                        }}>
                        <RestaurantIcon size={10} />
                        <h2>{plan[index][time]}</h2>
                      </button>
                    </div>
                  </li>
                )})}
              </ul>
            )})}
          </div>
        </div>
        <Modal className='Dietplan_modal' isOpen={modalopen} shouldCloseOnOverlayClick={false} onRequestClose={() => setmodalopen(false)}>
          <div className='Dietplan_search-container'>
            <h3 className='Dietplan_subheader'>
              Find a meal
            </h3>
            <div>
              <div className='Dietplan_search'>
                <input
                  className='Dietplan_food-input'
                  type='text'
                  placeholder='Search Foods'
                  value={search}
                  onChange={(e)=>{
                    setSearch(e.target.value)
                  }}
                />
                <button
                onClick={async()=>{
                  const response = await Axios.get(
                    `https://api.edamam.com/search?q=${search}&from=0&to=12&app_id=${APP_ID}&app_key=${APP_KEY}`
                  );
                  setList(response.data.hits);
                }}
                  className='Dietplan_Seach'
                >
                  Search
                </button>
              </div>
              <ul>
                {list.map(item => {
                  return (
                    <li
                      key={item.recipe.totalTime}
                      className="listItem"
                      onClick={()=>{
                        var temp  = plan;
                        temp[position[0]][position[1]]=item.recipe.label;
                        setPlan(temp)
                        setSearch("")
                        setList([])
                        setmodalopen(false)
                      }}
                    >
                      <div>{item.recipe.label}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              onClick={() => setmodalopen(false)}       >
              close
            </button>
          </div>
        </Modal>

        <Modal className='Dietplan_modal' isOpen={modalopenRecipe} shouldCloseOnOverlayClick={false} onRequestClose={() => setmodalopenRecipe(false)}>
          <div className='Dietplan_search-container'>
            <h3 className='Dietplan_subheader'>
              Recipe Detials
            </h3>
            <div>
              <div className='Recipe_Input'>
                <h2>Recipe Title</h2>
                <input
                  className='Recipe_Input-input'
                  type='text'
                  placeholder='Recipe Title'
                  value={title}
                  onChange={(e)=>{
                    setTitle(e.target.value)
                  }}

                />
              </div>
              <div className='Recipe_Input'>
                <h2>Recipe Photo Link</h2>
                <input
                  className='Recipe_Input-input'
                  type='text'
                  placeholder='Recipe Photo Link'
                  value={pic}
                  onChange={(e)=>{
                    setPic(e.target.value)
                  }}
                />
              </div>
              <div className='Recipe_Input'>
                <h2>Recipe Webpage Link</h2>
                <input
                  className='Recipe_Input-input'
                  type='text'
                  placeholder='Recipe Webpage Link'
                  value={web}
                  onChange={(e)=>{
                    setWeb(e.target.value)
                  }}
                />
              </div>
            <div className="buttonContainer">
            <button className="customButtons"
              onClick={async () => {
                if(title.length==0){
                  alert("Recipe Title Required")
                }else if(pic.length==0){
                  alert("Recipe Picture Link Required")
                }else if(web.length==0){
                  alert("Recipe Webpage Link Required")
                }else{
                  await addDoc(collection(db, "userRecipes"), { 
                    title:title,
                    picURL:pic,
                    webURL:web,
                    status:"pending",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  });
                  await addDoc(collection(db, "Notification"), {
                    id:userID, 
                    msg:"Recipe "+title+" sent for review.",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  });
                alert("Recipe Added")
                setmodalopenRecipe(false)
                }
              }}       >
              Add Recipe
            </button>
            <button className="customButtons"
              onClick={() => setmodalopenRecipe(false)}       >
              Close
            </button>
          </div>
          </div>
          </div>
        </Modal>
      </div>  </div>

  );
}

export default DietPlanCustom

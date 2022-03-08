import React from 'react';
import './Dietplan.css';
import { useNavigate } from "react-router-dom";
import Header from './Header';

import {
  useParams
} from "react-router-dom";
function DietPlan() {
  const navigate = useNavigate();
  let {userID} = useParams();


  return (
    <div>
      <Header id={userID}/>
      <div className="Landing">
        <div className="Landing__banner1">
          <h1 className="Landing__banner__heading">Custom Meal Planner</h1>
          <button className='Plan_b' onClick={() => navigate("/DietPlanCustom/"+userID)}> Meal Planner</button>

        </div>
        <div className="Landing__banner2">
          <h1 className="Landing__banner__heading">Pre Made Plans</h1>
          <button className='Plan_b' onClick={() => navigate("/Survey/"+userID)}>View Plans</button>
        </div>
      </div>

    </div>
  )
}




export default DietPlan

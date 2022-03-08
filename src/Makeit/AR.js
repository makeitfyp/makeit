import React from 'react'
import Header from './Header';

import {
    useParams
  } from "react-router-dom";
function AR() {
  let {userID} = useParams();

    return (
        <div>
            <Header id={userID}/>
            <h1>VIEW IN AR</h1>
        </div>
    )
}

export default AR

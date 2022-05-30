
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
const config = {
    apiKey: "AIzaSyALUrUT8h6_oBFaOOMmmbPM0UVyMB7OEx4",
    authDomain: "makeit-4ee8e.firebaseapp.com",
    databaseURL: "https://makeit-4ee8e-default-rtdb.firebaseio.com",
    projectId: "makeit-4ee8e",
    storageBucket: "makeit-4ee8e.appspot.com",
    messagingSenderId: "293032715387",
    appId: "1:293032715387:web:0f96dee401d1a5f7622ede",
    measurementId: "G-R5XVB65V1V"
  };

firebase.initializeApp(config);

var db = firebase.database();
var auth = firebase.auth();
let storage = firebase.storage();

export {db,auth,storage}
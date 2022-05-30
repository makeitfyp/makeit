import React, { useState } from "react";
import './login.css'
import makitlogo from '../../assets/images/logo.png'
import { auth, db } from '../../backend/backend';
import firebase from "firebase/compat/app";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/actions";

export default function Login({ toSet }) {
    const history = useHistory()
    const [user, setUser] = useState({ email: '', password: '' })
    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(user.email, user.password).then(res => {
            db.ref('Users/' + res.user.uid).once('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null && (snapshot.val().disabled === undefined || snapshot.val().disabled !== true)) {
                    toSet(true);
                    let u = { email: user.email, password: user.password, auth: true, type: 'email' }
                    dispatch(setCurrentUser(u))
                    history.push('/');
                } else {
                    alert('User account not found')
                }
            })
        }).catch(err => {
            console.log(err)
            alert(err.code)
        })
    }
    const onGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                db.ref('Users/' + user.uid).once('value', (snapshot) => {
                    if (snapshot.val() === undefined || snapshot.val() === null) {
                        db.ref('Users/' + user.uid).set({
                            username: user.displayName, email: user.email
                        }).then(res => {
                            let u = { email: user.email, password: token, auth: true ,type: 'google' }
                            dispatch(setCurrentUser(u))
                            toSet(true)
                            history.push('/')
                        }).catch(err => {
                            alert(err.code)
                        })
                    } else {
                        if (snapshot.val().disabled == undefined || snapshot.val().disabled !== true) {
                            let u = { email: user.email, password: token, auth: true, type: 'google' }
                            dispatch(setCurrentUser(u))
                            toSet(true)
                            history.push('/')
                        } else {
                            alert('User account not found')
                        }
                    }
                }).catch(err => {
                    alert(err.code)
                })
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    return (
        <div className="Login">
            <div className="Left">
                <div className="right" >
                    <div className="content">
                        <img src={makitlogo} alt="alternatetext" id="image" />
                        <h2>MAKE IT</h2>
                        <p>The Best Website to get receipies</p>
                    </div>
                </div>
            </div>
            <div className="Right">
                <div className="left">
                    <form onSubmit={submit}>
                        <p>Login</p>
                        <div className="formgroup" >
                            <label className="label">Email :</label>
                            <input className="Input" type='email' autoComplete='false' onChange={e => { setUser({ ...user, email: e.target.value }) }} value={user.email} />
                        </div>
                        <div className="formgroup">
                            <label className="label">Password :</label>
                            <input type='password' onChange={e => { setUser({ ...user, password: e.target.value }) }} value={user.password} />
                        </div>
                        <div className="formgroup">
                            <input type='submit' value='Login' id="btn" />
                        </div>
                        <div className="formgroup">
                            <input type='button' value='Login With Google' id="btn" onClick={onGoogle} />
                        </div>
                        <div className="formgroup">
                            <input type='button' value='New To MakeIt' id="btn" onClick={() => {
                                history.push('/signup');
                            }} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
import React, { useState } from "react";
import './signup.css'
import makitlogo from '../../assets/images/logo.png'
import { auth, db } from '../../backend/backend';
import firebase from "firebase/compat/app";
import { useHistory } from "react-router-dom";

export default function Signup({ toSet }) {
    const history = useHistory()
    const [user, setUser] = useState({ email: '', password: '', username: '' })

    const submit = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
            db.ref('Users/' + res.user.uid).set({
                username: user.username, email: user.email,
            }).then(res => {
                auth.signOut()
                alert('signup successfull')
                history.push('/Login');
            }).catch(err => {

            })
        }).catch(error => {
            alert(error.code)
        })
    }

    return (
        <div className="Signup">
            <div className="Left">
                <div className="right" >
                    <div className="content">
                        <img src={makitlogo} alt="alternatetext" id="image" width="30%" height="30%" />
                        <h2>MAKE IT</h2>
                        <p>The Best Website to get receipies</p>
                    </div>
                </div>
            </div>
            <div className="Right">
                <div className="left">
                    <form onSubmit={submit}>
                        <p style={{ fontSize: '140%', fontWeight: 'bolder' }}>Signup</p>
                        <div className="formgroup" >
                            <label className="label">Username :</label>
                            <input className="Input" type='text' required autoComplete='false' onChange={e => { setUser({ ...user, username: e.target.value }) }} value={user.username} />
                        </div>
                        <div className="formgroup" >
                            <label className="label">Email :</label>
                            <input className="Input" type='email' required autoComplete='false' onChange={e => { setUser({ ...user, email: e.target.value }) }} value={user.email} />
                        </div>
                        <div className="formgroup">
                            <label className="label">Password :</label>
                            <input type='password' required onChange={e => { setUser({ ...user, password: e.target.value }) }} value={user.password} />
                        </div>
                        <div className="formgroup">
                            <input type='submit' value='Signup' id="btn" />
                        </div>
                        <div className="formgroup">
                            <input type='submit' value='Already a user' id="btn" onClick={() => {
                                history.push('/Login');
                            }} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
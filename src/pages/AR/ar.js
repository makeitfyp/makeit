import './ar.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../../backend/backend';
import Qrcode from './qrcode.png';
import arvideo from './MakeitAr.mp4'
export default function AR({ toSet }) {
    const [picker1, setPicker1] = useState();
    const [picker2, setPicker2] = useState();
    const [picker3, setPicker3] = useState();

    const { curuser } = useSelector(state => state.Reducer);
    useEffect(() => {
        console.log(curuser)
        toSet('ar')
        let user = auth.currentUser;
        if (user !== null) {

        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(user => {

                })
            } else {
                //auth with google auth
            }
        }

    }, [])

    return (
        <div className='AR'>

            <div className='Main'>
                <div className='Content'>
                <div >
                    <h1 className='titlear'> DEMO VIDEO OF AR APP</h1>
                    <video width="600" height="400" src={arvideo} controls style={{ alignSelf: 'center' }} />


                </div>
                <div >
                <h1 className='titlear2'> SCAN TO DOWNLOAD THE AR APP</h1>


                        <img style={{ marginLeft: '20%' }} width="400" height="400" src={Qrcode} alt="APP DOWNLOAD" />

</div>
                
            </div>            </div>

        </div>
    )
}
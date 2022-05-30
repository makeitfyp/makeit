import { useEffect, useState } from 'react';
import './notification.css';
import { auth, db, storage } from '../../backend/backend';

import { useSelector } from 'react-redux';

export default function Notification({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);

    useEffect(() => {
        let user = auth.currentUser;
        if (user !== null) {
            toSet('notification');
            db.ref('Notification/' + user.uid).on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    setNotification(snapshot.val())
                }
            })
            db.ref('Feedback/').on('value', (snapshot) => {
                if (snapshot.val() !== undefined && snapshot.val() !== null) {
                    let place_holder = []
                    Object.values(snapshot.val()).map(item => {
                        if (item.id == user.uid) {
                            place_holder.push(item)
                        }
                    })
                    setFeedback(place_holder)
                }
            })
        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(res => {
                    toSet('notification')
                    db.ref('Notification/' + res.uid).once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            setNotification(snapshot.val())
                        }
                    })
                    db.ref('Feedback/').on('value', (snapshot) => {
                        if (snapshot.val() !== undefined && snapshot.val() !== null) {
                            let place_holder = []
                            Object.values(snapshot.val()).map(item => {
                                if (item.id == user.uid) {
                                    place_holder.push(item)
                                }
                            })
                            setFeedback(place_holder)
                        }
                    })
                })

            } else {
                //google auth
            }
        }
    }, []);
    const onOpen = (item, index) => {
        let user = auth.currentUser;
        if (user !== null) {
            db.ref('Notification/' + user.uid + '/' + index).update({ status: '1' })
            setOpened(item)
            setrecipe_opened(true)
        }
    }
    const [notificaiton, setNotification] = useState([]);
    const [feedback, setFeedback] = useState([])
    const [opened, setOpened] = useState();
    const [recipe_opened, setrecipe_opened] = useState();

    const [feedback_opened, set_feedback_opened] = useState()
    const [selected_feedback, set_selected_feedback] = useState();
    return (
        <div className='Notification'>
            {
                opened === undefined ?
                    <div className='AllNotification'>
                        <h1>ALL NOTIFICATIONS</h1>
                        {
                            notificaiton.map((item, index) => {
                                return (
                                    <div className={item.status == '0' ? 'unopened' : 'opened'} key={index} onClick={() => {
                                        onOpen(item, index)
                                    }}>

                                        <table>
                                            <tr>
                                                <th>TYPE</th>
                                                <th>TITLE</th>
                                                <th>SUBJECT</th>
                                                <th>DATE</th>
                                            </tr>
                                            <tr>
                                                <td>Recipe</td>
                                                <td>{item.title}</td>
                                                <td>{item.subject}</td>
                                                <td>{String(new Date(parseInt(item.time))).substring(4, 15)}</td>
                                            </tr>
                                        </table>
                                    </div>
                                )
                            })
                        }
                    </div> :
                    <div className='oneNotification'>
                        <h1>{opened.title}</h1>
                        <h4>{opened.subject}</h4>
                        <p><span>Recipe Name :</span> {opened.body.TranslatedRecipeName}</p>
                        <p><span>Cusine :</span> {opened.body.Cuisine}</p>
                        <p><span>Date :</span>{String(new Date(parseInt(opened.time))).substring(4, 24)}</p>

                        <button className='button' onClick={() => { setOpened() }}>Close</button>
                    </div>
            }
            {
                feedback_opened === undefined ?
                    <div className='AllNotification'>
                        {
                            feedback.map((item, index) => {
                                return (
                                    <div className={item.status == '0' ? 'unopened' : 'opened'} key={index} onClick={() => {
                                        set_selected_feedback(item)
                                        set_feedback_opened(true)
                                    }}>
                                        <table>
                                            <tr>
                                                <th>TYPE</th>
                                                <th>TITLE</th>
                                                <th>YOUR MESSAGE</th>
                                                <th>ADMIN REPLY</th>

                                            </tr>
                                            <tr>
                                                <td>FEEDBACK</td>
                                                <td>{item.feedbackTitle}</td>
                                                <td>{item.feedback}</td>
                                                <td>{item.seen}</td>
                                            </tr>


                                        </table>
                                    </div>
                                )
                            })
                        }
                    </div> :
                    <div className='oneNotification'>
                        <h1> <span>Title :</span> {selected_feedback.feedbackTitle}</h1>
                        <h4><span>Subject :</span>{selected_feedback.feedbackSubject}</h4>
                        <p><span>Your Message :</span>{selected_feedback.feedback}</p>
                        <p><span>Admin Response :</span>{selected_feedback.seen}</p>

                        <p>{selected_feedback.seen == undefined ? 'Not seen by admin' : 'seen by admin'}</p>
                        <button className='button' onClick={() => { set_feedback_opened() }}>Close</button>
                    </div>
            }
        </div>

    )
}
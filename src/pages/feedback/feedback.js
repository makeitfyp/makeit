import './feedback.css'
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from 'react';
import { auth, db } from '../../backend/backend';
import { useSelector } from 'react-redux';
export default function Feedback({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);
    useEffect(() => {
        console.log(curuser)
        let user = auth.currentUser;
        if (user === null) {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(res => {
                    toSet('feedback')
                })
            }else{
                //google auth
            }
        } else {
        
            toSet('feedback')
        }
    }, [])
    const [input, setInput] = useState({
        rating: '5', feedback: '', feedbackTitle: '', feedbackSubject: ''
    })
    const onSubmit = (e) => {
        e.preventDefault();
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Feedback').once('value', (snapshot) => {
                let feedbackNo = 0;
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    feedbackNo = snapshot.val().length

                }
                db.ref('Feedback/' + feedbackNo).set({
                    id: user.uid, feedbackTitle: input.feedbackTitle, feedbackSubject: input.feedbackSubject,
                    feedback: input.feedback, feedbackNo: feedbackNo
                }).then(res => {
                    alert('Feed back submitted')
                    document.getElementById("feedbackForm").reset();
                    setInput({ ...input, rating: '5', feedback: '', feedbackTitle: '', feedbackSubject: '' });
                }).catch(err => {
                    alert('Error Please try submit again')
                })
            })
        }
    }
    return (
        <div className='Feedback'>

            <div className='formContainer'>

                <form onSubmit={onSubmit} id='feedbackForm'>
                    <div className='formGroup'>
                    <h1>We Are Here For You </h1>

                        <label>Title</label>
                        <input type='text' onChange={e => { setInput({ ...input, feedbackTitle: e.target.value }) }} />
                    </div>
                    <div className='formGroup'>
                        <label>Subject</label>
                        <input type='text' onChange={e => { setInput({ ...input, feedbackSubject: e.target.value }) }} />
                    </div>
                    <div className='formGroup'>
                        <label>Message</label>
                        <input type='text' onChange={e => { setInput({ ...input, feedback: e.target.value }) }} />
                    </div>
                    <div className='formGroup'>
                        <label>Rating</label>
                        <ReactStars
                            count={5}
                            onChange={e => { setInput({ ...input, rating: String(e) }) }}
                            size={24}
                            value={input.rating}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div className='formGroup'>
                        <input type='submit' value='Submit' id='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}
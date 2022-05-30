import { useEffect, useState } from 'react';
import { auth, db } from '../../backend/backend';
import './dietplan.css';
import { AiFillPlaySquare, AiFillPlusSquare } from 'react-icons/ai';
import { useSelector } from 'react-redux';
export default function DietPlan({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);
    useEffect(() => {
        toSet('plan');
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Deitplan/' + user.uid).on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    setMon(snapshot.val().Mon);
                    setTue(snapshot.val().Tue);
                    setWed(snapshot.val().Wed);
                    setThu(snapshot.val().Thu);
                    setFri(snapshot.val().Fri);
                    setSat(snapshot.val().Sat);
                    setSun(snapshot.val().Sun);
                }
            })
            db.ref('Recipies').once('value', (snapshot) => {
                let bTemp = [];
                let lTemp = [];
                let dTemp = [];
                let x = snapshot.val();
                x.map(item => {
                    if (item.Cuisine.toLowerCase().includes('break') || item.Cuisine.toLowerCase().includes('pakistani')) {
                        bTemp.push(item)
                    } else if (item.Cuisine.toLowerCase().includes('lunch') || item.Cuisine.toLowerCase().includes('kashmiri')) {
                        lTemp.push(item)
                    } else if (item.Cuisine.toLowerCase().includes('din') || item.Cuisine.toLowerCase().includes('sindhi')) {
                        dTemp.push(item)
                    }
                })
                setBreakFast(bTemp);
                setLunch(lTemp);
                setDinner(bTemp);
            })
        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(user => {
                    db.ref('Deitplan/' + user.uid).once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            setMon(snapshot.val().Mon);
                            setTue(snapshot.val().Tue);
                            setWed(snapshot.val().Wed);
                            setThu(snapshot.val().Thu);
                            setFri(snapshot.val().Fri);
                            setSat(snapshot.val().Sat);
                            setSun(snapshot.val().Sun);
                        }
                    })
                    db.ref('Recipies').once('value', (snapshot) => {
                        let bTemp = [];
                        let lTemp = [];
                        let dTemp = [];
                        let x = snapshot.val();
                        x.map(item => {
                            if (item.Cuisine.toLowerCase().includes('break') || item.Cuisine.toLowerCase().includes('pakistani')) {
                                bTemp.push(item)
                            } else if (item.Cuisine.toLowerCase().includes('lunch') || item.Cuisine.toLowerCase().includes('kashmiri')) {
                                lTemp.push(item)
                            } else if (item.Cuisine.toLowerCase().includes('din') || item.Cuisine.toLowerCase().includes('sindhi')) {
                                dTemp.push(item)
                            }
                        })
                        setBreakFast(bTemp);
                        setLunch(lTemp);
                        setDinner(bTemp);
                    })
                })
            } else {
                //google auth
            }
        }
    }, [])


    //dietplan selection
    const [mon, setMon] = useState({ break: '', lunhc: '', dinner: '' });
    const [tue, setTue] = useState({ break: '', lunhc: '', dinner: '' });
    const [wed, setWed] = useState({ break: '', lunhc: '', dinner: '' });
    const [thu, setThu] = useState({ break: '', lunhc: '', dinner: '' });
    const [fri, setFri] = useState({ break: '', lunhc: '', dinner: '' });
    const [sat, setSat] = useState({ break: '', lunhc: '', dinner: '' });
    const [sun, setSun] = useState({ break: '', lunhc: '', dinner: '' });
    //update diet plan in database
    const Update = () => {
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Deitplan/' + user.uid).update({
                Mon: mon, Tue: tue, Wed: wed, Thu: thu, Fri: fri, Sat: sat, Sun: sun

            }).then(res => {
                alert('Meal Plan updated succesfully')
            })
                .catch(err => {
                    alert('Please try again')
                })
        }
    }
    const [breakFast, setBreakFast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    //selector
    const [selector, setSelector] = useState({ day: '', type: '' });
    ///to show recipies at bottom
    const whichToShow = () => {
        if (selector.type === 'break') {
            return breakFast
        } else if (selector.type === 'lunch') {
            return lunch
        } else if (selector.type === 'dinner') {
            return dinner
        }
    }
    //set selected recipie
    const setIT = (item) => {
        if (selector.type !== '' && selector.day !== '') {
            if (selector.day === 'mon') {
                if (selector.type === 'break') {
                    setMon({ ...mon, break: item })
                } else if (selector.type === 'lunch') {
                    setMon({ ...mon, lunhc: item })
                } else if (selector.type === 'dinner') {
                    setMon({ ...mon, dinner: item })
                }
            } else if (selector.day === 'tue') {
                if (selector.type === 'break') {
                    setTue({ ...tue, break: item })
                } else if (selector.type === 'lunch') {
                    setTue({ ...tue, lunhc: item })
                } else if (selector.type === 'dinner') {
                    setTue({ ...tue, dinner: item })
                }
            } else if (selector.day === 'wed') {
                if (selector.type === 'break') {
                    setWed({ ...wed, break: item })
                } else if (selector.type === 'lunch') {
                    setWed({ ...wed, lunhc: item })
                } else if (selector.type === 'dinner') {
                    setWed({ ...wed, dinner: item })
                }
            } else if (selector.day === 'thu') {
                if (selector.type === 'break') {
                    setThu({ ...thu, break: item })
                } else if (selector.type === 'lunch') {
                    setThu({ ...thu, lunhc: item })
                } else if (selector.type === 'dinner') {
                    setThu({ ...thu, dinner: item })
                }
            } else if (selector.day === 'fri') {
                if (selector.type === 'break') {
                    setFri({ ...fri, break: item })
                } else if (selector.type === 'lunch') {
                    setFri({ ...fri, lunhc: item })
                } else if (selector.type === 'dinner') {
                    setFri({ ...fri, dinner: item })
                }
            } else if (selector.day === 'sat') {
                if (selector.type === 'break') {
                    setSat({ ...sat, break: item })
                } else if (selector.type === 'lunch') {
                    setSat({ ...sat, lunhc: item })
                } else if (selector.type === 'dinner') {
                    setSat({ ...sat, dinner: item })
                }
            } else if (selector.day === 'sun') {
                if (selector.type === 'break') {
                    setSun({ ...sun, break: item })
                } else if (selector.type === 'lunch') {
                    setSun({ ...sun, lunhc: item })
                } else if (selector.type === 'dinner') {
                    setSun({ ...sun, dinner: item })
                }
            }
        }
        setSelector({ ...selector, day: '', type: '' })
    }
    //return what day today is
    const toDay = () => {
        const d = new Date();
        const time = d.getHours();
        if (d.getDay() == 0) {
            if (time > 0 && time < 6) {
                return { item: sun.break, type: 'Breakfast' }
            } else if (time >= 6 && time < 12) {
                return { item: sun.lunhc, type: 'Lunch' }
            } else if (time >= 12 && time < 23.59) {
                return { item: sun.dinner, type: 'Dinner' }
            }
        } else if (d.getDay() == 1) {
            if (time > 0 && time < 6) {
                return { item: mon.break, type: 'Breakfast' }
            } else if (time >= 6 && time < 12) {
                return { item: mon.lunhc, type: 'Lunch' }
            } else if (time >= 12 && time < 23.59) {
                return { item: mon.dinner, type: 'Dinner' }
            }
        } else if (d.getDay() == 2) {
            if (time > 0 && time < 6) {
                return { item: tue.break, type: 'Breakfast' }
            } else if (time >= 6 && time < 12) {
                return { item: tue.lunhc, type: 'Lunch' }
            } else if (time >= 12 && time < 23.59) {
                return { item: tue.dinner, type: 'Dinner' }
            }
        } else if (d.getDay() == 3) {
            if (time > 0 && time < 6) {
                return { item: wed.break, type: 'Breakfast' }
            } else if (time >= 6 && time < 12) {
                return { item: wed.lunhc, type: 'Lunch' }
            } else if (time >= 12 && time < 23.59) {
                return { item: wed.dinner, type: 'Dinner' }
            }
        } else if (d.getDay() == 4) {
            if (time > 0 && time < 6) {
                return { item: thu.break, type: 'Breakfast' }
            } else if (time >= 6 && time < 12) {
                return { item: thu.lunhc, type: 'Lunch' }
            } else if (time >= 12 && time < 23.59) {
                return { item: thu.dinner, type: 'Dinner' }
            }
        }
        else if (d.getDay() == 5) {
            if (time > 0 && time < 6) {
                return { item: fri.break, type: 'Breakfast' }
            } else if (time >= 6 && time < 12) {
                return { item: fri.lunhc, type: 'Lunch' }
            } else if (time >= 12 && time < 23.59) {
                return { item: fri.dinner, type: 'Dinner' }
            }
        }
        else if (d.getDay() == 6) {
            if (time > 0 && time < 6) {
                return { item: sat.break, type: 'Breakfast' }
            } else if (time >= 6 && time < 12) {
                return { item: sat.lunhc, type: 'Lunch' }
            } else if (time >= 12 && time < 23.59) {
                return { item: sat.dinner, type: 'Dinner' }
            }
        }
    }
    return (
        <div className='DietPlan'>
            <div className='plan'>
                <div className='day'>
                    <h1>Monday</h1>
                    <div className='Menu'>
                        <div className='menuGroup'>
                            <p>{mon.break === '' ? 'Select Breakfast' : mon.break.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'mon', type: 'break' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{mon.lunhc == '' ? 'Select Lunch' : mon.lunhc.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'mon', type: 'lunch' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{mon.dinner === '' ? 'Select Dinner' : mon.dinner.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'mon', type: 'dinner' }) }} />
                        </div>
                    </div>
                </div>
                <div className='day'>
                    <h1>TuesDay</h1>
                    <div className='Menu'>
                        <div className='menuGroup'>
                            <p>{tue.break === '' ? 'Select Breakfast' : tue.break.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'tue', type: 'break' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{tue.lunhc === '' ? 'Select Lunch' : tue.lunhc.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'tue', type: 'lunch' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{tue.dinner == '' ? 'Select Dinner' : tue.dinner.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'tue', type: 'dinner' }) }} />
                        </div>
                    </div>
                </div>
                <div className='day'>
                    <h1>WednesDay</h1>
                    <div className='Menu'>
                        <div className='menuGroup'>
                            <p>{wed.break === '' ? 'Select Breakfast' : wed.break.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'wed', type: 'break' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{wed.lunhc == '' ? 'Select Lunch' : wed.lunhc.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'wed', type: 'lunch' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{wed.dinner === '' ? 'Select Dinner' : wed.dinner.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'wed', type: 'dinner' }) }} />
                        </div>
                    </div>
                </div>
                <div className='day'>
                    <h1>ThursDay</h1>
                    <div className='Menu'>
                        <div className='menuGroup'>
                            <p>{thu.break === '' ? 'Select Breakfast' : thu.break.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'thu', type: 'break' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{thu.lunhc === '' ? 'Select Lunch' : thu.lunhc.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'thu', type: 'lunch' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{thu.dinner === '' ? 'Select Dinner' : thu.dinner.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'thu', type: 'dinner' }) }} />
                        </div>
                    </div>
                </div>
                <div className='day'>
                    <h1>FriDay</h1>
                    <div className='Menu'>
                        <div className='menuGroup'>
                            <p>{fri.break === '' ? 'Select Breakfast' : fri.break.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'fri', type: 'break' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{fri.lunhc === '' ? 'Select Lunch' : fri.lunhc.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'fri', type: 'lunch' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{fri.dinner === '' ? 'Select Dinner' : fri.dinner.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'fri', type: 'dinner' }) }} />
                        </div>
                    </div>
                </div>
                <div className='day'>
                    <h1>SatureDay</h1>
                    <div className='Menu'>
                        <div className='menuGroup'>
                            <p>{sat.break === '' ? 'Select Breakfast' : sat.break.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'sat', type: 'break' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{sat.lunhc == '' ? 'Select Lunch' : sat.lunhc.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'sat', type: 'lunch' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{sat.dinner == '' ? 'Select Dinner' : sat.dinner.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'sat', type: 'dinner' }) }} />
                        </div>
                    </div>
                </div>
                <div className='day'>
                    <h1>SunDay</h1>
                    <div className='Menu'>
                        <div className='menuGroup'>
                            <p>{sun.break == '' ? 'Select Breakfast' : sun.break.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'sun', type: 'break' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{sun.lunhc === '' ? 'Select Lunch' : sun.lunhc.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'sun', type: 'lunch' }) }} />
                        </div>
                        <div className='menuGroup'>
                            <p>{sun.dinner === '' ? 'Select Dinner' : sun.dinner.TranslatedRecipeName}</p>
                            <AiFillPlusSquare id='picon' onClick={() => { setSelector({ ...selector, day: 'sun', type: 'dinner' }) }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='button'>
                <input type='button' id='btn' value='Update' onClick={Update} />
            </div>
            <div className='Recipies'>
                {
                    selector.type == '' ?
                        <div className='today'>
                            {
                                (toDay().item != undefined && toDay().item != '' && toDay().item != null) ?

                                    <div className='completeDetails'>
                                        <h2>Up-Coming: {toDay().type}</h2>
                                        <h4>Name</h4>
                                        <p>{toDay().item.TranslatedRecipeName}</p>
                                        <h4>Cuisine</h4>
                                        <p>{toDay().item.Cuisine}</p>
                                        <h4>Time</h4>
                                        <p>{toDay().item.TotalTimeInMins} Mins</p>
                                        <h4>Ingredients</h4>
                                        <p>{toDay().item.TranslatedIngredients}</p>
                                        <h4>Instruction</h4>
                                        <p>{toDay().item.TranslatedIngredients}</p>
                                        <img src={toDay().item.imageurl} id='img' />
                                    </div> :
                                    <h1>No Plan Selected Today</h1>
                            }

                        </div> :
                        <div className='selection'>
                            {whichToShow().map((item, index) => {
                                return (
                                    <div key={index} className='recipieCard' onClick={() => { setIT(item) }}>
                                        <img src={item.imageurl} alt="alternatetext" id="image" />
                                        <p >{item.TranslatedRecipeName}</p>
                                        <a href={item.URL} target="_blank" id='touchp'>See Complete Recipie</a>
                                    </div>
                                )
                            })}
                        </div>
                }
            </div>
        </div >
    )
}
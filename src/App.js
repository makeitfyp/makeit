import './App.css';

import { useEffect, useState } from "react";
//pages
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
//login
import NavBar from "./components/navbar/navbar"
import Home from './pages/home/home';
import Recipies from './pages/recipies/recipies';
import CustomRecipie from './pages/customrecipie/customrecipie';
import NewsFeed from './pages/newsfeed.js/newsfeed';
import Add from './pages/Add/Add';
import Feedback from './pages/feedback/feedback';
import Faq from './pages/faq/faq';
import About from './pages/about/about';
import DietPlan from './pages/dietplan/dietplan';
import Helpmanual from './pages/helpmanual/helpmanual';

import Notification from './pages/notifications/notification';
import Detect from './pages/detect/detect';
import AR from './pages/AR/ar';
//database
import { db, auth as Auth } from './backend/backend';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom';
//redux
import { useSelector, useDispatch } from 'react-redux';

export default function App() {
    const { curuser } = useSelector(state => state.Reducer);
    //load data
    useEffect(() => {
        let user = Auth.currentUser;
        if (user != null) {
            setAuth(true)
        }
        return (() => {

        })
    }, [])


    const [auth, setAuth] = useState(false);
    const [selected, setSelected] = useState('home');

    return (
        <Router>
            <div className="AuthApp">
                <Switch>
                    <Route exact path='/' >
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className="NavBar"   >
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className="Content" >
                                        <Home toSet={setSelected} />
                                    </div>
                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/recipies'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className="NavBar"   >
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className="Content" >
                                        <Recipies toSet={setSelected} />
                                    </div>
                                </> :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/customrecipies'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <CustomRecipie toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/add'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <Add toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/plan'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <DietPlan toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/ar'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <AR toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/newsfeed'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <NewsFeed toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/detect'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <Detect toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/feedback'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <Feedback toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/faq'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <Faq toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/helpmanual'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <Helpmanual toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/about'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <About toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>
                    <Route exact path='/notification'>
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <>
                                    <div className='NavBar'>
                                        <NavBar toSet={setSelected} selected={selected} setAuth={setAuth} />
                                    </div>
                                    <div className='Content' >
                                        <Notification toSet={setSelected} />
                                    </div>

                                </>
                                :
                                <Redirect to='/Login' />
                        }
                    </Route>

                    <Route exact path='/Login' >
                        {
                            curuser != undefined && curuser.auth !== false ?
                                <Redirect to='/' /> :
                                <Login toSet={setAuth} />
                        }
                    </Route>
                    <Route exact path='/signup' >
                        <Signup toSet={setAuth} />
                    </Route>
                </Switch>
            </div>
        </Router >
    )

}

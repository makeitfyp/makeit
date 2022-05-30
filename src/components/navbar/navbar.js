import './navbar.css'
import makitlogo from '../../assets/images/logo.png'
import { ImSpoonKnife, ImHome } from "react-icons/im";
import { GiRiceCooker } from "react-icons/gi";
import { SiVirtualbox } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import { GrPlan, GrChapterAdd } from 'react-icons/gr';
import { AiOutlineFileSearch } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md';
import { BiLogIn } from 'react-icons/bi';
import { TiMessages } from 'react-icons/ti'
import { useState } from 'react';
import { auth } from '../../backend/backend';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';
import { MdOutlineFeedback } from 'react-icons/md';
export default function NavBar({ toSet, selected, setAuth }) {
    const dispatch = useDispatch();

    const hist = useHistory()
    const logout = () => {
        auth.signOut().then(res => {
            let u = { email: null, password: null, auth: false, type: 'none' }
            dispatch(setCurrentUser(u))
            setAuth(false);
            toSet('');

        }).catch(err => {
            alert(err.code)
        })
        hist.push("/Login", "urlhistory");
    }
    return (
        <div className='navbar'>
            <div className='logoContainer'>
                <div className='imagecontainer'>
                    <img src={makitlogo} alt="MAKE IT" id="image" width="12%" height="14%" />
                </div>
            </div>
            <div className='componentContainer'>
                <div className='buttons'>
                    <Link to='/' className={selected == 'home' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('home') }} >
                        <ImHome id="btnimage" />
                        <p>Home</p>
                    </Link>

                    <Link to='/recipies' className={selected == 'recipie' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('recipie') }} >
                        <ImSpoonKnife id="btnimage" />
                        <p>Recipes</p>
                    </Link>

                    <Link to="/customrecipies" className={selected == 'custom' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('custom') }} >
                        <GiRiceCooker id="btnimage" />
                        <p>Custom Rec.</p>
                    </Link>
                    <Link to='/ar' className={selected == 'ar' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('ar') }} >
                        <SiVirtualbox id="btnimage" />
                        <p>AR</p>
                    </Link>
                    <Link to='/newsfeed' className={selected == 'newsfeed' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('newsfeed') }} >
                        <VscFeedback id="btnimage" />
                        <p>News Feed</p>
                    </Link>
                    <Link to='/detect' className={selected == 'detect' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('detect') }} >
                        <AiOutlineFileSearch id="btnimage" />
                        <p>Detect</p>
                    </Link>

                    <Link to='/plan' className={selected == 'plan' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('plan') }} >
                        <GrPlan id="btnimage" />
                        <p>Diet Plan</p>
                    </Link>
                    <Link to='/feedback' className={selected == 'feedback' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('feedback') }} >
                        <TiMessages id="btnimage" />
                        <p>Feedback</p>
                    </Link>
                    <Link to='notification' className={selected == 'notification' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('notifications') }} >
                        <MdOutlineNotifications id="btnimage" />
                        <p>Notification</p>
                    </Link>
                    <Link to='/About' className={selected == 'About' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('About') }}>
                        <MdOutlineFeedback id="btnimage" />
                        <p>About</p>
                    </Link>
                    <div className='buttonContainer' onClick={logout}>
                        <BiLogIn id="btnimage" />
                        <p>Logout</p>
                    </div>


                </div>
            </div>
        </div>
    )
}

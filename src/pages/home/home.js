import './home.css'

import { ImSpoonKnife, ImHome } from "react-icons/im";
import { SiVirtualbox } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import { GrPlan } from 'react-icons/gr';
import { AiOutlineFileSearch } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md';
import { TiMessages } from 'react-icons/ti'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../assets//images/hero.jpg'
import { useSelector } from 'react-redux';
import { auth } from '../../backend/backend';

export default function Home({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);

    useEffect(() => {
        let user = auth.currentUser;
        if (user !== null) {
            toSet('home')
        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(res => {
                    toSet('home')
                })
            } else {
                //google auth
            }
        }
    }, [])


    return (
        <div className='Home'>
            <div className='UpperImage'>
                <div className='image'>

                </div>
            </div>
            <div className='Featues'>
                <h1>Features</h1>
                <div className='row'>
                    <Link to='recipies' className='Card'>
                        <ImSpoonKnife id='cardIcon' />
                        <h2>Recipes</h2>
                        <p>Find Recipes Using Available Ingredients, Recipe Names or Using Different Filtering Methods</p>
                        <h5 onClick={() => { toSet('recipie') }}>TRY IT</h5>
                    </Link>
                    <Link to='ar' className='Card'>
                        <SiVirtualbox id='cardIcon' />
                        <h2>Augmented Reality</h2>
                        <p>View Different Foods In Augmented Reality Before Cooking</p>
                        <h5 onClick={() => { toSet('ar') }}>TRY IT</h5>
                    </Link>
                    <Link to='detect' className='Card'>
                        <AiOutlineFileSearch id='cardIcon' />
                        <h2>Recipe Detection</h2>
                        <p>A Machine Learning Powered Application TO Enhance User Experince</p>
                        <h5 onClick={() => { toSet('detect') }}>TRY IT</h5>
                    </Link>

                </div>
                <div className='row'>
                    <Link to='/newsfeed' className='Card'>
                        <VscFeedback id='cardIcon' />
                        <h2>News Feed</h2>
                        <p>Post About The Recipes And Tell The World About It Using The News Feed</p>
                        <h5 onClick={() => { toSet('newsfeed') }}>TRY IT</h5>
                    </Link>
                    <Link toSet='/plan' className='Card'>
                        <GrPlan id='cardIcon' />
                        <h2>Diet Plans</h2>
                        <p>Create Diet Plans Depending on Your Dietary Requirements Or Just Choose from Existing Plans</p>
                        <h5 onClick={() => { toSet('plan') }}>TRY IT</h5>
                    </Link>
                    <Link to='/feedback' className='Card'>
                        <TiMessages id='cardIcon' />
                        <h2>Feedback</h2>
                        <p>Want to Express your love with the Application Just Rate and Give Us A Feedback</p>
                        <h5 onClick={() => { toSet('feedback') }}>TRY IT</h5>
                    </Link>

                </div>
            </div>
        </div>
    )
}
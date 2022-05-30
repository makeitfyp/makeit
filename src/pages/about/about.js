import { useEffect, useState } from 'react';

import './about.css';
import { auth, db } from '../../backend/backend';
import { useSelector } from 'react-redux';
import { FaQuestionCircle } from "react-icons/fa";
import { FaHireAHelper } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import ReactLogo from "./images/react.png";
import cssLogo from "./images/css.png";
import expressLogo from "./images/express.png";
import typescriptLogo from "./images/typescript.png";
import mongodbLogo from "./images/mongodb.png";
import htmlLogo from "./images/html.png";
import javaLogo from "./images/java.png";
import firebaseLogo from "./images/firebase.png";
import javascriptLogo from "./images/javascript.png";
import nodeLogo from "./images/node-js.png";
import pythonLogo from "./images/python.png";
import gitLogo from "./images/git.png";
export default function About({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);
    useEffect(() => {
        let user = auth.currentUser;
        if (user !== null) {
            toSet('About')
        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(res => {
                    toSet('About')
                })
            } else {
                //google auth
            }
        }
    }, [])

    const images = [
        htmlLogo,
        cssLogo,
        javascriptLogo,
        mongodbLogo,
        expressLogo,
        ReactLogo,
        nodeLogo,
        javaLogo,
        typescriptLogo,
        firebaseLogo,
        pythonLogo,
        gitLogo,
    ];

    const logoImage = "logo-image";

    return (
        <div className="about">

            <div className="about-me" id="about">
                <div className="about-me-info">
                    <h1>MAKEIT </h1>

                    <p>
                    MakeIt is a system which provide users with different recipes using the selected ingredients and provide a complete guide so that one can easily cook it. With the help of MakeIt, user can also post about his experience of food prepared using the provided recipe or can view it in augmented reality before preparing the meal. It provides a platform where anyone can easily search or filter different recipes and prepare them with the help of free methods. MakeIt provides the users with many different functionalities to solve their problem of finding new recipes and preparing them.
                    </p>
                    <p>
                    People can also post about the meal prepared using the provided recipe and guide. Different filtering methods are also available so that the user can easily find the required recipe. Anyone can view the meal in Augmented Reality before preparing the meal. 
                    </p>
                   

                </div></div>
            <div className='aboutHome'>

                <div className='Featues'>
                    <h1 >WANT TO KNOW MORE ?</h1>
                    <div className='row'>

                        <Link to='faq' className='Card'>
                            <FaQuestionCircle id='cardIcon' />
                            <h2>FAQ</h2>
                            <p>View Frequently Asked Questions that the users have asked to us.</p>
                            <h5 onClick={() => { toSet('about') }}>TRY IT</h5>
                        </Link>
                        <Link to='helpmanual' className='Card'>
                            <FaHireAHelper id='cardIcon' />
                            <h2>HELP MANUAL</h2>
                            <p>View Help Manual to get better knowledge of our system</p>
                            <h5 onClick={() => { toSet('about') }}>TRY IT</h5>
                        </Link>


                    </div>

                </div>
            </div>
            <div id="skills">
                <h1>Skills And Technologies</h1>
                <div className="skills-container">
                    {images.map((img, index) => {
                        return (
                            <div className={logoImage + " image-" + (index + 1)} key={index}>
                                <img src={img} alt="" className="skill-image" />
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>

    );
}


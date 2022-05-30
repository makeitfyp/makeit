import { useEffect, useState } from 'react';
import './helpmanual.css';
import { auth, db, storage } from '../../backend/backend';

import { useSelector } from 'react-redux';

export default function Helpmanual({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);

    useEffect(() => {
        let user = auth.currentUser;
        if (user !== null) {
            toSet('about');

        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(res => {
                    toSet('about')

                })
            } else {
                //google auth
            }
        }
    }, []);

    return (
        <div >
            <div className="helpmanual" id="about">
                <div className="helpmanual-info">
                    <h1>HELP MANUAL </h1>
                    <p>
                        What is MakeIt?
                    </p>
                    <p>
                        With the help of MakeIt, user can also post about his experience of food prepared using the provided recipe or can view it in augmented reality before preparing the meal. It will provide a platform where anyone can easily search or filter different recipes and prepare them with the help of free methods. People who are concerned about their health could use our meal planner to sort recipes for them. The system will also have a feature to extract recipe name from the image, as some peoples don’t know which recipe it might be. The system will also have an admin panel to respond to the queries of users & adding new features to the system. MakeIt will provide the users with many different functionalities to solve their problem of finding new recipes and preparing them.
                    </p>

                    <p>
                        Module 1: User Profiling
                    </p>
                    <p>
                        In this module, users can create the account. This module will basically develop different types of users. The different type of users are admin and client. The main purpose of this module is to authenticate and authorize the different users of our system.
                    </p>

                    <p>
                        Module 2: Admin Panel
                    </p>
                    <p>
                        This module provides the admin with full access of the system. Admin can manage different aspects of the system like recipes, user profiling, AR models, user feedbacks, add new admins and user posts.
                    </p>

                    <p>
                        Module 3: Scrape Recipes
                    </p>
                    <p>
                        In this module we have implemented the techniques of web scraping to scrape recipes data and upload it into our system. The users can view a variety of recipes using the different search filters that the system provides.
                    </p>

                    <p>
                        Module 4: Augmented Reality
                    </p>
                    <p>
                        The purpose of this module is to help users view the recipes in augmented reality. At times people are concerned of how there recipe will look after it has been cooked. Our AR feature helps these users to view a variety of recipes in real time kind of environment.
                    </p>

                    <p>
                        Module 5: Recipe Name Predictor
                    </p>
                    <p>
                        It is one of the major modules of our Web application. This module implements the techniques of machine learning. Convolutional Neural Network is used in this module. The purpose of this module is to help people know the names of the recipes which they don’t. Just by uploading the image of the recipe our model predicts the name.
                    </p>

                    <p>
                        Module 6: News Feed
                    </p>
                    <p>
                        The purpose of this module is to enable the user to post about the recipes and other users can also interact with posts just like in Facebook and twitter this will enhance user experience.
                    </p>
                    <p>
                        Module 7: Diet Plan
                    </p>
                    <p>
                        The purpose of this module is to help people in creating diet plans. This is helpful for those users who are concerned about their health. By using this feature they can easily manage their diets.
                    </p>

                    <p>
                        Module 8: Search, filter, and Notifications
                    </p>
                    <p>
                        In this module user are able to search and filter the results. User can also view Different notifications from the system.
                    </p>

                    <p>
                        Module 9: Feedback, FAQs, and Rating
                    </p>
                    <p>
                        The purpose of this module is to get the feedback and ratings from the user. This module helps the user in using the application. The users can give their feedbacks and view FAQs and help manual.
                    </p>
                </div>
            </div>
        </div>
    )
}

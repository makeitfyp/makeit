import { useEffect, useState } from 'react';
import SingleQuestion from './Question';

import "./faq.css";
import { auth, db, storage } from '../../backend/backend';

import { useSelector } from 'react-redux';

export default function Faq({ toSet }) {

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


    const questionsarr = [
        {
            id: 1,
            title: 'What is MakeIt?',
            info:
                'With the help of MakeIt, user can also post about his experience of food prepared using the provided recipe or can view it in augmented reality before preparing the meal. It will provide a platform where anyone can easily search or filter different recipes and prepare them with the help of free methods. People who are concerned about their health could use our meal planner to sort recipes for them. The system will also have a feature to extract recipe name from the image, as some peoples don’t know which recipe it might be. The system will also have an admin panel to respond to the queries of users & adding new features to the system. MakeIt will provide the users with many different functionalities to solve their problem of finding new recipes and preparing them.',
        },
        {
            id: 2,
            title: 'What is the purpose of MakeIt?',
            info:
                'The purpose of our system is to help users in finding a variety of recipes using different search filters using one platform. The users can also interact with other users by telling about their recipes and health goals using news feed feature. The users can also detect a food image and view it in augmented reality.',
        },
        {
            id: 3,
            title: 'How to contact MakeIt Admin?',
            info:
                'Go to feedback. Give your feedback there and our admin will respond back to you.',
        },
        {
            id: 4,
            title: 'How does image detection works?',
            info:
                'The image detection works on the basic principle of training and testing the model. We have used inception model as it gave us the highest accuracy of all the models that we had tried. Basically, when a user sends the image to our model. It firstly resizes & rescales the image and then converts it to numpy array. The array is then passed to the 1st layer of our model where it then collects the brightest nodes after performing activation functions. Then these nodes are passed to next and so on. In the final layer that has 17 nodes, the model converts the array into lenght of 17 and the highest value out of 17 indexes represents the Food class name. This module is implemented using streamlit framework based on python.',
        },
        {
            id: 5,
            title: 'How to make a diet plan',
            info:
                'Click on diet plan button in the navbar. Now click add icon along the day & time you want your diet to be managed. Then select a recipe. Your recipe will be added along that day and time',
        },
        {
            id: 6,
            title: 'How to view AR model of a recipe',
            info:
                'Scan the QR code in the augmented reality page of our system. Download the mobile app. Then click on any recipe from the list in the app and you can view its AR model',
        },
    ];
    const [questions, setQuestions] = useState(questionsarr);
    return (
        <div>
            <faqmain>

                <div className='faqcontainer'>
                    <h1>Frequently Asked Questions </h1>
                    <section className='info'>
                        {
                            questions.map((question) => {
                                return <SingleQuestion key={question.id} {...question} />;
                            })
                        }
                    </section>
                </div>
            </faqmain>
        </div>
    )
}


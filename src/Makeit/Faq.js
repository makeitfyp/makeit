import React, { useState } from 'react';
import SingleQuestion from './Question';
import Header from "./Header";
import {
  useParams
} from "react-router-dom";
import "./Faq.css";

function Faq() {
  let {userID} = useParams();
    const questionsarr = [
        {
            id: 1,
            title: 'What is Makeit',
            info:
              'With the help of MakeIt, user can also post about his experience of food prepared using the provided recipe or can view it in augmented reality before preparing the meal. It will provide a platform where anyone can easily search or filter different recipes and prepare them with the help of free methods. People who are concerned about their health could use our meal planner to sort recipes for them. The system will also have a feature to extract recipe name from the image, as some peoples don’t know which recipe it might be. The system will also have an admin panel to respond to the queries of users & adding new features to the system. MakeIt will provide the users with many different functionalities to solve their problem of finding new recipes and preparing them.',
          },
      ];
  const [questions, setQuestions] = useState(questionsarr);
  
  return (
   <div>
       <Header id={userID}/>
   <faqmain>
        
      <div className='faqcontainer'> 
        <h1>Frequently Asked Questions </h1>
        <section className='info'>
          {
            questions.map((question) => {
              return <SingleQuestion key={question.id} {...question}/>;
            })
          }
        </section>
      </div>
    </faqmain>
    </div>
  );
}

export default Faq;

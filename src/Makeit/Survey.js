import React,{useState} from 'react';
import Select from 'react-select';
import { CheckboxGroup } from '../components/shared/Form/Checkbox';
import RadioGroup, { Radio } from '../components/shared/Form/Radio';
import Button from '../components/shared/Button';
import Tabs, { Tab } from '../components/shared/Tabs';
import Header from './Header';
import './Survey.css';
import Axios from "axios"
import {
  useParams
} from "react-router-dom";



function Survey() {

  const options = [
    { value: 500, label: '500' },
    { value: 1000, label: '1000' },
    { value: 1500, label: '1500' },
    { value: 2000, label: '2000' },
    { value: 2500, label: '2500' },
  ];
  const optionsDiet = [
    { value: "Gluten Free", label: "Gluten Free" },
    { value: "Ketogenic", label: 'Ketogenic' },
    { value: "Vegetarian", label: 'Vegetarian' },
    { value: "Lacto-Vegetarian", label: "Lacto-Vegetarian" },
    { value: "Ovo-Vegetarian", label: "Ovo-Vegetarian" },
    { value: "Vegan", label: "Vegan" },
    { value: "Pescetarian", label: "Pescetarian"},
    { value: "Paleo", label: "Paleo" },
    { value: "Primal", label: "Primal" },
    { value: "LowFODMAP", label: "LowFODMAP"},
    { value: "Whole30", label: "Whole30" },
  ];
  let {userID} = useParams();
  const[selectedOption,userSelectedOption]=useState(0);
  const[dietOption,userDietOption]=useState(0);
  const[result,setResult]=useState(false);
  const[data,setData]=useState([]);
  const[tab,setTab]=useState("1");
  const handleSelect = (e) => {
    const target = e.target;
    this.setState({ [target.name]: parseInt(target.value, 10) });
  }
  
  const goTo = (e) => {
    e.preventDefault();
    const Tabs = this.tabs;
    switch (e.target.name) {
      case "next":
        Tabs.handleClick(Tabs.state.activeIndex + 1);
        break;
      case "back":
        Tabs.handleClick(Tabs.state.activeIndex - 1);
        break;
      default:
        break;
    }
  }
  return (
    <div><Header id={userID}/>

      <div className="Survey">
        {
        result?<div className="Survey__content">
          <table>
          <tr>
            <th>------</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
          <tr>
          <th>Breakfast</th>
          <th onClick={()=>{
            window.open(data.week.monday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')
          }}>{data.week.monday.meals[0].title}</th>
          <th onClick={()=>{   window.open(data.week.tuesday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.tuesday.meals[0].title}</th>
          <th onClick={()=>{   window.open(data.week.wednesday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.wednesday.meals[0].title}</th>
          <th onClick={()=>{   window.open(data.week.thursday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.thursday.meals[0].title}</th>
          <th onClick={()=>{   window.open(data.week.friday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.friday.meals[0].title}</th>
          <th onClick={()=>{   window.open(data.week.saturday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.saturday.meals[0].title}</th>
          <th onClick={()=>{   window.open(data.week.sunday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.sunday.meals[0].title}</th>
              </tr>

              <tr>
          <th>Lunch</th>
          <th onClick={()=>{   window.open(data.week.monday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.monday.meals[1].title}</th>
          <th onClick={()=>{   window.open(data.week.tuesday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.tuesday.meals[1].title}</th>
          <th onClick={()=>{   window.open(data.week.wednesday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.wednesday.meals[1].title}</th>
          <th onClick={()=>{   window.open(data.week.thursday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.thursday.meals[1].title}</th>
          <th onClick={()=>{   window.open(data.week.friday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.friday.meals[1].title}</th>
          <th onClick={()=>{   window.open(data.week.saturday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.saturday.meals[1].title}</th>
          <th onClick={()=>{   window.open(data.week.sunday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.sunday.meals[1].title}</th>
              </tr>

              <tr>
          <th>Dinner</th>
          <th onClick={()=>{   window.open(data.week.monday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.monday.meals[2].title}</th>
          <th onClick={()=>{   window.open(data.week.tuesday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.tuesday.meals[2].title}</th>
          <th onClick={()=>{   window.open(data.week.wednesday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.wednesday.meals[2].title}</th>
          <th onClick={()=>{   window.open(data.week.thursday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.thursday.meals[2].title}</th>
          <th onClick={()=>{   window.open(data.week.friday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.friday.meals[2].title}</th>
          <th onClick={()=>{   window.open(data.week.saturday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.saturday.meals[2].title}</th>
          <th onClick={()=>{   window.open(data.week.sunday.meals[0].sourceUrl, '_blank', 'noopener,noreferrer')  }}>{data.week.sunday.meals[2].title}</th>
              </tr>
          
          
          </table>
        </div>:
        <div className="Survey__content">
          <div className="Survey__heading"><h1>Some quick questions to generate that awesome meal plan ..</h1></div>
          <h2>Select how many calories you want per meal? </h2>
                <Select
                    value={selectedOption}
                    defaultValue={selectedOption}
                    onChange={(selection)=>{
                      userSelectedOption(selection);
                    }}
                    options={options}
                  />
                  <h2>Select diet type for meals? </h2>
                <Select
                    value={dietOption}
                    defaultValue={dietOption}
                    onChange={(diet)=>{
                      userDietOption(diet);
                    }}
                    options={optionsDiet}
                  />
                <div className="Survey__goto">
                  <Button onClick={async ()=>{
                      if(selectedOption==0){
                        alert("Please Select Calories Requerment")
                      }else if(dietOption==0){
                        alert("Please Select Diet Option")
                      }else{
                        const response = await Axios.get(
                          "https://api.spoonacular.com/mealplanner/generate?apiKey=5c68501560ab462f9faf6776b621a788&timeFrame=week&targetCalories="+selectedOption.value+"&diet="+dietOption.value
                        );
                        setData(response.data)
                        setResult(true)
                        console.log(response)
                      }
                      
                    }} 
            className="Survey__goto__button--next">Get Plan</Button>
                </div>
              
        </div>
}

      </div>
      
      </div>
  )
}
export default Survey

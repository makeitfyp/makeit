import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import SearchIcon from "@material-ui/icons/Search";
import Header from './Header';
import fetch from "node-fetch";
import firebase from 'firebase/compat/app';

import { db } from "./firebase";
import {
  getFirestore, query,
  getDocs, collection,
  where, addDoc
} from "firebase/firestore";
import {
  useParams
} from "react-router-dom";
import "./CustomRecipe.css"
import { async } from "@firebase/util";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";
const MainRecipe = () => {
  const [ingredients, setIngredients] = useState([])

  let { userID } = useParams();
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [cusine, setCusine] = useState([]);
  let rJson = require('.././Makeit/recipes.json');
  const [cusineList, setCuisineList] = useState([]);
  const [time, setTimeList] = useState([])
  const [selectedTime, setSelectedTime] = useState();
  const [selectedCusinse, setSelectedCusine] = useState()
  {/*    
        var rec = {
          recipe: {
            label: temp.TranslatedRecipeName,
            image: temp['image-url'],
            url: temp.URL,
            calories: "unknown",
            ingredients: temp['Cleaned-Ingredients']
          }
        }
        some(r => c.indexOf(r) > 0)
        t.push(rec)*/}

  const contains = async (arr1, arr2) => {
    let ingredientsCount = 0;
    let x = await arr1.map(async (item) => {
      if (arr2.includes(item)) {
        ingredientsCount = ingredientsCount + 1
      }
    })
    //for reciepies with atleast half ingredient present ==> ((ingredientsCount / arr2.length) * 100) > 50
    if (ingredientsCount > 0) {
      return { isPresent: true, ingredientsCount: ingredientsCount, missing: arr2.length - ingredientsCount }
    } else {
      return { isPresent: false, ingredientsCount: ingredientsCount, missing: arr2.length - ingredientsCount }
    }
  }
  useEffect(() => {
    let ingredient = [];
    let temp = [];
    let tim = [];
    let timeTemp = []
    let cus = []
    let cusTemp = [];

    rJson.map(item => {
      let x = item['Cleaned-Ingredients'].split(",").map(ing => {
        temp.push(ing)
      })
      timeTemp.push(item.TotalTimeInMins);
      cusTemp.push(item.Cuisine);
    })
    temp.map(item => {
      if (ingredient.includes(item)) {
      } else {
        ingredient.push(item);
      }
    });
    timeTemp.map(item => {
      if (tim.includes(item)) {

      } else {
        tim.push(item)
      }
    })
    cusTemp.map(item => {
      if (cus.includes(item)) {

      } else {
        cus.push(item)
      }
    })
    tim.sort((a, b) => (a > b) ? 1 : -1)
    setIngredients(ingredient);
    setCuisineList(cus);
    setTimeList(tim);
  }, [])

  const sort = async () => {
    var t = []
    var tempList = [...rJson]
    var c = [...cusine]
    for (var i = 0; i < tempList.length; i++) {
      var temp = tempList[i];
      let object = await contains(cusine, temp['Cleaned-Ingredients'].split(","))
      if (object.isPresent == true && selectedCusinse == undefined && selectedTime == undefined) {
        var rec = {
          recipe: {
            label: temp.TranslatedRecipeName,
            image: temp['image-url'],
            url: temp.URL,
            calories: "unknown",
            ingredients: temp['Cleaned-Ingredients'],
            missing: object.missing,
            time: temp.TotalTimeInMins,
            cusine: temp.Cuisine,
          }
        }
        t.push(rec)
      } else if (object.isPresent == true && selectedCusinse != undefined && temp.Cuisine == selectedCusinse && selectedTime == undefined) {
        var rec = {
          recipe: {
            label: temp.TranslatedRecipeName,
            image: temp['image-url'],
            url: temp.URL,
            calories: "unknown",
            ingredients: temp['Cleaned-Ingredients'],
            missing: object.missing,
            time: temp.TotalTimeInMins,
            cusine: temp.Cuisine,
          }
        }
        t.push(rec)
      } else if (object.isPresent == true && selectedCusinse == undefined && selectedTime != undefined && temp.TotalTimeInMins <= selectedTime) {
        var rec = {
          recipe: {
            label: temp.TranslatedRecipeName,
            image: temp['image-url'],
            url: temp.URL,
            calories: "unknown",
            ingredients: temp['Cleaned-Ingredients'],
            missing: object.missing,
            time: temp.TotalTimeInMins,
            cusine: temp.Cuisine,
          }
        }
        t.push(rec)
      } else if (object.isPresent == true && selectedCusinse != undefined && temp.Cuisine == selectedCusinse && selectedTime != undefined && temp.TotalTimeInMins <= selectedTime) {
        var rec = {
          recipe: {
            label: temp.TranslatedRecipeName,
            image: temp['image-url'],
            url: temp.URL,
            calories: "unknown",
            ingredients: temp['Cleaned-Ingredients'],
            missing: object.missing,
            time: temp.TotalTimeInMins,
            cusine: temp.Cuisine,
          }
        }
        t.push(rec)
      }
    }
    t.sort((a, b) => (parseInt(a.recipe.missing) > parseInt(b.recipe.missing) ? 1 : -1));
    updateRecipeList(t)
  }
  useEffect(() => {
    sort()
  }, [cusine, selectedTime, selectedCusinse])
  //search
  const [searched, setSearched] = useState(false);
  const [searchedIngredients, setSearchedIngredients] = useState([]);
  const onTextChange = (e) => {
    if (e != undefined && e.length > 0) {
      console.log('changing')
      setSearched(true)
      let x = ingredients;
      let temp = [];
      x.map(item => {
        if (item.includes(e)) {
          if (!temp.includes(item)) {
            temp.push(item)
          }
        }
      })
      setSearchedIngredients(temp)
    } else {
      setSearched(false);
      setSearchedIngredients([])
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Header id={userID} />
      <div style={{ display: 'flex', flexDirection: 'row wrap', flex: 1, marginTop: '1%' }}>
        <div style={{ flex: 0.3, }}>
          <SearchBox style={{ alignSelf: 'left' }}>
            <SearchIcon />
            <SearchInput
              placeholder="Search Ingredients"
              onChange={(e) => { onTextChange(e.target.value) }}
            />
          </SearchBox>
          {
            searched ?
              <div className="Filter" style={{ marginTop: '2%' }} >
                {searchedIngredients.map((ing, ind) => {
                  if (!cusine.includes(ing)) {
                    return (
                      <p key={ind} onClick={() => {
                        var t = [...cusine]
                        t.push(ing)
                        setCusine(t)
                      }} id={'none'}>{ing}</p>
                    )
                  }
                })}
              </div>
              :
              <div>
                {
                  cusine.length > 0 ?
                    <div>
                      <h4 id="title">
                        Remove ingredients
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'row' }} className="Filter">
                        {cusine.map((ing, ind) => {
                          return (
                            <p key={ind} onClick={() => {
                              if (cusine.includes(ing)) {
                                var t = [...cusine]
                                var filtered = t.filter(function (value, index, arr) {
                                  return value != ing;
                                });
                                setCusine(filtered)
                              }
                            }} id={'selectedd'}>{ing} X</p>
                          )
                        })}
                      </div>
                    </div>
                    :
                    null
                }
                <h4 id="title">
                  Choose Ingredients
                </h4>
                <div className="Filter" >
                  {ingredients.map((ing, ind) => {
                    if (!cusine.includes(ing)) {
                      return (
                        <p key={ind} onClick={() => {
                          var t = [...cusine]
                          t.push(ing)
                          setCusine(t)
                        }} id={cusine.includes(ing) ? 'selectedd' : 'none'}>{ing}</p>
                      )
                    }
                  })}
                </div>
              </div>
          }
        </div>
        <div style={{ flex: 0.7, }}>
          <div>
            <div className="Filter" style={{ display: 'flex', flexGrow: 'row wrap' }}>
              <h4 style={{ alignSelf: 'center', fontSize: '20px', width: '12%' }}>Time(min):  </h4>
              {
                time.map((item, index) => {
                  return (
                    <p key={index} onClick={() => {
                      if (selectedTime == item) {
                        setSelectedTime()
                      } else {
                        setSelectedTime(item)
                      }

                    }} id={selectedTime == item ? 'selectedd' : 'none'}>{item}</p>
                  )
                })
              }
            </div>

            <div className="Filter" style={{ display: 'flex', flexGrow: 'row wrap' }}>
              <h4 style={{ alignSelf: 'center', fontSize: '20px', width: '12%' }}>Cusine:  </h4>
              {
                cusineList.map((item, index) => {
                  return (
                    <p key={index} onClick={() => {
                      if (item == selectedCusinse) {
                        setSelectedCusine()
                      } else {
                        setSelectedCusine(item)
                      }
                    }} id={selectedCusinse == item ? 'selectedd' : 'none'}>{item}</p>
                  )
                })
              }
            </div>
          </div>
          <RecipeListContainer>
            {recipeList?.length ? (
              recipeList.map((recipe, index) => (
                <RecipeComponent key={index} recipe={recipe.recipe} />
              ))
            ) : (
              <Placeholder>
                <Container className="recipe">
                  {recipeList.map((recipe, index) => (
                    <RecipeComponent key={index} recipe={recipe.recipe} />
                  ))
                  }
                </Container>
                <Container>
                  <p style={{ fontSize: '15px', textAlign: 'left', color: '#000', width: '50%', fontWeight: '200' }}>Add your ingredients to get started
                    Every ingredient you add unlocks more recipes</p>
                </Container>
              </Placeholder>
            )}
          </RecipeListContainer>
        </div>
      </div>
    </div>
  );
};

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url, calories, missing } = props.recipe;
  return (
    <RecipeContainer>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      {
        missing > 0 ?
          <label style={{ marginBottom: '5px', fontSize: '15px' }}>You are mssing {missing} ingredients</label> :
          <label style={{ marginBottom: '5px', fontSize: '15px' }}></label>
      }
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};


const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 200px;
  box-shadow: 0 3px 10px 0 #aaa;
  background-color: white;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
`;
const Button = styled.button`
  display: inline-block;
  color: black;
  font-size: 24px;
  margin: 1em;
  background-color: white;
  border-width: 0 0 1px 0;
  display: block;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 20px;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBox = styled.div`
  color: black;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  border-radius: 25px;
  padding: 15px 10px;
  cursor: auto;
  display: flex;
  margin-left:20px;
  width: 50%;
`;

const RecipeImage = styled.img`
  width: 36px;
  height: 36px;
  margin: 15px;
`;
const Placeholder = styled.div`
  color: black;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  font-family: Tahoma, Verdana, sans-serif;
  margin: 50px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  margin-botton: -105px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;
export default MainRecipe;

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
const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";
const ingredients = ['tomato', 'salt', 'ginger', 'red chillies', 'curry', 'asafoetida', 'mustard', 'chana dal', 'onion', 'oil', 'coriander seeds', 'white urad dal', 'cashew nuts', 'yellow moong dal (split)', 'green chilli', 'rice', 'coriander (dhania) leaves', 'ghee', 'asafoetida (hing)', 'water', 'black peppercorns', 'curry leaves', 'cumin seeds (jeera)', 'mint leaves (pudina)', 'sunflower oil', 'tamarind water', 'coconut', 'mustard seeds', 'jaggery', 'vellai poosanikai (ash gourdwhite pumpkin)', 'dry red chillies', 'coriander (dhania) seeds', 'methi seeds (fenugreek seeds)', 'turmeric powder', 'sesame seeds (til seeds)', 'spring onion greens', 'hung curd (greek yogurt)', 'black beans', 'cloves garlic', 'rice brown rice', 'lemon', 'cheddar cheese', 'spinach leaves (palak)', 'tortillas', 'idli', 'red chilli powder', 'tomato ketchup', 'green bell pepper (capsicum)', 'green chillies']
const MainRecipe = () => {

  let { userID } = useParams();
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [cusine, setCusine] = useState([]);
  const [selected, setSelected] = useState(['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none']);
  let rJson = require('.././Makeit/recipes.json');


  useEffect(() => {
    console.log(cusine)
    var t = []
    var tempList = [...rJson]
    var c = [...cusine]
    for (var i = 0; i < tempList.length; i++) {
      var temp = tempList[i]
      if (temp['Cleaned-Ingredients'].split(",").some(r => c.indexOf(r) >= 0)) {
        var rec = {
          recipe: {
            label: temp.TranslatedRecipeName,
            image: temp['image-url'],
            url: temp.URL,
            calories: "unknown",
            ingredients: temp['Cleaned-Ingredients']
          }
        }
        t.push(rec)
      }
    }
    console.log(t.length)
    updateRecipeList(t)

  }, [cusine])

  return (
    <div><Header id={userID} />
      <Container>
        <h1 id="title">
          Choose Ingredients to search for recipe
        </h1>
        <Container>
          <div className="Filter">
            {ingredients.map((ing, ind) => (
              <p key={ind} onClick={() => {
                console.log(ing)
                var temp = [...selected];
                temp[ind] = temp[ind] == "selected" ? "none" : "selected"
                setSelected(temp)
                if (cusine.includes(ing)) {
                  console.log(cusine)
                  var t = [...cusine]
                  var filtered = t.filter(function (value, index, arr) {
                    return value != ing;
                  });
                  setCusine(filtered)
                } else {
                  var t = [...cusine]
                  t.push(ing)
                  setCusine(t)
                }
              }} id={selected[ind]}>{ing}</p>
            ))}


          </div>
        </Container>
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
              <Button> No Such Recipe Found</Button>
              <Container>
                <h4>Please Change Ingredients</h4>
              </Container>
            </Placeholder>
          )}
        </RecipeListContainer>
      </Container>
    </div>
  );
};

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url, calories } = props.recipe;
  return (
    <RecipeContainer>

      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>

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
  width: 300px;
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
  margin: 0 auto;
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

import React, { useState,useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import SearchIcon from "@material-ui/icons/Search";
import Header from './Header';
import fetch from "node-fetch";
import {
  useParams
} from "react-router-dom";
import "./MainRecipe.css"
const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

const MainRecipe = () => {
  
  let {userID} = useParams();
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [cusine, setCusine] = useState("Italian");
  const [selected, setSelected] = useState(["selected","none","none","none","none","none","none"]);
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&from=0&to=12&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    console.log(response.data.hits)
    updateRecipeList(response.data.hits);
  };
  useEffect(()=>{
    fetchData(cusine);

  },[cusine])
  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
    setSelected(["none","none","none","none","none","none","none"]);
  
  };

  return (
    <div><Header id={userID}/>
      <Container>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
          <h1 id="title">
          Choose A Filter or Search For A Recipe
          </h1>
              <Container>
                <div className="Filter">
                <p onClick={()=>{
                  
                  setSelected(["selected","none","none","none","none","none","none"])
                  if(cusine!="Italian"){
                    setCusine("Italian")
                    updateSearchQuery("")
                  }
                }} id={selected[0]}>Italian</p>
                <p onClick={()=>{
                  
                  setSelected(["none","selected","none","none","none","none","none"])
                  if(cusine!="Indian"){
                    setCusine("Indian")
                    updateSearchQuery("")
                  }
                }}  id={selected[1]}>Indian</p>
                <p onClick={()=>{
                  
                  setSelected(["none","none","selected","none","none","none","none"])
                  if(cusine!="Chinese"){
                    setCusine("Chinese")
                    updateSearchQuery("")
                  }
                }}  id={selected[2]}>Chinese</p>
                <p onClick={()=>{
                  
                  setSelected(["none","none","none","selected","none","none","none"])
                  if(cusine!="Korean"){
                    setCusine("Korean")
                    updateSearchQuery("")
                  }
                }}  id={selected[3]}>Korean</p>
                <p onClick={()=>{
                  
                  setSelected(["none","none","none","none","selected","none","none"])
                  if(cusine!="Turkish"){
                    setCusine("Turkish")
                    updateSearchQuery("")
                  }
                }}  id={selected[4]}>Turkish</p>
                <p onClick={()=>{
                  
                  setSelected(["none","none","none","none","none","selected","none"])
                  if(cusine!="Burger"){
                    setCusine("Burger")
                    updateSearchQuery("")
                  }
                }}  id={selected[5]}>Burger</p>
                <p onClick={()=>{
                  
                  setSelected(["none","none","none","none","none","none","selected"])
                  if(cusine!="Pizza"){
                    setCusine("Pizza")
                    updateSearchQuery("")
                  }
                }}  id={selected[6]}>Pizza</p>
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
              { recipeList.map((recipe, index) => (
              <RecipeComponent key={index} recipe={recipe.recipe} />
               ))
            }  
              </Container>
              <Button> Featured Recipes</Button>
              <Container>
                <h4>Featured Recipes will be here</h4>
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
      <Dialog
        onClose={() => console.log("Test")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
              <th>foodCategory</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                  <td>{ingredient.foodCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
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

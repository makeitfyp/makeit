import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import './detect.css'
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import SearchIcon from "@material-ui/icons/Search";
import { useParams } from "react-router-dom";


const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";
function App() {

    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([])
    const [history, setHistory] = useState([])
    let names;

    const imageRef = useRef()
    const textInputRef = useRef()
    const fileInputRef = useRef()

    let { userID } = useParams();
    const [recipeList, updateRecipeList] = useState([]);
    const [timeoutId, updateTimeoutId] = useState();

    const fetchData = async (searchString) => {
        const response = await Axios.get(
            `https://api.edamam.com/search?q=${searchString}&from=0&to=12&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        console.log(response.data.hits)
        updateRecipeList(response.data.hits);
    };

    const onIdentify = (searchsString) => {
        clearTimeout(timeoutId);
        const timeout = setTimeout(() => fetchData(searchsString), 500);
        updateTimeoutId(timeout);

    };




    const loadModel = async () => {
        setIsModelLoading(true)
        try {
            const model = await mobilenet.load()
            setModel(model)
            setIsModelLoading(false)
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
    }

    const uploadImage = (e) => {
        const { files } = e.target
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0])
            setImageURL(url)
        } else {
            setImageURL(null)
        }
    }
    const identify = async () => {
        textInputRef.current.value = ''
        const results = await model.classify(imageRef.current)
        setResults(results)
        onIdentify(names)

    }

    const handleOnChange = (e) => {
        setImageURL(e.target.value)
        setResults([])
    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }
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


    useEffect(() => {
        loadModel()
    }, [])

    useEffect(() => {
        if (imageURL) {
            setHistory([imageURL, ...history])
        }
    }, [imageURL])

    if (isModelLoading) {
        return <h2>Model Loading...</h2>
    }
    return (
        <div className="App">
            <div className='inputHolder'>
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                <span className='or'>OR</span>
                <input type="text" placeholder='Paster image URL' ref={textInputRef} onChange={handleOnChange} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img className="img" src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {results.length > 0 && <div className='resultsHolder'>
                        {results.map((result, index) => {
                            if (index == 0) {
                                names = result.className
                                return (
                                    <div>
                                        <h1> PREDICTION</h1>
                                        <div className='result' key={result.className}>
                                            <span className='name'>{result.className}</span>
                                            <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'></span>}</span>

                                        </div></div>
                                )


                            }
                        }
                        )
                        }
                    </div>}
                </div>
                {imageURL && <button className='detectbutton' onClick={identify}>Identify Image</button>}
            </div>
            <div>
                <h1 className="prerecipe">PREDICTED RECIPES</h1>
                <div>
                    <Container>

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

                                </Placeholder>
                            )}
                        </RecipeListContainer>
                    </Container>
                </div>
                <button className='pythonbutton' onClick={(e) => {
                    e.preventDefault();
                    window.open('https://share.streamlit.io/salmaki-hub/food_classification_streamlit_app/main/app.py');
                }}>
                    USE THE PYTHON VERSION
                </button>
            </div>

            {history.length > 0 && <div className="recentPredictions">

                <h2>Recent Images</h2>
                <div className="recentImages">
                    {history.map((image, index) => {
                        return (
                            <div className="recentPrediction" key={`${image}${index}`}>
                                <img img className="img" src={image} alt='Recent Prediction' onClick={() => setImageURL(image)} />
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );


}
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

export default App;

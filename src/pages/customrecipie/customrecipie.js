import { useEffect, useState } from 'react';
import './customreciepie.css'
import { auth, db } from '../../backend/backend'
import { AiOutlineSearch, AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {  GrChapterAdd } from 'react-icons/gr';

export default function CustomRecipie({ toSet,selected }) {
    const { curuser } = useSelector(state => state.Reducer);
    useEffect(() => {
        toSet('custom')
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Users/' + user.uid).on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    if (snapshot.val().likedRec != undefined && snapshot.val().likedRec != null) {
                        let temp = [];
                        Object.values(snapshot.val().likedRec).map(item => {
                            temp.push(item)
                        })
                        setUserFav(temp)
                    }
                }
            })

            db.ref('Recipies').on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    let recTemp = [];
                    let cusineTemp = [];
                    let timeTemp = [];
                    let ingTemp = [];
                    let r = snapshot.val();
                    Object.values(r).map(item => {
                        let rec = new Object();
                        rec['Ingredient'] = item.CleanedIngredients.split(',')
                        rec['Cuisine'] = item.Cuisine;
                        rec['Ingredientcount'] = item.Ingredientcount;
                        rec['TotalTimeInMins'] = item.TotalTimeInMins;
                        rec['TranslatedIngredients'] = item.TranslatedIngredients;
                        rec['TranslatedInstructions'] = item.TranslatedInstructions;
                        rec['TranslatedRecipeName'] = item.TranslatedRecipeName;
                        rec['URL'] = item.URL;
                        rec['imageurl'] = item.imageurl;
                        recTemp.push(rec);
                        if (!cusineTemp.includes(item.Cuisine)) {
                            cusineTemp.push(item.Cuisine)
                        }
                        if (!timeTemp.includes(item.TotalTimeInMins)) {
                            timeTemp.push(item.TotalTimeInMins)
                        }
                        item.CleanedIngredients.split(',').map(item => {
                            if (!ingTemp.includes(item)) {
                                ingTemp.push(item)
                            }
                        })
                    })
                    timeTemp.sort((a, b) => a > b ? 1 : -1)
                    setRecipies(recTemp);
                    setCusine(cusineTemp);
                    setTime(timeTemp);
                    setIngr(ingTemp)
                }
            })
        } else {
            if (curuser.type == 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(user => {
                    db.ref('Users/' + user.uid).once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            if (snapshot.val().likedRec != undefined && snapshot.val().likedRec != null) {
                                let temp = [];
                                Object.values(snapshot.val().likedRec).map(item => {
                                    temp.push(item)
                                })
                                setUserFav(temp)
                            }
                        }
                    })
                    db.ref('Recipies').once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            let recTemp = [];
                            let cusineTemp = [];
                            let timeTemp = [];
                            let ingTemp = [];
                            let r = snapshot.val();
                            Object.values(r).map(item => {
                                let rec = new Object();
                                rec['Ingredient'] = item.CleanedIngredients.split(',')
                                rec['Cuisine'] = item.Cuisine;
                                rec['Ingredientcount'] = item.Ingredientcount;
                                rec['TotalTimeInMins'] = item.TotalTimeInMins;
                                rec['TranslatedIngredients'] = item.TranslatedIngredients;
                                rec['TranslatedInstructions'] = item.TranslatedInstructions;
                                rec['TranslatedRecipeName'] = item.TranslatedRecipeName;
                                rec['URL'] = item.URL;
                                rec['imageurl'] = item.imageurl;
                                recTemp.push(rec);
                                if (!cusineTemp.includes(item.Cuisine)) {
                                    cusineTemp.push(item.Cuisine)
                                }
                                if (!timeTemp.includes(item.TotalTimeInMins)) {
                                    timeTemp.push(item.TotalTimeInMins)
                                }
                                item.CleanedIngredients.split(',').map(item => {
                                    if (!ingTemp.includes(item)) {
                                        ingTemp.push(item)
                                    }
                                })
                            })
                            timeTemp.sort((a, b) => a > b ? 1 : -1)
                            setRecipies(recTemp);
                            setCusine(cusineTemp);
                            setTime(timeTemp);
                            setIngr(ingTemp)
                        }
                    })
                })
            }else{
                //google auth
            }
        }

    }, []);

    //check how many recipies are present
    const present = (arr1, arr2) => {
        let count = 0;
        arr2.map(item => {
            if (arr1.includes(item)) {
                count = count + 1
            }
        })
        if (count > 0) {
            return { present: true, missing: (arr1.length - count) }
        } else {
            return { present: false, missing: arr1.length }
        }
    }
    //const apply selected conditions
    const applySelectedConditions = () => {
        let temp = [];
        if (selectedIng == undefined || selectedIng.length == 0) {
            setFiltered([])
        } else {
            if (selectedCusines !== '' && selectedTime !== '') {

                recipies.map(item => {
                    if (item.Cuisine == selectedCusines && item.TotalTimeInMins <= selectedTime) {
                        let x = present(item.Ingredient, selectedIng)
                        if (x.present) {
                            let rec = new Object();
                            rec['Ingredient'] = item.Ingredient
                            rec['Cuisine'] = item.Cuisine;
                            rec['Ingredientcount'] = item.Ingredientcount;
                            rec['TotalTimeInMins'] = item.TotalTimeInMins;
                            rec['TranslatedIngredients'] = item.TranslatedIngredients;
                            rec['TranslatedInstructions'] = item.TranslatedInstructions;
                            rec['TranslatedRecipeName'] = item.TranslatedRecipeName;
                            rec['URL'] = item.URL;
                            rec['imageurl'] = item.imageurl;
                            rec['missing'] = x.missing;
                            temp.push(rec)
                        }
                    }
                })
            } else if (selectedCusines !== '' && selectedCusines == '') {
                recipies.map(item => {
                    if (item.Cuisine == selectedCusines) {
                        let x = present(item.Ingredient, selectedIng)
                        if (x.present) {
                            let rec = new Object();
                            rec['Ingredient'] = item.Ingredient
                            rec['Cuisine'] = item.Cuisine;
                            rec['Ingredientcount'] = item.Ingredientcount;
                            rec['TotalTimeInMins'] = item.TotalTimeInMins;
                            rec['TranslatedIngredients'] = item.TranslatedIngredients;
                            rec['TranslatedInstructions'] = item.TranslatedInstructions;
                            rec['TranslatedRecipeName'] = item.TranslatedRecipeName;
                            rec['URL'] = item.URL;
                            rec['imageurl'] = item.imageurl;
                            rec['missing'] = x.missing;
                            temp.push(rec)
                        }
                    }
                })
            } else if (selectedCusines === '' && selectedTime !== '') {
                recipies.map(item => {
                    if (item.TotalTimeInMins <= selectedTime) {
                        let x = present(item.Ingredient, selectedIng)
                        if (x.present) {
                            let rec = new Object();
                            rec['Ingredient'] = item.Ingredient
                            rec['Cuisine'] = item.Cuisine;
                            rec['Ingredientcount'] = item.Ingredientcount;
                            rec['TotalTimeInMins'] = item.TotalTimeInMins;
                            rec['TranslatedIngredients'] = item.TranslatedIngredients;
                            rec['TranslatedInstructions'] = item.TranslatedInstructions;
                            rec['TranslatedRecipeName'] = item.TranslatedRecipeName;
                            rec['URL'] = item.URL;
                            rec['imageurl'] = item.imageurl;
                            rec['missing'] = x.missing;
                            temp.push(rec)
                        }
                    }
                })
            } else {
                recipies.map(item => {
                    let x = present(item.Ingredient, selectedIng);
                    if (x.present) {
                        let rec = new Object();
                        rec['Ingredient'] = item.Ingredient
                        rec['Cuisine'] = item.Cuisine;
                        rec['Ingredientcount'] = item.Ingredientcount;
                        rec['TotalTimeInMins'] = item.TotalTimeInMins;
                        rec['TranslatedIngredients'] = item.TranslatedIngredients;
                        rec['TranslatedInstructions'] = item.TranslatedInstructions;
                        rec['TranslatedRecipeName'] = item.TranslatedRecipeName;
                        rec['URL'] = item.URL;
                        rec['imageurl'] = item.imageurl;
                        rec['missing'] = x.missing;
                        temp.push(rec)
                    }
                })
            }
            temp.sort((a, b) => a.missing > b.missing ? 1 : -1);
            setFiltered(temp);
        }
    }


    const [recipies, setRecipies] = useState([]);
    const [time, setTime] = useState([]);
    const [cusine, setCusine] = useState([]);
    const [ingr, setIngr] = useState([]);
    //selection
    const [searched, setSearched] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedIng, setSelectedIng] = useState([]);
    const [selectedCusines, setSelectedCusines] = useState('');
    useEffect(() => {

    }, [selectedIng, selectedCusines, selectedTime])
    //filtered arra
    const [filtered, setFiltered] = useState([]);
    const [thisRec, setThisRec] = useState();
    //user fav recipies
    const [userFav, setUserFav] = useState([]);
    //like rec
    const likeRec = (index) => {
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Users/' + user.uid + '/likedRec').once('value', (snapshot) => {
                let liked = []
                if (snapshot.val() != undefined && snapshot.val() != undefined) {
                    liked = snapshot.val()
                }
                liked.push(index);
                db.ref('Users/' + user.uid).update({
                    likedRec: liked
                }).then(res => {

                }).catch(err => {
                    alert('Please try liking again')
                })
            }).catch(err => {
                alert('Please try liking again')
            })
        }
    }
    const unLikeRecipie = (index) => {
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Users/' + user.uid + '/likedRec').once('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    let liked = snapshot.val()
                    let temp = [];
                    liked.map(item => {
                        if (item != index) {
                            temp.push(item)
                        }
                    })
                    db.ref('Users/' + user.uid).update({
                        likedRec: temp
                    }).then(res => {

                    }).catch(err => {
                        alert('Please try liking again')
                    })
                }
            })
        }
    }

    //remove item 
    const removeItem = (ing) => {
        let temp = [];
        selectedIng.map(item => {
            if (item != ing) {
                temp.push(item)
            }
        })
        setSelectedIng(temp);
        applySelectedConditions()
    }
    //add item
    const addItem = (ing) => {
        setSelectedIng([...selectedIng, ing])
        applySelectedConditions()
    }

    if (thisRec !== undefined) {
        return (
            <div className='customerrecipie'>
                <div className='recContainer'>
                    <div className='detDiv'>
                        <h4>Name</h4>
                        <p>{thisRec.TranslatedRecipeName}</p>
                    </div>
                    <div className='detDiv'>
                        <h4>Cusines: </h4>
                        <p>{thisRec.Cuisine}</p>
                    </div>
                    <div className='detDiv'>
                        <h4>Time: </h4>
                        <p>{thisRec.TotalTimeInMins} minutes</p>
                    </div>
                    <div className='detDiv'>
                        <h4>Detailed Ingredient</h4>
                        <p>{thisRec.TranslatedIngredients}</p>
                    </div>
                    <div className='detDiv'>
                        <h4>Missing Ingredient</h4>
                        <div className='missingIng'>
                            {
                                thisRec.Ingredient.map((item, index) => {
                                    return (
                                        <p key={index}>{!selectedIng.includes(item) ? item : null}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <p id='touchp' onClick={() => { setThisRec() }}>close</p>

                </div>
            </div >
        )
    } else {
        return (
            <div className='customerrecipie'>
                <div className='top'>
                <div className='buttons'>

                <Link to='/add' className={selected == 'add' ? 'buttonContainerSelected' : 'buttonContainer'} onClick={() => { toSet('add') }}>
                        <p>Request Recipes</p>
                    </Link>                        </div>

                    <div className='searchbar'>

                        <div className='container'>
                            <AiOutlineSearch id='srchIcon' />
                            <input type='search' placeholder='Search Ingredients' onChange={(e) => { setSearched(e.target.value) }} />
                        </div>
                    </div>

                    <div className='cusines'>
                        {
                            cusine.map((item ,index)=> {
                                return (
                                    <div key={index} className={selectedCusines == item ? 'selectedcusine' : 'cusine'} onClick={() => {
                                        if (selectedCusines == item) {
                                            setSelectedCusines('');
                                            applySelectedConditions();
                                        } else {
                                            setSelectedCusines(item);
                                            applySelectedConditions();
                                        }
                                    }}>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='times' >
                        {
                            time.map((item, index) => {
                                return (
                                    <div className={selectedTime == item ? 'selectedTime' : 'time'} key={index} onClick={() => {
                                        if (selectedTime == item) {
                                            setSelectedTime('')
                                            applySelectedConditions();
                                        } else {
                                            setSelectedTime(item)
                                            applySelectedConditions();
                                        }
                                    }}>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                
                <div>  
                <div className='body'>
                    <div className='left'>
                        <div className='selected'>
                        <h1>SELECTED INGREDIENTS </h1>
                        
                            {
                                selectedIng.map(item => {
                                    /* INGREDIENTS MAPPING*/
                                    return (
                                        <div className='selecteding' onClick={() => {
                                            removeItem(item)
                                        }}>
                                            
                                            <p>{item}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='notselected' >
                        <h1>ALL INGREDIENTS LIST{}</h1>
                            {
                                ingr.map((item, index) => {
                                    if (!selectedIng.includes(item)) {
                                        if (searched == undefined || searched == '') {
                                            return (
                                                <div className='ing' onClick={() => {
                                                    addItem(item)
                                                }} key={index}>
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        } else {
                                            if (item.toLocaleLowerCase().includes(searched.toLocaleLowerCase())) {
                                                return (
                                                    <div className='ing' key={index} onClick={() => {
                                                        addItem(item)
                                                    }}>
                                                        <p>{item}</p>
                                                    </div>
                                                )
                                            } else {
                                                return null
                                            }
                                        }
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className='right'>
                        {
                            selectedIng.length > 0 ?
                                <div className='searchedrecContainer'>
                                    {
                                        filtered.map((item, index) => {
                                            return (
                                                <div className='recipieCard'>
                                                    <img src={item.imageurl} alt="alternatetext" id="image" />
                                                    <p >{item.TranslatedRecipeName}</p>
                                                    <p>{item.missing > 0 ? (item.missing + ' missing ingredient') : null} </p>
                                                    {
                                                        userFav.includes(index) ?
                                                            <AiFillHeart id='favHeart' onClick={() => {
                                                                unLikeRecipie(index)
                                                            }} /> :
                                                            <AiFillHeart id='nonFavHeart' onClick={() => {
                                                                likeRec(index)
                                                            }} />
                                                    }
                                                    <p id='touchp' onClick={() => { setThisRec(item) }}>See Details</p>
                                                    <a href={item.URL} target="_blank" id='touchp'>See Complete Recipie</a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                null
                        }
                    </div>
                </div></div>
            </div>
        )
    }

}


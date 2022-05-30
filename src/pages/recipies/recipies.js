import { useEffect, useState } from 'react';
import './recipies.css';
import { AiOutlineSearch, AiFillHeart } from 'react-icons/ai'
import { auth, db } from '../../backend/backend';
import { useSelector } from 'react-redux';

export default function Recipies({ toSet }) {
    const [thisRec, setThisRec] = useState();

    const { curuser } = useSelector(state => state.Reducer);
    useEffect(() => {
        console.log(curuser)
        toSet('recipie')
        let user = auth.currentUser;
        if (user !== null) {
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
            db.ref('Recipies/').on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    setRecipies(snapshot.val());
                    allcusines(snapshot.val())
                }
            })
        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(user=> {
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
                    db.ref('Recipies/').once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            setRecipies(snapshot.val());
                            allcusines(snapshot.val())
                        }
                    })
                })
            } else {
                //auth with google auth
            }
        }

    }, [])
    //get all cusines
    const allcusines = (list) => {
        let temp = [];
        list.map(item => {
            if (!temp.includes(item.Cuisine)) {
                temp.push(item.Cuisine)
            }
        });
        setcusines(temp, selected);
    }

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
    //user fav recipies
    const [userFav, setUserFav] = useState([]);

    //all cusines
    const [cusines, setcusines] = useState([]);
    //all recipies
    const [recipies, setRecipies] = useState([]);
    //selected cusines
    const [selected, setSelected] = useState();
    //searched text
    const [searched, setSearched] = useState('')
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
                    <p id='touchp' onClick={() => { setThisRec() }}>close</p>

                </div>
            </div >
        )
    } 
    return (
        <div className='Recipie'>
            <div className='top'>
                <div className='searchbar'>
                    <div className='container'>
                        <AiOutlineSearch id='srchIcon' />
                        <input type='search' placeholder='Search Recipes' onChange={(e) => { setSearched(e.target.value) }} />
                    </div>
                </div>
                <div className='cusines'>
                    {
                        cusines.map((item, index) => {
                            return (
                                <div key={index} className={selected == item ? 'cusinesCardSelected' : 'cusinesCard'} onClick={() => {
                                    if (selected == item) {
                                        setSelected()
                                    } else {
                                        setSelected(item)
                                    }
                                }} >
                                    <p>{item}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='list'>
                {
                    recipies.map((item, index) => {
                        if (searched != '' && selected != undefined) {
                            if (item.TranslatedRecipeName.toLowerCase().includes(searched.toLocaleLowerCase()) && item.Cuisine == selected) {
                                var url = item['imageurl']
                                var toUrl = item['URL']
                                return (
                                    <div className='RecipieCard' key={index}>
                                        <img src={url} alt="alternatetext" id="image" />
                                        <p >{item.TranslatedRecipeName}</p>
                                        {
                                            userFav.includes(index) ?
                                                <AiFillHeart id='favHeart' onClick={() => {
                                                    unLikeRecipie(index)
                                                }} /> :
                                                <AiFillHeart id='nonFavHeart' onClick={() => {
                                                    likeRec(index)
                                                }} />
                                        }
                                        <a href={toUrl} target="_blank" id='touchp'>See Complete Recipie</a>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        } else if (searched != '' && selected == undefined) {
                            if (item.TranslatedRecipeName.toLowerCase().includes(searched.toLocaleLowerCase())) {
                                var url = item['imageurl']
                                var toUrl = item['URL']
                                return (
                                    <div className='RecipieCard' key={index}>
                                        <img src={url} alt="alternatetext" id="image" />
                                        <p >{item.TranslatedRecipeName}</p>
                                        {
                                            userFav.includes(index) ?
                                                <AiFillHeart id='favHeart' onClick={() => {
                                                    unLikeRecipie(index)
                                                }} /> :
                                                <AiFillHeart id='nonFavHeart' onClick={() => {
                                                    likeRec(index)
                                                }} />
                                        }
                                        <a href={toUrl} target="_blank" id='touchp'>See Complete Recipie</a>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        } else if (searched == '' && selected != undefined) {
                            if (item.Cuisine == selected) {
                                var url = item['imageurl']
                                var toUrl = item['URL']
                                return (
                                    <div className='RecipieCard' key={index}>
                                        <img src={url} alt="alternatetext" id="image" />
                                        <p >{item.TranslatedRecipeName}</p>
                                        {
                                            userFav.includes(index) ?
                                                <AiFillHeart id='favHeart' onClick={() => {
                                                    unLikeRecipie(index)
                                                }} /> :
                                                <AiFillHeart id='nonFavHeart' onClick={() => {
                                                    likeRec(index)
                                                }} />
                                        }
                                        <a href={toUrl} target="_blank" id='touchp'>See Complete Recipie</a>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        }
                        else {
                            var url = item['imageurl']
                            var toUrl = item['URL']
                            return (
                                <div className='RecipieCard' key={index}>
                                    <img src={item.imageurl} alt="image not found" id="image" />
                                    <p >{item.TranslatedRecipeName}</p>
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

                                    <a href={toUrl} target="_blank" id='touchp'>See Complete Recipie</a>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
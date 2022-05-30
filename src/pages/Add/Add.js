import { useEffect, useState } from 'react';
import './Add.css';
import { auth, db } from '../../backend/backend';
import { useSelector } from 'react-redux';
export default function Add({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);
    useEffect(() => {
        let user = auth.currentUser;
        if (user !== null) {
            toSet('add')
        } else {
            if (curuser.type === 'email') {
                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(res => {
                    toSet('add')
                })
            } else {
                //google auth
            }
        }
    }, [])
    const [recipie, setRecipie] = useState({
        CleanedIngredients: '', Cuisine: '', Ingredientcount: '', TotalTimeInMins: '', TranslatedIngredients: '',
        TranslatedInstructions: '', TranslatedRecipeName: '', URL: '', imageurl: ''
    })
    //const on submit
    const Submit = (e) => {
        e.preventDefault();
        let user = auth.currentUser;
        let waitNumber = 0;
        if (user != null) {
            db.ref('submittedRecipies/').once('value', (snapshot) => {
                if (snapshot.val() !== undefined && snapshot.val() != null) {
                    waitNumber = snapshot.val().length;
                }
                db.ref('submittedRecipies/' + waitNumber).set({
                    CleanedIngredients: recipie.CleanedIngredients, Cuisine: recipie.Cuisine, Ingredientcount: recipie.Ingredientcount,
                    TotalTimeInMins: recipie.TotalTimeInMins, TranslatedIngredients: recipie.TranslatedIngredients, TranslatedInstructions: recipie.TranslatedInstructions,
                    TranslatedRecipeName: recipie.TranslatedRecipeName, URL: recipie.URL, imageurl: recipie.imageurl, userid: user.uid
                }).then(res => {
                    db.ref('submittedRecNumber').once('value', (snapshot) => {
                        if (snapshot.val() !== undefined && snapshot.val() !== null) {
                            db.ref('submittedRecNumber').set((parseInt(snapshot.val()) + 1));
                        } else {
                            db.ref('submittedRecNumber').set(1);
                        }
                    })
                    alert('receipi submitted to admin');
                    document.getElementById("myForm").reset();
                    setRecipie({
                        ...recipie, CleanedIngredients: '', Cuisine: '', Ingredientcount: '', TotalTimeInMins: '', TranslatedIngredients: '', TranslatedInstructions: '',
                        TranslatedRecipeName: '', URL: '', imageurl: ''
                    })

                }).catch(err => {
                    alert(err)
                })
            })
        }
    }
    return (
        <div className='AddContainer'>
            <div className='formcontainer'>
                <form onSubmit={Submit} id='myForm'>
                <h1>ADD A RECIPE</h1>

                    <div className='formGroup'>
                        <label>Ingredients</label>
                        <input type='text' onChange={(e) => { setRecipie({ ...recipie, CleanedIngredients: e.target.value }) }} placeholder='comma seperatd e-g ing 1, ing 2' />
                    </div>
                    <div className='formGroup'>
                        <label>Cusine</label>
                        <input type='text' onChange={(e) => { setRecipie({ ...recipie, Cuisine: e.target.value }) }} placeholder='name' />
                    </div>
                    <div className='formGroup'>
                        <label>Ingredient Count</label>
                        <input type='number' onChange={(e) => { setRecipie({ ...recipie, Ingredientcount: e.target.value }) }} placeholder='2' />
                    </div>
                    <div className='formGroup'>
                        <label>Total Time In Mins</label>
                        <input type='number' onChange={(e) => { setRecipie({ ...recipie, TotalTimeInMins: e.target.value }) }} placeholder='60' />
                    </div>
                    <div className='formGroup'>
                        <label>Detail Ingredient</label>
                        <input type='text' onChange={(e) => { setRecipie({ ...recipie, TranslatedIngredients: e.target.value }) }} placeholder='comma seperated e-g 1/4 ing 1, 2/3 ing 2' />
                    </div>
                    <div className='formGroup'>
                        <label>Instruction</label>
                        <input type='text' onChange={(e) => { setRecipie({ ...recipie, TranslatedInstructions: e.target.value }) }} placeholder='complete instruction' />
                    </div>
                    <div className='formGroup'>
                        <label>Recipie Name</label>
                        <input type='text' onChange={(e) => { setRecipie({ ...recipie, TranslatedRecipeName: e.target.value }) }} placeholder='Mughlai Booti' />
                    </div>
                    <div className='formGroup'>
                        <label>Recpie Url</label>
                        <input type='text' onChange={(e) => { setRecipie({ ...recipie, URL: e.target.value }) }} placeholder='link to recipie' />
                    </div>
                    <div className='formGroup'>
                        <label>Recepie Image Url</label>
                        <input type='text' onChange={(e) => { setRecipie({ ...recipie, imageurl: e.target.value }) }} placeholder='link to recipie image' />
                    </div>
                    <div className='formGroup'>
                        <input type='submit' value='Add Recipie' id='submit' />
                    </div>
                </form>
            </div>
        </div>
    )

}
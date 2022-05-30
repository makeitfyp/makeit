import { useEffect, useState } from 'react';
import './newsfeed.css';
import { auth, db, storage } from '../../backend/backend';
import { AiFillLike, AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux';

var url = 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
export default function NewsFeed({ toSet }) {
    const { curuser } = useSelector(state => state.Reducer);

    useEffect(() => {
        console.log(curuser)
        toSet('newsfeed');
        let user = auth.currentUser;
        if (user != null) {
            setUser(user)
            db.ref('Users/' + user.uid).on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    if (snapshot.val().likedRec != undefined && snapshot.val().likedRec != null) {
                        let temp = [];
                        Object.values(snapshot.val().likedRec).map(item => {
                            temp.push(item)
                        })
                        setFavRec(temp)
                    }
                }
            })
            db.ref('Recipies/').on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    setRec(snapshot.val());
                }
            })
            db.ref('Posts/').on('value', (snapshot) => {
                if (snapshot.val() !== undefined && snapshot.val() !== null) {
                    setAllPosts(snapshot.val().reverse());
                }
                db.ref('Users/').on('value', (snapshot) => {
                    if (snapshot.val() !== undefined && snapshot.val() !== null) {
                        setAllUsers(snapshot.val());
                        let p = snapshot.val()[user.uid];
                        setProfile(p)
                    }
                    setLoading(false)
                })
            })
        } else {
            if (curuser.type == 'email') {

                auth.signInWithEmailAndPassword(curuser.email, curuser.password).then(user => {
                    setUser(user)
                    db.ref('Users/' + user.uid).once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            if (snapshot.val().likedRec != undefined && snapshot.val().likedRec != null) {
                                let temp = [];
                                Object.values(snapshot.val().likedRec).map(item => {
                                    temp.push(item)
                                })
                                setFavRec(temp)
                            }
                        }
                    })
                    db.ref('Recipies/').once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            setRec(snapshot.val());
                        }
                    })
                    db.ref('Posts/').once('value', (snapshot) => {
                        if (snapshot.val() != undefined && snapshot.val() != null) {
                            setAllPosts(snapshot.val().reverse());
                        }
                        db.ref('Users/').once('value', (snapshot) => {
                            if (snapshot.val() != undefined && snapshot.val() != null) {
                                setAllUsers(snapshot.val());
                                let p = snapshot.val()[user.uid];
                                setProfile(p)
                            }
                            setLoading(false)
                        })
                    })
                })
            } else {
                //google auth
            }
        }

    }, []);
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [post, setPost] = useState({ text: '', image: '' })
    const [profile, setProfile] = useState({ name: '', image: '' });
    const [allPosts, setAllPosts] = useState([]);
    const [user, setUser] = useState({ id: '' });
    const [allusers, setAllUsers] = useState([]);
    const [onlyMyPost, setOnlyMyPost] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [newUser, setNewUser] = useState({ image: '', name: '', });
    const [favRec, setFavRec] = useState([]);
    const [rec, setRec] = useState([]);
    const [selected, setSelected] = useState();
    const [comment, setComment] = useState();
    //update user 
    const updateUser = async (e) => {
        e.preventDefault();
        let user = auth.currentUser;
        if (user != null) {
            if (newUser.image != undefined && newUser.image !== '') {
                let userprofileImageRef = storage.ref('Profile/' + user.uid + '/profileimage')
                let userImage = await userprofileImageRef.put(newUser.image);
                let imageLink = await userprofileImageRef.getDownloadURL();
                db.ref('Users/' + user.uid).update({
                    image: imageLink
                })
            }
            if (newUser.name != undefined && newUser.name !== '') {
                db.ref('Users/' + user.uid).update({
                    username: newUser.name
                })
            }
            alert('Profile updated')
            setEditProfileModal(false);
            setNewUser({ ...newUser, name: '', image: '' })
        }
    }
    //like a post
    const like = (item) => {
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Posts/' + item.postid).once('value', (snapshot) => {
                let x = snapshot.val();
                let likes = x.likes !== undefined ? parseInt(x.likes) + 1 : 1;
                let likers = x.liked !== undefined ? x.liked : [];
                likers.push(user.uid);
                console.log(likers)
                db.ref('Posts/' + item.postid).update({
                    liked: likers, likes: likes
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            alert('Please re autheticate')
        }
    }
    //unlike a post
    const unlike = (item) => {
        let user = auth.currentUser;
        if (user != null) {
            db.ref('Posts/' + item.postid).once('value', (snapshot) => {
                let x = snapshot.val();
                let likes = parseInt(x.likes) - 1;
                let likers = x.liked != undefined ? x.liked : [];
                let temp = []
                likers.map(item => {
                    if (item !== user.uid) {
                        temp.push(item)
                    }
                })
                db.ref('Posts/' + item.postid).update({
                    liked: temp, likes: likes
                })
            })
        } else {
            alert('Please re autheticate')
        }
    }
    //remove rec from favs
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
    //create new post
    const onSubmit = async (e) => {
        e.preventDefault();
        let user = auth.currentUser;
        let date = new Date()
        let time = date.getTime()
        if (user != null) {
            let postNumber = 0;
            db.ref('Posts').once('value', async (snapshot) => {
                if (snapshot.val() != null && snapshot.val() != undefined) {
                    postNumber = snapshot.val().length;
                }
                if (type == 'text') {
                    db.ref('Posts/' + postNumber).set({
                        text: post.text, media: '', type: 'text', postid: String(postNumber), userid: user.uid, time: time
                    }).then(res => {
                        setPost({ ...post, text: '', image: '' });
                        setShowModal(false);
                        alert('Post Added')
                    })
                } else if (type === 'image') {
                    let imageRef = storage.ref('Posts/image' + postNumber);
                    let imageTask = await imageRef.put(post.image);
                    let imageLink = await imageRef.getDownloadURL();
                    db.ref('Posts/' + postNumber).set({
                        text: post.text, media: imageLink, type: 'image', postid: String(postNumber), userid: user.uid, time: time
                    }).then(res => {
                        setPost({ ...post, text: '', image: '' });
                        setShowModal(false);
                        alert('Post Added')
                    })
                } else {
                    let videoRef = storage.ref('Posts/video' + postNumber);
                    let videoTask = await videoRef.put(post.image);
                    let videoLink = await videoRef.getDownloadURL();
                    db.ref('Posts/' + postNumber).set({
                        text: post.text, media: videoLink, type: 'video', postid: String(postNumber), userid: user.uid, time: time
                    }).then(res => {
                        setPost({ ...post, text: '', image: '' });
                        setShowModal(false);
                        alert('Post Added')
                    })
                }
            })
        }
    }
    const [type, setType] = useState('text');
    const postFunc = () => {
        if (type == 'text') {

            return (

                <form onSubmit={onSubmit}>

                    <input type='text' required onChange={(e) => { setPost({ ...post, text: e.target.value }) }} placeholder='Post text' />
                    <input type='submit' value='Submit' id='button' />
                    <input type='button' value='Cancel' id='button' onClick={() => {
                        setShowModal(false)
                        setType('text')
                    }} />
                </form>
            )
        } else if (type === 'image') {
            return (
                <form onSubmit={onSubmit}>
                    <input type='text' required onChange={(e) => { setPost({ ...post, text: e.target.value }) }} placeholder='Caption' />
                    <input type='file' accept="image/*" onChange={(e) => { setPost({ ...post, image: e.target.files[0] }) }} placeholder='select image' />
                    <input type='submit' value='Submit' id='button' />
                    <input type='button' value='Cancel' id='button' onClick={() => {
                        setShowModal(false)
                        setType('text')
                    }} />
                </form>
            )
        } else {
            return (
                <form onSubmit={onSubmit}>
                    <input type='text' req required onChange={(e) => { setPost({ ...post, text: e.target.value }) }} placeholder='Caption' />
                    <input type='file' accept="video/mp4,video/x-m4v,video/*" required onChange={(e) => { setPost({ ...post, image: e.target.files[0] }) }} placeholder='select video' />
                    <input type='submit' required value='Submit' id='button' />
                    <input type='button' value='Cancel' id='button' onClick={() => {
                        setShowModal(false)
                        setType('text')
                    }} />
                </form>
            )

        }
    }
    //comment
    const postComment = async (item) => {
        let user = auth.currentUser;
        if (user !== null) {
            if (comment !== undefined && comment !== null) {
                let c = new Object();
                c['userid'] = user.uid;
                c['comment'] = comment;
                let comments = [];
                db.ref('Posts/' + item.postid + '/comments').once('value', (snapshot) => {
                    if (snapshot.val() !== undefined && snapshot.val() !== null) {
                        comments = snapshot.val();
                    }
                })
                comments.push(c);
                db.ref('Posts/' + item.postid).update({
                    comments: comments
                }).then(res => {
                    setComment()
                })
            } else {
                alert('Please enter a comment')
            }
        }
    }
    if (loading) {
        return (
            <div className='NewsFeed'>
            </div>
        )
    } else {
        //close modal
        if (showModal) {
            return (
                <div className='NewsFeed1'>
                    <div className='Modal'>
                        <h1 className='ModalTitle'>Create New Post</h1>

                        <div className='postType'>
                            <button onClick={() => { setType('text') }} className={type === 'text' ? 'selectedButton' : 'button'}>Text</button>
                            <button onClick={() => { setType('image') }} className={type === 'image' ? 'selectedButton' : 'button'}>Image</button>
                            <button onClick={() => { setType('video') }} className={type === 'video' ? 'selectedButton' : 'button'}>Video</button>
                        </div>
                        {
                            postFunc()
                        }
                    </div>
                </div>
            )
        } else if (editProfileModal) {
            return (
                <div className='NewsFeed1'>
                    <div className='Modal'>
                        <h1>EDIT PROFILE</h1>
                        <form onSubmit={updateUser}>
                            <input type='text' onChange={(e) => { setNewUser({ ...newUser, name: e.target.value }) }} placeholder='New Username' />
                            <input
                                type="file"
                                accept="image/*"
                                name="profile image"
                                onChange={(event) => {
                                    setNewUser({ ...user, image: event.target.files[0] });
                                }}
                            />
                            {newUser.image != '' ?

                                <div >
                                    <img alt="not found" width={"200px"} height={'150px'} style={{ marginTop: '5px', alignSelf: 'center' }} src={URL.createObjectURL(newUser.image)} />
                                    <input type='button' value='delete image' id='button' onClick={() => {
                                        setNewUser({ ...newUser, image: '' })
                                    }} />
                                </div> :
                                null
                            }
                            <input type='submit' value='Update' id='button' />
                            <input type='button' value='Cancel' id='button' onClick={() => {
                                setEditProfileModal(false)
                            }} />
                        </form>

                    </div>
                </div>
            )
        } else {
            return (
                <div className='NewsFeed'>
                    <div className='profile'>
                        <div className='userDetails'>
                            <img src={(profile !== undefined && profile.image !== undefined && profile.image !== '') ? profile.image : url} id='userimage' />
                            <p>{(profile !== undefined && profile.username !== undefined && profile.username !== '') ? profile.username : 'User'}</p>

                            <div className='buttons'>
                                <p onClick={() => { setEditProfileModal(true) }} id='CreatePost'>Update Profile</p>
                                <p onClick={() => { setShowModal(true) }} id='CreatePost'>Create Post</p>
                                <p onClick={() => {
                                    if (onlyMyPost) {
                                        setOnlyMyPost(false)
                                    } else {
                                        setOnlyMyPost(true)
                                    }
                                }} id='CreatePost'>
                                    {onlyMyPost ? 'Show All Posts' : 'Only My Post'}</p>
                            </div>
                        </div>
                    </div>


                    <div className='posts'>
                        {
                            allPosts.map((item, index) => {
                                if (onlyMyPost) {
                                    if (item.userid === user.uid && (item.status == undefined || (item.status !== undefined && item.status !== 'disabled'))) {
                                        return (
                                            <div className='postCard' key={index}>
                                                <div className='userandtime'>
                                                    <p className='username'>{(allusers !== undefined && allusers[item.userid].username !== undefined) ? allusers[item.userid].username : 'user'}</p>
                                                    <p id='datetime'>{String(new Date(parseInt(item.time))).substring(4, 25)}</p>
                                                    <p id='posttext'>{item.text}</p>
                                                </div>

                                                {
                                                    item.type == 'text' ?
                                                        null :
                                                        <div className='image'>
                                                            {
                                                                item.type === 'image' ?
                                                                    <img id='image' src={item.media} alt='post url not valid' /> :
                                                                    <video id='image' controls>
                                                                        <source src={item.media} />
                                                                    </video>

                                                            }
                                                        </div>
                                                }
                                                <div className='like'>
                                                    {
                                                        item.liked != undefined && item.liked.includes(user.uid) ?
                                                            <div className='likeContainer' >
                                                                <p>{parseInt(item.likes) > 0 ? item.likes : ''}</p>
                                                                <AiFillLike id='liked' onClick={() => { unlike(item) }} />
                                                            </div>
                                                            :
                                                            <div className='likeContainer' >
                                                                <p>{parseInt(item.likes) > 0 ? item.likes : ''}</p>
                                                                <AiFillLike id='notliked' onClick={() => { like(item) }} />
                                                            </div>
                                                    }
                                                </div>
                                                <div className='comments'>
                                                    {
                                                        (selected !== undefined && selected === index) ?
                                                            <div className='allcomments'>
                                                                {
                                                                    (item.comments !== undefined && item.comments !== null) ?
                                                                        <div className='commentslist'>
                                                                            {
                                                                                Object.values(item.comments).map((item, index) => {
                                                                                    return (
                                                                                        <div className='commentdiv' key={index}>
                                                                                            <h5>{allusers[item.userid].username}</h5>
                                                                                            <p>{item.comment}</p>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div> :
                                                                        null

                                                                }
                                                                <div className='commentinput'>
                                                                    <input className='input' placeholder='comments' onChange={e => { setComment(e.target.value) }} />
                                                                    <button className='button' onClick={() => { postComment(item) }}>Submit</button>
                                                                </div>
                                                                <button style={{ marginTop: '12px', }} className='button' onClick={() => {
                                                                    setSelected();
                                                                    setComment();
                                                                }}>Close</button>
                                                            </div> :
                                                            <p onClick={() => { setSelected(index) }}>Comments</p>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                } else {
                                    if (item.status === undefined || (item.status !== undefined && item.status !== 'disabled')) {
                                        return (
                                            <div className='postCard' key={index}>

                                                <div className='userandtime'>
                                                    <p id='postusername'>{(allusers !== undefined && allusers[item.userid].username !== undefined) ? allusers[item.userid].username : 'user'}</p>
                                                    <p id='postmeta'>{String(new Date(parseInt(item.time))).substring(4, 25)}</p>
                                                    <p id='posttext'>{item.text}</p>
                                                </div>
                                                {
                                                    item.type == 'text' ?
                                                        null :
                                                        <div className='image'>
                                                            {
                                                                item.type === 'image' ?
                                                                    <img id='image' src={item.media} alt='post url not valid' /> :
                                                                    <video id='image' src={item.media} controls>
                                                                        Your browser does not support the video tag.
                                                                    </video>

                                                            }
                                                        </div>
                                                }
                                                <div className='like'>
                                                    {
                                                        item.liked != undefined && item.liked.includes(user.uid) ?
                                                            <div className='likeContainer'>
                                                                <p>{parseInt(item.likes) > 0 ? item.likes : null}</p>
                                                                <AiFillLike id='liked' onClick={() => { unlike(item) }} />
                                                            </div>
                                                            :
                                                            <div className='likeContainer'>
                                                                <p>{parseInt(item.likes) > 0 ? item.likes : null}</p>
                                                                <AiFillLike id='notliked' onClick={() => { like(item) }} />
                                                            </div>
                                                    }
                                                </div>
                                                <div className='comments'>
                                                    {
                                                        (selected !== undefined && selected === index) ?
                                                            <div className='allcomments'>
                                                                {
                                                                    (item.comments !== undefined && item.comments !== null) ?
                                                                        <div className='commentslist'>
                                                                            {
                                                                                Object.values(item.comments).map((item, index) => {
                                                                                    return (
                                                                                        <div className='commentdiv' key={index}>
                                                                                            <h5>{allusers[item.userid].username}</h5>
                                                                                            <p>{item.comment}</p>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div> :
                                                                        null

                                                                }
                                                                <div className='commentinput'>
                                                                    <input className='input' placeholder='comments' onChange={e => { setComment(e.target.value) }} />
                                                                    <button className='button' onClick={() => { postComment(item) }}>Submit</button>
                                                                </div>
                                                                <button style={{ marginTop: '12px', }} className='button' onClick={() => {
                                                                    setSelected();
                                                                    setComment();
                                                                }}>Close</button>
                                                            </div> :
                                                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
                                                                <p style={{ marginRight: '4px' }}>{(item.comments !== undefined && item.comments !== null) ? Object.values(item.comments).length : ''}</p>
                                                                <p onClick={() => { setSelected(index) }}>Comments</p>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                }
                            })
                        }
                    </div>
                    <div className='FavRecipies'>
                        <h1>Loved Recipies</h1>
                        {
                            rec.map((item, index) => {
                                if (favRec.includes(index)) {
                                    return (
                                        <div className='recipieCard' key={index}>
                                            <img src={item.imageurl} alt="alternatetext" id="image" />
                                            <p >{item.TranslatedRecipeName}</p>
                                            <AiFillHeart id='favHeart' onClick={() => {
                                                unLikeRecipie(index)
                                            }} />
                                            <a href={item.URL} target="_blank" id='touchp'>See Complete Recipie</a>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}


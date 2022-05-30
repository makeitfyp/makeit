export const currentUser = 'currentUser'


export const setCurrentUser = user => dispatch => {
    dispatch({
        type: currentUser,
        payload: user
    })
}


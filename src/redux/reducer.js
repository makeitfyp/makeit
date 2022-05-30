import { currentUser } from "./actions";

const initialState = {
    curuser: {
        email: null,
        password: null,
        auth: false,
        type:null
    }
}

function Reducer(state = initialState, action) {

    switch (action.type) {
        case currentUser:
            return { ...initialState, curuser: action.payload }
        default:
            return state
    }
}

export default Reducer;
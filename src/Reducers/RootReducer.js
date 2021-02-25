const initialState = {
    username: ""
}

const RootReducer = (state=initialState, action) => {
    if(action.type === "SIGNIN") {
        return {
            username: action.payload
        }
    } else if(action.type === "LOGOUT") {
        return {
            username: ""
        }
    }

    return state;
}

export default RootReducer;
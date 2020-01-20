import { usersTypes } from "../constants/reduxActionTypes";

const initialState = {
    users: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case usersTypes.SET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case usersTypes.UPDATE_USER:
            return {
                ...state,
                ...action.payload
            };
        case usersTypes.DELETE_USER:
        case usersTypes.GET_USERS_DATA:
        default:
            return state;
    }
};

export default userReducer;

import { authTypes } from "../constants/reduxActionTypes";

export const setCurrentUser = user => {
    return { type: authTypes.SET_CURRENT_USER, payload: user };
};
export const clearCurrentUser = () => {
    return { type: authTypes.CLEAR_CURRENT_USER };
};

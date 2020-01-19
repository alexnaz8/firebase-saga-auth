import {modalTypes} from "../constants/reduxActionTypes";

const initialState = {
    modal: {}
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case modalTypes.SET_MODAL_CONTENT:
            return {
                ...state,
                ...action.payload
            };
        case modalTypes.CLEAR_MODAL_CONTENT:
            return {
                modal: {}
            };
        default:
            return state;
    }
};

export default modalReducer;

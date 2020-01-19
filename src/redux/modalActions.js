import { modalTypes } from "../constants/reduxActionTypes";

export const setModalContent = content => {
    return { type: modalTypes.SET_MODAL_CONTENT, payload: content };
};

export const clearModalContent = () => {
    return { type: modalTypes.CLEAR_MODAL_CONTENT };
};

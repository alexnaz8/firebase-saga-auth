import { departmentTypes } from "../constants/reduxActionTypes";

const initialState = {
    departments: []
};

const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case departmentTypes.SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            };
        default:
            return state;
    }
};

export default departmentsReducer;

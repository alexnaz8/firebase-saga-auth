import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import departmentsReducer from "./departmentReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    data: userReducer,
    departments: departmentsReducer
});

export default rootReducer;

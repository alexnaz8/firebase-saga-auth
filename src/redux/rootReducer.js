import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    modal:modalReducer
});

export default rootReducer;

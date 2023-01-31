import { combineReducers } from "redux";
import authInfo from "./authInfo";
import isLoggined from "./isAuthenticated";

const reducers = combineReducers({
    authData: authInfo,
    isAuthenticated : isLoggined
})

export default reducers
import { combineReducers } from "redux";
import authInfo from "./authInfo";
import isLoggined from "./isAuthenticated";

import isSeller from './isSeller'
import sellerAuth from './sellerAuth'

const reducers = combineReducers({
    authData: authInfo,
    isAuthenticated: isLoggined,
    isSeller : isSeller,
    sellerAuth : sellerAuth


})

export default reducers
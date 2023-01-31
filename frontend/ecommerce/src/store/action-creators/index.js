export const authData = (authInfo) => {
    return (dispatch) => {
        dispatch({
            type: 'jwtAuth',
            payLoad : authInfo
        })
    }
}




export const isAuthenticated = (isLoggined) => {
    return (dispatch) => {
        dispatch({
            type: 'isLoggined',
            payLoad: isLoggined
        })
    }
}
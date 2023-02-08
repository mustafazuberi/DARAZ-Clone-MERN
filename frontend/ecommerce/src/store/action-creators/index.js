export const authData = (authInfo) => {
    return (dispatch) => {
        dispatch({
            type: 'jwtAuth',
            payLoad: authInfo
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




export const isSeller = (isSeller) => {
    return (dispatch) => {
        dispatch({
            type: 'isSeller',
            payLoad: isSeller
        })
    }
}





export const sellerAuth = (sellerAuth) => {
    return (dispatch) => {
        dispatch({
            type: 'sellerAuth',
            payLoad: sellerAuth
        })
    }
}





export const addToCart = (cartItem) => {
    return (dispatch) => {
        dispatch({
            type: 'addToCart',
            payLoad: cartItem
        })
    }
}




export const removeFromCart = (cartItem) => {
    return (dispatch) => {
        dispatch({
            type: 'removeFromCart',
            payLoad: cartItem
        })
    }
}




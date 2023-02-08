const cartItems = []

const reducers = (state = cartItems, action) => {
    if (action.type === 'addToCart') {
        return [...cartItems, action.payLoad]
    }
    else if (action.type === 'removeFromCart') {
        return cartItems.filter((item) => item._id !== action.payload._id)
    } else {
        return state
    }

}
export default reducers

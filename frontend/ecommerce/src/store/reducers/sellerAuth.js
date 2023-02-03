const sellerAuth = {}

const reducers = (state = sellerAuth, action) => {
    if (action.type === 'sellerAuth') {
        return action.payLoad
    }
    else {
        return state
    }
}
export default reducers

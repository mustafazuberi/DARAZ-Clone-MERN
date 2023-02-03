const isSeller = false

const reducers = (state = isSeller, action) => {
    if (action.type === 'isSeller') {
        return action.payLoad
    }
    else {
        return state
    }
}
export default reducers

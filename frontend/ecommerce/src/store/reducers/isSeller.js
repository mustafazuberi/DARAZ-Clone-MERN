const isSeller = false

const reducers = (state = isSeller, action) => {
    if (action.type === 'isThisSeller') {
        return action.payLoad
    }
    else {
        return state
    }
}
export default reducers

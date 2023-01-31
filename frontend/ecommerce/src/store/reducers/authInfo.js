const authInfo = {}

const reducers = (state = authInfo, action) => {
    if (action.type === 'jwtAuth') {
        return action.payLoad
    }
    else {
        return state
    }
}
export default reducers

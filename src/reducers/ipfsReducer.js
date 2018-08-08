const initialState = {
  ipfsInstance: null,
  courses: []
}

const ipfsReducer = (state = initialState, action) => {
  if (action.type === 'IPFS_INITIALIZED'){
    return Object.assign({}, state, {
      ipfsInstance: action.payload
    })
  }
  if (action.type === 'SET_COURSES'){
    return Object.assign({}, state, {
      courses: action.payload
    })
  }
  return state
}

export default ipfsReducer

const initialState = {
  data: null,
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data:{
        name: action.payload.name,
        about: action.payload.about,
        image: action.payload.image,
        userAddress: action.payload.userAddress
      }
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
    })
  }

  return state
}

export default userReducer

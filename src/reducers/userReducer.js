const initialState = {
  data: null,
  course: null
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
    })
  }

  if (action.type === 'WATCH_COURSE')
  {
    return Object.assign({}, state, {
      course: action.payload,
    })
  }

  return state
}

export default userReducer

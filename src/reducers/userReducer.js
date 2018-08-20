const initialState = {
  data: null,
  myPurchases: [],
  myCourses: []
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
      myPurchases: [],
      myCourses: []
    })
  }

  if (action.type === 'WATCH_COURSE')
  {
    return Object.assign({}, state, {
      course: action.payload,
    })
  }

  if (action.type === 'MY_PURCHASES')
  {
    return Object.assign({}, state, {
      myPurchases: action.payload
    })
  }

  if (action.type === 'MY_COURSES'){
    return Object.assign({}, state, {
      myCourses: action.payload
    })
  }

  return state
}

export default userReducer

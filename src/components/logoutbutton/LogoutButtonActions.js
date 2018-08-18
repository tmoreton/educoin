import { browserHistory } from 'react-router'

function userLoggedOut(user) {
  return {
    type: 'USER_LOGGED_OUT',
    payload: user
  }
}

export function logoutUser() {
  return function(dispatch) {
    // Logout user.
    dispatch(userLoggedOut())

    // Redirect home.
    browserHistory.push('/')
  }
}

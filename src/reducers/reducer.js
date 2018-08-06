import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
import web3Reducer from './web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer
})

export default reducer

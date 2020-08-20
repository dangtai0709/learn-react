import { combineReducers } from 'redux'
import connectionReducer from './connectionReducer'
import changeState from './changeState'
export default combineReducers({
  connectionReducer,changeState
})

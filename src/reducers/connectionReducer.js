import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../constants/actionsType'
const initialState = {
  isLogged: false,
  user: null
}

const connectionReducer = (state = initialState, {type,user}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: user,
        isLogged: true,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLogged: false
      }
    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        user: null
      }
    default:
      return state
  }
}

export default connectionReducer

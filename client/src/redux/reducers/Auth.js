import {
  AUTH_TOKEN,
  AUTHENTICATED,
  HIDE_AUTH_MESSAGE,
  SET_USER_INFO,
  SHOW_AUTH_MESSAGE,
  SHOW_LOADING,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS
} from '../constants/Auth';

const initState = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  token: localStorage.getItem(AUTH_TOKEN),
  isLoggedIn: false,
  userInfo: {
    username: "user",
    fullName: "CMS User"
  }
}

const auth = (state = initState, action) => {
	switch (action.type) {
    case AUTHENTICATED:
			return {
				...state,
        isLoggedIn: true,
				loading: false,
        userInfo: action.userInfo,
				redirect: '/',
				token: action.token
			}
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
		case SHOW_AUTH_MESSAGE:
			return {
				...state,
				message: action.message,
				showMessage: true,
				loading: false
			}
		case HIDE_AUTH_MESSAGE:
			return {
				...state,
				message: '',
				showMessage: false,
			}
		case SIGNOUT_SUCCESS: {
			return {
				...state,
        ...initState,
				redirect: '/',
				loading: false
			}
		}
		case SIGNUP_SUCCESS: {
			return {
			  ...state,
			  loading: false,
			  token: action.token
			}
		}
		case SHOW_LOADING: {
			return {
				...state,
				loading: true
			}
		}
		case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		default:
			return state;
	}
}

export default auth

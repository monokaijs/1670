import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED, AUTH_TOKEN, SET_USER_INFO
} from '../constants/Auth';

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  }
};

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo
  }
}

export const authenticated = (token, userInfo) => {
  localStorage.setItem(AUTH_TOKEN, token);
  return {
    type: AUTHENTICATED,
    token: token,
    userInfo: userInfo
  }
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

export const signOutSuccess = () => {
  window.location.href = "/auth/login"
  localStorage.clear();
  return {
    type: SIGNOUT_SUCCESS,
  }
};

export const signUp = (user) => {
  return {
    type: SIGNUP,
    payload: user
  };
};

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token
  };
};

export const signInWithGoogle = () => {
  return {
    type: SIGNIN_WITH_GOOGLE
  };
};

export const signInWithGoogleAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_GOOGLE_AUTHENTICATED,
    token
  };
};

export const signInWithFacebook = () => {
  return {
    type: SIGNIN_WITH_FACEBOOK
  };
};

export const signInWithFacebookAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
    token
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};

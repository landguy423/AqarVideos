import * as types from './actionTypes';

const initialState = {
  userLogin: false,

  loading: false,
  error:null,
  menuIndex: 0,
  userInfo: null,
  verifyPhoneInfo: null,
  verifyCodeInfo: null,
  userSignupInfo: null,
  forgotPasswordResult: null,
  updatePasswordResult: null,
  status: null
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get API Token
    /**************************/
    case types.USER_SIGN_IN_REQUEST:
      return {
        ...initialState,
        status: types.USER_SIGN_IN_REQUEST,
        loading: true,
      };
    case types.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        status: types.USER_SIGN_IN_SUCCESS,
        userLogin: action.result.data.status === '200' ? true : false,
        userInfo: action.result.data
      }
    case types.USER_SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        status: types.USER_SIGN_IN_FAILED,
        userInfo: null,
        error: action.error,
      };

    /**************************/
    /* Verify user phone number
    /**************************/
    case types.VERIFY_PHONE_REQUEST:
    return {
      ...initialState,
      status: types.VERIFY_PHONE_REQUEST,
      loading: true,
    };
  case types.VERIFY_PHONE_SUCCESS:
    return {
      ...state,
      status: types.VERIFY_PHONE_SUCCESS,
      loading: false,
      verifyPhoneInfo: action.result.data
    }
  case types.VERIFY_PHONE_FAILED:
    return {
      ...state,
      loading: false,
      status: types.VERIFY_PHONE_FAILED,
      verifyPhoneInfo: null,
    };

    /**************************/
    /* Verify phone code
    /**************************/
    case types.VERIFY_CODE_REQUEST:
      return {
        ...initialState,
        status: types.VERIFY_CODE_REQUEST,
        loading: true,
      };
    case types.VERIFY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: types.VERIFY_CODE_SUCCESS,
        verifyCodeInfo: action.result.data
      }
    case types.VERIFY_CODE_FAILED:
      return {
        ...state,
        loading: false,
        status: types.VERIFY_CODE_FAILED,
        verifyCodeInfo: null,
      };
    
    /*
      User signup
    */
    case types.USER_SIGNUP_REQUEST:
      return {
        ...state,
        status: types.USER_SIGNUP_REQUEST,
        loading: true,
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        status: types.USER_SIGNUP_SUCCESS,
        userSignupInfo: action.result.data,
        userLogin: action.result.data.status === '200' ? true : false,
        userInfo: action.result.data
      }
    case types.USER_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        status: types.USER_SIGNUP_FAILED,
        userSignupInfo: null,
      };
    
    /**************************/
    /* Forgot password
    /**************************/
    case types.FORGOT_PASSWORD_REQUEST:
      return {
        ...initialState,
        loading: true,
        status: types.FORGOT_PASSWORD_REQUEST,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: types.FORGOT_PASSWORD_SUCCESS,
        forgotPasswordResult: action.result.data
      }
    case types.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        status: types.FORGOT_PASSWORD_FAILED,
        forgotPasswordResult: null,
      };
  /**************************/
  /* Forgot password
  /**************************/
  case types.UPDATE_PASSWORD_REQUEST:
    return {
      ...state,
      updatePasswordResult: null,
      status: types.UPDATE_PASSWORD_REQUEST,
    };
  case types.UPDATE_PASSWORD_SUCCESS:
    return {
      status: types.UPDATE_PASSWORD_SUCCESS,
      updatePasswordResult: action.result.data
    }
  case types.UPDATE_PASSWORD_FAILED:
    return {
      ...state,
      status: types.UPDATE_PASSWORD_FAILED,
      updatePasswordResult: null,
    };

    /*
      User sign out
    */
    case types.USER_SIGN_OUT:
      return {
        ...initialState,
        userLogin: false,
        status: types.USER_SIGN_OUT,
        userInfo: null,
      };

    /*
      Change login status
    */
    case types.SET_LOGIN_STATUS:
      return {
        userLogin: true,
        status: types.SET_LOGIN_STATUS,
        userInfo: action.data,
      }

    /* 
      Menu status for selected item
    */
    case types.CHANGE_MENU:
      return {
        ...state,
        status: types.CHANGE_MENU,
        menuIndex: action.data
      }
    default:
      return state;
  }
}
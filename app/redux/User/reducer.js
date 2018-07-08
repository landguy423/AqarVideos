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
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get API Token
    /**************************/
    case types.USER_SIGN_IN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case types.USER_SIGN_IN_SUCCESS:
      console.log('USER_INFO: ', action.result.data)
      return {
        ...state,
        loading: false,
        userLogin: action.result.data.status === '200' ? true : false,
        userInfo: action.result.data
      }
    case types.USER_SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        userInfo: null,
        error: action.error,
      };

    /**************************/
    /* Verify user phone number
    /**************************/
    case types.VERIFY_PHONE_REQUEST:
    return {
      ...initialState,
      loading: true,
    };
  case types.VERIFY_PHONE_SUCCESS:
    return {
      ...state,
      loading: false,
      verifyPhoneInfo: action.result.data
    }
  case types.VERIFY_PHONE_FAILED:
    return {
      ...state,
      loading: false,
      verifyPhoneInfo: null,
    };

    /**************************/
    /* Verify phone code
    /**************************/
    case types.VERIFY_CODE_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case types.VERIFY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        verifyCodeInfo: action.result.data
      }
    case types.VERIFY_CODE_FAILED:
      return {
        ...state,
        loading: false,
        verifyCodeInfo: null,
      };
    
    /*
      User signup
    */
    case types.USER_SIGNUP_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userSignupInfo: action.result.data
      }
    case types.USER_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        userSignupInfo: null,
      };
    
    /**************************/
    /* Forgot password
    /**************************/
    case types.FORGOT_PASSWORD_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotPasswordResult: action.result.data
      }
    case types.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        forgotPasswordResult: null,
      };

    /*
      User sign out
    */
    case types.USER_SIGN_OUT:
      return {
        ...initialState,
        userLogin: false,
        userInfo: null,
      };

    /*
      Change login status
    */
    case types.SET_LOGIN_STATUS:
      return {
        userLogin: true,
        userInfo: action.data,
      }

    /* 
      Menu status for selected item
    */
    case types.CHANGE_MENU:
      return {
        ...state,
        menuIndex: action.data
      }
    default:
      return state;
  }
}
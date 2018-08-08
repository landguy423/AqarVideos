import * as types from './actionTypes';

const initialState = {
  status: false,
  error:null,
  packageInfo: null,
  myPackageInfo: null,
  webUrlInfo: null,
  isPaidUser: true
};

export default function packages(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get all packages
    /**************************/
    case types.GET_PACKAGE_REQUEST:
      return {
          ...initialState,
          status: 'GET_PACKAGE_REQUEST',
      };
    case types.GET_PACKAGE_SUCCESS: {
      console.log('PACKAGES_LIST_RESULT: ', action.result);
      return {
        ...state,
        status: 'GET_PACKAGE_SUCCESS',
        packageInfo: action.result.data,
      }
    }
    case types.GET_PACKAGE_FAILED:
      return {
        ...state,
        status: 'GET_PACKAGE_FAILED',
        error: action.error,
      };
    /**
     * Get my package
     */
    case types.GET_MY_PACKAGE_REQUEST:
      return {
        ...state,
        status: 'GET_MY_PACKAGE_REQUEST',
        myPackageInfo: null,
      };
    case types.GET_MY_PACKAGE_SUCCESS:
    console.log('MY_PACKAGE_RESULT: ', action.result);
      return {
        ...state,
        status: 'GET_MY_PACKAGE_SUCCESS',
        myPackageInfo: action.result.data,
      }
    case types.GET_MY_PACKAGE_FAILED:
      return {
        ...state,
        status: 'GET_MY_PACKAGE_FAILED',
        myPackageInfo: null,
        error: action.error,
      };
    case types.GET_WEBURL_REQUEST:
      return {
          ...state,
          status: types.GET_WEBURL_REQUEST,
      };
    case types.GET_WEBURL_SUCCESS: {
      console.log('WEB_URL_INFO: ', action.result);
      return {
        ...state,
        status: types.GET_WEBURL_SUCCESS,
        webUrlInfo: action.result.data,
      }
    }
    case types.GET_WEBURL_FAILED:
      return {
        ...state,
        status: types.GET_WEBURL_FAILED,
        error: action.error,
      };
    case types.CHECK_PAYMENT_STATUS_REQUEST:
      return {
        ...state,
        status: types.CHECK_PAYMENT_STATUS_REQUEST,
      };
    case types.CHECK_PAYMENT_STATUS_SUCCESS: {
      console.log('CHECK_PAYMENT_STATUS_SUCCESS: ', action.result);
      const { data } = action.result
      const { message } = data
      return {
        ...state,
        status: types.CHECK_PAYMENT_STATUS_SUCCESS,
      }
    }
    case types.CHECK_PAYMENT_STATUS_FAILED:
      return {
        ...state,
        status: types.CHECK_PAYMENT_STATUS_FAILED,
        error: action.error,
      };
    default:
      return state;
  }
}
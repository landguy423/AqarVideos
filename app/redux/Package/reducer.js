import * as types from './actionTypes';

const initialState = {
  status: false,
  error:null,
  packageInfo: null,
  myPackageInfo: null,
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
    case types.GET_PACKAGE_SUCCESS:
      return {
        ...state,
        status: 'GET_PACKAGE_SUCCESS',
        packageInfo: action.result.data,
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
    default:
      return state;
  }
}
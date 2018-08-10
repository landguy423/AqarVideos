import _ from 'lodash'
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
    case types.GET_PACKAGE_REQUEST: {
      console.log('GET_PACKAGE_REQUEST')
      return {
        ...state,
        status: 'GET_PACKAGE_REQUEST',
      };
    }
    case types.GET_PACKAGE_SUCCESS: {
      const { data } = action.result
      const { myPackageInfo } = this.state
      console.log('PACKAGE_LIST: ', data)
      if (myPackageInfo.status === 200) {
        const paidPackageId = myPackageInfo.package.package_id
      }

      return {
        ...state,
        status: 'GET_PACKAGE_SUCCESS',
        packageInfo: data
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
    case types.GET_MY_PACKAGE_REQUEST: {
      return {
        ...state,
        status: 'GET_MY_PACKAGE_REQUEST',
        myPackageInfo: null,
      };
    }
    case types.GET_MY_PACKAGE_SUCCESS: {
      const { data } = action.result
      console.log('MY_PACKAGE_DATA: ', data)
      console.log('IS_PAID_USER: ', data.status === 200 ? true : false)

      return {
        ...state,
        status: 'GET_MY_PACKAGE_SUCCESS',
        isPaidUser: data.status === 200 ? true : false,
        myPackageInfo: data
      }
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
      const { data } = action.result
      const { message } = data
      return {
        ...state,
        isPaidUser: data.status === 200 ? true : false,
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
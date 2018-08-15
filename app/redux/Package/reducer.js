import _ from 'lodash'
import * as types from './actionTypes';

const initialState = {
  status: false,
  error:null,
  packageInfo: null,
  myPackageInfo: null,
  webUrlInfo: null,
  isPaidUser: true,
  bankInfo: [],
  sendBankResult: null,
};

export default function packages(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get all packages
    /**************************/
    case types.GET_PACKAGE_REQUEST: {
      return {
        ...state,
        packageInfo: null,
        status: 'GET_PACKAGE_REQUEST',
      };
    }
    case types.GET_PACKAGE_SUCCESS: {
      const { data } = action.result
      return {
        ...state,
        status: 'GET_PACKAGE_SUCCESS',
        packageInfo: data
      }
    }
    case types.GET_PACKAGE_FAILED: {
      return {
        ...state,
        status: 'GET_PACKAGE_FAILED',
        error: action.error,
      };
    }
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
    /**
     * Get Telr web url
     */
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
    /**
     * Check Payment status
     */
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
    /**
     * Get bank detail info
     */
    case types.GET_BANK_DETAIL_REQUEST: {
      console.log('GET_BANK_DETAIL_REQUEST')
      return {
        ...state,
        status: 'GET_BANK_DETAIL_REQUEST',
        bankInfo: [],
      };
    }
    case types.GET_BANK_DETAIL_SUCCESS: {
      const { data } = action.result
      console.log('GET_BANK_DETAIL_SUCCESS: ', data)

      return {
        ...state,
        status: 'GET_BANK_DETAIL_SUCCESS',
        bankInfo: data.status === 200 ? data.banks : []
      }
    }
    case types.GET_BANK_DETAIL_FAILED:
      console.log('GET_BANK_DETAIL_FAILED')
      return {
        ...state,
        status: 'GET_BANK_DETAIL_FAILED',
        bankInfo: [],
        error: action.error,
      };
    /**
     * Send bank detail
     */
    case types.SEND_BANK_DETAIL_REQUEST: {
      console.log('SEND_BANK_DETAIL_REQUEST')
      return {
        ...state,
        status: 'SEND_BANK_DETAIL_REQUEST',
        sendBankResult: null,
      };
    }
    case types.SEND_BANK_DETAIL_SUCCESS: {
      const { data } = action.result
      console.log('SEND_BANK_DETAIL_SUCCESS: ', data)

      return {
        ...state,
        status: 'SEND_BANK_DETAIL_SUCCESS',
        sendBankResult: data
      }
    }
    case types.SEND_BANK_DETAIL_FAILED: {
      console.log('SEND_BANK_DETAIL_FAILED', action)
      return {
        ...state,
        status: 'SEND_BANK_DETAIL_FAILED',
        error: action.error,
        sendBankResult: null,
      }
    }
    default:
      return state;
  }
}
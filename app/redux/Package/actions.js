import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function getPackages(token) {

  return {
    types: [types.GET_PACKAGE_REQUEST, types.GET_PACKAGE_SUCCESS, types.GET_PACKAGE_FAILED],
    promise:
      axios({
          method: 'get',
          url: `${API_URL}?route=api/package&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      })  
  };
}

export function getMyPackage(token, data) {
  return {
    types: [types.GET_MY_PACKAGE_REQUEST, types.GET_MY_PACKAGE_SUCCESS, types.GET_MY_PACKAGE_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/getPaidPackage&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function getTerlWebUrl(token, data) {
  console.log('DATA: ', data)
  return {
    types: [types.GET_WEBURL_REQUEST, types.GET_WEBURL_SUCCESS, types.GET_WEBURL_FAILED],
    promise:
      axios({
        method: 'post',
        url: `${API_URL}?route=api/telr&api_token=${token}`,
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        data
      })  
  };
}

export function checkUserPaymentStatus(token, data) {
  return {
    types: [types.CHECK_PAYMENT_STATUS_REQUEST, types.CHECK_PAYMENT_STATUS_SUCCESS, types.CHECK_PAYMENT_STATUS_FAILED],
    promise:
      axios({
          method: 'get',
          url: `${API_URL}?route=api/telr/check_user_payments&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data
      })  
  };
}

export function getBankDetail(token) {
  return {
    types: [types.GET_BANK_DETAIL_REQUEST, types.GET_BANK_DETAIL_SUCCESS, types.GET_BANK_DETAIL_FAILED],
    promise:
      axios({
          method: 'get',
          url: `${API_URL}?route=api/bank&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
      })  
  };
}

export function sendBankDetail(token, data) {
  return {
    types: [types.SEND_BANK_DETAIL_REQUEST, types.SEND_BANK_DETAIL_SUCCESS, types.SEND_BANK_DETAIL_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/bank/addBankRequest&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data
      })  
  };
}

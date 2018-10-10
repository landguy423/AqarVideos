import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function changeMenu(index) {
  return {
    type: types.CHANGE_MENU,
    data: index,
  }
}


export function userSignOut() {
  return {
    type: types.USER_SIGN_OUT,
  };
}

export function setLoginStatus(data) {
  return {
    type: types.SET_LOGIN_STATUS,
    data,
  };
}

export function userSignIn(data, token) {
  return {
    types: [types.USER_SIGN_IN_REQUEST, types.USER_SIGN_IN_SUCCESS, types.USER_SIGN_IN_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/login&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

export function verifyPhone(data, token) {
  return {
    types: [types.VERIFY_PHONE_REQUEST, types.VERIFY_PHONE_SUCCESS, types.VERIFY_PHONE_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/validatePhone&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

export function verifyCode(data, token) {
  return {
    types: [types.VERIFY_CODE_REQUEST, types.VERIFY_CODE_SUCCESS, types.VERIFY_CODE_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/validateCode&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

export function userSignUp(data, token) {
  return {
    types: [types.USER_SIGNUP_REQUEST, types.USER_SIGNUP_SUCCESS, types.USER_SIGNUP_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/register&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

export function forgotPassword(data, token) {
  return {
    types: [types.FORGOT_PASSWORD_REQUEST, types.FORGOT_PASSWORD_SUCCESS, types.FORGOT_PASSWORD_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/forgetpassword&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}
export function updaePassword(data, token) {
  return {
    types: [types.UPDATE_PASSWORD_REQUEST, types.UPDATE_PASSWORD_SUCCESS, types.UPDATE_PASSWORD_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/updatePassword&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

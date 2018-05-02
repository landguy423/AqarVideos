import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function getProfileData(token, data) {
  return {
    types: [types.GET_PROFILE_REQUEST, types.GET_PROFILE_SUCCESS, types.GET_PROFILE_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/customerinfo&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}
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
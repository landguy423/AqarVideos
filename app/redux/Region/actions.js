import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function getRegions(token) {

  return {
    types: [types.GET_REGION_REQUEST, types.GET_REGION_SUCCESS, types.GET_REGION_FAILED],
    promise:
      axios({
          method: 'get',
          url: `${API_URL}?route=api/customer/getCountry&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      })  
  };
}
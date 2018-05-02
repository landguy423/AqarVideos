import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function addProduct(token, data) {
  console.log('DATA', data)
  return {
    types: [types.ADD_PRODUCT_REQUEST, types.ADD_PRODUCT_SUCCESS, types.ADD_PRODUCT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/addProduct&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function getProductsByCategory(token, category) {
  return {
    types: [types.GET_PRODUCT_BY_CATEGORY_REQUEST, types.GET_PRODUCT_BY_CATEGORY_SUCCESS, types.GET_PRODUCT_BY_CATEGORY_FAILED],
    promise:
      axios({
          method: 'get',
          url: `${API_URL}?route=api/package/product&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      })  
  };
}

export function getWishlistProducts(token, data) {
  return {
    types: [types.GET_WISHLIST_PRODUCT_REQUEST, types.GET_WISHLIST_PRODUCT_SUCCESS, types.GET_WISHLIST_PRODUCT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/wishlist&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function deleteWishlistProduct(token, data) {
  return {
    types: [types.DEL_WISHLIST_PRODUCT_REQUEST, types.DEL_WISHLIST_PRODUCT_SUCCESS, types.DEL_WISHLIST_PRODUCT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/deleteWhishList&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function getAdsProducts(token, data) {
  console.log('getAdsProducts', token, data)
  return {
    types: [types.GET_ADS_PRODUCT_REQUEST, types.GET_ADS_PRODUCT_SUCCESS, types.GET_ADS_PRODUCT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/myAds&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}
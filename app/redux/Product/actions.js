import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function addProduct(token, data) {
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

export function updateProduct(token, data) {
  return {
    types: [types.UPDATE_PRODUCT_REQUEST, types.UPDATE_PRODUCT_SUCCESS, types.UPDATE_PRODUCT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/editProduct&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function deleteMyProduct(token, data) {
  return {
    types: [types.DELETE_PRODUCT_REQUEST, types.DELETE_PRODUCT_SUCCESS, types.DELETE_PRODUCT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/deleteAd&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function getProductsByCategory(token, data) {
  return {
    types: [types.GET_PRODUCT_BY_CATEGORY_REQUEST, types.GET_PRODUCT_BY_CATEGORY_SUCCESS, types.GET_PRODUCT_BY_CATEGORY_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/product&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
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
      }),
    payload: { productId: data.product_id }
  };
}

export function getAdsProducts(token, data) {
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

export function setFavorite(token, data, flag) {
  let params = data
  let url = `${API_URL}?route=api/package/addWishlist&api_token=${token}`
  if (flag) {
    url = `${API_URL}?route=api/package/deleteWhishList&api_token=${token}`
    params = {
      user_id: data.customer_id,
      product_id: data.product_id,
    }
  }

  return {
    types: [types.SET_FAVORITE_REQUEST, types.SET_FAVORITE_SUCCESS, types.SET_FAVORITE_FAILED],
    promise:
      axios({
          method: 'post',
          url,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: params,
      }),
    payload: { productId: data.product_id, flag }
  };
}

export function addViewCount(token, data) {
  return {
    types: [types.ADD_VIEW_COUNT_REQUEST, types.ADD_VIEW_COUNT_SUCCESS, types.ADD_VIEW_COUNT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/viewProductCount&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      }),
    payload: { productId: data.product_id }
  };
}

export function searchProduct(token, data) {
  return {
    types: [types.SEARCH_PRODUCT_REQUEST, types.SEARCH_PRODUCT_SUCCESS, types.SEARCH_PRODUCT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/productSearch&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

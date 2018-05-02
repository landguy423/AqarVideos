import * as types from './actionTypes';

const initialState = {
  loading: null,
  error:null,

  allProduct: null,
  wishlistProduct: null,
  myAdsProduct: null,
};

export default function products(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Add product
    /**************************/
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.ADD_PRODUCT_REQUEST,
      };
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: types.ADD_PRODUCT_SUCCESS,
      }
    case types.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.ADD_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Get product by category
    /**************************/
    case types.GET_PRODUCT_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: types.GET_PRODUCT_BY_CATEGORY_REQUEST,
        allProduct: null,
      };
    case types.GET_PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: types.GET_PRODUCT_BY_CATEGORY_SUCCESS,
        allProduct: action.result.data.product,
      }
    case types.GET_PRODUCT_BY_CATEGORY_FAILED:
      return {
        ...state,
        loading: types.GET_PRODUCT_BY_CATEGORY_FAILED,
        error: action.error,
      };
    /**************************/
    /* Get wishlist product
    /**************************/
    case types.GET_WISHLIST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.GET_WISHLIST_PRODUCT_REQUEST,
        wishlistProduct: null,
      };
    case types.GET_WISHLIST_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: types.GET_WISHLIST_PRODUCT_SUCCESS,
        wishlistProduct: action.result.data.products,
      }
    }
    case types.GET_WISHLIST_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.GET_WISHLIST_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Del wishlist product
    /**************************/
    case types.DEL_WISHLIST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.DEL_WISHLIST_PRODUCT_REQUEST,
      };
    case types.DEL_WISHLIST_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: types.DEL_WISHLIST_PRODUCT_SUCCESS,
      }
    }
    case types.DEL_WISHLIST_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.DEL_WISHLIST_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Get my ads product
    /**************************/
    case types.GET_ADS_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: types.GET_ADS_PRODUCT_REQUEST,
        myAdsProduct: null,
      };
    }
    case types.GET_ADS_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: types.GET_ADS_PRODUCT_SUCCESS,
        myAdsProduct: action.result.data,
      }
    }
    case types.GET_ADS_PRODUCT_FAILED: {
      return {
        ...state,
        loading: types.GET_ADS_PRODUCT_FAILED,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
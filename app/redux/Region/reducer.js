import * as types from './actionTypes';

const initialState = {
  loading: null,
  error:null,

  regionData: null,
};

export default function regions(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get API Token
    /**************************/
    case types.GET_REGION_REQUEST:
      return {
        ...initialState,
        loading: GET_REGION_REQUEST,
      };
    case types.GET_REGION_SUCCESS:
      return {
        ...state,
        loading: GET_REGION_SUCCESS,
        regionData: action.result.data,
      }
    case types.GET_REGION_FAILED:
      return {
        ...state,
        loading: GET_REGION_FAILED,
        regionData: null,
        error: action.error,
      };
    default:
      return state;
  }
}
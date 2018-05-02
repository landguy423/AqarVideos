import * as types from './actionTypes';

const initialState = {
  loading: false,
  error:null,

  packageInfo: null,
};

export default function packages(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get API Token
    /**************************/
    case types.GET_PACKAGE_REQUEST:
      return {
          ...initialState,
          loading: true,
      };
    case types.GET_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        packageInfo: action.result.data,
      }
    case types.GET_PACKAGE_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
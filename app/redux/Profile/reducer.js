import * as types from './actionTypes';

const initialState = {
  status: null,
  profileData: null,
};

export default function profile(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get profile data
    /**************************/
    case types.GET_PROFILE_REQUEST:
      return {
        ...initialState,
        status: 'GET_PROFILE_REQUEST',
      };
    case types.GET_PROFILE_SUCCESS:
    console.log('ACTION', action)
      return {
        ...state,
        status: 'GET_PROFILE_SUCCESS',
        profileData: action.result.data.customer
      }
    case types.GET_PROFILE_FAILED:
      return {
        ...state,
        status: 'GET_PROFILE_FAILED',
        profileData: null,
      };
    default:
      return state;
  }
}
import * as types from './actionTypes';

const initialState = {
  status: null,
  directMessage: null,
  chatUserList: null,
  chatData: null,
  advertisementData: null,
};

export default function message(state = initialState, action = {}) {
  switch (action.type) {
    /**
     * Send direct message to product owner
     */
    case types.SEND_DIRECT_MESSAGE_REQUEST:
      return {
        ...state,
        status: 'SEND_DIRECT_MESSAGE_REQUEST',
        directMessage: null, 
      };
    case types.SEND_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        status: 'SEND_DIRECT_MESSAGE_SUCCESS',
        directMessage: action.result.data
      }
    case types.SEND_DIRECT_MESSAGE_FAILED:
      return {
        ...state,
        status: 'SEND_DIRECT_MESSAGE_FAILED',
        directMessage: null,
      };
    /**
     * Get chat user list
     */
    case types.GET_CHAT_USER_REQUEST:
      return {
        ...state,
        status: 'GET_CHAT_USER_REQUEST',
        chatUserList: null,
      };
    case types.GET_CHAT_USER_SUCCESS:
      return {
        ...state,
        status: 'GET_CHAT_USER_SUCCESS',
        chatUserList: action.result.data
      }
    case types.GET_CHAT_USER_FAILED:
      return {
        ...state,
        status: 'GET_CHAT_USER_FAILED',
        chatUserList: null,
      };
    /**
     * Get chat data for user & product
     */
    case types.GET_CHAT_DATA_REQUEST:
      return {
        ...state,
        status: 'GET_CHAT_DATA_REQUEST',
        chatData: null,
      };
    case types.GET_CHAT_DATA_SUCCESS:
      return {
        ...state,
        status: 'GET_CHAT_DATA_SUCCESS',
        chatData: action.result.data
      }
    case types.GET_CHAT_DATA_FAILED:
      return {
        ...state,
        status: 'GET_CHAT_DATA_FAILED',
        chatData: null,
      };
    /**
     * Send advertisement
     */
    case types.SEND_AD_REQUEST:
      return {
        ...state,
        status: 'SEND_AD_REQUEST',
        advertisementData: null,
      };
    case types.SEND_AD_SUCCESS:
      return {
        ...state,
        status: 'SEND_AD_SUCCESS',
        advertisementData: action.result.data
      }
    case types.SEND_AD_FAILED:
      return {
        ...state,
        status: 'SEND_AD_FAILED',
        advertisementData: null,
      };
    default:
      return state;
  }
}
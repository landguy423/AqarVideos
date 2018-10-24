import * as types from './actionTypes';

const initialState = {
  status: null,
  directMessage: null,
  chatUserList: null,
  chatData: null,
  advertisementData: null,
  adSubjectList: null,
  totalUnreadMsgCount: 0,
  isUpdateMsg: false
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
        isUpdateMsg: false,
        status: 'GET_CHAT_USER_REQUEST'
      };
    case types.GET_CHAT_USER_SUCCESS:
      const chatUserList = action.result.data
      let totalUnreadMsgCount = 0

      if (chatUserList.status === 200) {
        for (let i = 0; i < chatUserList.messages.length; i ++) {
          totalUnreadMsgCount += parseInt(chatUserList.messages[i]['unread_count'])
        }
      }

      return {
        ...state,
        status: 'GET_CHAT_USER_SUCCESS',
        chatUserList,
        totalUnreadMsgCount
      }
    case types.GET_CHAT_USER_FAILED:
      return {
        ...state,
        status: 'GET_CHAT_USER_FAILED'
      };
    /**
     * Get chat data for user & product
     */
    case types.GET_CHAT_DATA_REQUEST:
      return {
        ...state,
        status: 'GET_CHAT_DATA_REQUEST'
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
        status: 'GET_CHAT_DATA_FAILED'
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
    /**
     * Get advertisement subject list
     */
    case types.GET_AD_SUBJECT_REQUEST:
      return {
        ...state,
        status: 'GET_AD_SUBJECT_REQUEST',
        adSubjectList: null,
      };
    case types.GET_AD_SUBJECT_SUCCESS:
      return {
        ...state,
        status: 'GET_AD_SUBJECT_SUCCESS',
        adSubjectList: action.result.data
      }
    case types.GET_AD_SUBJECT_FAILED:
      return {
        ...state,
        status: 'GET_AD_SUBJECT_FAILED',
        adSubjectList: null,
      };
    /**
     * Update unread messages
     */
    case types.UPDATE_UNREAD_MESSAGES_REQUEST:
      console.log('UPDATE_UNREAD_MESSAGES_REQUEST')
      return {
        ...state,
        isUpdateMsg: false,
        status: 'UPDATE_UNREAD_MESSAGES_REQUEST'
      };
    case types.UPDATE_UNREAD_MESSAGES_SUCCESS:
      console.log('UPDATE_UNREAD_MESSAGES_SUCCESS', action.result.data)
      return {
        ...state,
        isUpdateMsg: true,
        status: 'UPDATE_UNREAD_MESSAGES_SUCCESS'
      }
    case types.UPDATE_UNREAD_MESSAGES_FAILED:
      console.log('UPDATE_UNREAD_MESSAGES_FAILED')
      return {
        ...state,
        status: 'UPDATE_UNREAD_MESSAGES_FAILED',
      };
    default:
      return state;
  }
}
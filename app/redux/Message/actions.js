import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function sendMessage(token, data) {
  return {
    types: [types.SEND_DIRECT_MESSAGE_REQUEST, types.SEND_DIRECT_MESSAGE_SUCCESS, types.SEND_DIRECT_MESSAGE_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/chat/addMessage&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function getChatUserList(token, data) {
  return {
    types: [types.GET_CHAT_USER_REQUEST, types.GET_CHAT_USER_SUCCESS, types.GET_CHAT_USER_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/chat/getMessages&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function getChatData(token, data) {
  return {
    types: [types.GET_CHAT_DATA_REQUEST, types.GET_CHAT_DATA_SUCCESS, types.GET_CHAT_DATA_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/chat/getChat&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function sendAdvertisement(token, data) {
  return {
    types: [types.SEND_AD_REQUEST, types.SEND_AD_SUCCESS, types.SEND_AD_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/sendAdvertisement&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}

export function getAdSubject(token) {
  return {
    types: [types.GET_AD_SUBJECT_REQUEST, types.GET_AD_SUBJECT_SUCCESS, types.GET_AD_SUBJECT_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/package/getAdSubjectsList&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      })  
  };
}

export function updateUnreadMessages(token, data) {
  return {
    types: [types.UPDATE_UNREAD_MESSAGES_REQUEST, types.UPDATE_UNREAD_MESSAGES_SUCCESS, types.UPDATE_UNREAD_MESSAGES_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/chat/readMessages&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data,
      })  
  };
}
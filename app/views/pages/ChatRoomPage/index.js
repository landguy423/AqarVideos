import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import I18n from '@i18n';
import Container from '@layout/Container';
import KeyboardScrollView from '@components/KeyboardView';
import SendMessageComponent from '@components/MessageComponent/SendMessageComponent';
import ReceiveMessageComponent from '@components/MessageComponent/ReceiveMessageComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import { getChatData, sendMessage } from '@redux/Message/actions';
import { sortBy } from 'lodash';
import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

class ChatRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageData: [],
      message: '',
      loading: false,
    }
  }

  componentWillMount() {
    const { data, user, token, message, getChatData } = this.props;

    this.setState({ loading: true })
    getChatData(
      token.tokenInfo.token,
      {
        product_id: data.product_id,
        receiver_id: data.sender_id === user.userInfo.user.customer_id ? data.receiver_id : data.sender_id,
        sender_id: user.userInfo.user.customer_id,
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { message, getChatData, token, data, user } = nextProps;

    if (this.props.message.status === 'GET_CHAT_DATA_REQUEST' && message.status === 'GET_CHAT_DATA_SUCCESS') {
      this.setState({ loading: false });
      if (message.chatData.status === 200) {
        let data = message.chatData.messages;
        data = sortBy(data, item => item.date_added);
        this.setState({ messageData: data });
      }
      if (message.chatData.status === 107) {
        this.setState({ messageData: [] });
      }
    }

    // Recall message list
    if (this.props.message.status === 'SEND_DIRECT_MESSAGE_REQUEST' && message.status === 'SEND_DIRECT_MESSAGE_SUCCESS') {
      if (message.directMessage.status === 200) {
        getChatData(
          token.tokenInfo.token,
          {
            product_id: data.product_id,
            receiver_id: data.sender_id === user.userInfo.user.customer_id ? data.receiver_id : data.sender_id,
            sender_id: user.userInfo.user.customer_id,
          }
        );
      }
    }
  }

  onItemSelect(rowData, rowID) {
    
  }
    
  _renderRow (rowData, sectionID, rowID, highlightRow) {
    const { user } = this.props;
    const { customer_id } = user.userInfo.user;

    if (rowData.sender_id === customer_id) {
      return <SendMessageComponent data={rowData} />
    } else if (rowData.receiver_id === customer_id) {
      return <ReceiveMessageComponent data={rowData} />
    }
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
          key={`${sectionID}-${rowID}`}
          style={{ height: 0, backgroundColor: 'transparent', flex: 1 }}
      />
    );
  }
  
  getNow() {
    const today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    return `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;
  }

  onSend() {
    const { messageData, message } = this.state;
    const { data, user, token, sendMessage } = this.props;

    this.setState({ message: '' });

    this.setState({
      messageData: [
        ...messageData,
        {
          sender_id: user.userInfo.user.customer_id,
          senders_detail: {
            name: user.userInfo.user.firstname
          },
          message: message,
          date_added: this.getNow()
        }
      ],
      message: '',
    })

    sendMessage(
      token.tokenInfo.token,
      {
        product_id: data.product_id,
        receiver_id: data.sender_id === user.userInfo.user.customer_id ? data.receiver_id : data.sender_id,
        sender_id: user.userInfo.user.customer_id,
        message,
        subject: '',
      }
    )
  }

  render() {
    const { data, user } = this.props;
    const { messageData, loading } = this.state;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(messageData);

    let userName = '';
    if (user.userInfo) {
      userName = data.sender_id === user.userInfo.user.customer_id ? data.receiver_details.name : data.sender_details.name;
    }

    return (
      <Container title={userName} type="detail">
        <LoadingSpinner visible={loading } />

        <View style={styles.container}>
          <KeyboardScrollView>
            <View style={styles.container}>
              <View style={styles.messageContainer}>
                <ListView
                  ref='listview'
                  dataSource={dataSource}
                  renderRow={this._renderRow.bind(this)}
                  renderSeparator={this._renderSeparator}
                  contentContainerStyle={styles.listView}
                  onContentSizeChange={(width, height) => this.refs.listview.scrollToEnd()}
                  enableEmptySections={true}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputView}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={ true }
                    multiline
                    placeholder={I18n.t('support.ph_message')}
                    placeholderTextColor={ commonColors.placeholderText }
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={ 'next' }
                    value={ this.state.message }
                    onChangeText={ (text) => this.setState({ message: text }) }
                  />
                  <Icon name='pencil' style={styles.iconPen} />
                </View>

                <TouchableOpacity activeOpacity={0.5} onPress={() => this.onSend()}>
                  <View style={styles.btnSendView}>
                    <Icon name='send' style={styles.iconSend} />
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </KeyboardScrollView>
        </View>
      </Container>
    );
  }
}


const mapStateToProps = ({ message, token, user }) => ({
  user,
  token,
  message
})

const mapDispatchToProps = dispatch => ({
  getChatData: (token, data) => dispatch(getChatData(token, data)),
  sendMessage: (token, data) => dispatch(sendMessage(token, data)),
})

ChatRoomPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  message: PropTypes.objectOf(PropTypes.any).isRequired,
  getChatData: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatRoomPage)
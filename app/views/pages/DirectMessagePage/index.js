import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import I18n from '@i18n';
import Container from '@layout/Container';
import { sendMessage } from '@redux/Message/actions';

import { styles } from './styles';
import * as COMMON_COLORS from '@common/styles/commonColors';

class DirectMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fullName: '',
      subject: '',
    }
  }

  componentWillMount() {
    const { user: { userInfo }} = this.props;
    this.setState({ fullName: `${userInfo.user.firstname} ${userInfo.user.lastname}` });
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;
    if (this.props.message.status === 'SEND_DIRECT_MESSAGE_REQUEST' && message.status === 'SEND_DIRECT_MESSAGE_SUCCESS') {
      if (message.directMessage.status === 200) {
        Actions.pop();
      }
    }
  }

  onSend = () => {
    const { product_id, product_owner_id, user, token, sendMessage } = this.props;
    const { message, subject } = this.state;

    sendMessage(
      token.tokenInfo.token,
      {
        product_id,
        sender_id: user.userInfo.user.customer_id,
        receiver_id: product_owner_id,
        message,
        subject,
      }
    )
  }

  render() {
    return (
      <Container title={I18n.t('direct_message')} type='detail'>
        <View style={styles.container}>
          <KeyboardScrollView>
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <TextInput
                  ref="fullName"
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder={I18n.t('profile.ph_name')}
                  placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.fullName }
                  onChangeText={ (text) => this.setState({ fullName: text }) }
                  onSubmitEditing={ () => this.refs.subject.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='user' style={styles.inputIcon}></Icon>
                </View>
              </View>

              {/* <View style={styles.itemView}>
                <Text style={styles.textTitle}>{I18n.t('support.subject')}</Text>
                <TextInput
                  ref="subject"
                  multiline
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder="Type subject"
                  placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.subject }
                  onChangeText={ (text) => this.setState({ subject: text }) }
                />
              </View> */}

              <View style={[styles.itemView, styles.messageView]}>
                <Text style={styles.textTitle}>{I18n.t('message')}</Text>
                <TextInput
                  ref="message"
                  multiline
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('support.ph_message')}
                  placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.message }
                  onChangeText={ (text) => this.setState({ message: text }) }
                />
              </View>
            </View>
          </KeyboardScrollView>

          <View style={styles.btnView}>
            <TouchableOpacity onPress={this.onSend} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{I18n.t('send')}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, token, message }) => ({
  user,
  token,
  message
})

const mapDispatchToProps = dispatch => ({
  sendMessage: (token, data) => dispatch(sendMessage(token, data)),
})

DirectMessagePage.defaultProps = {
  message: null,
}

DirectMessagePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  message: PropTypes.objectOf(PropTypes.any),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectMessagePage)

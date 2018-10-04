import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import KeyboardScrollView from '@components/KeyboardView';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputMask from 'react-native-text-input-mask';
import _ from 'lodash'
import CustomAlert from '@components/CustomAlert';
import LoadingSpinner from '@components/LoadingSpinner';

import I18n from '@i18n';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { styles } from './styles';
import { userSignIn, forgotPassword, changeMenu } from '@redux/User/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // mobile: '9874561230',
      // password: '123456',
      mobile: '+966',
      password: '',
      loading: false,
      isLoginAlert: false,    //show signin result
      isEmptyEmail: false,   //show if email is numm 
      isForgotResultAlert: false,   //show forgot password reuslt,
      isError: false,
      errorTitle: '',
      errorText: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (this.props.user.status === 'USER_SIGN_IN_REQUEST' && user.status === 'USER_SIGN_IN_SUCCESS') {
      this.setState({ loading: false })
      if (user.userLogin) {
        AsyncStorage.setItem('loginStatus', JSON.stringify(true));
        AsyncStorage.setItem('userInfo', JSON.stringify(user.userInfo));
        this.props.changeMenu(0);
        Actions.Main();
      } else {
        this.setState({
          isError: true,
          errorTitle: I18n.t('alert.error'),
          errorText: user.userInfo.status === '102' ? I18n.t('register.login_password_matched_fail') : I18n.t('register.login_matched_fail')
        })
      }
    }

    if (this.props.user.status === 'USER_SIGN_IN_REQUEST' && user.status === 'USER_SIGN_IN_FAILED') {
      this.setState({
        loading: false,
        isError: true,
        errorTitle: I18n.t('alert.error'),
        errorText: I18n.t('register.login_matched_fail')
      })
    }

    if (this.props.user.status === 'FORGOT_PASSWORD_REQUEST' && user.status === 'FORGOT_PASSWORD_SUCCESS') {
      this.setState({
        loading: false,
        isError: true,
        errorTitle: user.forgotPasswordResult.status === 200 ? I18n.t('alert.success') : I18n.t('alert.error'),
        errorText: user.forgotPasswordResult.status === 200 ? I18n.t('register.forgot_success') : I18n.t('register.forgot_failed')
      })
    }

    if (this.props.user.status === 'FORGOT_PASSWORD_REQUEST' && user.status === 'FORGOT_PASSWORD_FAILED') {
      this.setState({
        loading: false,
        isError: true,
        errorTitle: I18n.t('alert.error'),
        errorText: I18n.t('register.forgot_failed')
      })
    }
  }

  onLogin() {
    const { token } = this.props.tokenInfo

    if (this.state.mobile === '') {
      this.setState({
        isError: true,
        errorTitle: I18n.t('alert.warning'),
        errorText: I18n.t('register.input_mobile')
      })
      return
    }

    this.setState({ loading: true });
    let data = {
      telephone: this.state.mobile,
      password:  this.state.password
    };

    this.props.userSignIn(data, token);
  }

  onForgotPassword() {
    if (this.state.mobile === '') {
      this.setState({
        isError: true,
        errorTitle: I18n.t('alert.warning'),
        errorText: I18n.t('register.input_mobile')
      })
      return
    }

    this.setState({ loading: true });

    const telephone = _.split(this.state.mobile, '+')
    let data = {
      telephone: telephone[1]
    };
    this.props.forgotPassword(data, this.props.tokenInfo.token);
  }

  render() {
    const { loading, isError, errorTitle, errorText } = this.state;

    return (
      <View style={styles.container}>
        <LoadingSpinner visible={loading } />
        
        <CustomAlert 
          title={errorTitle}
          message={errorText}
          visible={isError} 
          closeAlert={() => this.setState({ isError: false })}
        />

        <KeyboardScrollView>
          <View style={styles.fieldContainerLogin}>
            <View style={styles.inputView}>
              <View style={styles.iconView}>
                <Icon name='screen-tablet' style={styles.inputIcon}></Icon>
              </View>
              <TextInputMask 
                mask={"+[00000000000000]"} 
                ref="mobileNumber"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={I18n.t('profile.ph_mobile_number')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                keyboardType="numbers-and-punctuation"
                value={ this.state.mobile }
                onChangeText={text => this.setState({ mobile: text })}
              />
            </View>
            <View style={styles.inputView}>
              <View style={styles.iconView}>
                <Icon name='lock' style={styles.inputIcon}></Icon>
              </View>
              <TextInput
                ref="password"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={I18n.t('profile.ph_password')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'send'}
                secureTextEntry
                value={ this.state.password }
                onChangeText={ (text) => this.setState({ password: text }) }
                onSubmitEditing={() => this.onLogin()}
              />
            </View>
            <View style={styles.forgotPasswordView}>
              <TouchableOpacity onPress={() => this.onForgotPassword()}>
                <Text style={styles.forgotPasswordText}>{I18n.t('profile.forgot_password')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnViewLogin}>
              <TouchableOpacity onPress={() => this.onLogin()} activeOpacity={0.5}>
                <View style={styles.btnWrapper}>
                  <Text style={styles.btnText}>{I18n.t('login')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  tokenInfo: state.token.tokenInfo,
  user: state.user
}),{ userSignIn, forgotPassword, changeMenu })(Login);
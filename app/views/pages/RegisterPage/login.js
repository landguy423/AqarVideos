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
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { styles } from './styles';
import { userSignIn, forgotPassword, changeMenu } from '@redux/User/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // mobile: '9874561230',
      // password: '123456',
      mobile: '',
      password: '',
      loading: false,
      isLoginAlert: false,    //show signin result
      isForgotAlert: false,   //show if email is numm 
      isForgotResultAlert: false,   //show forgot password reuslt
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, forgotPasswordResult } = nextProps;

    if (this.props.user.status === 'USER_SIGN_IN_REQUEST' && nextProps.user.status === 'USER_SIGN_IN_SUCCESS') {
      this.setState({ isLoginAlert: true, loading: false });
    }

    if (this.props.user.status === 'USER_SIGN_IN_REQUEST' && nextProps.user.status === 'USER_SIGN_IN_FAILED') {
      this.setState({ loading: false, loginFailed: true });
    }

    if (this.props.user.status === 'FORGOT_PASSWORD_REQUEST' && nextProps.user.status === 'FORGOT_PASSWORD_SUCCESS') {
      this.setState({ loading: false, isForgotResultAlert: true });
    }
  }

  onLogin() {
    const { token } = this.props.tokenInfo
    this.setState({ loading: true });
    // const telephone = _.split(this.state.mobile, '+')
    let data = {
      telephone: this.state.mobile,
      password:  this.state.password
    };

    this.props.userSignIn(data, token);
  }

  checkUserLoginResult() {
    const { userLogin, userInfo } = this.props;
    
    this.setState({ isLoginAlert: false });

    if (userLogin) {
      AsyncStorage.setItem('loginStatus', JSON.stringify(true));
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.props.changeMenu(0);
      Actions.Main();
    }
  }

  onForgotPassword() {
    if (this.state.mobile == '') {
      this.setState({ isForgotAlert: true });
    } else {
      this.setState({ loading: true });

      const telephone = _.split(this.state.mobile, '+')
      let data = {
        telephone: telephone[1]
      };
      this.props.forgotPassword(data, this.props.tokenInfo.token);
    }
  }

  render() {
    const { userInfo, forgotPasswordResult, loading } = this.props;
    const { isLoginAlert } = this.state

    return (
      <View style={styles.container}>
        <LoadingSpinner visible={loading } />
        
        {userInfo && (
          <CustomAlert 
            title={userInfo.status === '200' ? I18n.t('alert.success') : I18n.t('alert.error')}
            message={userInfo.status === '200' ? I18n.t('register.login_success') : I18n.t('register.login_matched_fail')}
            visible={isLoginAlert} 
            closeAlert={() => this.checkUserLoginResult()}
          />
        )}

        {forgotPasswordResult && (
          <CustomAlert 
            title={forgotPasswordResult.status === 200 ? I18n.t('alert.success') : I18n.t('alert.error')}
            message={forgotPasswordResult.status === 200 ? I18n.t('register.forgot_success') : I18n.t('register.forgot_failed')} 
            visible={this.state.isForgotResultAlert} 
            closeAlert={() => this.setState({ isForgotResultAlert: false })}
          />
        )}
        
        <CustomAlert 
          title={I18n.t('alert.warning')}
          message={I18n.t('register.input_mobile')}
          visible={this.state.isForgotAlert} 
          closeAlert={() => this.setState({ isForgotAlert: false })}
        />

        <CustomAlert 
          title={I18n.t('alert.warning')}
          message={I18n.t('register.login_matched_fail')}
          visible={this.state.loginFailed} 
          closeAlert={() => this.setState({ loginFailed: false })}
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
                placeholderTextColor={commonColors.placeholderSubText}
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                keyboardType="phone-pad"
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
                placeholderTextColor={commonColors.placeholderSubText}
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'next'}
                secureTextEntry
                value={ this.state.password }
                onChangeText={ (text) => this.setState({ password: text }) }
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
  user: state.user,
  userInfo: state.user.userInfo,
  userLogin: state.user.userLogin,
  forgotPasswordResult: state.user.forgotPasswordResult,
  loading: state.user.loading,
}),{ userSignIn, forgotPassword, changeMenu })(Login);
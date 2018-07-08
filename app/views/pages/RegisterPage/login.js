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
      email: 'demo@gmail.com',
      password: '123456',
      loading: false,
      isLoginAlert: false,    //show signin result
      isForgotAlert: false,   //show if email is numm 
      isForgotResultAlert: false,   //show forgot password reuslt
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, forgotPasswordResult } = nextProps;

    if (userInfo) {
      this.setState({ isLoginAlert: true });
      this.setState({ loading: false });
    }

    if (forgotPasswordResult) {
      this.setState({ loading: false });
      this.setState({ isForgotResultAlert: true });
    }
  }

  onLogin() {
    const { token } = this.props.tokenInfo
    this.setState({ loading: true });

    let data = {
      email: this.state.email,
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
    if (this.state.email == '') {
      this.setState({isForgotAlert: true});
    }
    else {
      this.setState({loading: true});

      let data = {
        email: this.state.email
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
            title={userInfo.status === '200' ? 'Success' : 'Error'}
            message={userInfo.status === '200' ? userInfo.message : (userInfo.err ? userInfo.err : userInfo.error.warning)}
            visible={isLoginAlert} 
            closeAlert={() => this.checkUserLoginResult()}
          />
        )}

        {forgotPasswordResult && (
          <CustomAlert 
            title={forgotPasswordResult.status === 200 ? 'Success' : 'Error'}
            message={forgotPasswordResult.message} 
            visible={this.state.isForgotResultAlert} 
            closeAlert={() => this.setState({ isForgotResultAlert: false })}
          />
        )}
        
        <CustomAlert 
          title="Warning"
          message="Please input your email"
          visible={this.state.isForgotAlert} 
          closeAlert={() => this.setState({ isForgotAlert: false })}
        />

        <CustomAlert 
          title="Warning"
          message="Email or password is not matched"
          visible={this.state.loginFailed} 
          closeAlert={() => this.setState({ loginFailed: false })}
        />

        <KeyboardScrollView>
          <View style={styles.fieldContainerLogin}>
            <View style={styles.inputView}>
              <View style={styles.iconView}>
                <Icon name='envelope' style={styles.inputIcon}></Icon>
              </View>
              <TextInput
                ref="email"
                autoCapitalize="none"
                autoCorrect={ false }
                placeholder={I18n.t('profile.ph_email')}
                placeholderTextColor={ commonColors.placeholderText }
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                keyboardType="email-address"
                value={ this.state.email }
                onChangeText={ (text) => this.setState({ email: text }) }
                onSubmitEditing={ () => this.refs.password.focus() }
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
                placeholderTextColor={ commonColors.placeholderText }
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
  userInfo: state.user.userInfo,
  userLogin: state.user.userLogin,
  forgotPasswordResult: state.user.forgotPasswordResult,
  loading: state.user.loading,
}),{ userSignIn, forgotPassword, changeMenu })(Login);
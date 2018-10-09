import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputMask from 'react-native-text-input-mask';
import StepIndicator from '@components/StepIndicator';

import CustomAlert from '@components/CustomAlert';
import LoadingSpinner from '@components/LoadingSpinner';

import I18n from '@i18n';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { styles, wizardStyle } from './styles';
import { verifyPhone, verifyCode, userSignUp, changeMenu } from '@redux/User/actions';

const _isArabic = true

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mobile: '+966',
      code: '',
      password: '',
      confirmPassword: '',
      email: '',  
      firstName: '',
      lastName: '',
      verifyStep: _isArabic ? 2 : 0,

      isError: false,
      errorTitle: '',
      errorText: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    
    if (this.props.user.status === 'VERIFY_PHONE_REQUEST' && user.status === 'VERIFY_PHONE_SUCCESS') {
      this.setState({ loading: false })

      if (user.verifyPhoneInfo.status === '200') {
        this.setState({ verifyStep: 1 });
      } else {
        this.setState({
          isError: true,
          errorTitle: I18n.t('alert.error'),
          errorText: I18n.t('register.verify_phone_failed')
        })
      }
    }
    if (this.props.user.status === 'VERIFY_PHONE_REQUEST' && user.status === 'VERIFY_PHONE_FAILED') {
      this.setState({
        loading: false,
        isError: true,
        errorTitle: I18n.t('alert.error'),
        errorText: I18n.t('register.verify_phone_failed')
      })
    }

    if (this.props.user.status === 'VERIFY_CODE_REQUEST' && user.status === 'VERIFY_CODE_SUCCESS') {
      this.setState({ loading: false })

      if (user.verifyCodeInfo.status === '200') {
        this.setState({ verifyStep: 0 });
      } else {
        this.setState({
          isError: true,
          errorTitle: I18n.t('alert.error'),
          errorText: I18n.t('register.invalid_code'),
          verifyStep: 2
        })
      }
    }
    if (this.props.user.status === 'VERIFY_CODE_REQUEST' && user.status === 'VERIFY_CODE_FAILED') {
      this.setState({
        loading: false,
        isError: true,
        errorTitle: I18n.t('alert.error'),
        errorText: I18n.t('register.invalid_code'),
        verifyStep: 2
      })
    }

    if (this.props.user.status === 'USER_SIGNUP_REQUEST' && user.status === 'USER_SIGNUP_SUCCESS') {
      this.setState({ loading: false });

      if (user.userSignupInfo.status === '200') {
        AsyncStorage.setItem('loginStatus', JSON.stringify(true));
        AsyncStorage.setItem('userInfo', JSON.stringify(user.userSignupInfo));
        
        this.props.changeMenu(0);
        Actions.Package();
      } else {
        this.setState({
          isError: true,
          errorTitle: I18n.t('alert.error'),
          errorText: I18n.t('register.failed'),
          verifyStep: 2
        })
      }
    }
    if (this.props.user.status === 'USER_SIGNUP_REQUEST' && user.status === 'USER_SIGNUP_FAILED') {
      this.setState({
        loading: false,
        isError: true,
        errorTitle: I18n.t('alert.error'),
        errorText: I18n.t('register.failed'),
        verifyStep: 2
      })
    }
  }
  
  // Verify phone number (step 1)
  onVerifyPhone() {
    let data = {
      phone: this.state.mobile
    }
    this.setState({ loading: true });
    this.props.verifyPhone(data, this.props.tokenInfo.token);
  }

  // Verify received code (step 2)
  onVerifyCode() {
    let data = {
      phone: this.state.mobile,
      code: this.state.code,
    }
    this.setState({ loading: true });
    this.props.verifyCode(data, this.props.tokenInfo.token);
  }

  onSignUp() {
    let data = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.confirmPassword,
      telephone: this.state.mobile
    }
    this.setState({ loading: true });
    this.props.userSignUp(data, this.props.tokenInfo.token);
  }

  render() {
    const { loading, isError, errorTitle, errorText } = this.state
    const { user } = this.props

    return (
      <View style={styles.container}>
        <LoadingSpinner visible={loading } />

        <CustomAlert 
          title={errorTitle}
          message={errorText}
          visible={isError} 
          closeAlert={() => this.setState({ isError: false })}
        />

        <View style={styles.wizard}>      
          <StepIndicator
            customStyles={wizardStyle}
            currentPosition={this.state.verifyStep}
            labels={[I18n.t('profile.wizard_signup'), I18n.t('profile.wizard_code'), I18n.t('profile.wizard_phone')]}
            stepCount={3}
          />
        </View>

        <KeyboardScrollView>
          {this.state.verifyStep === (_isArabic ? 0 : 2) && (
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <TextInput
                  ref="firstName"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('profile.ph_firstname')}
                  placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.firstName }
                  onChangeText={ (text) => this.setState({ firstName: text }) }
                  onSubmitEditing={ () => this.refs.lastName.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='user' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="lastName"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('profile.ph_lastname')}
                  placeholderTextColor={ COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.lastName }
                  onChangeText={ (text) => this.setState({ lastName: text }) }
                  onSubmitEditing={ () => this.refs.email.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='user' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_email')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  // onSubmitEditing={() => this.refs.password.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='envelope' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInputMask
                  refInput={c => this.mobileNumber = c}
                  mask={"+[00000000000000]"} 
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_mobile_number')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'done' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.mobile }
                  onChangeText={text => this.setState({ mobile: text })}
                  // onSubmitEditing={() => this.refs.password.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='screen-tablet' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_password')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'done'}
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={text => this.setState({ password: text })}
                  // onSubmitEditing={() => this.refs.confirmPassword.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='lock' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="confirmPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_confirm_password')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'send'}
                  secureTextEntry
                  value={this.state.confirmPassword}
                  onChangeText={text => this.setState({ confirmPassword: text })}
                  onSubmitEditing={() => this.onSignUp()}
                />
                <View style={styles.iconView}>
                  <Icon name='lock' style={styles.inputIcon}></Icon>
                </View>
              </View>
            </View>
          )}

          {this.state.verifyStep === 1 && (
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <View style={styles.iconView}>
                  <Icon name='screen-tablet' style={styles.inputIcon}></Icon>
                </View>
                <TextInputMask
                  ref="mobileNumber"
                  mask={"+[00000000000000]"} 
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_mobile_number')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="left"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.mobile}
                  onChangeText={text => this.setState({ mobile: text })}
                  onSubmitEditing={() => this.refs.confirmCode.focus()}
                />
              </View>
              <View style={styles.inputView}>
                <View style={styles.iconView}>
                  <Icon name='eye' style={styles.inputIcon}></Icon>
                </View>
                <TextInput
                  ref="confirmCode"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_confirm_code')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="left"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'send'}
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.code }
                  onChangeText={text => this.setState({ code: text })}
                  onSubmitEditing={() => this.onVerifyCode()}
                />
              </View>
            </View>
          )}

          {this.state.verifyStep === (_isArabic ? 2 : 0) && (
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <View style={styles.iconView}>
                  <Icon name='screen-tablet' style={styles.inputIcon}></Icon>
                </View>
                <TextInputMask
                  ref="mobileNumber"
                  mask={"+[00000000000000]"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_mobile_number')}
                  placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                  textAlign="left"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  keyboardType="numbers-and-punctuation"
                  value={this.state.mobile}
                  onChangeText={text => this.setState({ mobile: text })}
                  returnKeyType={'done'}
                  onSubmitEditing={() => this.onVerifyPhone()}
                />
              </View>
            </View>
          )}
        </KeyboardScrollView>

        {this.state.verifyStep === 2 && (
        <View style={styles.btnView}>
          <TouchableOpacity onPress={() => this.onVerifyPhone()} activeOpacity={0.5}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}>{I18n.t('profile.confirm_phone')}</Text>
            </View>
          </TouchableOpacity>
        </View>)}

        {this.state.verifyStep === 1 && (
        <View style={styles.btnView}>
          <TouchableOpacity onPress={() => this.onVerifyCode()} activeOpacity={0.5}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}>{I18n.t('profile.confirm_code')}</Text>
            </View>
          </TouchableOpacity>
        </View>)}

        {this.state.verifyStep === 0 && (
        <View style={styles.btnView}>
          <TouchableOpacity onPress={() => this.onSignUp()} activeOpacity={0.5}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}>{I18n.t('signup')}</Text>
            </View>
          </TouchableOpacity>
        </View>)}
      </View>
    );
  }
}

export default connect(state => ({
  tokenInfo: state.token.tokenInfo,
  user: state.user,
}),{ verifyPhone, verifyCode, userSignUp, changeMenu })(Signup);
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
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import KeyboardScrollView from '@components/KeyboardView';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputMask from 'react-native-text-input-mask';
import StepIndicator from '@components/StepIndicator';

import CustomAlert from '@components/CustomAlert';
import LoadingSpinner from '@components/LoadingSpinner';

import I18n from '@i18n';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
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
      password: '111111',
      confirmPassword: '111111',
      email: 'test1@test1.com',  
      firstName: 'test1',
      lastName: 'test2',
      verifyStep: _isArabic ? 2 : 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { verifyPhoneInfo, verifyCodeInfo, userSignupInfo } = nextProps;
    
    if (verifyPhoneInfo) {
      this.setState({ loading: false });
      this.setState({ isAlert: true });
    }
    if (verifyCodeInfo) {
      this.setState({ loading: false });
      this.setState({ isAlert: true });
    }
    if (userSignupInfo) {
      this.setState({ loading: false });
      this.setState({ isAlert: true });

      AsyncStorage.setItem('loginStatus', JSON.stringify(true));
      AsyncStorage.setItem('userInfo', JSON.stringify(userSignupInfo));
      
      this.props.changeMenu(0);
      Actions.Package();
    }
  }
  
  //Verify phone number (step 1)
  onVerifyPhone() {
    let data = {
      phone: this.state.mobile
    }
    this.setState({ loading: true });
    this.props.verifyPhone(data, this.props.tokenInfo.token);
  }

  checkPhoneResult() {
    this.setState({isAlert: false});
    if (this.props.verifyPhoneInfo.status === '200') {
      this.setState({ verifyStep: 1 });
    }
  }

  //Verify received code (step 2)
  onVerifyCode() {
    let data = {
      phone: this.state.mobile,
      code: this.state.code,
    }
    this.setState({ loading: true });
    this.props.verifyCode(data, this.props.tokenInfo.token);
  }

  checkCodeResult() {
    this.setState({isAlert: false});
    if (this.props.verifyCodeInfo.status === '110') {
      this.setState({ verifyStep: 2 });
    } else {
      this.setState({ verifyStep: 0 });
    }
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
    this.setState({loading: true});
    this.props.userSignUp(data, this.props.tokenInfo.token);
  }

  checkUserSignupResult() {
    this.setState({isAlert: false});
    if (this.props.userSignupInfo.status === '200') {
      this.props.changeMenu(0);
      Actions.Main();
    }
  }

  render() {
    const { loading, isAlert } = this.state

    return (
      <View style={styles.container}>
        <LoadingSpinner visible={loading } />

        {this.props.verifyPhoneInfo && (
          <CustomAlert 
            title={this.props.verifyPhoneInfo.status === '200' ? 'Success' : 'Error'}
            message={I18n.t('register.verify_phone')} 
            visible={isAlert} 
            closeAlert={() => this.checkPhoneResult()}
          />)}

        {this.props.verifyCodeInfo && (
          <CustomAlert 
            title={this.props.verifyCodeInfo.status === '200' ? 'Success' : 'Error'}
            message={this.props.verifyCodeInfo.status === '200' ? I18n.t('register.verify_code') : I18n.t('register.invalid_code')} 
            visible={isAlert} 
            closeAlert={() => this.checkCodeResult()}
          />)}
        
        {this.props.userSignupInfo && (
          <CustomAlert 
            title={this.props.userSignupInfo.status === '200' ? 'Success' : 'Error'}
            message={this.props.userSignupInfo.status === '200' ? I18n.t('register.success') : I18n.t('register.failed')} 
            visible={isAlert} 
            closeAlert={() => this.checkUserSignupResult()}
          />)}

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
              <View style={styles.iconView}>
                <Icon name='user' style={styles.inputIcon}></Icon>
              </View>
              <TextInput
                ref="firstName"
                autoCapitalize="none"
                autoCorrect={ true }
                placeholder={I18n.t('profile.ph_firstname')}
                placeholderTextColor={ commonColors.placeholderSubText }
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                value={ this.state.firstName }
                onChangeText={ (text) => this.setState({ firstName: text }) }
                onSubmitEditing={ () => this.refs.lastName.focus() }
              />
            </View>
            <View style={styles.inputView}>
              <View style={styles.iconView}>
                <Icon name='user' style={styles.inputIcon}></Icon>
              </View>
              <TextInput
                ref="lastName"
                autoCapitalize="none"
                autoCorrect={ true }
                placeholder={I18n.t('profile.ph_lastname')}
                placeholderTextColor={ commonColors.placeholderSubText }
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                value={ this.state.lastName }
                onChangeText={ (text) => this.setState({ lastName: text }) }
                onSubmitEditing={ () => this.refs.mobileNumber.focus() }
              />
            </View>
            <View style={styles.inputView}>
              <View style={styles.iconView}>
                <Icon name='envelope' style={styles.inputIcon}></Icon>
              </View>
              <TextInput
                ref="email"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={I18n.t('profile.ph_email')}
                placeholderTextColor={commonColors.placeholderSubText}
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                onSubmitEditing={() => this.refs.password.focus()}
              />
            </View>
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
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                onSubmitEditing={() => this.refs.confirmPassword.focus()}
              />
            </View>
            <View style={styles.inputView}>
              <View style={styles.iconView}>
                <Icon name='lock' style={styles.inputIcon}></Icon>
              </View>
              <TextInput
                ref="confirmPassword"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={I18n.t('profile.ph_confirm_password')}
                placeholderTextColor={commonColors.placeholderSubText}
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'next'}
                secureTextEntry
                value={this.state.confirmPassword}
                onChangeText={text => this.setState({ confirmPassword: text })}
              />
            </View> 
          </View>)}

          {this.state.verifyStep === 1 && (
          <View style={styles.fieldContainer}>
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
                returnKeyType={'next'}
                keyboardType="phone-pad"
                value={this.state.mobile}
                onChangeText={text => this.setState({ mobile: text })}
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
                placeholderTextColor={commonColors.placeholderSubText}
                textAlign="left"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'next'}
                keyboardType="numbers-and-punctuation"
                value={ this.state.code }
                onChangeText={text => this.setState({ code: text })}
                onSubmitEditing={() => this.refs.email.focus()}
              />
            </View>
          </View>)}

          {this.state.verifyStep === (_isArabic ? 2 : 0) && (
          <View style={styles.fieldContainer}>
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
                returnKeyType={'next'}
                keyboardType="phone-pad"
                value={this.state.mobile}
                onChangeText={text => this.setState({ mobile: text })}
              />
            </View>
          </View>)}
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
  verifyPhoneInfo: state.user.verifyPhoneInfo,
  verifyCodeInfo: state.user.verifyCodeInfo,
  userSignupInfo: state.user.userSignupInfo,
}),{ verifyPhone, verifyCode, userSignUp, changeMenu })(Signup);
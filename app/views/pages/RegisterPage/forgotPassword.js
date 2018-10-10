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
import Container from '@layout/Container';
import CustomAlert from '@components/CustomAlert';
import LoadingSpinner from '@components/LoadingSpinner';

import I18n from '@i18n';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { styles, wizardStyle } from './styles';
import { verifyCode, updatePassword } from '@redux/User/actions';

const _isArabic = true

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      code: '',
      password: '',
      verifyStep: _isArabic ? 1 : 0,

      isError: false,
      errorTitle: '',
      errorText: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (this.props.user.status === 'VERIFY_CODE_REQUEST' && user.status === 'VERIFY_CODE_SUCCESS') {
      this.setState({ loading: false })

      if (user.verifyCodeInfo.status === '200') {
        this.setState({ verifyStep: 0 });
      } else {
        this.setState({
          isError: true,
          errorTitle: I18n.t('alert.error'),
          errorText: I18n.t('register.invalid_code')
        })
      }
    }
    if (this.props.user.status === 'VERIFY_CODE_REQUEST' && user.status === 'VERIFY_CODE_FAILED') {
      this.setState({
        loading: false,
        isError: true,
        errorTitle: I18n.t('alert.error'),
        errorText: I18n.t('register.invalid_code')
      })
    }

    if (this.props.user.status === 'UPDATE_PASSWORD_REQUEST' && user.status === 'UPDATE_PASSWORD_SUCCESS') {
      this.setState({ loading: false })

      if (user.updatePasswordResult.status === '200') {
        Actions.pop();
      } else {
        this.setState({
          isError: true,
          errorTitle: I18n.t('alert.error'),
          errorText: I18n.t('register.update_password_failed')
        })
      }
    }
  }
  
  // Verify received code (step 1)
  onVerifyCode() {
    if (this.state.code === '') {
      this.setState({
        isError: true,
        errorTitle: I18n.t('alert.warning'),
        errorText: I18n.t('register.input_code')
      })
      return
    }

    let data = {
      phone: this.props.phone,
      code: this.state.code,
    }
    this.setState({ loading: true });
    this.props.verifyCode(data, this.props.tokenInfo.token);
  }

  onUpdatePassword() {
    if (this.state.password === '') {
      this.setState({
        isError: true,
        errorTitle: I18n.t('alert.warning'),
        errorText: I18n.t('register.input_password')
      })
      return
    }

    let data = {
      phone: this.props.phone,
      password: this.state.password,
    }
    this.setState({ loading: true });
    this.props.updatePassword(data, this.props.tokenInfo.token);
  }

  render() {
    const { loading, isError, errorTitle, errorText } = this.state
    const { user } = this.props

    return (
      <Container title={I18n.t('profile.forgot_password')} type='detail'>
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
              labels={[I18n.t('profile.wizard_update'), I18n.t('profile.wizard_code')]}
              stepCount={2}
            />
          </View>

          <KeyboardScrollView>
            <View style={styles.fieldContainerLogin}>
              {this.state.verifyStep === 1 && (
                <View style={styles.inputView}>
                  <TextInput
                    ref="confirmCode"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={I18n.t('profile.ph_confirm_code')}
                    placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={'send'}
                    keyboardType="numbers-and-punctuation"
                    value={ this.state.code }
                    onChangeText={text => this.setState({ code: text })}
                    onSubmitEditing={() => this.onVerifyCode()}
                  />
                  <View style={styles.iconView}>
                    <Icon name='eye' style={styles.inputIcon}></Icon>
                  </View>
                </View>
              )}

              {this.state.verifyStep === 0 && (
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
                    onSubmitEditing={() => this.onUpdatePassword()}
                  />
                  <View style={styles.iconView}>
                    <Icon name='lock' style={styles.inputIcon}></Icon>
                  </View>
                </View>
              )}

              {this.state.verifyStep === 1 && (
                <View style={[styles.btnViewLogin, { marginTop: 100 }]}>
                  <TouchableOpacity onPress={() => this.onVerifyCode()} activeOpacity={0.5}>
                    <View style={styles.btnWrapper}>
                      <Text style={styles.btnText}>{I18n.t('profile.confirm_code')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>)}

              {this.state.verifyStep === 0 && (
                <View style={[styles.btnViewLogin, { marginTop: 100 }]}>
                  <TouchableOpacity onPress={() => this.onUpdatePassword()} activeOpacity={0.5}>
                    <View style={styles.btnWrapper}>
                      <Text style={styles.btnText}>{I18n.t('update')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>)}
            </View>
          </KeyboardScrollView>
        </View>
      </Container>
    );
  }
}

export default connect(state => ({
  tokenInfo: state.token.tokenInfo,
  user: state.user,
}),{ verifyCode, updatePassword })(ForgotPassword);
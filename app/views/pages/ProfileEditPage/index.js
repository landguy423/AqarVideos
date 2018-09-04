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
} from 'react-native';

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import I18n from '@i18n';
import Container from '@layout/Container';
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';
import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { getProfileData, updateProfileData } from '@redux/Profile/actions';

class ProfileEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isUpdate: false,

      firstname: '',
      lastname: '',
      email: '',  
      telephone: '',
      password: '',
      confirmPassword: '',
    }
  }

  componentWillMount() {
    const {
      token,
      user,
      profile,
      getProfileData,
    } = this.props

    this.setState({ loading: true })
    getProfileData(token.tokenInfo.token, { customer_id: user.userInfo.user.customer_id })
  }

  componentWillReceiveProps({ profile }) {
    if (this.props.profile.status === 'GET_PROFILE_REQUEST' && profile.status === 'GET_PROFILE_SUCCESS') {
      this.setData(profile.profileData)
    }

    if (this.props.profile.status === 'UPDATE_PROFILE_REQUEST' && profile.status === 'UPDATE_PROFILE_SUCCESS') {
      this.setState({
        loading: false,
        isUpdate: true,
        message: I18n.t('profile.success'),
        password: '',
        confirmPassword: '',
      })
    }
  }

  setData = (profileData) => {
    this.setState({ loading: false })
    this.setState({
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      telephone: profileData.telephone,
      email: profileData.email,
    })
  }

  onUpdate() {
    const {
      token,
      user,
      updateProfileData,
    } = this.props

    const { firstname, lastname, telephone, email, password, confirmPassword} = this.state

    if (password !== confirmPassword) {
      this.setState({ isUpdate: true, message: 'Confirm password should be matched' })
      return;
    }

    this.setState({ loading: true })
    let data = {
      customer_id: user.userInfo.user.customer_id,
      firstname,
      lastname,
      telephone,
      email: this.state.email,
    };

    if (password.length > 0) {
      data = {
        customer_id: user.userInfo.user.customer_id,
        firstname,
        lastname,
        telephone,
        email: this.state.email,
        password,
      };
    }

    updateProfileData(
      token.tokenInfo.token,
      data,
    )
  }

  closeAlert = () => {
    this.setState({ isUpdate: false })
  }

  render() {
    const { loading, isUpdate } = this.state;

    return (
      <Container title={I18n.t('sidebar.my_profile')}>
        <LoadingSpinner visible={loading } />
        <CustomAlert 
          title={'Success'}
          message={this.state.message}
          visible={isUpdate} 
          closeAlert={() => this.closeAlert()}
        />

        <View style={styles.container}>
          <KeyboardScrollView>
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <TextInput
                  ref="firstName"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('profile.ph_firstname')}
                  placeholderTextColor={ commonColors.placeholderSubText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.firstname }
                  onChangeText={ (text) => this.setState({ firstname: text }) }
                  onSubmitEditing={ () => this.refs.lastname.focus() }
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
                  placeholderTextColor={ commonColors.placeholderSubText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.lastname }
                  onChangeText={ (text) => this.setState({ lastname: text }) }
                  onSubmitEditing={ () => this.refs.telephone.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='user' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="mobileNumber"
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder={I18n.t('profile.ph_mobile_number')}
                  placeholderTextColor={ commonColors.placeholderSubText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.telephone }
                  onChangeText={ (text) => this.setState({ telephone: text }) }
                  onSubmitEditing={ () => this.refs.email.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='screen-tablet' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="email"
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder={I18n.t('profile.ph_email')}
                  placeholderTextColor={ commonColors.placeholderSubText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="email-address"
                  value={ this.state.email }
                  onChangeText={ (text) => this.setState({ email: text }) }
                  onSubmitEditing={ () => this.refs.password.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='envelope' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="password"
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder={I18n.t('profile.ph_password')}
                  placeholderTextColor={ commonColors.placeholderSubText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  secureTextEntry
                  value={ this.state.password }
                  onChangeText={ (text) => this.setState({ password: text }) }
                  onSubmitEditing={ () => this.refs.confirmPassword.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='lock' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref="confirmPassword"
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder={I18n.t('profile.ph_confirm_password')}
                  placeholderTextColor={commonColors.placeholderSubText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  secureTextEntry
                  value={this.state.confirmPassword}
                  onChangeText={text => this.setState({ confirmPassword: text }) }
                />
                <View style={styles.iconView}>
                  <Icon name='lock' style={styles.inputIcon}></Icon>
                </View>
              </View>     
            </View>
          </KeyboardScrollView>
          <View style={styles.btnView}>
            <TouchableOpacity onPress={() => this.onUpdate()} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{I18n.t('update')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ profile, token, user }) => ({
  profile,
  user,
  token,
})

const mapDispatchToProps = dispatch => ({
  getProfileData: (token, data) => dispatch(getProfileData(token, data)),
  updateProfileData: (token, data) => dispatch(updateProfileData(token, data)),
})

ProfileEditPage.propTypes = {
  getProfileData: PropTypes.func.isRequired,
  updateProfileData: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileEditPage)
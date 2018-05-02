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
  Platform,
} from 'react-native';

import * as TELR_PAYMENT from '@common/payment_telr/telr_payment'

import FontAwesome, {Icons} from 'react-native-fontawesome';
import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import DatePicker from 'react-native-datepicker';
var DeviceInfo = require('react-native-device-info');

const img_detail = require('@common/assets/images/my_message/picture.png');

import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export default class PackageDetailBankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2018-05',
    }
  }

  onTry() {
    const { date } = this.state
    const expYear = date.split('-')[0]
    const expMonth = date.split('-')[1]

    const device_uuid = DeviceInfo.getUniqueID();
    const device_version = DeviceInfo.getVersion();

    const data = {
      platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
      deviceID: device_uuid,
      deviceVersion: device_version,
      storeID: '20040 - Lens Company',
      authorizeKey: 'W75df^Kr6v-Gk64T',
      tran: {
        mode: 1, // 0: live
        amount: this.state.totalAmount,
        currency: 'SAR',
        description: 'Test AQAR Mobile API',
      },
      card: {
        cardNumber: '4111111111111111',
        cvv: 123,
        expiry: {
          month: expMonth,
          year: expYear,
        }
      },
      billing: {
        name: {
          first: 'Jone',
          last: 'Done',
          title: 'Mr',
        },
        address: {
          line1: 'SIT',
          city: 'Dubai',
          region: 'Dubai',
          country: 'AE',
        },
        email: 'test@test.com',
      }
    }
    TELR_PAYMENT.start(data)
  }

  onChange(date) {
		this.setState({ date });
  }

  render() {
    const data = {
      price: 100,
      duration: 20,
      detail: {
        '1': {
          title: 'Test',
          deacription: 'Test'
        }
      }
    }

    return (
      <Container title={data.detail['1'].title} type='detail'>
        <View style={styles.container}>
          <Image source={img_detail} style={styles.thumbnail} />

          <View style={styles.fieldContainer}>
            <KeyboardScrollView>
              <View style={styles.inputView}>
                <TextInput
                  ref="totalAmount"
                  id="amount"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('packages.total_amount')}
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.totalAmount }
                  onChangeText={ (text) => this.setState({ totalAmount: text }) }
                  onSubmitEditing={ () => this.refs.accountNumber.focus() }
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="accountNumber"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('packages.account_number')}
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.accountNumber }
                  onChangeText={ (text) => this.setState({ accountNumber: text }) }
                  onSubmitEditing={ () => this.refs.companyName.focus() }
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="companyName"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('packages.company_name')}
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.companyName }
                  onChangeText={ (text) => this.setState({ companyName: text }) }
                  onSubmitEditing={ () => this.refs.bankNumber.focus() }
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="bankNumber"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('packages.bank_number')}
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.bankNumber }
                  onChangeText={ (text) => this.setState({ bankNumber: text }) }
                  onSubmitEditing={ () => this.refs.senderName.focus() }
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="senderName"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('packages.sender_name')}
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.senderName }
                  onChangeText={ (text) => this.setState({ senderName: text }) }
                  onSubmitEditing={ () => this.refs.referNumber.focus() }
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="referNumber"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('packages.refer_number')}
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.referNumber }
                  onChangeText={ (text) => this.setState({ referNumber: text }) }
                  onSubmitEditing={ () => this.refs.bankName.focus() }
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="bankName"
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder={I18n.t('packages.bank_name')}
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  keyboardType="numbers-and-punctuation"
                  value={ this.state.bankName }
                  onChangeText={ (text) => this.setState({ bankName: text }) }
                  onSubmitEditing={ () => this.refs.bankName.focus() }
                />
              </View>

              <View style={styles.inputView}>
                <DatePicker
                  style={{width: '100%'}}
                  date={this.state.date}
                  mode="date"
                  placeholder={I18n.t('packages.date')}
                  format="YYYY-MM"
                  minDate="2015-01-01"
                  maxDate="2050-12-31"
                  confirmBtnText={I18n.t('packages.confirm')}
                  cancelBtnText={I18n.t('packages.cancel')}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      alignItems: 'flex-end',
                    },
                    placeholderText: {
                      color: commonColors.placeholderText
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  iconComponent={
                    <View />
                  }
                  onDateChange={date => this.onChange(date)}
                />
              </View>
            </KeyboardScrollView>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity onPress={() => this.onTry()} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{I18n.t('packages.try')}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </Container>
    );
  }
}
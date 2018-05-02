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

import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import I18n from '@i18n';
import Container from '@layout/Container';
import DropdownComponent from '@components/DropdownComponent';

import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export default class SupportAdvertisementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      email: '',
      fullName: '',
      mobileNumber: '',
      subject: '',
    }
  }

  onUpdate() {
    
  }

  render() {
    const {tabIndex} = this.state;
    const subjectData = [
      { value: 'Subject1' },
      { value: 'Subject2' },
      { value: 'Subject3' }
    ];

    return (
      <Container title={I18n.t('sidebar.support_advertisement')}>
        <View style={styles.container}>
          <KeyboardScrollView>
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <TextInput
                  ref="fullName"
                  autoCapitalize="none"
                  autoCorrect
                  placeholder={I18n.t('profile.ph_name')}
                  placeholderTextColor={commonColors.placeholderText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  value={this.state.fullName}
                  onChangeText={text => this.setState({ fullName: text })}
                  onSubmitEditing={() => this.refs.mobileNumber.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='user' style={styles.inputIcon}></Icon>
                </View>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="mobileNumber"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_mobile_number')}
                  placeholderTextColor={commonColors.placeholderText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.mobile}
                  onChangeText={text => this.setState({ mobile: text }) }
                  onSubmitEditing={() => this.refs.email.focus()}
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
                  placeholderTextColor={commonColors.placeholderText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={() => this.refs.message.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='envelope' style={styles.inputIcon}></Icon>
                </View>
              </View>

              <View style={styles.itemView}>
                <Text style={styles.textTitle}>{I18n.t('support.subject')}</Text>
                <DropdownComponent
                  selectItem={value => this.setState({ subject: value })}
                  item={this.state.subject} data={subjectData}
                />
              </View>

              <View style={styles.itemView}>
                <Text style={styles.textTitle}>{I18n.t('support.message')}</Text>
                <TextInput
                  ref="message"
                  multiline
                  autoCapitalize="none"
                  autoCorrect
                  placeholder={I18n.t('support.ph_message')}
                  placeholderTextColor={commonColors.placeholderText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  value={this.state.message}
                  onChangeText={text => this.setState({ message: text })}
                />
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
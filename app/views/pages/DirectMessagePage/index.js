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

import FontAwesome, {Icons} from 'react-native-fontawesome';
import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Container from '@layout/Container';
import DropdownComponent from '@components/DropdownComponent';

import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export default class DirectMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fullName: '',
      subject: '',
    }
  }

  onSend() {
    
  }

  render() {
    const {tabIndex} = this.state;
    const subjectData = [
      { value: 'Subject1' },
      { value: 'Subject2' },
      { value: 'Subject3' }
    ];

    return (
      <Container title={'DIRECT MESSAGE'} type='detail'>
        <View style={styles.container}>
          <KeyboardScrollView>
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <TextInput
                  ref="fullName"
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder="Fullname"
                  placeholderTextColor={ commonColors.placeholderText }
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={ 'next' }
                  value={ this.state.fullName }
                  onChangeText={ (text) => this.setState({ fullName: text }) }
                  onSubmitEditing={ () => this.refs.message.focus() }
                />
                <View style={styles.iconView}>
                  <Icon name='user' style={styles.inputIcon}></Icon>
                </View>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>Subject</Text>
                <DropdownComponent selectItem={value => this.setState({ subject: value })} item={this.state.subject} data={subjectData} />
              </View>
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>Message</Text>
                <TextInput
                  ref="message"
                  multiline
                  autoCapitalize="none"
                  autoCorrect={ true }
                  placeholder="Type your message here"
                  placeholderTextColor={ commonColors.placeholderText }
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
            <TouchableOpacity onPress={() => this.onSend()} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>SEND</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}
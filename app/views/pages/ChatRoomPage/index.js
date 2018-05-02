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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import I18n from '@i18n';
import Container from '@layout/Container';
import KeyboardScrollView from '@components/KeyboardView';
import SendMessageComponent from '@components/MessageComponent/SendMessageComponent';
import ReceiveMessageComponent from '@components/MessageComponent/ReceiveMessageComponent';

import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export default class ChatRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageData: [],
    }
  }

  componentWillMount() {
    const messageData = [
      {
        type: 'receive',
        name: 'User1',
        message: 'testtesttesttesttesttesttesttesttesttesttesttest',
        date: '15.Nov 13:45'
      },
      {
        type: 'send',
        name: 'Me',
        message: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestesttesttesttesttest',
        date: '15.Nov 13:45'
      },
      {
        type: 'receive',
        name: 'User1',
        message: 'testtesttesttesttesttesttesttesttesttesttesttestesttesttesttesttestesttesttesttesttest',
        date: '15.Nov 13:45'
      },
      {
        type: 'receive',
        name: 'User2',
        message: 'testtesttesttesttesttesttesttest',
        date: '15.Nov 13:45'
      },
      {
        type: 'send',
        name: 'Me',
        message: 'testtesttesttesttesttesttesttesttesttesttesttest',
        date: '15.Nov 13:45'
      },
      {
        type: 'receive',
        name: 'User1',
        message: 'teststtest',
        date: '15.Nov 13:45'
      },
      {
        type: 'receive',
        name: 'User2',
        message: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
        date: '15.Nov 13:45'
      },
    ];

    this.setState({ messageData });
  }
  onItemSelect(rowData, rowID) {
    
  }
    
  _renderRow (rowData, sectionID, rowID, highlightRow) {
    if (rowData.type == 'send') {
      return (
        <SendMessageComponent data={rowData} />
      )
    }
    else {
      return (
        <ReceiveMessageComponent data={rowData} />
      )
    }
  }
  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
          key={`${sectionID}-${rowID}`}
          style={{ height: 0, backgroundColor: 'transparent', flex:1}}
      />
    );
  }
  
  onSend() {
    const { messageData, message } = this.state;
    this.setState({
      messageData: [
        ...messageData,
        {
          type: 'send',
          name: 'Me',
          message: message,
          date: '15.Nov 13:45'
        }
      ],
    })
  }

  render() {
    const { data } = this.props;
    const { messageData } = this.state;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(messageData);

    return (
      <Container title={data.name} type="detail">
        <View style={styles.container}>
          <KeyboardScrollView>
            <View style={styles.container}>
              <View style={styles.messageContainer}>
                <ListView
                  ref='listview'
                  dataSource={dataSource}
                  renderRow={this._renderRow.bind(this)}
                  renderSeparator={this._renderSeparator}
                  contentContainerStyle={styles.listView}
                  onContentSizeChange={(width, height) => this.refs.listview.scrollToEnd()}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputView}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={ true }
                    multiline
                    placeholder={I18n.t('support.ph_message')}
                    placeholderTextColor={ commonColors.placeholderText }
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={ 'next' }
                    value={ this.state.message }
                    onChangeText={ (text) => this.setState({ message: text }) }
                  />
                  <Icon name='pencil' style={styles.iconPen} />
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.onSend()}>
                  <View style={styles.btnSendView}>
                    <Icon name='send' style={styles.iconSend} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardScrollView>
        </View>
      </Container>
    );
  }
}
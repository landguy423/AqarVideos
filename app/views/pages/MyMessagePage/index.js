import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import FontAwesome, {Icons} from 'react-native-fontawesome';
const icon_report = require('@common/assets/images/my_message/icon.png');

export default class MyMessagePage extends Component {
  constructor(props) {
    super(props);
  }

  onItemSelect(rowData, rowID) {
    Actions.ChatRoom({data: rowData})
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity 
        activeOpacity={0.6}
        onPress={() => this.onItemSelect(rowData, rowID)}
      >
        <View style={styles.listItem}>
          <View style={styles.leftView}>
            <View style={styles.dateView}>
              <View style={styles.countView}>
                <Text style={styles.textCount}>{rowData.count}</Text>
              </View>
              <Text style={styles.textMessage}>{rowData.date}</Text>
            </View>
            <View>
              <Text style={styles.textName}>{rowData.name}</Text>
              <View style={styles.bottomWrapper}>
                <Text style={styles.textMessage}>{rowData.message}</Text>
              </View>
            </View>
          </View>
          <View style={styles.imageView}>
            <Image source={icon_report} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    let listData = [
      {
        name: 'John_Doe',
        message: 'Lorem ipsum dolor sit amet...',
        count: 11,
        date: '2 Nov',
      },
      {
        name: 'Mirande_Doe',
        message: 'Lorem ipsum dolor sit amet...',
        count: 2,
        date: '6 Dec',
      },
      {
        name: 'Carlo_Doe',
        message: 'Lorem ipsum dolor sit amet...',
        count: 4,
        date: '3 Oct',
      },
    ]
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(listData);

    return (
      <Container title={I18n.t('sidebar.my_messages')}>
        <View style={styles.container}>
          <ListView
              ref='listview'
              dataSource={dataSource}
              renderRow={this._renderRow.bind(this)}
              contentContainerStyle={styles.listView}
            />
        </View>
      </Container>
    );
  }
}
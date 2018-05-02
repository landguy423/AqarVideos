import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Triangle from 'react-native-triangle';
import { styles } from './styles';

export default class SendMessageComponent extends Component {
  render() {
    const {data} = this.props;
    
    return (
      <View style={styles.sendContainer}>
        <View style={styles.sendMessageContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.body}>
            <View style={styles.sendMessageBox}>
              <Text style={styles.sendMessage}>{data.message}</Text>   
            </View>
            <View style={styles.triangel}>
              <Triangle
                width={10}
                height={10}
                color={'#EFEFEF'}
                direction={'right'}
              />
            </View>
          </View>
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </View>
    )
  }
}
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

export default class ReceiveMessageComponent extends Component {
  render() {
    const {data} = this.props;
    
    return (
      <View style={styles.receiveContainer}>
        <View style={styles.receiveMessageContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.body}>
            <View style={styles.triangel}>
              <Triangle
                width={10}
                height={10}
                color={'#88AC40'}
                direction={'left'}
              />
            </View>
            <View style={styles.receiveMessageBox}>
              <Text style={styles.receiveMessage}>{data.message}</Text>   
            </View>
          </View>
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </View>
    )
  }
}
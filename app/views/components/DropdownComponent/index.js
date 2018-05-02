import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Dropdown} from 'react-native-material-dropdown';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { styles } from './styles';

export default class DropdownComponent extends Component {
  render() {
    return (
      <View style={styles.dropDown}>
        <Dropdown
          label=''
          labelHeight={0}
          data={this.props.data}
          textColor='#7D7D7D'
          selectedItemColor='#222'
          itemTextStyle={styles.dropdownItemStyle}
          pickerStyle={styles.pickerStyle}
          itemCount={10}
          onChangeText={value => this.props.selectItem(value)}
          renderBase={() => (
            <View style={styles.dropdownPlaceholderView}>
              <IconEntypo name='chevron-down' style={styles.arrowDown} />
            </View>
          )}
          underlineColorAndroid='transparent'
        />
        <Text style={styles.dropdownPlaceholderText}>{this.props.item}</Text>
      </View>
    )
  }
}
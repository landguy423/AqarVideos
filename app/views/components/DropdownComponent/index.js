import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
          onChangeText={(value, index) => this.props.selectItem(index)}
          renderBase={() => (
            <View style={styles.dropdownPlaceholderView}>
              <Text style={styles.dropdownPlaceholderText}>{this.props.item}</Text>
              <FontAwesome name='angle-down' style={styles.arrowDown} size={30} />
            </View>
          )}
          underlineColorAndroid='transparent'
        />
      </View>
    )
  }
}
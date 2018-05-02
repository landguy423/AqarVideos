import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { styles } from './styles';
const icon_close = require('@common/assets/images/map/twisted_plus.png');
const icon_plus = require('@common/assets/images/map/plus.png');

export default class ButtonPlusComponent extends Component {
  render() {
    return (
      <View style={[styles.btn, this.props.btnStatus === 'map' ? styles.btnPlus : styles.btnPlusList]}>
        <TouchableOpacity onPress={() => this.props.onSelectItem('plus')} activeOpacity={0.8}>
          <Image source={this.props.isBtnList ? icon_close : icon_plus} style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  View,
  Text,
  Image,
  ListView,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';

const icon_menu = require('@common/assets/images/navigation/menu.png');
const icon_search = require('@common/assets/images/navigation/search.png');

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onSearch() {
    Actions.Search();
  }

  onBack() {
    Actions.pop();
  }

  render() {
    const { title, type } = this.props;

    if (type == 'register') {
      return (
        <View style={styles.container_register}>
          <View style={styles.backIconWrapper}>
            <TouchableOpacity onPress={() => this.onBack()}>
              <Icon name='arrow-left' style={styles.backIcon}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else if (type == 'detail') {
      return (
        <View style={styles.container_detail}>
          <View style={styles.backIconWrapper}>
            <TouchableOpacity onPress={() => this.onBack()}>
              <Icon name='arrow-left' style={styles.backIcon_detail}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={styles.menuTitle}>{title}</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>  
          <TouchableOpacity onPress={() => this.onSearch()}>
            <Image source={icon_search} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={type === 'support' ? styles.menuTitle_support : styles.menuTitle}>{title.toUpperCase()}</Text>
          <TouchableOpacity onPress={() => this.props.menuState()}>
            <Image source={icon_menu} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Navigation;
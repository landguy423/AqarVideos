'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  findNodeHandle,  
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Sidebar from '../Sidebar';
import Navigation from '../Navigation';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  onSideMenuChange(isOpen) {
    this.setState({isMenuOpen: isOpen});
  }

  toggleSideMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  }

  render()
  {
    const { type } = this.props;
    const { isMenuOpen } = this.state;
    const menuComponent = <Sidebar menuState={() => this.toggleSideMenu()} />;

    if (type == 'detail' || type == 'register') {
      return (
        <View>
          <Navigation menuState={() => this.toggleSideMenu()} { ...this.props } />
          {this.props.children}
        </View>
      );
    }

    return (
      <SideMenu
        isOpen={isMenuOpen}
        onChange={isOpen => this.onSideMenuChange(isOpen)}
        menuPosition="right"
        openMenuOffset={250}
        menu={menuComponent}
      >
        <Navigation menuState={() => this.toggleSideMenu()} {...this.props} />
        {this.props.children}
      </SideMenu>
    );
  }
}

Container.defaultProps = {
  type: 'main',
}

export default Container
'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  WebView,
  Platform,
  BackHandler, 
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import WebViewAndroid from 'react-native-webview-android';
import Icon from 'react-native-vector-icons/Feather';
import I18n from '@i18n'
import { styles } from './styles';

class PaymentWebPage extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonClick);
    }
  }

  handleBackButtonClick() {
    Actions.Package()
    return true;
  }

  onBack = () => {
    Actions.Package()
  }

  render() {
    const { url } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backIconWrapper}>
            <TouchableOpacity onPress={() => this.onBack()}>
              <Icon name='arrow-left' style={styles.backIcon}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={styles.menuTitle}>{I18n.t('packages.web_title')}</Text>
        </View>

        <View style={styles.paymentView}>
          {Platform.OS === 'ios'
          ? <WebView 
              source={{ uri: url }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              decelerationRate="normal"
              javaScriptEnabledAndroid={true}
              scalesPageToFit={true}
              startInLoadingState={true}
            />
          : <WebViewAndroid
              javaScriptEnabled={true}
              startInLoadingState={true}
              url={url} // or use the source(object) attribute...
            />}
          </View>
      </View>
    );
  }
}

export default PaymentWebPage
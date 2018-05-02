import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const loading_icon = require('@common/assets/images/loading_icon/splash_loading.gif');

import { styles } from './styles';

const SplashScreenPage = () => (
  <View style={styles.container}>
    <View style={styles.loadingIconView}>
      <Image source={loading_icon} style={styles.loadingIcon} resizeMode='center' />
    </View>
    <View style={styles.loadingTextView}>
      <Text style={styles.loadingText}>www.videoaqar.com</Text>
    </View>
  </View>
);

export default SplashScreenPage
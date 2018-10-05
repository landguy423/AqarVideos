import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const loading_icon = require('@common/assets/images/splash_screen/splash_screen.jpg');

import { styles } from './styles';

const SplashScreenPage = () => (
  <View style={styles.container}>
    <View style={styles.loadingIconView}>
      <Image source={loading_icon} style={styles.loadingIcon} resizeMode='cover' />
    </View>
  </View>
);

export default SplashScreenPage
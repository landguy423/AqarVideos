import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import { ifIphoneX } from 'react-native-iphone-x-helper';

import ExtraDimensions from 'react-native-extra-dimensions-android';

export const { width: screenWidthIOS, height: screenHeightIOS } = Dimensions.get('window');

export const RealWidth = ExtraDimensions.get('REAL_WINDOW_WIDTH');
export const RealHeight = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
export const softMenubarHeight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
export const statusbarHeight = ExtraDimensions.get('STATUS_BAR_HEIGHT');
export const smartbarHeight = ExtraDimensions.get('SMART_BAR_HEIGHT');

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(44, 30) : 20;

function getScreenHeight() {
  if (Platform.OS === "ios") {
    return screenHeightIOS;
  }
  else {
    return RealHeight - softMenubarHeight - statusbarHeight - smartbarHeight;
  }
}

function getScreenWidth() {
  if (Platform.OS === "ios") {
    return screenWidthIOS;
  }
  else {
    return RealWidth;
  }
}

export let screenHeight = getScreenHeight();
export let screenWidth = getScreenWidth();

export const menuHeight = 30 + STATUSBAR_HEIGHT;
export const tabBarHieght = 45;

export const screenNormalHeight = screenHeight - menuHeight;
export const screenSubHeight = screenHeight - menuHeight - tabBarHieght;
export const screenSubWidth = screenWidth * 0.9;

export const padding = screenWidth * 0.05;

export const buttonBottomHeight = Platform.OS === 'ios' ? ifIphoneX(60, 40) : 40;
export const normalFontSize = 13;
export const buttonHeight = 50;

export const normalFont = 'NotoKufiArabic';
export const boldFont = 'NotoKufiArabic';
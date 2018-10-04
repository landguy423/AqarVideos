import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native'

import { ifIphoneX } from 'react-native-iphone-x-helper'

import ExtraDimensions from 'react-native-extra-dimensions-android'

export const { width: screenWidthIOS, height: screenHeightIOS } = Dimensions.get('window')

export const RealWidth = ExtraDimensions.get('REAL_WINDOW_WIDTH')
export const RealHeight = ExtraDimensions.get('REAL_WINDOW_HEIGHT')
export const softMenubarHeight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT')
export const statusbarHeight = ExtraDimensions.get('STATUS_BAR_HEIGHT')
export const smartbarHeight = ExtraDimensions.get('SMART_BAR_HEIGHT')

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(44, 30) : 20

function getScreenHeight() {
  if (Platform.OS === "ios") {
    return screenHeightIOS
  }
  else {
    return RealHeight - softMenubarHeight - statusbarHeight - smartbarHeight
  }
}

function getScreenWidth() {
  if (Platform.OS === "ios") {
    return screenWidthIOS
  }
  else {
    return RealWidth
  }
}

export let SCREEN_HEIGHT = getScreenHeight()
export let SCREEN_WIDTH = getScreenWidth()

export const MENU_HEIGHT = 30 + STATUSBAR_HEIGHT
export const TAB_BAR_HEIGHT = 45

export const SCREEN_NORMAL_HEIGHT = SCREEN_HEIGHT - MENU_HEIGHT
export const SCREEN_SUB_HEIGHT = SCREEN_HEIGHT - MENU_HEIGHT - TAB_BAR_HEIGHT
export const SCREEN_SUB_WIDTH = SCREEN_WIDTH * 0.9

export const PADDING = SCREEN_WIDTH * 0.05

export const BUTTON_BOTTOM_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(60, 40) : 40
export const BUTTON_HEIGHT = 50

export const NORMAL_FONT_SIZE = 14
export const LARGE_FONT_SIZE = 18
export const SMALL_FONT_SIZE = 12
export const NORMAL_FONT_FAMILY = 'NotoKufiArabic'
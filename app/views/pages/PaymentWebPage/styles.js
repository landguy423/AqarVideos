import {
  StyleSheet,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(44, 20) : 0;

import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    height: COMMON_COLORS.SCREEN_HEIGHT
  },
  header: {
    height: COMMON_STYLES.MENU_HEIGHT,
    width: COMMON_STYLES.SCREEN_WIDTH,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    paddingTop: STATUSBAR_HEIGHT - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(179, 33, 118, 0.5)',
  },
  backIconWrapper: {
    position: 'absolute',
    left: COMMON_STYLES.PADDING,
    width: 30,
    bottom: 10,
  },
  backIcon: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  },
  menuTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    textAlign: 'center',
    color: 'white',
  },
  paymentView: {
    height: COMMON_STYLES.SCREEN_HEIGHT - COMMON_STYLES.MENU_HEIGHT - 10,
    width: COMMON_STYLES.SCREEN_WIDTH,
  },
});
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
    height: COMMON_STYLES.MENU_HEIGHT,
    width: COMMON_STYLES.SCREEN_WIDTH,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    paddingTop: STATUSBAR_HEIGHT - 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(179, 33, 118, 0.5)',
    justifyContent: 'center',
  },
  container_register: {
    height: COMMON_STYLES.MENU_HEIGHT,
    width: COMMON_STYLES.SCREEN_WIDTH,
    backgroundColor: 'white',
    paddingTop: STATUSBAR_HEIGHT - 10,
    borderColor: 'rgba(179, 33, 118, 0.5)',
  },
  container_detail: {
    height: COMMON_STYLES.MENU_HEIGHT,
    width: COMMON_STYLES.SCREEN_WIDTH,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    paddingTop: STATUSBAR_HEIGHT - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(179, 33, 118, 0.5)',
  },
  subContainer:{
    height: 30,
    paddingHorizontal: COMMON_STYLES.PADDING,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    textAlign: 'center',
    color: 'white',
  },
  menuTitle_support: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  menuItemIcon: {
    width: 20,
    height: 20,
  },
  backIcon: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 25,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
  },
  backIconWrapper: {
    position: 'absolute',
    left: COMMON_STYLES.PADDING,
    width: 30,
    bottom: 10,
  },
  backIcon_detail: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  },
});
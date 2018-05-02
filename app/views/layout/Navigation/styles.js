import {
  StyleSheet,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(44, 20) : 0;

import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    height: commonStyles.menuHeight,
    width: commonStyles.screenWidth,
    backgroundColor: commonColors.pinkColor,
    paddingTop: STATUSBAR_HEIGHT - 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(179, 33, 118, 0.5)',
    justifyContent: 'center',
  },
  container_register: {
    height: commonStyles.menuHeight,
    width: commonStyles.screenWidth,
    backgroundColor: 'white',
    paddingTop: STATUSBAR_HEIGHT - 10,
    borderColor: 'rgba(179, 33, 118, 0.5)',
  },
  container_detail: {
    height: commonStyles.menuHeight,
    width: commonStyles.screenWidth,
    backgroundColor: commonColors.pinkColor,
    paddingTop: STATUSBAR_HEIGHT - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(179, 33, 118, 0.5)',
  },
  subContainer:{
    height: 30,
    paddingHorizontal: commonStyles.padding,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  menuTitle_support: {
    fontFamily: commonStyles.normalFont,
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  menuItemIcon: {
    width: 20,
    height: 20,
  },
  backIcon: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: 25,
    color: commonColors.darkGrayColor,
  },
  backIconWrapper: {
    position: 'absolute',
    left: commonStyles.padding,
    width: 30,
    bottom: 10,
  },
  backIcon_detail: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  },
});
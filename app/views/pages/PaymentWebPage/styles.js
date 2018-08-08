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
    width: commonStyles.screenWidth,
    height: commonColors.screenHeight
  },
  header: {
    height: commonStyles.menuHeight,
    width: commonStyles.screenWidth,
    backgroundColor: commonColors.pinkColor,
    paddingTop: STATUSBAR_HEIGHT - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(179, 33, 118, 0.5)',
  },
  backIconWrapper: {
    position: 'absolute',
    left: commonStyles.padding,
    width: 30,
    bottom: 10,
  },
  backIcon: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  },
  menuTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  paymentView: {
    height: commonStyles.screenHeight - commonStyles.menuHeight - 10,
    width: commonStyles.screenWidth,
  },
});
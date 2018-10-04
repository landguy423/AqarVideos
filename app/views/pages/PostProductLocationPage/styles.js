import {
  StyleSheet,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(100, 80) : 80;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(44, 20) : 0;

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  btnMapTypeView: {
    zIndex: 99, 
    position:'absolute', 
    right: 2, 
    bottom: BOTTOM_HEIGHT,
  },
  btnMapType: {
    width: 73,
    height: 73,
  },
  searchView: {
    zIndex: 99, 
    position:'absolute', 
    top: BOTTOM_HEIGHT,
    width: COMMON_STYLES.SCREEN_SUB_WIDTH,
    left: COMMON_STYLES.SCREEN_WIDTH * 0.05,
  },
  backIconWrapper: {
    zIndex: 99,
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    marginLeft: 10,
    backgroundColor: 'transparent',
    width: 100,
  },
  backIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backIcon_detail: {
    fontWeight: 'bold',
    color: COMMON_COLORS.PINK_COLOR,
  },
  backTitle: {
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    fontWeight: 'bold',
    color: COMMON_COLORS.PINK_COLOR,
    marginBottom: 5,
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY
  }
});
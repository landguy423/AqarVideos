import {
  StyleSheet,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

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
    width: commonStyles.screenSubWidth,
    left: commonStyles.screenWidth * 0.05,
  },
  backIconWrapper: {
    zIndex: 99,
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    left: commonStyles.screenWidth * 0.05,
    backgroundColor: 'transparent',
    width: 50,
    height: 35,
  },
  backIcon_detail: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  }
});
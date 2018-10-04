import {
  StyleSheet,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(100, 80) : 80;

export const styles = StyleSheet.create({
  container: {
    height: COMMON_STYLES.SCREEN_SUB_HEIGHT,
    width: COMMON_STYLES.SCREEN_WIDTH,
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  marker: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  markerText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    position: 'absolute',
    color: 'white',
    top: 3,
    fontSize: 12,
    backgroundColor: 'transparent',
  },
  markerDetailView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 90,
    padding: 0,
    margin: 0,
    zIndex: 99,
    backgroundColor: 'white',
  },
  videoView: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COMMON_COLORS.DARK_GRAY_COLOR,
  },
  markerDetailVideo: {
    width: '100%',
    height: '100%',
  },
  emptyVideo: {
    color: 'white',
    fontSize: 30,
  },
  markerDetailText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    textAlign: 'right',
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
  }
});
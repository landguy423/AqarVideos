import {
  StyleSheet,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(100, 80) : 80;

export const styles = StyleSheet.create({
  container: {
    height: commonStyles.screenSubHeight,
    width: commonStyles.screenWidth,
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
    fontFamily: commonStyles.normalFont,
    position: 'absolute',
    color: 'white',
    top: 3,
  },
  markerDetailView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 70,
    paddingVertical: 5,
    zIndex: 99,
    backgroundColor: commonColors.darkGrayColor,
  },
  markerDetailVideo: {
    marginBottom: 10,
    width: '100%',
    height: '100%',
  },
  emptyVideo: {
    color: 'white',
    fontSize: 30,
  },
  markerDetailText: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: commonColors.darkGrayColor,
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
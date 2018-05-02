import {
  StyleSheet,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

const BOTTOM_HEIGHT = 80;

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingTextView: {
    position: 'absolute',
    bottom: BOTTOM_HEIGHT,
  },
  loadingText: {
    fontSize: 17,
    color: commonColors.greenColor,
  }
});
import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 2,
    zIndex: 99,
  },
  btnPlus: {
    bottom: 170,
  },
  btnPlusList: {
    bottom: 0,
  },
  btnIcon: {
    width: 73,
    height: 73,
  }
});
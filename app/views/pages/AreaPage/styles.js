import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
    width: commonStyles.screenWidth
  },
  btn: {
    position: 'absolute',
    right: 15,
    zIndex: 99,
  },
  btnView: {
    bottom: 100,
  },
  btnPlus: {
    bottom: 20,
  },
  btnIcon: {
    width: 80,
    height: 80,
  }
});
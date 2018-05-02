import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: commonStyles.padding,
  },
  packageView: {
    width: commonStyles.screenSubWidth - 80,
    height: commonStyles.screenSubWidth - 80,
    borderRadius: commonStyles.screenSubWidth / 2,
    backgroundColor: commonColors.greenColor,
    justifyContent: 'center',
     alignItems: 'center',
  },
  title: {
    fontFamily: commonStyles.normalFont,
    textAlign: 'right',
    color: 'white',
    fontSize: 80,
    backgroundColor: 'transparent',
  },
});
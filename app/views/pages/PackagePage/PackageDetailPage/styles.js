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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.1,
  },
  fieldContainer: {
    width: '100%',
    height: commonStyles.screenNormalHeight - commonStyles.buttonHeight - 100,
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  detailView: {
    width: commonStyles.screenSubWidth,
    backgroundColor: 'transparent',
    padding: 20
  },
  description: {
    backgroundColor: 'transparent'
  },
  radioButtonView: {
    width: '100%',
    position: 'absolute',
    bottom: commonStyles.buttonHeight,
    height: 100
  },
  btnView: {
    width: '100%',
    height: commonStyles.buttonHeight,
    backgroundColor: commonColors.greenColor,
    position: 'absolute',
    bottom: 0,
  },
  btnWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: commonStyles.normalFont,
    color: 'white',
    fontSize: commonStyles.normalFontSize,
  },
});
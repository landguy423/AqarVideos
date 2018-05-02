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
    height: commonStyles.screenNormalHeight - commonStyles.buttonHeight - commonStyles.buttonBottomHeight,
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  inputView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: commonStyles.padding,
    height: 60,
  },
  input: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.darkGrayColor,
    width: commonStyles.screenWidth - 80,
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
  },
  btnView: {
    width: '100%',
    height: commonStyles.buttonHeight,
    backgroundColor: commonColors.greenColor,
    position: 'absolute',
    bottom: commonStyles.buttonBottomHeight,
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
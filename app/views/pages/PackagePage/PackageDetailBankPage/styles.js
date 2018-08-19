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
  },
  thumbnail: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.1,
  },
  fieldContainer: {
    flex: 1,
    paddingBottom: commonStyles.buttonHeight
  },
  titleView: {
    marginVertical: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: commonStyles.padding,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textTitle: {
    backgroundColor: 'transparent',
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    color: commonColors.darkGrayColor,
  },
  textDescription: {
    backgroundColor: 'transparent',
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
    textAlign: 'right'
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
  logoContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  logoView: {
    width: 150,
    height: 80,
    borderWidth: 3,
    borderColor: commonColors.greenColor,
    margin: 10,
    borderRadius: 5
  },
  logo: {
    width: '100%',
    height: '100%'
  }
});
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
  fieldContainer: {
    width: '100%',
    height: commonStyles.screenNormalHeight - 100,
    justifyContent:'center',
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
    height: 50,
  },
  itemView: {
    width: commonStyles.screenWidth,
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: commonStyles.padding,
    marginVertical: 5,
    paddingVertical: 10,
    marginTop: 20,
  },
  input: {
    fontFamily: commonStyles.normalFont,
    width: '100%',
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
  },
  iconView: {
    width: 50,
    alignItems: 'flex-end',
    marginRight: 5,
  },
  inputIcon: {
    color: '#EC33AA',
    fontSize: 25,
  },
  forgotPasswordView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: commonStyles.padding,
    height: 50,
  },
  forgotPasswordText: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.placeholderText,
    fontSize: commonStyles.normalFontSize,
    fontStyle: 'italic',
  },
  textTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    color: commonColors.placeholderText,
    marginBottom: 3,
  },
});
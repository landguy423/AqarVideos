import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { tabBarHieght } from '@common/styles/commonStyles';

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
    backgroundColor: commonColors.pinkColor,
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
  thumbnailView: {
    width: '100%',
    height: 200,
  },
  thumbnail: {
    height: '100%',
    width:'100%'
  },
  titleView: {
    position: 'absolute',
    right: commonStyles.padding,
    top: 10,
    backgroundColor: 'transparent',
  },
  remainDay: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
    textAlign: 'right',
    marginBottom: 10,
  },
  titleDay: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
    textAlign: 'right'
  },
  titleDesc: {
    fontFamily: commonStyles.normalFont,
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    textAlign: 'right'
  },
  description: {
    marginTop: 20,
    height: commonStyles.screenNormalHeight - 320,
  },
  descriptionScrollView: {
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  textDescription: {
    fontFamily: commonStyles.normalFont,
    fontSize: 12,
    color: commonColors.placeholderText,
    textAlign: 'right'
  },
  //Success page
  successTextWrapper: {
    padding: 30,
  },
  textSuccess: {
    fontFamily: commonStyles.normalFont,
    fontSize: 20,
    textAlign: 'center',
    color: commonColors.darkGrayColor,
    lineHeight: 0.3,
  },
  bold: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
  },
  imgClose: {
    marginTop: 30,
    width: 50,
    height: 50,
  }
});
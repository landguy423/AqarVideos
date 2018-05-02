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
  videoView: {
    width: commonStyles.screenWidth,
    height: 200,
    backgroundColor: commonColors.darkGrayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 50,
    color: 'white',
  },
  videoThumbnail: {
    width: commonStyles.screenWidth,
    height: 200,
  },
  titleView: {
    marginVertical: 10,
    paddingHorizontal: commonStyles.padding,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  textTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    color: commonColors.placeholderText,
    marginBottom: 3,
    backgroundColor: 'transparent'
  },
  textPhone: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    color: '#88AC40',
  },
  description: {
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  textDescription: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
    textAlign: 'right'
  },
  bold: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
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
  },
  productOptionView: {
    width: commonStyles.screenWidth,
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: commonStyles.padding,
    marginVertical: 5,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  previewBtnView: {
    marginVertical: 40,
    height: commonStyles.buttonHeight,
    backgroundColor: commonColors.pinkColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPreview: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: 'white',
  },
  input: {
    fontFamily: commonStyles.normalFont,
    width: '100%',
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
  },
  icon: {
    marginBottom: 10,
  },

  //PriceView
  priceView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
  },
  priceBox: {
    width: 120,
    borderWidth: 2,
    borderColor: commonColors.placeholderText,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputPrice: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    width: '100%',
    fontSize: 14,
    color: commonColors.placeholderText,
    textAlign: 'center',
  },
  input: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    width: '100%',
    fontSize: 14,
    color: commonColors.placeholderText,
    textAlign: 'right',
  },
  squareMeterView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  squareMeterBox: {
    width: 160,
    borderWidth: 2,
    borderColor: commonColors.placeholderText,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  linebar: {
    color: commonColors.placeholderText,
    marginHorizontal: 10,
    fontSize: 30,
  },
  deleteVideo: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 60,
    height: 60,
  },
  deleteVideoInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteVideoIcon: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  addressView: {
    marginTop: 5,
  }
});
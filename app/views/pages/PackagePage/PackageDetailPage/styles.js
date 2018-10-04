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
  topView: {
    width: '100%',
    height: 160
  },
  thumbnail: {
    width: '100%',
    height: '100%'
  },
  titleView: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    // fontFamily: commonStyles.normalFont,
    textAlign: 'right',
    color: '#fff'
  },
  trialTitle: {
    fontSize: 30,
    // fontFamily: commonStyles.normalFont,
    textAlign: 'right',
    color: '#fff'
  },
  detailView: {
    width: '100%',
    height: commonStyles.screenNormalHeight - 380,
    backgroundColor: 'transparent',
  },
  scrollView: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: commonStyles.padding,
  },
  description: {
    backgroundColor: 'transparent',
    textAlign: 'right',
    fontFamily: commonStyles.normalFont
  },
  radioGroup: {
    width: '100%'
  },
  radioButtonView: {
    width: '100%' ,
    position: 'absolute',
    bottom: commonStyles.buttonHeight,
    paddingRight: 10
  },
  radioItem: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: -20,
    marginBottom: 10
  },
  radioText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: commonColors.greenColor,
    fontFamily: commonStyles.normalFont,
  },
  visaImage: {
    width: 150,
    height: 30
  },
  bankImageView: {
    flexDirection: 'row'
  },
  bankImage: {
    width: 140,
    height: 40
  },
  btnView: {
    width: '100%',
    height: commonStyles.buttonHeight,
    backgroundColor: commonColors.pinkColor,
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
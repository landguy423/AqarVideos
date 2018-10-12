import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT,
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
    // fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    textAlign: 'right',
    color: '#fff'
  },
  trialTitle: {
    fontSize: 30,
    // fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    textAlign: 'right',
    color: '#fff'
  },
  detailView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  scrollView: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: COMMON_STYLES.PADDING,
  },
  description: {
    backgroundColor: 'transparent',
    textAlign: 'right',
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    marginBottom: 40
  },
  radioGroup: {
    width: '100%'
  },
  radioButtonView: {
    width: '100%' ,
    position: 'absolute',
    bottom: COMMON_STYLES.BUTTON_HEIGHT,
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
    color: COMMON_COLORS.GREEN_COLOR,
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
  },
  visaImage: {
    width: 141,
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
    height: COMMON_STYLES.BUTTON_HEIGHT,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
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
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: 'white',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
  },
});
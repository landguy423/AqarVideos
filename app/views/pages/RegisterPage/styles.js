import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabBar: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    height: COMMON_STYLES.TAB_BAR_HEIGHT,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tbnWrapper: {
    width: '50%',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tabText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: 'white',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
  },
  loginContainer: {
    height: COMMON_STYLES.SCREEN_SUB_HEIGHT,
    width: '100%',
  },
  btnView: {
    width: '100%',
    height: COMMON_STYLES.BUTTON_HEIGHT,
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    bottom: 0,
    position: 'absolute',
  },
  btnViewLogin: {
    width: '100%',
    height: COMMON_STYLES.BUTTON_HEIGHT,
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    marginTop: 20,
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
  fieldContainer: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    paddingHorizontal: COMMON_STYLES.PADDING,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  fieldContainerLogin: {
    height: COMMON_STYLES.SCREEN_SUB_HEIGHT - 200,
    justifyContent:'center',
    alignItems: 'center',
    width: COMMON_STYLES.SCREEN_WIDTH,
    paddingHorizontal: COMMON_STYLES.PADDING
  },
  inputView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: COMMON_COLORS.BORDER_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: COMMON_STYLES.PADDING,
    height: 50,
  },
  input: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    width: COMMON_STYLES.SCREEN_SUB_WIDTH - 60,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    paddingRight: 20
  },
  iconView: {
    width: 50,
    alignItems: 'flex-start',
  },
  inputIcon: {
    color: '#EC33AA',
    fontSize: 25,
  },
  forgotPasswordView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: COMMON_STYLES.PADDING,
    height: 50,
  },
  forgotPasswordText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    fontStyle: 'italic',
  },
  wizard: {
    width: '100%',
    marginVertical: 20,
  }
});

export const wizardStyle = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f'
}
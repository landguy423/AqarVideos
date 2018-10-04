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
  btnView: {
    width: '100%',
    height: COMMON_STYLES.BUTTON_HEIGHT,
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    position: 'absolute',
    bottom: COMMON_STYLES.BUTTON_BOTTOM_HEIGHT,
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
    width: '100%',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT - 100,
    justifyContent:'center',
    alignItems: 'center',
  },
  inputView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: COMMON_COLORS.BORDER_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: COMMON_STYLES.PADDING,
    height: 50,
  },
  input: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    width: COMMON_STYLES.SCREEN_WIDTH - 80,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE
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
    paddingHorizontal: COMMON_STYLES.PADDING,
    height: 50,
  },
  forgotPasswordText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    fontStyle: 'italic',
  }
});
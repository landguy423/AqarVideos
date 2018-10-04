import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const inputHeight = 60;
const inputWidth = COMMON_STYLES.SCREEN_WIDTH - COMMON_STYLES.PADDING - 55;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT,
    width: COMMON_STYLES.SCREEN_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  messageContainer: {
    width: '100%',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT - inputHeight,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    height: inputHeight,
    width: '100%',
    paddingBottom: 15,
    paddingHorizontal: COMMON_STYLES.PADDING / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputView: {
    borderRadius: 50,
    backgroundColor: '#EFEFEF',
    height: 45,
    width: inputWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    width: inputWidth - 55,
  },
  iconPen: {
    fontSize: 28,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
  iconSend: {
    fontSize: 28,
    color: 'white',
    backgroundColor: 'transparent',
  },
  btnSendView: {
    width: 45,
    height: 45,
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
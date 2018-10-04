import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  sendContainer: {
    paddingHorizontal: COMMON_STYLES.PADDING,
    paddingVertical: 5,
    alignItems: 'flex-end',
    marginTop: 10,
  },
  receiveContainer: {
    paddingHorizontal: COMMON_STYLES.PADDING,
    paddingVertical: 5,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  sendMessageContainer: {
    maxWidth: COMMON_STYLES.SCREEN_WIDTH * 0.7,
    alignItems: 'flex-end',
  },
  receiveMessageContainer: {
    maxWidth: COMMON_STYLES.SCREEN_WIDTH * 0.7,
    alignItems: 'flex-start',
  },
  sendMessageBox: {
    backgroundColor: '#EFEFEF',
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  receiveMessageBox: {
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendMessage: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    textAlign: 'right',
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
  },
  receiveMessage: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    textAlign: 'right',
    color: 'white',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
  },
  name: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    textAlign: 'right',
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    paddingHorizontal: 15,
  },
  date: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    textAlign: 'right',
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: COMMON_STYLES.SMALL_FONT_SIZE,
    fontStyle: 'italic',
    paddingHorizontal: 15,
  },
  body: {
    flexDirection: 'row',
  },
  triangel: {
    marginTop: 15,
  }
});
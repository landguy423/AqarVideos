import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    borderBottomWidth: 0.5,
    borderColor: COMMON_COLORS.BORDER_COLOR,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: COMMON_STYLES.PADDING,
    marginVertical: 5,
    paddingVertical: 10,
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    textAlign: 'right',
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    marginBottom: 3,
    zIndex: 9,
  },
});
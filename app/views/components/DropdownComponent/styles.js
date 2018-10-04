import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  dropDown: {
    width: '100%',
  },
  dropdownItemStyle: {
    textAlign: 'right',
  },
  dropdownPlaceholderView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  dropdownPlaceholderText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    textAlign: 'right'
  },
  arrowDown: {
    marginLeft: 25,
    fontSize: 30,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
  },
  pickerStyle: {
    paddingHorizontal: COMMON_STYLES.PADDING,
  }
});
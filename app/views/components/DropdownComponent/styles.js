import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

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
    fontFamily: commonStyles.normalFont,
    color: commonColors.placeholderText,
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right'
  },
  arrowDown: {
    marginLeft: 25,
    fontSize: 30,
    color: commonColors.placeholderText,
  },
  pickerStyle: {
    paddingHorizontal: commonStyles.padding,
  }
});
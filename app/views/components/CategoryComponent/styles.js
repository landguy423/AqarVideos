import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const categoryHeight = 100;

export const styles = StyleSheet.create({
  categoryScrollView: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    backgroundColor: '#D6D6D6',
  },
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnCategory: {
    backgroundColor: '#D6D6D6',
    height: categoryHeight,  
    // width: categoryHeight,  
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  categoryBack: {
    backgroundColor: COMMON_COLORS.PINK_COLOR,
  },
  textCategory: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'right'
  },
  textCategorySelect: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: 'white',
    textAlign: 'right'
  },
  icon: {
    marginBottom: 10,
    height: 45,
    width: 45,
  },
});
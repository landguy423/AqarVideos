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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: COMMON_STYLES.PADDING,
  },
  packageView: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    justifyContent: 'center',
     alignItems: 'center',
  },
  title: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    textAlign: 'right',
    color: 'white',
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  noPackgeText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.GREEN_COLOR,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE
  }
});
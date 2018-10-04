import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: COMMON_STYLES.MENU_HEIGHT,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderColor: '#f2f2f2',
  },
  selectedMenuItem: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    paddingHorizontal: COMMON_STYLES.PADDING/2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#f3f3f3',
  },
  menuItem: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    paddingHorizontal: COMMON_STYLES.PADDING/2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  menuItemTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: 15,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
  },
  iconView: {
    width: 30,
    alignItems: 'center',
    marginLeft: 20,
  },
  menuItemIcon: {
  },
});
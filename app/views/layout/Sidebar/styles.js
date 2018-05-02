import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: commonStyles.menuHeight,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderColor: '#f2f2f2',
  },
  selectedMenuItem: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    paddingHorizontal: commonStyles.padding/2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#f3f3f3',
  },
  menuItem: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    paddingHorizontal: commonStyles.padding/2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  menuItemTitle: {
    fontFamily: commonStyles.normalFont,
    fontSize: 15,
    color: commonColors.darkGrayColor,
  },
  iconView: {
    width: 30,
    alignItems: 'center',
    marginLeft: 20,
  },
  menuItemIcon: {
  },
});
import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const listItemWidth = COMMON_STYLES.SCREEN_SUB_WIDTH;
const listItemHeight = 60;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  listView: {
    paddingHorizontal: COMMON_STYLES.PADDING,
    paddingTop: 15,
  },
  listItem: {
    width: listItemWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  imageView: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  leftView: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  dateView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  textName: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    textAlign: 'right',
    marginBottom: 5,
  },
  textMessage: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    fontSize: 13,
    textAlign: 'right',
  },
  countView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#88AB43',
    marginBottom: 5,
  },
  textCount: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 11,
    backgroundColor: 'transparent'
  },
  noPackgeText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.GREEN_COLOR,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    marginTop: 30
  }
});
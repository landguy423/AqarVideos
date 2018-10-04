import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const listItemWidth = COMMON_STYLES.SCREEN_SUB_WIDTH;
const listItemHeight = 100;

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
  listStyle: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    alignItems: 'center',
    height: listItemHeight,
    marginVertical: 15,
  },
  listItem: {
    width: listItemWidth,
    height: listItemHeight,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  videoView: {
    width: 120,
    height: listItemHeight,
    backgroundColor: COMMON_COLORS.DARK_GRAY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  emptyVideo: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  footerView: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    fontSize: 15,
    textAlign: 'right',
  },
  textPrice: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    fontSize: 14,
    textAlign: 'right',
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textViewCount: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  eye: {
    fontSize: 14,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    marginLeft: 5,
  },
  listRightView: {
    width: listItemWidth,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 100,
    marginVertical: 15,
    marginLeft: COMMON_STYLES.SCREEN_WIDTH * 0.05,
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: 'black',
  },
  btnDeleteView: {
    backgroundColor: '#88AC40',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
  },
  iconDelete: {
    fontSize: 35,
    color: 'white',
  },
  noPackgeText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.GREEN_COLOR,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    marginTop: 30
  }
});
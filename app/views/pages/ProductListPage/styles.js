import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const listItemHeight = 200;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },
  listView: {
    paddingTop: 15,
    paddingHorizontal: COMMON_STYLES.PADDING,
  },
  listItem: {
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowColor: 'black',
  },
  videoView: {
    width: '100%',
    height: listItemHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COMMON_COLORS.DARK_GRAY_COLOR,
  },
  emptyVideo: {
    fontSize: 60,
    color: 'white',
  },
  subView: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  textPrice: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 12,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
  },
  footerView: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  favoriteView: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  favorite: {
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
  },
  footerRightView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textViewCount: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    fontSize: 11,
    fontStyle: 'italic',
  },
  eye: {
    fontSize: 13,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    marginLeft: 5,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
    color: COMMON_COLORS.GREEN_COLOR
  }
});
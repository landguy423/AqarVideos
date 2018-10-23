import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const listItemWidth = (COMMON_STYLES.SCREEN_WIDTH - COMMON_STYLES.PADDING * 2 - 15) / 2;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    paddingHorizontal: COMMON_STYLES.PADDING - 7.5,
  },
  listItem: {
    width: listItemWidth,
    marginHorizontal: 7.5,
    height: listItemWidth + 10,
    marginBottom: 15,
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.4,
    shadowColor: 'black',
  },
  videoView: {
    width: '100%',
    height: listItemWidth - 40,
    backgroundColor: COMMON_COLORS.DARK_GRAY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  emptyVideo: {
    fontSize: 50,
    color: 'white',
    backgroundColor: 'transparent',
  },
  footerView: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    fontSize: 12,
    marginBottom: 5,
  },
  textPrice: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    fontSize: 12,
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
    fontSize: 14,
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    marginLeft: 5,
  },
  emptyView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noPackgeText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.GREEN_COLOR,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    marginTop: 20
  }
});
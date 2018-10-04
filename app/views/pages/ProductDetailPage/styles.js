import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { tabBarHieght } from '@common/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT,
    width: COMMON_STYLES.SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: 'white',
    width: COMMON_STYLES.SCREEN_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoView: {
    width: '100%',
    height: 200,
    backgroundColor: COMMON_COLORS.DARK_GRAY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    height: 200,
  },
  emptyVideo: {
    color: 'white',
    fontSize: 50,
  },
  titleView: {
    marginVertical: 10,
    paddingHorizontal: COMMON_STYLES.PADDING,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    textAlign: 'right',
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
  },
  textPhone: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    textAlign: 'right',
    color: '#88AC40',
  },
  description: {
    width: '100%',
    paddingHorizontal: COMMON_STYLES.PADDING,
  },
  textDescription: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'right'
  },
  bold: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
  },
  itemView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: COMMON_COLORS.BORDER_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: COMMON_STYLES.PADDING,
    height: 50,
  },
  iconCategory: {
    width: 45,
    height: 45,
    marginVertical: 10,
  },
  separate: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: COMMON_COLORS.BORDER_COLOR,
    height: 1,
    marginTop: 20,
  },
  btnView: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnFavorite: {
    backgroundColor: '#D6D6D6',
    width: 90,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnShare: {
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    width: 90,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSend: {
    width: COMMON_STYLES.SCREEN_WIDTH - 180,
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: COMMON_STYLES.PADDING,
  },
  sendTextWrapper: {
    marginRight: 20,
  },
  textSend: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: 'white',
    textAlign: 'right',
  },
  icon: {
    color: 'white',
    fontSize: 40,
  },
  icon_select: {
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    fontSize: 40,
  },
  btnAd: {
    flexDirection: 'row',
    paddingHorizontal: COMMON_STYLES.PADDING,
    alignItems: 'center',
  },
  iconAd: {
    marginLeft: 10,
  },
  mapViewContainer: {
    width: '100%',
    height: 200,
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
});
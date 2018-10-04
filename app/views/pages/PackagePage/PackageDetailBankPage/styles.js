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
  },
  thumbnail: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.1,
  },
  fieldContainer: {
    flex: 1,
    paddingBottom: COMMON_STYLES.BUTTON_HEIGHT
  },
  titleView: {
    marginVertical: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: COMMON_STYLES.PADDING,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textTitle: {
    backgroundColor: 'transparent',
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    textAlign: 'right',
    color: COMMON_COLORS.DARK_GRAY_COLOR,
  },
  textDescription: {
    backgroundColor: 'transparent',
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'right'
  },
  btnView: {
    width: '100%',
    height: COMMON_STYLES.BUTTON_HEIGHT,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    position: 'absolute',
    bottom: 0,
  },
  btnWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: 'white',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
  },
  logoContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  logoView: {
    width: 150,
    height: 80,
    borderWidth: 3,
    margin: 10,
    borderRadius: 5
  },
  logo: {
    width: '100%',
    height: '100%'
  }
});
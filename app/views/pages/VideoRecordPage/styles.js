import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: 'white',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnView: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    zIndex: 99,
  },
  btnRecordView: {
    marginHorizontal: 5,
  },
  btnRecord: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 30,
  },
  btnRecordInnerStart: {
    width: 40,
    height: 40,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    borderRadius: 20,
  },
  btnRecordInnerStop: {
    width: 30,
    height: 30,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    borderRadius: 5,
  },
  timeView: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
  text: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: 'white',
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    margin: 0,
  }
});
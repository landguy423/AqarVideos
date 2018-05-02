import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
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
    backgroundColor: commonColors.pinkColor,
    borderRadius: 20,
  },
  btnRecordInnerStop: {
    width: 30,
    height: 30,
    backgroundColor: commonColors.pinkColor,
    borderRadius: 5,
  },
  timeView: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
  text: {
    fontFamily: commonStyles.normalFont,
    color: 'white',
    fontSize: 20,
    margin: 0,
  }
});
import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

const inputHeight = 60;
const inputWidth = commonStyles.screenWidth - commonStyles.padding - 55;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
    width: commonStyles.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  messageContainer: {
    width: '100%',
    height: commonStyles.screenNormalHeight - inputHeight,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    height: inputHeight,
    width: '100%',
    paddingBottom: 15,
    paddingHorizontal: commonStyles.padding / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputView: {
    borderRadius: 50,
    backgroundColor: '#EFEFEF',
    height: 45,
    width: inputWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: commonStyles.normalFont,
    fontFamily: commonStyles.normalFont,
    width: inputWidth - 55,
  },
  iconPen: {
    fontSize: 28,
    color: commonColors.placeholderText,
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
  iconSend: {
    fontSize: 28,
    color: 'white',
    backgroundColor: 'transparent',
  },
  btnSendView: {
    width: 45,
    height: 45,
    backgroundColor: commonColors.greenColor,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
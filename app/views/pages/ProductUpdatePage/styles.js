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
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoView: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    height: 200,
    backgroundColor: COMMON_COLORS.DARK_GRAY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 50,
    color: 'white',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    textAlign: 'right',
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    marginBottom: 3,
    backgroundColor: 'transparent'
  },
  textRadio: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    marginBottom: 5,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'right'
  },
  bold: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
  },
  itemView: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    borderBottomWidth: 0.5,
    borderColor: COMMON_COLORS.BORDER_COLOR,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: COMMON_STYLES.PADDING,
    marginVertical: 5,
    paddingVertical: 10,
  },
  productOptionView: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    borderBottomWidth: 0.5,
    borderColor: COMMON_COLORS.BORDER_COLOR,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: COMMON_STYLES.PADDING,
    marginVertical: 5,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  previewBtnView: {
    marginVertical: 40,
    height: COMMON_STYLES.BUTTON_HEIGHT,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPreview: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: 'white',
  },
  input: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    width: '100%',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
  },
  underline: {
    textDecorationLine: 'underline',
    color: COMMON_COLORS.GREEN_COLOR
  },
  icon: {
    marginBottom: 10,
  },
  input: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    width: '100%',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'right',
  },
  linebar: {
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    marginHorizontal: 10,
    fontSize: 30,
  },
  deleteVideo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
  },
  deleteVideoInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteVideoIcon: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  showVideo: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 60,
    height: 60,
  },
  addressView: {
    marginTop: 5,
  },
  buttonStyle: {
    height: COMMON_STYLES.BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnView: {
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    marginTop: 30,
    marginBottom: 10,
  },
  deleteBtnView: {
    backgroundColor: COMMON_COLORS.DARK_GRAY_COLOR,
    marginBottom: 30,
  },
  textEdit: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: 'white',
  },
});
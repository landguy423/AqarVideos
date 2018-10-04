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
  inputContainer: {
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT - COMMON_STYLES.BUTTON_HEIGHT,
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  titleView: {
    marginVertical: 15,
    paddingHorizontal: COMMON_STYLES.PADDING,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    textAlign: 'right',
    color: COMMON_COLORS.DARK_GRAY_COLOR,
    marginBottom: 3,
  },
  description: {
    width: '100%',
    paddingHorizontal: COMMON_STYLES.PADDING,
  },
  textRadio: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    marginBottom: 5,
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
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
  icon: {
    marginBottom: 10,
  },
  inputPrice: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    width: '100%',
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'center',
  },
  input: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    width: '100%',
    fontSize: COMMON_STYLES.LARGE_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'right',
  },
  underline: {
    textDecorationLine: 'underline',
    color: COMMON_COLORS.GREEN_COLOR
  },
  squareMeterView: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
  },
  squareMeterBox: {
    width: 150,
    borderWidth: 2,
    borderColor: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  linebar: {
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    marginHorizontal: 10,
    fontSize: 30,
  },
  searchBtnView: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    height: COMMON_STYLES.BUTTON_HEIGHT,
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtn: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: 'white',
  },
  modal: {
   width: COMMON_STYLES.SCREEN_SUB_WIDTH,
   marginVertical: COMMON_STYLES.SCREEN_WIDTH * 0.12,
  }
});
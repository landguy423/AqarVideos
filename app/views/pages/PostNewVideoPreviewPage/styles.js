import {
  StyleSheet,
  Platform
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
  videoThumbnail: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    height: 200,
  },
  titleView: {
    marginVertical: 10,
    paddingHorizontal: COMMON_STYLES.PADDING,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
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
  iconOffice: {
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
  icon: {
    color: 'white',
    fontSize: 40,
  },
  buttonStyle: {
    marginVertical: 30,
    height: COMMON_STYLES.BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBtnView: {
    backgroundColor: COMMON_COLORS.GREEN_COLOR,
  },
  textPost: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: 'white',
  },
  termsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  termsText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.GREEN_COLOR,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginRight: 5
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5
      },
      android: {
        elevation: 20
      }
    })
  },
  tncContent: {
    textAlign: 'right'
  }
});
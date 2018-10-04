import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    width: COMMON_STYLES.SCREEN_WIDTH,
    backgroundColor: '#FBFBFB',
    position: 'absolute',
    bottom: 0,
    bottom: -25,
    left: -COMMON_STYLES.PADDING,
    padding: COMMON_STYLES.PADDING,
  },
  modalHeader: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
    textAlign: 'right',
  },
  iconList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  iconView: {
    width: '50%',
    alignItems: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: 5,
  },
  iconFacebook: {
    color: '#3B589E',
  },
  iconTwitter: {
    color: '#56CCF4',
  },
  iconLinkedin: {
    color: '#007BB6',
  },
  iconWhatsapp: {
    color: '#14990A',
  },
  socialText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
    color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR
  }
});
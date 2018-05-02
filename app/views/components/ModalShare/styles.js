import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    width: commonStyles.screenWidth,
    backgroundColor: '#FBFBFB',
    position: 'absolute',
    bottom: 0,
    bottom: -25,
    left: -commonStyles.padding,
    padding: commonStyles.padding,
  },
  modalHeader: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
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
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText
  }
});
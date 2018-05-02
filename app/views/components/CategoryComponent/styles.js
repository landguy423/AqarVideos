import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { tabBarHieght } from '@common/styles/commonStyles';

const categoryHeight = 100;

export const styles = StyleSheet.create({
  categoryScrollView: {
    width: commonStyles.screenWidth,
    backgroundColor: '#D6D6D6',
  },
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnCategory: {
    backgroundColor: '#D6D6D6',
    height: categoryHeight,  
    // width: categoryHeight,  
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  categoryBack: {
    backgroundColor: commonColors.pinkColor,
  },
  textCategory: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
    textAlign: 'right'
  },
  textCategorySelect: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: 'white',
    textAlign: 'right'
  },
  icon: {
    marginBottom: 10,
    height: 45,
    width: 45,
  },
});
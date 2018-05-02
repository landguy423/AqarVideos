import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

const listItemWidth = commonStyles.screenSubWidth;
const listItemHeight = 60;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  listView: {
    paddingHorizontal: commonStyles.padding,
    paddingTop: 15,
  },
  listItem: {
    width: listItemWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  imageView: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  leftView: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  dateView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  textName: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    color: commonColors.placeholderText,
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    marginBottom: 5,
  },
  textMessage: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.placeholderText,
    fontSize: 13,
    textAlign: 'right',
  },
  countView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#88AB43',
    marginBottom: 5,
  },
  textCount: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 11,
    backgroundColor: 'transparent'
  },
});
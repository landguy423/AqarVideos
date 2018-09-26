import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

const listItemWidth = commonStyles.screenSubWidth;
const listItemHeight = 100;

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
  listStyle: {
    width: commonStyles.screenWidth,
    alignItems: 'center',
    height: listItemHeight,
    marginVertical: 15,
  },
  listItem: {
    width: listItemWidth,
    height: listItemHeight,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  videoView: {
    width: 120,
    height: listItemHeight,
    backgroundColor: commonColors.darkGrayColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  emptyVideo: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  footerView: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  textTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    color: commonColors.darkGrayColor,
    fontSize: 15,
    textAlign: 'right',
  },
  textPrice: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.darkGrayColor,
    fontSize: 14,
    textAlign: 'right',
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textViewCount: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.darkGrayColor,
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  eye: {
    fontSize: 14,
    color: commonColors.darkGrayColor,
    marginLeft: 5,
  },
  listRightView: {
    width: listItemWidth,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 100,
    marginVertical: 15,
    marginLeft: commonStyles.screenWidth * 0.05,
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: 'black',
  },
  btnDeleteView: {
    backgroundColor: '#88AC40',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
  },
  iconDelete: {
    fontSize: 35,
    color: 'white',
  },
  noPackgeText: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.greenColor,
    fontSize: 18,
    marginTop: 30
  }
});
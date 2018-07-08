import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

const listItemHeight = 200;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listView: {
    paddingTop: 15,
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  listItem: {
    width: commonStyles.screenSubWidth,
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.4,
    shadowColor: 'black',
  },
  videoView: {
    width: commonStyles.screenSubWidth,
    height: listItemHeight,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: commonColors.darkGrayColor,
  },
  emptyVideo: {
    fontSize: 60,
    color: 'white',
  },
  subView: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  textPrice: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: 12,
    color: commonColors.darkGrayColor,
  },
  footerView: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  favoriteView: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  favorite: {
    fontSize: 20,
    color: commonColors.darkGrayColor,
  },
  footerRightView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textViewCount: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.darkGrayColor,
    fontSize: 11,
    fontStyle: 'italic',
  },
  eye: {
    fontSize: 13,
    color: commonColors.darkGrayColor,
    marginLeft: 5,
  }
});
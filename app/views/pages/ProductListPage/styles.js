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
    borderRadius: 5,
  },
  listView: {
    paddingTop: 15,
    paddingHorizontal: commonStyles.padding,
  },
  listItem: {
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowColor: 'black',
  },
  videoView: {
    width: '100%',
    height: listItemHeight,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 50,
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
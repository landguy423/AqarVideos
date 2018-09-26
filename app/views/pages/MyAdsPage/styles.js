import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

const listItemWidth = (commonStyles.screenWidth - commonStyles.padding * 2 - 15) / 2;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    paddingHorizontal: commonStyles.padding - 7.5,
  },
  listItem: {
    width: listItemWidth,
    marginHorizontal: 7.5,
    height: listItemWidth + 10,
    marginBottom: 15,
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.4,
    shadowColor: 'black',
  },
  videoView: {
    width: '100%',
    height: listItemWidth - 40,
    backgroundColor: commonColors.darkGrayColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  emptyVideo: {
    fontSize: 50,
    color: 'white',
    backgroundColor: 'transparent',
  },
  footerView: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  textTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    color: commonColors.darkGrayColor,
    fontSize: 12,
    marginBottom: 5,
  },
  textPrice: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.darkGrayColor,
    fontSize: 12,
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
    fontSize: 14,
    color: commonColors.darkGrayColor,
    marginLeft: 5,
  },
  noPackgeText: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.greenColor,
    fontSize: 18,
    marginTop: 30
  }
});
import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { tabBarHieght } from '@common/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
    width: commonStyles.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: 'white',
    width: commonStyles.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoView: {
    width: '100%',
    height: 200,
    backgroundColor: commonColors.darkGrayColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  emptyVideo: {
    color: 'white',
    fontSize: 50,
  },
  titleView: {
    marginVertical: 20,
    paddingHorizontal: commonStyles.padding,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    color: commonColors.darkGrayColor,
  },
  textPhone: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    color: '#88AC40',
  },
  description: {
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  textDescription: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
    textAlign: 'right'
  },
  bold: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
  },
  itemView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: commonStyles.padding,
    height: 50,
  },
  iconCategory: {
    width: 45,
    height: 45,
    marginVertical: 10,
  },
  separate: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    height: 1,
    marginTop: 20,
  },
  btnView: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnFavorite: {
    backgroundColor: '#D6D6D6',
    width: 90,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnShare: {
    backgroundColor: commonColors.pinkColor,
    width: 90,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSend: {
    width: commonStyles.screenWidth - 180,
    backgroundColor: commonColors.greenColor,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: commonStyles.padding,
  },
  sendTextWrapper: {
    marginRight: 20,
  },
  textSend: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: 'white',
    textAlign: 'right',
  },
  icon: {
    color: 'white',
    fontSize: 40,
  },
  icon_select: {
    color: commonColors.darkGrayColor,
    fontSize: 40,
  },
  btnAd: {
    flexDirection: 'row',
    paddingHorizontal: commonStyles.padding,
    alignItems: 'center',
  },
  iconAd: {
    marginLeft: 10,
  },
  mapViewContainer: {
    width: '100%',
    height: 200,
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
});
export const API_URL = "https://www.videoaqar.com/demo/index.php";
export const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBnp3Q5LngrY3auLrECnLUjH3i8xd7FLY0';
export const GOOGLE_API_KEY = 'AIzaSyBnp3Q5LngrY3auLrECnLUjH3i8xd7FLY0';
import I18n from '@i18n';

export const PERIOD_DATA = [
  { value: I18n.t('period_type.daily') },
  { value: I18n.t('period_type.monthly') },
  { value: I18n.t('period_type.yearly') }
];

export const BUILDING_TYPE_DATA = [
  { value: I18n.t('building_type.residential') },
  { value: I18n.t('building_type.commercial') }
];

export const APARTMENT_ROOM_TYPE = [
  { value: I18n.t('apartment_type.singular') },
  { value: I18n.t('apartment_type.familiar') }
];

export const PRICE_FORMAT = (price) => {
  if (parseInt(price) > 1000000 || parseInt(price) === 1000000) {
    return  (parseInt(price) / 1000000).toFixed(2) + 'M'
  }
  if (parseInt(price) > 1000 || parseInt(price) === 1000) {
    return  (parseInt(price) / 1000).toFixed(2) + 'K'
  }  

  return parseFloat(price).toFixed(2)
}
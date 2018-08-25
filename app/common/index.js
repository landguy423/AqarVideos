export const API_URL = "https://www.videoaqar.com/demo/index.php";
export const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBnp3Q5LngrY3auLrECnLUjH3i8xd7FLY0';
export const GOOGLE_API_KEY = 'AIzaSyBnp3Q5LngrY3auLrECnLUjH3i8xd7FLY0';
import I18n from '@i18n';

export const AWS_OPTIONS = {
  keyPrefix: 'upload/',
  bucket: 'videoaqar',
  region: 'us-east-1',
  accessKey: 'AKIAJ2WETN3SPKCSJTCA',
  secretKey: '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',
  successActionStatus: 201,
  // awsUrl: 's3.console.aws.amazon.com'
  awsUrl: 's3.amazonaws.com'
}

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

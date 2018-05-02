export const API_URL = "https://www.videoaqar.com/demo/index.php";
export const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBnp3Q5LngrY3auLrECnLUjH3i8xd7FLY0';
export const GOOGLE_API_KEY = 'AIzaSyBnp3Q5LngrY3auLrECnLUjH3i8xd7FLY0';

export const AWS_OPTIONS = {
  keyPrefix: 'upload/',
  bucket: 'videoaqar',
  region: 'us-east-1',
  accessKey: 'AKIAJIZL4LQA3CRNAPXA',
  secretKey: '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',
  successActionStatus: 201,
  // awsUrl: 's3.console.aws.amazon.com'
  awsUrl: 's3.amazonaws.com'
}

export const PERIOD_DATA = [
  { value: 'Daily' },
  { value: 'Monthly' },
  { value: 'Yearly' }
];

export const BUILDING_TYPE_DATA = [
  { value: 'Residential' },
  { value: 'Commercial' }
];

export const APARTMENT_ROOM_TYPE = [
  { value: 'Singular' },
  { value: 'Familiar' }
];

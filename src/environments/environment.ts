declare var require: any;
export const environment = {
  name: 'dev',
  title: 'angular-shop-mk',
  host: 'mk.pl',
  email: 'info@mk.pl',
  version: require('../../package.json').version,
  production: false,
  backendDelay: 0,
  httpRetry: 0,
  loggingBackendUrl: true,
  loggingBackendRequestHeaders: false,
  loggingBackendRequest: false,
  loggingBackendResponse: false,
  apiEndpoint: '/api',
  authEndpoint: '/auth',
  messageDismissible: false
};

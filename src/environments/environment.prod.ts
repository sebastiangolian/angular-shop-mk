declare var require: any;
export const environment = {
  name: 'prod',
  title: 'angular-shop-mk',
  host: 'mk.pl',
  version: require('../../package.json').version,
  production: true,
  backendDelay: 0,
  httpRetry: 0,
  loggingBackendUrl: true,
  loggingBackendRequestHeaders: false,
  loggingBackendRequest: false,
  loggingBackendResponse: false,
  apiEndpoint: '/api',
  messageDismissible: false,
  allowedDomains: ["localhost"],
  disallowedRoutes: [],
};

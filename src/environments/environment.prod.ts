declare var require: any;
export const environment = {
  name: 'prod',
  host: 'martynaklewinowska.pl',
  email: 'info@martynaklewinowska.pl',
  version: require('../../package.json').version,
  production: false,
  backendDelay: 0,
  httpRetry: 0,
  autoLogOutTimeout: 5,
  loggingBackendUrl: true,
  loggingBackendRequestHeaders: false,
  loggingBackendRequest: false,
  loggingBackendResponse: false,
  apiEndpoint: 'http://sklepmartynaklewinowska.online/api',
  messageDismissible: false,
  allowedDomains: ["sklepmartynaklewinowska.online"],
  disallowedRoutes: [],
};

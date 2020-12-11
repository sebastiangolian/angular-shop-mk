declare var require: any;
export const environment = {
  name: 'dev',
  host: 'martynaklewinowska.pl',
  email: 'info@martynaklewinowska.pl',
  version: require('../../package.json').version,
  production: false,
  backendDelay: 50,
  httpRetry: 0,
  autoLogOutTimeout: 5,
  loggingBackendUrl: true,
  loggingBackendRequestHeaders: false,
  loggingBackendRequest: false,
  loggingBackendResponse: false,
  apiEndpoint: '/api',
  messageDismissible: false,
  allowedDomains: ["localhost"],
  disallowedRoutes: [],
};

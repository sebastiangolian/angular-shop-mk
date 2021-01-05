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
  apiEndpoint: 'http://www.sklep.martynaklewinowska.online/api',
  messageDismissible: false,
  allowedDomains: ["www.sklep.martynaklewinowska.online"],
  disallowedRoutes: [],
};

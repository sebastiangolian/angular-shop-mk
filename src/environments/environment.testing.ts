declare var require: any;
export const environment = {
  name: 'test',
  host: 'martynaklewinowska.pl',
  email: 'info@martynaklewinowska.pl',
  version: require('../../package.json').version,
  production: false,
  backendDelay: 0,
  httpRetry: 0,
  loggingBackendUrl: true,
  loggingBackendRequestHeaders: false,
  loggingBackendRequest: false,
  loggingBackendResponse: false,
  apiEndpoint: 'http://api.sklep.martynaklewinowska.online',
  messageDismissible: false,
  allowedDomains: ["api.sklep.martynaklewinowska.online"],
  disallowedRoutes: [],
};

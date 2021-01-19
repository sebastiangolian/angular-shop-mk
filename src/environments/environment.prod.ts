declare var require: any;
export const environment = {
  name: 'prod',
  email: 'info@martynaklewinowska.pl',
  version: require('../../package.json').version,
  production: true,
  backendDelay: 0,
  httpRetry: 0,
  loggingBackendUrl: false,
  loggingBackendRequestHeaders: false,
  loggingBackendRequest: false,
  loggingBackendResponse: false,
  apiEndpoint: 'https://www.sklep.martynaklewinowska.pl/api',
  messageDismissible: false,
  messageSuccessTimeout: 1000 * 10,
  messageInfoTimeout: 1000 * 20,
  messageAnotherTimeout: 1000 * 60,
  allowedDomains: ["www.sklep.martynaklewinowska.pl"],
  disallowedRoutes: [],
  urlContact: 'http://www.martynaklewinowska.pl/kontakt',
  urlBlog: 'http://www.martynaklewinowska.pl/blog',
  urlRegulation: 'https://www.sklep.martynaklewinowska.pl/resource/sklep.regulamin.pdf',
  urlPolicy: 'https://www.sklep.martynaklewinowska.pl/resource/sklep.polityka.prywatnosci.pdf',
  urlFacebook: 'https://www.facebook.com/martynaklewinowska',
  urlInstagram: 'https://www.instagram.com/martynaklewinowska/'
};

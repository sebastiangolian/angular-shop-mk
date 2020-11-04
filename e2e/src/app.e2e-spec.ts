import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('---------- app test -----------------', () => {
  let page: AppPage = new AppPage();

  beforeAll(() => {
    page.navigateTo();
  });

  it('check title', () => {
    expect(page.getPageTitle()).toEqual('angular-shop-martynaklewinowska');
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({level: logging.Level.SEVERE} as logging.Entry));
  });
});


import { browser, logging } from 'protractor';
import { PageHome } from './page-home';

describe('---------- page-home test -----------------', () => {
  let page: PageHome = new PageHome();

  beforeAll(() => {
    page.navigateTo();
  });
  
  it('check header', () => {
    expect(page.getHeaderText()).toEqual('home');
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({level: logging.Level.SEVERE} as logging.Entry));
  });
});

import { browser, by, element } from 'protractor';

export class PageHome {
  navigateTo() {
    return browser.get('/#/home')
  }

  getHeaderText() {
    return element(by.tagName('h1')).getText();
  }
}
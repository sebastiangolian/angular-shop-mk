import { browser } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/')
  }

  getPageTitle() {
    return browser.getTitle()
  }
}

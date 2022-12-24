import { Action, Config } from '../src/';

(async () => {
  Config.setDefaultTimeout(5000);
  await Action.navigate('https://letcode.in/elements');
  await Action.type('input[name="username"]', 'charleslana');
  await Action.click('#search');
  await Action.waitForLocator("//span[text()='Public Repos']");
  await Action.clear('input[name="username"]');
  await Action.click('#search');
  await Action.waitForLocatorDisappear("//span[text()='Public Repos']");
  await Action.waitForLocatorDisappear('figure');
  await Action.closeBrowser();
})();

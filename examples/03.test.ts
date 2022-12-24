import { Action, Config } from '../src/';

(async () => {
  Config.setDefaultTimeout(5000);
  Config.setMaximized(true);
  await Action.navigate('https://letcode.in/dropdowns');
  await Action.selectByValue('#fruits', '2');
  await Action.waitForLocator('.notification');
  await Action.selectByIndex('#lang', 4);
  await Action.selectByValue('#superheros', 'aq', 'ta');
  await Action.closeBrowser();
})();

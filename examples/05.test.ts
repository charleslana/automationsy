import { Action, Config, Resource } from '../src/';

(async () => {
  Config.setWaitUntil('domcontentloaded');
  Config.setDefaultNavigationTimeout(5000);
  await Action.navigate('https://letcode.in/windows');
  await Action.click('#home');
  await Action.switchPage(1);
  console.log('second url:', await Resource.getUrl());
  console.log('second title:', await Resource.getTitle());
  await Action.click("(//a[@class='card-footer-item'])[2]");
  await Action.switchPage(0);
  console.log('first url:', await Resource.getUrl());
  console.log('first title:', await Resource.getTitle());
  await Action.click('.card-footer-item');
  console.log('url:', await Resource.getUrl());
  console.log('title:', await Resource.getTitle());
  await Action.quitPage(1);
  await Action.dispose();
})();

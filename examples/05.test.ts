import AutomationSy from '../src/AutomationSy';

(async () => {
  AutomationSy.setWaitUntil('domcontentloaded');
  AutomationSy.setDefaultNavigationTimeout(5000);
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/windows');
  await AutomationSy.click('#home');
  await AutomationSy.switchPage(1);
  console.log('second url:', AutomationSy.getUrl());
  console.log('second title:', await AutomationSy.getTitle());
  await AutomationSy.click("(//a[@class='card-footer-item'])[2]");
  await AutomationSy.switchPage(0);
  console.log('first url:', AutomationSy.getUrl());
  console.log('first title:', await AutomationSy.getTitle());
  await AutomationSy.click('.card-footer-item');
  console.log('url:', AutomationSy.getUrl());
  console.log('title:', await AutomationSy.getTitle());
  await AutomationSy.quitPage(1);
  await AutomationSy.dispose();
})();

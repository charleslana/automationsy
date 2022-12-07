import { AutomationSy } from '../src/AutomationSy';

(async () => {
  AutomationSy.setDefaultTimeout(5000);
  AutomationSy.setMaximized(true);
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/dropdowns');
  await AutomationSy.selectByValue('#fruits', '2');
  await AutomationSy.waitForLocator('.notification');
  await AutomationSy.selectByIndex('#lang', 4);
  await AutomationSy.selectByValue('#superheros', 'aq', 'ta');
  await AutomationSy.dispose();
})();

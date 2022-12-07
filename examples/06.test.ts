import AutomationSy from '../src/AutomationSy';

(async () => {
  AutomationSy.setDefaultTimeout(5000);
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/elements');
  await AutomationSy.type('input[name="username"]', 'charleslana');
  await AutomationSy.click('#search');
  await AutomationSy.waitForLocator("//span[text()='Public Repos']");
  await AutomationSy.clear('input[name="username"]');
  await AutomationSy.click('#search');
  await AutomationSy.waitForLocatorDisappear("//span[text()='Public Repos']");
  await AutomationSy.waitForLocatorDisappear('figure');
  await AutomationSy.dispose();
})();

import AutomationSy from '../src/AutomationSy';

(async () => {
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/dropdowns');
  await AutomationSy.select('#fruits', '2');
  await AutomationSy.selectByIndex('#lang', 4);
})();

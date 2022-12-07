import { AutomationSy } from '../src/AutomationSy';

(async () => {
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/draggable');
  await AutomationSy.dragAndDropByPosition('#header', 100, 20);
  await AutomationSy.dispose();
})();

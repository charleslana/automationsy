import { AutomationSy } from '../src/AutomationSy';

(async () => {
  await AutomationSy.init();
  await AutomationSy.setHTML(
    '<h1>Hello world</h1><br><button onclick=window.close();>Close browser</button>'
  );
  await AutomationSy.sleep(2000);
  await AutomationSy.click('button');
  await AutomationSy.dispose();
})();

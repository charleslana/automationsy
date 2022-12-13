import { AutomationSy } from '../src/AutomationSy';

(async () => {
  await AutomationSy.init();
  await AutomationSy.navigate('https://the-internet.herokuapp.com/hovers');
  console.log(
    'isVisible before:',
    await AutomationSy.isVisible("(//div[@class='figcaption'])[1]")
  );
  await AutomationSy.hover("(//img[@alt='User Avatar'])[1]");
  console.log(
    'isVisible after:',
    await AutomationSy.isVisible("(//div[@class='figcaption'])[1]")
  );
  await AutomationSy.dispose();
})();

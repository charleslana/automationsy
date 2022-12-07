import { AutomationSy } from '../src/AutomationSy';

(async () => {
  AutomationSy.setWindowSize(1024, 768);
  AutomationSy.setHeadless(false);
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/edit');
  await AutomationSy.type("//input[@class='input is-focused']", 'Hello world');
  await AutomationSy.focus('#join');
  await AutomationSy.keyboard('Tab');
  const isDisabled = await AutomationSy.isDisabled(
    "(//label[text()='Confirm edit field is disabled']/following::input)[1]"
  );
  console.log('isDisabled:', isDisabled);
  await AutomationSy.clear('#clearMe');
  await AutomationSy.fill('#clearMe', 'Fill');
  console.log('text:', await AutomationSy.getText('.card-footer-item'));
  console.log(
    'href:',
    await AutomationSy.getByAttribute('text=Watch tutorial', 'href')
  );
  console.log(
    'all inputs:',
    await AutomationSy.getAllByAttribute("//input[@class='input']", 'id')
  );
  await AutomationSy.sleep(1000);
  await AutomationSy.dispose();
})();
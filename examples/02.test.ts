import { AutomationSy } from '../src/AutomationSy';

(async () => {
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/buttons');
  await AutomationSy.click('#home');
  await AutomationSy.goBack();
  const x = await AutomationSy.getPositionX(
    'button.button.is-link.is-outlined'
  );
  console.log('x:', x);
  const y = await AutomationSy.getPositionY("//button[text()='Find Location']");
  console.log('y:', y);
  const w = await AutomationSy.getWidth('#position');
  console.log('w:', w);
  const h = await AutomationSy.getHeight('#position');
  console.log('h:', h);
  await AutomationSy.clickPosition(
    ((await AutomationSy.getPositionX('#home')) as number) + 1,
    ((await AutomationSy.getPositionY('#home')) as number) + 1
  );
  await AutomationSy.goBack();
  await AutomationSy.doubleClick('#position');
  await AutomationSy.autoScroll(1000, 0);
  await AutomationSy.longClick("(//button[@id='isDisabled'])[2]", 1000);
  await AutomationSy.dispose();
})();
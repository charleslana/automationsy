import { Action, Resource } from '../src/';

(async () => {
  await Action.navigate('https://letcode.in/buttons');
  await Action.click('#home');
  await Action.goBack();
  const x = await Resource.getPositionX('button.button.is-link.is-outlined');
  console.log('x:', x);
  const y = await Resource.getPositionY("//button[text()='Find Location']");
  console.log('y:', y);
  const w = await Resource.getWidth('#position');
  console.log('w:', w);
  const h = await Resource.getHeight('#position');
  console.log('h:', h);
  await Action.clickPosition(
    ((await Resource.getPositionX('#home')) as number) + 1,
    ((await Resource.getPositionY('#home')) as number) + 1
  );
  await Action.goBack();
  await Action.doubleClick('#position');
  await Action.autoScroll(1000, 0);
  await Action.longClick("(//button[@id='isDisabled'])[2]", 1000);
  await Action.dispose();
})();

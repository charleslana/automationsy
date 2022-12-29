import { Action, Config, Resource } from '../src/';

(async () => {
  Config.setWindowSize(1024, 768);
  Config.setHeadless(false);
  await Action.navigate('https://letcode.in/edit');
  await Action.type("//input[@class='input is-focused']", 'Hello world');
  await Action.focus('#join');
  await Action.keyboard('Tab');
  const isDisabled = await Resource.isDisabled(
    "(//label[text()='Confirm edit field is disabled']/following::input)[1]"
  );
  console.log('isDisabled:', isDisabled);
  await Action.clear('#clearMe');
  await Action.fill('#clearMe', 'Fill');
  console.log('text:', await Resource.getText('.card-footer-item'));
  console.log(
    'href:',
    await Resource.getByAttribute('text=Watch tutorial', 'href')
  );
  console.log(
    'all inputs:',
    await Resource.getAllByAttribute("//input[@class='input']", 'id')
  );
  await Action.sleep(1000);
  await Action.closeBrowser();
  Config.setWaitUntil('domcontentloaded');
  await Action.navigate('https://github.com/charleslana');
  console.log(await Resource.getText('.vcard-fullname'));
  await Action.closeBrowser();
})();

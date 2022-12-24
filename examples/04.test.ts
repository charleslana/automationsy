import { Action, Config, Resource } from '../src/';

(async () => {
  Config.setHeadless(true);
  await Action.navigate('https://letcode.in/radio');
  console.log('radio yes', await Resource.isChecked('#yes'));
  console.log('radio notfoo', await Resource.isChecked('#notfoo'));
  console.log(
    'checkbox',
    await Resource.isChecked("(//input[@type='checkbox'])[1]")
  );
  await Action.dispose();
})();

import { Action } from '../src/';

(async () => {
  await Action.navigate('https://letcode.in/draggable');
  await Action.screenshot();
  await Action.dragAndDropByPosition('#header', 100, 20);
  await Action.screenshot();
  await Action.closeBrowser();
})();
